import React, { useState } from "react";
import { getLLMSummary } from "./open-ai";

interface SidebarProps {
  videoId: string;
  title: string;
  transcript: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title, transcript }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await getLLMSummary(title, transcript);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">AI Summary</h2>
      {summary ? (
        <p>{summary}</p>
      ):(
        <button
          onClick={handleClick}
          className="big-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate Summary"}
        </button>
      )}
    </div>
  );
};

export default Sidebar;