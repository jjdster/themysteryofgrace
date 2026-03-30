/**
 * Utility to safely retrieve the Gemini API key across different environments.
 * In AI Studio, this is typically injected via process.env.GEMINI_API_KEY
 * or import.meta.env.VITE_GEMINI_API_KEY.
 */
export const getGeminiApiKey = (): string => {
  // 1. Try process.env (Vite will replace this during build if configured)
  try {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "undefined" && key !== "") return key;
  } catch (e) {
    // process might not be defined in some browser environments
  }

  // 2. Try import.meta.env (Standard Vite way)
  try {
    const key = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (key && key !== "undefined" && key !== "") return key;
  } catch (e) {
    // import.meta might not be supported in some environments
  }

  // 3. Fallback to a global if injected differently
  try {
    const key = (window as any).GEMINI_API_KEY;
    if (key && key !== "undefined" && key !== "") return key;
  } catch (e) {
    // window might not be defined in SSR
  }

  return "";
};
