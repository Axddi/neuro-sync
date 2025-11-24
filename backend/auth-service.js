import { auth, db } from './firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database"; 

export async function registerUserWithRole(email, password, role) {
  const validRoles = ['Caregiver', 'Family Member', 'Doctor/Therapist'];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role specified.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save Profile and Role to Realtime Database ('users' collection)
    await set(ref(db, 'users/' + user.uid), {
      email: user.email,
      role: role, // The role is saved to the DB for role-based access
      // Link Caregivers to a patient for easy data filtering
      ...(role === 'Caregiver' && { patientId: 'P_TEMP_001' }), 
      createdAt: new Date().toISOString(),
    });
    
    return user;

  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
}