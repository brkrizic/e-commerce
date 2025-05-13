import fs from 'fs';
import path from 'path';

// Path to the activity log file
const logFilePath = path.resolve('data/user_activity.json');

// Function to log activity
export async function logUserActivity(action, userId, status, additionalInfo = {}) {
  const logEntry = {
    action,
    userId,
    status,
    timestamp: new Date().toISOString(),
    additionalInfo
  };

  try {
    // Read the current log file
    let logs = [];
    if (fs.existsSync(logFilePath)) {
      const fileData = fs.readFileSync(logFilePath, 'utf8');
      logs = JSON.parse(fileData);
    }

    // Add the new log entry to the logs array
    logs.push(logEntry);

    // Write the updated logs back to the file
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));  // Pretty print the JSON

  } catch (err) {
    console.error('Error writing log:', err);
  }
}
