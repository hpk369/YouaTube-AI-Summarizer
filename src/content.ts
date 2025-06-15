import { injectSidebar } from "./injectSidebar";
import { getYouTubeTranscript, getVideoTitle } from "./transcript-service";

const observeForVideoChanges = () => {
  let lastVideoId = "";

  const observer = new MutationObserver(() => {
    const videoId = getVideoIdFromUrl();
    if(videoId && videoId !== lastVideoId) {
      lastVideoId = videoId;
      handleVideoChange(videoId);
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true});
};

const handleVideoChange = async (videoId: string) => {
  if(!isYouTubeVideoPage()) return;

  const transcript = await getYouTubeTranscript(videoId);
  const title = await getVideoTitle(videoId);

  if(transcript && title) {
    injectSidebar(videoId, title, transcript);
  }
};

const isYouTubeVideoPage = () => {
  return window.location.href.includes("watch?v=");
};

const getVideoIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("v");
};

observeForVideoChanges();