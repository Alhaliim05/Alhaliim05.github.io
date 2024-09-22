// URL Google Spreadsheet Apps Script yang telah diterbitkan sebagai JSON
const spreadsheetURL = 'https://script.google.com/macros/s/AKfycbwy6vqdKelP5LDKCmTgQWwi-zfRB0dTJ2gl2efcvPtIHVtaveXUrbUMv6boB9Hz4NXE/exec';

// Fungsi untuk mengambil data dari Google Spreadsheet
function fetchKecamatanData() {
    fetch(spreadsheetURL)
        .then(response => response.json())
        .then(data => {
            // Proses data JSON untuk menampilkan marker di peta dan menampilkan di tabel
            loadMap(data);
            loadKecamatanTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fungsi untuk memuat peta dengan leaflet.js
function loadMap(kecamatanData) {
    const map = L.map('map').setView([-5.3300969, 119.5327423], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // Marker kecamatan dari data Google Spreadsheet
    kecamatanData.forEach((kecamatan) => {
        L.marker([kecamatan.Latitude, kecamatan.Longitude])
            .addTo(map)
            .bindPopup(`<b>${kecamatan.Kecamatan}</b><br>Populasi: ${kecamatan.Populasi}`);
    });
}

// Fungsi untuk menampilkan data kecamatan dalam tabel
function loadKecamatanTable(kecamatanData) {
    const kecamatanTable = document.getElementById('kecamatanTable');
    kecamatanTable.innerHTML = '';

    kecamatanData.forEach((kecamatan) => {
        const row = `<tr>
            <td>${kecamatan.Kecamatan}</td>
            <td>${kecamatan.Populasi}</td>
        </tr>`;
        kecamatanTable.innerHTML += row;
    });
}

// Memuat data kecamatan dari Google Spreadsheet saat halaman dimuat
window.onload = function() {
    fetchKecamatanData();
};
