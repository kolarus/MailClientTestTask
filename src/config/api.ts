// API configuration that works for both local development and Netlify deployment

const getApiBaseUrl = () => {
  // Check if we're running on Netlify
  if (
    typeof window !== "undefined" &&
    window.location.hostname.includes("netlify.app")
  ) {
    return "/.netlify/functions";
  }

  // Check if we're running locally
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    return "http://localhost:3001/api";
  }

  // Default fallback (for other environments)
  return "/.netlify/functions";
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  emails: `${API_BASE_URL}/emails`,
  folders: `${API_BASE_URL}/folders`,
} as const;
