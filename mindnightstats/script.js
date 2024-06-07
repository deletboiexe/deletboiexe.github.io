const GOOGLE_SHEET_ID = '1kEfo-PIHyzszq2i9vtdHa33rNSIkuWolotTDJyF4wLg';
const API_KEY = 'AIzaSyCwzZeg9z4bnUQXQe6Bez7KrIVrOZQ3WGs';

function fetchGoogleSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/Sheet1?key=${API_KEY}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data.values; // For simplicity, assuming data is an array of arrays
    });
}

function updateStats(data) {
  const stats = document.getElementById('stats');
  stats.innerHTML = ''; // Clear previous content

  // Create a table element
  const table = document.createElement('table');
  table.classList.add('data-table');

  // Create table rows and cells
  data.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');

    // Add row number cell
    const rowNumberCell = document.createElement('td');
    rowNumberCell.textContent = rowIndex === 0 ? ' ' : rowIndex; // Add # for the header row
    tr.appendChild(rowNumberCell);

    row.forEach((cell, cellIndex) => {
      const td = document.createElement(rowIndex === 0 ? 'th' : 'td'); // Use th for header row
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  // Append the table to the stats div
  stats.appendChild(table);
}

function updateStatsPeriodically() {
  fetchGoogleSheetData().then(data => {
    updateStats(data);
  });

  setInterval(() => {
    fetchGoogleSheetData().then(data => {
      updateStats(data);
    });
  }, 300000); // Update every 5 minutes
}

updateStatsPeriodically();
