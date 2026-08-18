import { getAuth } from "firebase/auth";

export const fetchSecureData = async (endpoint, method = "GET", body = null, timeoutMs = 60000) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  const token = await user.getIdToken();
  const BASE_URL = "https://punepravas.onrender.com";
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const options = { method, headers, signal: controller.signal };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      let message = "API request failed";
      try {
        const errorData = await response.json();
        message = errorData.error || message;
      } catch {
        // backend returned a non-JSON error page — keep the generic message
      }
      throw new Error(message);
    }

    return await response.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out — the server may be waking up.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
};