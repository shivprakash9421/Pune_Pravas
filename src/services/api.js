import { getAuth } from "firebase/auth";

/**
 * Reusable function to send authenticated requests to Firebase Cloud Functions
 */
export const fetchSecureData = async (endpoint, method = "GET", body = null) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  // Get fresh Firebase ID Token (JWT)
  const token = await user.getIdToken();

  // Region is asia-south1
  const BASE_URL = "https://punepravas.onrender.com"; 
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "API request failed");
  }

  return response.json();
};