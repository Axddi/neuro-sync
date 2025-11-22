import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// ** Use placeholder text for now **
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY", 
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID", 
  // ... other required keys
};

const app = initializeApp(firebaseConfig);

// Export the services needed for authentication and database
export const auth = getAuth(app);
export const db = getDatabase(app);