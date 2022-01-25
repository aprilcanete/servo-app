const spotlightOwner = document.querySelector('.spotlight-owner')
const spotlightLinkName = document.querySelector('.spotlight-link-name')
const spotlightBtn = document.querySelector('.spotlight-btn')

const url = 'http://localhost:8080/api/stations/random'

axios
    .get(url)
    .then(res => {
        spotlightLinkName.textContent = res.data[0].name
        spotlightOwner.textContent = res.data[0].owner
    })


spotlightBtn.addEventListener('click', (event) => {

    axios
    .get(url)
    .then(res => {
        spotlightLinkName.textContent = res.data[0].name
        spotlightOwner.textContent = res.data[0].owner
    })
})