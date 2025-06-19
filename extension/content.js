let lastVideoId = "";

function getVideoIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("v");
}

function isYouTubeVideoPage() {
  return window.location.href.includes("watch?v=");
}

function observeVideoChange() {
  const observer = new MutationObserver(() => {
    if(!isYouTubeVideoPage()) return;

    const currentVideoId = getVideoIdFromUrl();
    if(currentVideoId && currentVideoId !== lastVideoId) {
      lastVideoId = currentVideoId;
      handleVideoChange();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true});
}

async function handleVideoChange() {
  const title = document.title.replace(" - YouTube - ",  "");
  console.log("Detected new video:", title);

  // Prevent multiple injections
  if(document.getElementById("yt-ai-sidebar")) return;

  injectSidebar(title);
}

async function getYouTubeTranscript() {
  try {
    const ytInitialPlayerResponse = JSON.parse(
      [...document.querySelector("script")]
        .map(s => s.textContent)
        .find(t => t.includes("ytInitialPlayerResponse"))
        .match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});/)[1]
    );

    const captionTracks = ytInitialPlayerResponse.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if(!captionTracks || captionTracks.length === 0) return null;

    const englishTrack = captionTracks.find(track => 
      track.languageCode === "en" || track.vssId === "a.en"
    ) || captionTracks[0];

    const xmlUrl = englishTrack.baseUrl;

    const res = await fetch(xmlUrl);
    const xml = await res.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const texts = xmlDoc.getElementsByTagName("text");

    let transcript = "";
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i].textContent.replace(/\n/g," ");
      transcript += text + " ";
    }

    return transcript.trim();
  } catch(e) {
    console.error("Error extracting transcript: ", e);
    return null;
  }
}

function injectSidebar(videoTitle) {
  const sidebar = document.createElement("div");
  sidebar.id = "yt-ai-sidebar";
  sidebar.style.position = "fixed";
  sidebar.style.top = "80px";
  sidebar.style.right = "0";
  sidebar.style.width = "300px";
  sidebar.style.height = "100%";
  sidebar.style.backgroundColor = "#fff";
  sidebar.style.borderLeft = "1px solid #ccc";
  sidebar.style.zIndex = "9999";
  sidebar.style.padding = "10px";
  sidebar.style.boxShadow = "-2px 0 8px rgba(0,0,0,0,1)";
  sidebar.innerHTML = `
    <h2 style="font-size:16px;">AI Summary</h2>
    <p><strong>Title:</strong> ${videoTitle}</p>
    <button id="fetch-summary">Generate Summary</button>
    <div id="summary-result" style="margin-top:10px;"></div>
    `;
  document.body.appendChild(sidebar);

  document.getElementById("fetch-summary").addEventListener("click", async () => {
    const summaryResult = document.getElementById("summary-result");
    summaryResult.innerHTML = "<em>Loading summary...</em>";

    try {
      const transcript = await getYouTubeTranscript();

      if(!transcript) {
        summaryResult.innerHTML = "<span style='color:red;'>Transcript not found for this video.</span>";
        return;
      }
    
      const response = await fetch("https://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          title: videoTitle,
          transcript: dummyTranscript
        })
      });

      const data = await response.json();
      summaryResult.innerHTMl = `<p>${data.summary}</p>`;
    } catch(err) {
      summaryResult.innerHTML = `<span style="color:red;">Failed to fetch summary.</span>`;
      console.error("Summary error:", err);
    }
  });
}

observeVideoChange();