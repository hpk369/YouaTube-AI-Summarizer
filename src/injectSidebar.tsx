import React from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./Sidebar";

export const injectSidebar = (videoId: string, title: string, transcript: string) => {
  if(document.getElementById("ai-summary-sidebar")) return;

  const sidebar = document.createElement("div");
  sidebar.id = "ai-summary-sidebar";
  sidebar.style.position = "fixed";
  sidebar.style.top = "80px";
  sidebar.style.right = "0";
  sidebar.style.width = "300px";
  sidebar.style.height = "100%";
  sidebar.style.zIndex = "9999";
  sidebar.style.backgroundColor = "#ffffff";
  sidebar.style.borderLeft = "1px solid #ccc";
  sidebar.style.boxShadow = "-2px 0 5px rgba(0, 0, 0, 0,1)";
  sidebar.style.overflowY = "auto";

  document.body.appendChild(sidebar);

  const root = ReactDOM.createRoot(sidebar);
  root.render(<Sidebar videoId={videoId} title={title} transcript={transcript} />);
};