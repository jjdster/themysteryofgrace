export const getGeminiApiKey = () => {
  return process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
};
