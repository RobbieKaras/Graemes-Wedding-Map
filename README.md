# Graeme's Wedding Travel Map

This repository hosts a lightweight, mobile-friendly interactive map designed to provide quick travel logistics for wedding guests.

The application uses the open-source **Leaflet.js** library and **OpenStreetMap** data, ensuring the map remains free to host (eliminating the need for costly Google Maps API keys).

---

## Features

### **Interactive Map Display**  
Shows all key locations (Reception Venue, Ceremony Venue, Airport, Ann Arbor).

### **Location Toggles**  
Guests can hide/show specific locations using the control panel in the top-right corner (e.g., hide the Airport if they drove).

### **Static Route Preview (Hover/Tap)**  
Hovering a line between two locations displays:
- Estimated Travel Time  
- Distance (Miles)

### **Direct Directions (Click/Tap)**  
- **Clicking a Pin:** Opens Google Maps directions from the user’s *Current Location* to that destination (using the full, precise address).  
- **Clicking a Route Line:** Opens Google Maps directions *between* the two pinned locations.

---



## 🔧 Project Structure

This project is a simple static website — **no backend or server** required.

`item.html` 
`style.css`
`app.js`


---

## ⚙️ How to Update Map Data

All static data (locations, names, route times, and links) is inside **`app.js`**.

---

### **1. Update Locations & Pin Labels**

To change a location name or address, edit the `locations` object:

```js
const locations = {
    'plymouth': { 
        lat: 42.3686, 
        lng: -83.4727, 
        label: 'New Label Here',        // <--- Change pin label
        address: '499 S. Main St, Plymouth, MI 48170' // <--- Change address used for routing
    },
    // ...
};
```

---

### **2. Update Static Times & Google Maps Links**

To adjust estimated times or custom Google Maps direction links, edit the `routes` array:

```js
const routes = [
    { 
        start: 'annarbor', 
        end: 'plymouth', 
        time: 25,        // <--- Update travel time here
        distance: 17,    // <--- Update distance here
        link: '...'      // <--- Update Google Maps direction URL
    },
    // ...
];
```

---

## 🚀 Deployment

After updating **`app.js`** or **`style.css`**, commit your changes to the main branch.

If you're using **GitHub Pages**, the site will automatically rebuild and update live — no action required.

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
