import React from "react";
import ReactDOM from "react-dom/client";

const Popup = () => {
  return (
    <div className="p-4">
      <h1 className="text-2x1 font-bold mb-2">YouTube AI Summarizer</h1>
      <p>Visit a YouTube video and click the Sidebar to get the summary!</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Popup />);