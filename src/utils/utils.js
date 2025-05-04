export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
  
    // Format the date
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  
    // Format the time
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  
    // Combine date and time
    return `${formattedDate}, ${formattedTime}`;
  }
  
  