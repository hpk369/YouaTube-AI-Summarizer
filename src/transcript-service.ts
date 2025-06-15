export const getVideoTitle = async (videoId: string): Promise<string> => {
  return document.title.replace(" - YouTube",  "");
}

export const getYouTubeTranscript = async (videoId: string): Promise<string> => {
  return "This is dummy transcript for testing";
}