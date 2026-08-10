import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Inside your Login component:
const navigate = useNavigate();

const handleLogin = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Check ID token claims for role
    const tokenResult = await user.getIdTokenResult();
    
    if (tokenResult.claims.role === "admin") {
      navigate("/admin"); // Navigates to AdminDashboard.jsx
    } else {
      navigate("/"); // Navigates to Home.jsx
    }
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};