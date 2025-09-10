const getApiBaseUrl = () => {
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    return "http://localhost:3001/api";
  }

  return "/.netlify/functions";
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  emails: `${API_BASE_URL}/emails`,
  folders: `${API_BASE_URL}/folders`,
} as const;
