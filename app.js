//Declarations of the required variables
let cardsOpen = []; //Variable that will store the list of open cards in an array
let moves = 0;
const cardDeck = document.querySelector('.deck');
let clockValue = true;
let time = 0;
let minutes = 0;
let seconds = 0;
const clock = document.querySelector('.clock');
let timer;
let matched = 0;
const totalPairs = 8;

//Function that add the cards to an array and shuffles it
function shuffleCard(){
    const cards = Array.from(document.querySelectorAll('.card'));
    const shuffleCards = shuffle(cards);
    for (const card of shuffleCards){
        cardDeck.appendChild(card);
     } 
}shuffleCard();

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

 //Storing the card deck in a variable
const deck = document.querySelector('.deck');

//Event listener for a card when it is clicked
deck.addEventListener('click', function (card){
 const clicked = card.target;
 //The 'if' statement below:
 /*Verifies target is desired element
 *Ensures already matched card cannot be clicked again and matched with another card which is being clicked
 *Ensures only two cards are added to the array
 */ if (clicked.nodeName === 'LI' && !clicked.classList.contains('match')  && cardsOpen.length<2 && !cardsOpen.includes(clicked)){ 
       addToArray(clicked); //cards are added to array if they meet the above conditions 
       addCard(clicked); //the specified classes in this function are added to the card if the conditions above are met
      if (clockValue){
         clockStart();
         clockValue = false;
      }
      if (cardsOpen.length === 2){ //verifies if number of cards added to array is just two
         ifMatched(clicked); //ifMatched function is called if condition is true
         updateMoves();
         starRate();
    }
   }
});

//Function add the specified classes to a carrd
 function addCard(clicked){
    clicked.classList.add('open','show');
    //clicked.classList.toggle('show');
 }
 
//Function that adds the open cards to the cardsOpen array
function addToArray(clicked){
    cardsOpen.push(clicked);
}

//Funtion to remove the specified classes from a card
function removeCard(clicked){
    clicked.classList.remove('open','show');
}

//Function to add the unmatch effect
function backRed(clicked){
   clicked.classList.add('unmatch');
}

//Funtion to undo the unmatch effect
function undoRed(clicked){
   clicked.classList.remove('unmatch');
}

//Function to check if the cards have matched symbols
function ifMatched(){
   if (cardsOpen[0].firstElementChild.className === cardsOpen[1].firstElementChild.className){
      cardsOpen[0].classList.add('match');
      cardsOpen[1].classList.add('match');
      cardsOpen = [];
      setTimeout(gameOver,1000);
 }
   else {
      setTimeout(function(){
        backRed(cardsOpen[0]);
        backRed(cardsOpen[1]);
   }, 400);
      setTimeout(function(){
        undoRed(cardsOpen[0]);
        undoRed(cardsOpen[1]);
        removeCard(cardsOpen[0]);
        removeCard(cardsOpen[1]);
        cardsOpen = []; 
      }, 1200);
}
}

//Event listener for when the restart icon is clicked
document.querySelector('.restart').addEventListener('click', function(){
 restartGame();
});

//Function to increase the move counter
function updateMoves(){
    moves += 1;
    const movesValue = document.querySelector('.moves');
    movesValue.innerHTML = moves;
}

//Function that hides the star at specified moves values
function starRate(){
   if (moves === 16 || moves === 20){
      minusOneStar();
   }
}

//Function that hides a star
function minusOneStar(){
   const stars = document.querySelectorAll('.stars li');
   for (const star of stars){
       if(star.style.display !== 'none'){
         star.style.display = 'none';
         break;
       }
   }
}

//Function that implements a timer
function clockStart(){
   timer = setInterval(function(){
       time += 1;
       enableTime();
   }, 1000);
}

//Function that changes timer to minutes and seconds form and implements the timer functionality to the DOM
function enableTime(){
   minutes = Math.floor(time / 60);
   seconds = time % 60;
   if (seconds < 10) {
            clock.innerHTML = `${minutes}:0${seconds}`;
        } 
        else {
            clock.innerHTML = `${minutes}:${seconds}`;
        }   
}

//Function that reinstate the clock value to a fresh start count
function disableTime(){
   clearInterval(timer);
}

//Event listener for when the modal exit icon is clicked
document.querySelector('.modal-exit').addEventListener('click', function(){
   toggleModal();
 });

//Event listener for when the modal replay button is clicked
document.querySelector('.modal-replay').addEventListener('click', function(){
  replayGame();
});

//Function that toggles the modal on when a game round has been completed
function toggleModal(){
   const getModal = document.querySelector('.modal-overlay');
   getModal.classList.toggle('hide');
}

//Function that enables the game stats to the modal
function modalStats(){
   const timeStat = document.querySelector('.modal-time');
   const clockVal = document.querySelector('.clock').innerHTML;
   const movesStat = document.querySelector('.modal-moves');
   const starRating = document.querySelector('.modal-rating');
   const stars = getStars();
   timeStat.innerHTML = `You finished in ${clockVal}`;
   movesStat.innerHTML = `You made ${moves} moves`;
   starRating.innerHTML = `Rating: ${stars} star`;
}

//Function which gets value of star and returns in integer number form
function getStars(){
   const stars = document.querySelectorAll('.stars li');
   starCount = 0;
   for (const star of stars){
       if (star.style.display !== 'none'){
          starCount+=1;
       }
   }
   return starCount;
}

//Function that executes when a game session is completed
function gameOver(){
   matched += 1;
   if (matched === totalPairs){ //verifies if the number of matched cards equals the number of the total pairs of card   
   disableTime();
   modalStats();
   toggleModal();
   }
}

//Function starts a new game session
function replayGame(){
   restartGame();
   toggleModal();
   matched = 0;
}

//Function that restarts the game
function restartGame(){
   matched = 0;
   resetClockAndTime();
   resetCards();
   resetMoves();
   resetStars();
   shuffleCard();
}

//Function that resets the time's value to a fresh start count
function resetClockAndTime(){
   clockValue = true;
   time = 0;
   disableTime();
   minutes=0;
   seconds=0;
   clock.innerHTML = `${minutes}:0${seconds}`;
}

//Function that resets the moves value to fresh start count
function resetMoves(){
   moves = 0;
   document.querySelector('.moves').innerHTML = moves;
}

//Function that resets the star to initial value
function resetStars(){
   stars = 0;
   const starz = document.querySelectorAll('.stars li');
   for (const star of starz){
       star.style.display = 'inline';
   }
}

//Function that resets the cards to inital state
function resetCards(){
   const cards = document.querySelectorAll('.deck li');
   for (let card of cards){
       card.className = 'card';
   }
}