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