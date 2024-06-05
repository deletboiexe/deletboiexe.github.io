// script.js
const GOOGLE_SHEET_ID = '1kEfo-PIHyzszq2i9vtdHa33rNSIkuWolotTDJyF4wLg';
const API_KEY = 'AIzaSyCwzZeg9z4bnUQXQe6Bez7KrIVrOZQ3WGs';

function fetchGoogleSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/Sheet1?key=${API_KEY}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // Process the data and extract the information you need
      return data.values; // For simplicity, assuming data is an array of arrays
    });
}

function updateLiveTile(data) {
  const liveTile = document.getElementById('live-tile');
  liveTile.innerHTML = ''; // Clear previous content
  
  // Generate HTML content for the live tile
  data.forEach(row => {
    const rowElement = document.createElement('div');
    rowElement.textContent = row.join(' | ');
    liveTile.appendChild(rowElement);
  });
}

function updateLiveTilePeriodically() {
  // Fetch data from Google Sheets and update live tile every 5 minutes
  fetchGoogleSheetData().then(data => {
    updateLiveTile(data);
  });

  setInterval(() => {
    fetchGoogleSheetData().then(data => {
      updateLiveTile(data);
    });
  }, 5 * 60 * 1000); // 5 minutes
}

// Initialize
updateLiveTilePeriodically();
