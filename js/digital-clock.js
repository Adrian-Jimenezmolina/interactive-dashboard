// Update the clock every second
function updateClock() {
  // 1. Create a new Date object
  const now = new Date();

  // 2. Extract hours, minutes, seconds
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // 3. AM/PM logic
  let session = "AM";
  if (hours >= 12) {
    session = "PM";
  }

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // 4. Leading zeros (using ternary operator)
  hours   = hours   < 10 ? "0" + hours   : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // 5. Build the time string
  const timeString = `${hours}:${minutes}:${seconds} ${session}`;

  // 6. Get readable date
  const dateString = now.toLocaleDateString(); // e.g. "11/2/2026"

  // 7. Update the DOM
  document.getElementById("clock-face").innerHTML = timeString;
  document.getElementById("calendar-date").innerHTML = dateString;
}

// Call once immediately so there is no 1-second delay on load
updateClock();

// Then update every 1000 ms (1 second)
setInterval(updateClock, 1000);