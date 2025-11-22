import { db } from './firebase-config';
import { ref, push, serverTimestamp } from "firebase/database"; 

export async function addRoutine(patientId, routineData) {
  // Structure: /routines/{patientId}/{routineId}
  // This allows the FE to quickly get all routines for the current patient.
  try {
    // push() generates a unique key (routineId)
    await push(ref(db, `routines/${patientId}`), {
      ...routineData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding routine:", error);
    throw error;
  }
}

export async function addBehaviorLog(patientId, logData) {
  // Structure: /logs/{patientId}/{date}/{logId}
  // Logged by date helps with querying for reports [cite: 17, 40]
  const dateKey = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  try {
    await push(ref(db, `logs/${patientId}/${dateKey}`), {
      ...logData,
      timestamp: serverTimestamp(),
      // logData should include 'category' (Mood/Incident) and 'value' (Anxious/Wandering)
    });
  } catch (error) {
    console.error("Error adding log:", error);
    throw error;
  }
}