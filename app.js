// --- 1. DEFINE LOCATIONS & ROUTES ---
const locations = {
    'annarbor': { lat: 42.2808, lng: -83.7430, label: 'Ann Arbor' },
    'plymouth': { lat: 42.3686, lng: -83.4727, label: 'The Meeting House (Reception)' },
    'newport': { lat: 42.0620, lng: -83.3323, label: 'Newport Venue (Wedding)' },
    'dtw': { lat: 42.2037, lng: -83.3508, label: 'DTW Airport' }
};

const routes = [
    // Define all routes with static data and the Google Maps link
    { start: 'annarbor', end: 'plymouth', time: 25, distance: 17, link: 'https://maps.app.goo.gl/3' },
    { start: 'annarbor', end: 'newport', time: 45, distance: 39, link: 'https://maps.app.goo.gl/4' },
    { start: 'annarbor', end: 'dtw', time: 30, distance: 28, link: 'https://maps.app.goo.gl/5' },
    { start: 'plymouth', end: 'newport', time: 50, distance: 45, link: 'https://maps.app.goo.gl/6' },
    { start: 'plymouth', end: 'dtw', time: 22, distance: 17, link: 'https://maps.app.goo.gl/7' },
    { start: 'newport', end: 'dtw', time: 25, distance: 23, link: 'https://maps.app.goo.gl/8' }
];

let map; // Global map variable

// --- 2. INITIALIZE MAP (THE ROBUST FIX IS HERE) ---
// This ensures initMap only runs AFTER the entire HTML structure is loaded and ready.
document.addEventListener('DOMContentLoaded', initMap); 

function initMap() {
    // A. Create the map instance and set the initial view (center/zoom)
    // IMPORTANT: If this line fails, the map will be blank.
    map = L.map('map').setView([42.2, -83.5], 9); 

    // B. Add the map tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors' 
    }).addTo(map);

    drawRoutesAndMarkers();
}

// --- 3. DRAW MARKERS AND LINES (POLYLINES) ---
function drawRoutesAndMarkers() {
    // A. Draw all Markers (Pins)
    for (const key in locations) {
        L.marker([locations[key].lat, locations[key].lng])
            .addTo(map)
            .bindTooltip(locations[key].label, { permanent: true, direction: 'right' }); 
    }

    // B. Draw all Routes (Lines)
    routes.forEach(route => {
        const polyline = L.polyline([
            [locations[route.start].lat, locations[route.start].lng],
            [locations[route.end].lat, locations[route.end].lng]
        ], {
            color: '#A0522D', 
            opacity: 0.8,
            weight: 4
        }).addTo(map);

        // C. ATTACH HOVER LISTENERS
        polyline.on('mouseover', (e) => showPopup(e, route));
        polyline.on('mouseout', hidePopup);
        
        // D. ATTACH CLICK LISTENER
        polyline.on('click', () => { window.open(route.link, '_blank'); });
    });
}

// --- 4. HANDLE INTERACTION (POPUP LOGIC) ---
const popup = document.getElementById('travel-info-popup');
const popupRoute = document.getElementById('popup-route');
const popupTime = document.getElementById('popup-time');
const popupDistance = document.getElementById('popup-distance');
const popupLink = document.getElementById('popup-link');

function showPopup(event, routeData) {
    // 1. Fill the popup with data
    popupRoute.textContent = `${locations[routeData.start].label} → ${locations[routeData.end].label}`;
    popupTime.textContent = routeData.time;
    popupDistance.textContent = routeData.distance;
    popupLink.href = routeData.link;

    // 2. Position the popup relative to the mouse cursor
    popup.style.left = `${event.originalEvent.clientX + 10}px`;
    popup.style.top = `${event.originalEvent.clientY + 10}px`;
    
    // 3. Make it visible
    popup.classList.add('visible');
}

function hidePopup() {
    popup.classList.remove('visible');
}