const sheetId = '1kEfo-PIHyzszq2i9vtdHa33rNSIkuWolotTDJyF4wLg';
const apiKey = 'AIzaSyCwzZeg9z4bnUQXQe6Bez7KrIVrOZQ3WGs';

async function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayData(data);
}

function displayData(data) {
    const container = document.getElementById('data');
    data.values.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.textContent = row.join(', ');
        container.appendChild(rowDiv);
    });
}

fetchData();

setInterval(fetchData, 600000);