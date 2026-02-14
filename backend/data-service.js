import { db } from './firebase-config';
import {
  ref,
  push,
  update,
  remove,
  get,
  child,
  serverTimestamp
} from "firebase/database";

export async function addRoutine(patientId, routineData) {
  try {
    const routineRef = push(ref(db, `routines/${patientId}`));

    await update(routineRef, {
      ...routineData,
      createdAt: serverTimestamp(),
    });

    return routineRef.key;
  } catch (error) {
    console.error("Error adding routine:", error);
    throw new Error("Failed to add routine.");
  }
}

export async function getRoutinesByPatientId(patientId) {
  try {
    const snapshot = await get(
      child(ref(db), `routines/${patientId}`)
    );

    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error("Error fetching routines:", error);
    throw new Error("Failed to fetch routines.");
  }
}

export async function updateRoutine(patientId, routineId, updatedFields) {
  try {
    await update(
      ref(db, `routines/${patientId}/${routineId}`),
      updatedFields
    );
  } catch (error) {
    console.error("Error updating routine:", error);
    throw new Error("Failed to update routine.");
  }
}

export async function deleteRoutine(patientId, routineId) {
  try {
    await remove(
      ref(db, `routines/${patientId}/${routineId}`)
    );
  } catch (error) {
    console.error("Error deleting routine:", error);
    throw new Error("Failed to delete routine.");
  }
}

export async function addBehaviorLog(patientId, logData) {
  const dateKey = new Date().toISOString().split('T')[0];

  try {
    const logRef = push(
      ref(db, `logs/${patientId}/${dateKey}`)
    );

    await update(logRef, {
      ...logData,
      timestamp: serverTimestamp(),
    });

    return logRef.key;
  } catch (error) {
    console.error("Error adding log:", error);
    throw new Error("Failed to add behavior log.");
  }
}

export async function getLogsByPatientId(patientId) {
  try {
    const snapshot = await get(
      child(ref(db), `logs/${patientId}`)
    );

    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw new Error("Failed to fetch logs.");
  }
}

export async function updateLog(patientId, dateKey, logId, updatedFields) {
  try {
    await update(
      ref(db, `logs/${patientId}/${dateKey}/${logId}`),
      updatedFields
    );
  } catch (error) {
    console.error("Error updating log:", error);
    throw new Error("Failed to update log.");
  }
}

export async function deleteLog(patientId, dateKey, logId) {
  try {
    await remove(
      ref(db, `logs/${patientId}/${dateKey}/${logId}`)
    );
  } catch (error) {
    console.error("Error deleting log:", error);
    throw new Error("Failed to delete log.");
  }
}
