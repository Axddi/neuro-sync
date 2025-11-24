<<<<<<< HEAD
import { 
    getDatabase, 
    ref, 
    push, 
    set, 
    update, 
    remove, 
    get, 
    child 
} from "firebase/database";

import { db } from './firebase-config'; 

const ROUTINES_PATH = "routines";

// 1. CREATE Routine (C)

/**
 * Adds a new routine to the database under the user's ID.
 * @param {string} userId - The unique ID of the user (Caregiver) creating the routine.
 * @param {object} routineData - The routine object containing name, time, days, etc.
 * @returns {Promise<string>} The ID of the newly created routine.
 */
export async function addRoutine(userId, routineData) {
    try {
        const userRoutinesRef = ref(db, `${ROUTINES_PATH}/${userId}`);
        const newRoutineRef = push(userRoutinesRef);
        await set(newRoutineRef, routineData);
        return newRoutineRef.key;
    } catch (error) {
        console.error("Error creating routine:", error);
        throw new Error("Failed to add new routine.");
    }
}


// 2. READ Routines (R)

/**
 * Fetches all routines for a specific user.
 * @param {string} userId - The unique ID of the user (Caregiver/Family/Doctor).
 * @returns {Promise<object | null>} An object of routines keyed by their IDs, or null.
 */
export async function getRoutinesByUserId(userId) {
    try {
        const dbRef = ref(db);
        const routinesSnapshot = await get(child(dbRef, `${ROUTINES_PATH}/${userId}`));
        
        if (routinesSnapshot.exists()) {
            return routinesSnapshot.val(); 
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching routines:", error);
        throw new Error("Failed to read routines.");
    }
}


// 3. UPDATE Routine (U)

/**
 * Updates specific fields for an existing routine.
 * @param {string} userId - The unique ID of the user.
 * @param {string} routineId - The unique ID of the routine to update.
 * @param {object} updatedFields - An object containing the fields to change.
 */
export async function updateRoutine(userId, routineId, updatedFields) {
    try {
        const routineRef = ref(db, `${ROUTINES_PATH}/${userId}/${routineId}`);
        await update(routineRef, updatedFields);
    } catch (error) {
        console.error("Error updating routine:", error);
        throw new Error("Failed to update routine.");
    }
}


// 4. DELETE Routine (D)
/**
 * Deletes a routine from the database.
 * @param {string} userId - The unique ID of the user.
 * @param {string} routineId - The unique ID of the routine to delete.
 */
export async function deleteRoutine(userId, routineId) {
    try {
        const routineRef = ref(db, `${ROUTINES_PATH}/${userId}/${routineId}`);
        await remove(routineRef);
    } catch (error) {
        console.error("Error deleting routine:", error);
        throw new Error("Failed to delete routine.");
    }
}

const LOGS_PATH = "logs";

// 5. CREATE Behavior Log (C)
/**
 * Adds a new behavior log entry to the database under the user's ID.
 * @param {string} userId - The unique ID of the user (Caregiver) creating the log.
 * @param {object} logData - The log object containing data, time, mood, tags, etc.
 * @returns {Promise<string>} The ID of the newly created log entry.
 */
export async function addLog(userId, logData) {
    try {
        const userLogsRef = ref(db, `${LOGS_PATH}/${userId}`);
        const newLogRef = push(userLogsRef);
        await set(newLogRef, { 
            ...logData,
            timestamp: Date.now() // Always add a server-side timestamp
        });
        return newLogRef.key;
    } catch (error) {
        console.error("Error creating log:", error);
        throw new Error("Failed to add new behavior log.");
    }
}

// 6. READ Behavior Logs (R)
/**
 * Fetches all behavior log entries for a specific user.
 * @param {string} userId - The unique ID of the user.
 * @returns {Promise<object | null>} An object of log entries keyed by their IDs, or null.
 */
export async function getLogsByUserId(userId) {
    try {
        const dbRef = ref(db);
        const logsSnapshot = await get(child(dbRef, `${LOGS_PATH}/${userId}`));
        
        if (logsSnapshot.exists()) {
            return logsSnapshot.val(); 
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching logs:", error);
        throw new Error("Failed to read behavior logs.");
    }
}

// 7. UPDATE Behavior Log (U)

/**
 * Updates specific fields for an existing log entry.
 * @param {string} userId - The unique ID of the user.
 * @param {string} logId - The unique ID of the log entry to update.
 * @param {object} updatedFields - An object containing the fields to change.
 */
export async function updateLog(userId, logId, updatedFields) {
    try {
        const logRef = ref(db, `${LOGS_PATH}/${userId}/${logId}`);
        await update(logRef, updatedFields);
    } catch (error) {
        console.error("Error updating log:", error);
        throw new Error("Failed to update log entry.");
    }
}

// 8. DELETE Behavior Log (D)

/**
 * Deletes a behavior log entry from the database.
 * @param {string} userId - The unique ID of the user.
 * @param {string} logId - The unique ID of the log entry to delete.
 */
export async function deleteLog(userId, logId) {
    try {
        const logRef = ref(db, `${LOGS_PATH}/${userId}/${logId}`);
        await remove(logRef);
    } catch (error) {
        console.error("Error deleting log:", error);
        throw new Error("Failed to delete log entry.");
    }
=======
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
>>>>>>> origin/feature/auth-roles-setup
}