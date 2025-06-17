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
  if(document.getElementsById("yt-ai-sidebar")) return;

  injectSidebar(title);
}

function injectSidebar(videoTitle) {
  const sidebar = doccument.createElement("div");
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
}

observeVideoChange();