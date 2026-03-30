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
  } catch (e) {}

  // 2. Try VITE_ prefixed process.env
  try {
    const key = (process.env as any).VITE_GEMINI_API_KEY;
    if (key && key !== "undefined" && key !== "") return key;
  } catch (e) {}

  // 3. Try import.meta.env (Standard Vite way)
  try {
    const key = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (key && key !== "undefined" && key !== "") return key;
  } catch (e) {}

  // 4. Try import.meta.env without VITE_ prefix (if configured)
  try {
    const key = (import.meta as any).env?.GEMINI_API_KEY;
    if (key && key !== "undefined" && key !== "") return key;
  } catch (e) {}

  // 5. Fallback to a global if injected differently
  try {
    const key = (window as any).GEMINI_API_KEY;
    if (key && key !== "undefined" && key !== "") return key;
  } catch (e) {}

  return "";
};
