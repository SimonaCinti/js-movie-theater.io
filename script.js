
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);


/*Print on screen */
function getScreen(){
    // Create the title
    let movieNameSelected = document.getElementById('movie').options[document.getElementById('movie').selectedIndex].text;
    movieNameSelected = movieNameSelected.substring(0, movieNameSelected.length - 5).trim();
    // Create the html element
    let node = document.createElement("p");
    node.setAttribute('id', 'movieScreen');
    let textNode = document.createTextNode(movieNameSelected);
    document.getElementById("screen").appendChild(node);
    node.appendChild(textNode);
    textNode = document.createTextNode(movieNameSelected);
}

function cleanScreen(){
    let screen = document.getElementById("movieScreen");
    console.log(screen);
     screen.parentNode.removeChild(screen);
}

/* Populate */
populateUi();

/**
 * Save Selected movie index and price
 */

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

/**
 * Function Update total and count
 */

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    // Save data to local storage of browser
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

/**
 * Get data from localstorage and populate UI
 */

function populateUi(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats);
    // At reload of the page, the seats are saved as 'selected'
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

/*
! **** EVENT LIST **** ! 
*/

/**
 * Event movie selection
 */

movieSelect.addEventListener('change', e =>{
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
    cleanScreen();
    getScreen();
});

/**
 * Event click on the container for selecting seats
 */

container.addEventListener('click', e =>{
    // Check the status of the seat
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){

        e.target.classList.toggle('selected');
        // Update
        updateSelectedCount();
    }
});

// initial count for tickets
getScreen();
updateSelectedCount();
