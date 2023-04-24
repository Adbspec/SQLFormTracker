const fs = require('fs');
const path = require('path');


function logError(error) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${error.stack}\n`;
  const logFilePath = path.join(__dirname, 'error.log');

  if (process.env.NODE_ENV === 'production') {
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Failed to write error log:', err);
      }
    });
  }
}


module.exports = {
    logError
}