// Initialize and add the map

// import { MarkerClusterer } from "@googlemaps/markerclusterer";

let map;
const currentLat = document.querySelector('.current-lat')
const currentLong = document.querySelector('.current-long')
const currentAddress = document.querySelector('.current-address')

function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    minZoom: 11,
    center: { lat: -25.363, lng: 131.044 },
  });
 
    let pos = {}
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            pos.lat = position.coords.latitude,
            pos.lng = position.coords.longitude
            var currentLat = document.querySelector('.current-lat')
            currentLat.textContent = pos.lat
            var currentLng = document.querySelector('.current-long')
            currentLng.textContent = pos.lng
            // console.log();
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyDoLvv-SV4N-eu04xRdHzGPSctSoJKhtIA`).then(res => {
            currentAddress.textContent = res.compound_code
            })
            
            map.setCenter(pos)
        })
          
    } 
    createMarkers(); 
};
//https://maps.googleapis.com/maps/api/geocode/json?latlng=-37.8390171,144.9887956&key=AIzaSyDoLvv-SV4N-eu04xRdHzGPSctSoJKhtIA
  

function createMarkers() {
  axios.get("/api/stations/all").then((res) => {
    res.data.forEach((station) => {

      let marker = new google.maps.Marker({
        position: { lat: station.latitude, lng: station.longitude },
        map: map,
        title: station.owner,
        address: station.address,
        // label: station.owner[0],
      
      });
      // console.log(marker.label)
      const infowindow = new google.maps.InfoWindow({
        content: `<h1 class="info-marker-title1">${station.name}</h1> <h4 class="info-marker-title2">${station.owner}</h4>`,
      });
      currentLat.textContent = map.getCenter().lat()
      currentLong.textContent = map.getCenter().lng()
      
    marker.addListener('click', () => {
      currentLat.textContent = marker.position.lat()
      currentLong.textContent = marker.position.lng()
      currentAddress.textContent = marker.address
      
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
        })
    })   
    });
  });
}

//Adding top 5 stations to right column
//declare a function
//call axios with the endpoint
//with the data create dom elements and append to the parent element

const stationList = document.querySelector(".station-list");
const stationDetail = document.querySelector(".station-detail");

const getTop5Stations = () => {
  axios.get("http://localhost:8080/api/stations/all").then((res) => {
    // console.log(res.data);
    // console.log(res.rows)
    var stations = res.data;
    for(let i=0; i<5; i++){
      const ulStation = document.createElement("ul");
      const liName = document.createElement("li");
      const liAddress = document.createElement("li");
      const liSuburb = document.createElement("li");
      ulStation.classList.add("station-list");
      liName.classList.add("bulletFreeList");
      liAddress.classList.add("bulletFreeList");
      liSuburb.classList.add("bulletFreeList");

      liName.textContent = stations[i].name;
      liAddress.textContent = stations[i].address;
      liSuburb.textContent = stations[i].suburb;

      ulStation.appendChild(liName);
      ulStation.appendChild(liAddress);
      ulStation.appendChild(liSuburb);
      stationDetail.appendChild(ulStation);
    }
  });
};
window.onload = () => {
  getTop5Stations();
};

function getStationStats() {
  
  
  axios.get("http://localhost:8080/api/stats").then((res) => {
    const tableBody = document.querySelector(".owners-table");
    
    res.data.forEach((station) => {
      const stationTable = document.createElement('tr')
      const stationOwnerTd = document.createElement("td");
      const stationStatTd = document.createElement("td");
      stationOwnerTd.textContent = station.owner;
      stationStatTd.textContent = station.count;

      stationTable.appendChild(stationOwnerTd)
      stationTable.appendChild(stationStatTd)
      
      tableBody.appendChild(stationTable);
    });
  });
   
}

getStationStats();


const getTotalStations = () => {
  const totStations = document.querySelector('.tot-stations');

  axios.get("http://localhost:8080/api/stations/all").then((res) => {


    totStations.textContent = res.data.length;

  })
}
getTotalStations();