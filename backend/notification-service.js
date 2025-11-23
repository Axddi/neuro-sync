// backend/notification-service.js

// The official endpoint for Firebase Cloud Messaging (FCM) API
const FCM_ENDPOINT = "https://fcm.googleapis.com/fcm/send";

/**
 * Sends a basic push notification to a specified device token using the FCM HTTP API.
 * @param {string} deviceToken - The FCM token of the target user's device.
 * @param {string} title - The title of the notification (e.g., "Routine Updated").
 * @param {string} body - The body/content of the notification.
 */
export async function sendPushNotification(deviceToken, title, body) {
    // 1. Get the secret server key from the environment variables
    const serverKey = process.env.FIREBASE_SERVER_KEY; 

    if (!serverKey) {
        console.error("FCM Server Key not found. Check your local .env file.");
        return;
    }

    const message = {
        to: deviceToken,
        notification: {
            title: title,
            body: body,
            sound: "default"
        },
        data: {
            // Optional data payload for the app to use
            click_action: "FLUTTER_NOTIFICATION_CLICK", 
            type: "general_alert"
        }
    };

    try {
        // Use fetch (standard in modern JS/Node environments)
        const response = await fetch(FCM_ENDPOINT, {
            method: 'POST',
            headers: {
                // Authorization requires the key copied from Firebase/GCP
                'Authorization': `key=${serverKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Notification sent successfully:", data);
        } else {
            console.error("FCM API Error:", data);
            throw new Error(`Failed to send notification: ${data.failure}`);
        }
    } catch (error) {
        console.error("Network or API call failed:", error);
        throw new Error("Could not send push notification.");
    }
}