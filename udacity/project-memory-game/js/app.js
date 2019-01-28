/*
 * Create a list that holds all of your cards
 */
let cardsArray = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-plane', 'fa-leaf', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-plane', 'fa-cube'];

let modal = document.querySelector('#myModal');
let allCards = document.querySelectorAll('.card');
let openCards = [];
let deck = document.querySelector('.deck')
let moves = document.querySelector('.score-panel span');

let refresh = document.querySelector('.score-panel .restart')
let stars = document.querySelectorAll('.stars li i');
let timeStart = false;
let timeUsed = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function closeCards(){
    openCards.forEach(function(card){
        card.classList.remove("open", "show");})
    openCards = [];
    deck.addEventListener("click", deckEventListener);
}
function cardMatch(){
    openCards.forEach(function(card){
        card.classList.add("match");
        card.classList.remove("open", "show");
    })
    openCards = [];
    deck.addEventListener("click", deckEventListener);
}
function addMoves(){
    moves.innerText++;

    if(moves.innerText >= 20){
        if(stars[2].classList[1] === 'fa-star'){
            stars[2].classList.replace('fa-star', 'fa-star-o');
        }
        if(moves.innerText >= 40){
            if(stars[1].classList[1] === 'fa-star'){
                stars[1].classList.replace('fa-star', 'fa-star-o');
            }
            if(moves.innerText >= 60){
                if(stars[0].classList[1] === 'fa-star'){
                    stars[0].classList.replace('fa-star', 'fa-star-o');
                }
            }
        }
    }
}



function endSuccess(){
    results = document.querySelectorAll('.deck .match');
    if(results.length === 16){
        stopTimer();

        let resultMoves = document.querySelector('#result-moves');
        resultMoves.innerText = moves.innerText;

        let min = document.querySelector('#minute');
        let sec = document.querySelector('#second');
        let minFinal = document.querySelector('#finalMinute');
        let secFinal = document.querySelector('#finalSecond');
        minFinal.innerText = min.innerText;
        secFinal.innerText = sec.innerText;

        modal.style.display = "block";
    }
}

function restart(){
    let randomArray = shuffle(cardsArray);
    let cards = document.querySelectorAll(".deck li i")
    for(let i = 0; i<cards.length; i++){
        cards[i].classList.replace(cards[i].classList[1], randomArray[i]);
    }
    allCards.forEach(function(card){
        card.classList.remove("open", "show", "match");
    })
    moves.innerText = 0;
    stars.forEach(function(star){
        star.classList.replace('fa-star-o', 'fa-star');
    })
    resetTimer();
}

function deckEventListener(evt){
    if(timeStart === false){
        startTime();
    }
    if(evt.target.nodeName.toLowerCase() === "li"){
        if(!evt.target.classList.contains("open") && !evt.target.classList.contains("match")){
            if(openCards.length < 2){
                evt.target.classList.add("open", "show");
                openCards.push(evt.target);
                if(openCards.length == 2){
                    addMoves();
                    deck.removeEventListener("click", deckEventListener);
                    if(openCards[0].firstElementChild.classList[1] == openCards[1].firstElementChild.classList[1]){
                        cardMatch();
                        endSuccess();
                    }
                    else{
                        setTimeout(closeCards, 500);
                    }
                }
            }
        }
    }
}

function initGames(){
    let randomArray = shuffle(cardsArray);
    let cards = document.querySelectorAll(".deck li i")
    for(let i = 0; i<cards.length; i++){
        cards[i].classList.add(randomArray[i]);
    }
    moves.innerText = 0;
    deck.addEventListener("click", deckEventListener);
    refresh.addEventListener("click", restart);
}


initGames();

function startTime(){
    timeStart = true;
    timeUsed = 0;
    timerId = setInterval(secTimer, 1000)
}
function secTimer(){
    timeUsed++;
    updateTimer();
}
function updateTimer(){
    let minute = Math.floor(timeUsed / 60);
    let second = Math.floor(timeUsed % 60);
    let min = document.querySelector('#minute');
    let sec = document.querySelector('#second');
    min.innerText = minute<10?'0'+minute:minute;
    sec.innerText = second<10?'0'+second:second;
}
function resetTimer(){
    timeUsed = 0;
    clearInterval(timerId);
    timeStart = false;
    updateTimer();
}
function stopTimer(){
    clearInterval(timerId);
    timeStart = false;
}



var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";

  }
}
