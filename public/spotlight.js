const spotlightOwner = document.querySelector(".spotlight-owner");
const spotlightLinkName = document.querySelector(".spotlight-link-name");
const spotlightBtn = document.querySelector(".spotlight-btn");

const url = "http://localhost:8080/api/stations/random";
var stationLocation = {};

function updateSpotlight() {
  axios.get(url).then((res) => {
    // console.log(res);
    spotlightLinkName.textContent = res.data[0].name;
    spotlightOwner.textContent = res.data[0].owner;

    stationLocation.lat = res.data[0].latitude;
    stationLocation.lng = res.data[0].longitude;
    stationLocation.address = res.data[0].address;
  });
}

updateSpotlight();

spotlightBtn.addEventListener("click", updateSpotlight);

function getServoLocation() {
  // console.log("updating spotlight");
  showCurrentAddress(stationLocation.address);
  showLatLng(stationLocation.lat, stationLocation.lng);

  map.setCenter(stationLocation);
}

spotlightLinkName.addEventListener(`click`, getServoLocation);
