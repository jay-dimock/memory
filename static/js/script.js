var arrOfImages = ["csharplogo.png", "csslogo.png", "htmllogo.png", "javalogo.png", "jslogo.png", "pythonlogo.png"];
// Fill these functions out using your code!
function doubleImages(arr) {
    for(var i=arr.length-1; i >=0; i--) {
        arr.push(arr[i]);        
    }
    //return arr;
}
function displayCards(arr) {
    var container = document.getElementById("container");

    for(var i=0; i<arr.length; i++) {
        var newImgElement = document.createElement("img");
        newImgElement.src = "static/images/" + arr[i];
        newImgElement.id = i;
        newImgElement.className = "card";
        container.appendChild(newImgElement);
    }
}
function shuffleCards(arr) {
    for (var i=0; i<arr.length; i++) {
        var idx1 = Math.floor(Math.random() * arr.length);
        var idx2 = Math.floor(Math.random() * arr.length);
        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }
}   
function hideACard(idx) {
    var specifiedCard = document.getElementById(idx);
    specifiedCard.src = "static/images/questionmark.png";
}

function hidePickedCards() {    
    waiting = false;
    if (cardsPicked.length != 2) return;
    hideACard(cardsPicked[0]);
    hideACard(cardsPicked[1]);
    cardsPicked = [];
    
}

function cardAlreadyMatched(imgName) {
    for(var i=0; i<cardsMatched.length;i++) {
        if (cardsMatched[i] == imgName) return true;
    }
    return false;
}

function revealCard(event) {
    if (waiting) hidePickedCards();

    var clickedImageId = event.target.id;
    var clickedImage = document.getElementById(clickedImageId);
    var imgName = arrOfImages[clickedImageId];

    //if clicked image has already been matched, ignore.
    if (cardAlreadyMatched(imgName)) return;

    //if user clicked on same card twice, ignore.
    if (cardsPicked.length == 1 && clickedImageId == cardsPicked[0]) return;

    clickedImage.src = "static/images/" + imgName;   
    cardsPicked.push(clickedImageId);    

    if (cardsPicked.length != 2) return;

    if (arrOfImages[cardsPicked[0]] == arrOfImages[cardsPicked[1]]) {
        cardsMatched.push(arrOfImages[cardsPicked[0]]);
        cardsPicked = [];
    } else {        
        waiting = true;
        window.setTimeout(hidePickedCards,1000);
    }       
}



// Game logic!
doubleImages(arrOfImages);
shuffleCards(arrOfImages);
displayCards(arrOfImages);

// call on the hideACard function for each card in our array of images
for (var i = 0; i < arrOfImages.length; i++) {
    hideACard(i);
}

var cardsPicked = [];    
var cardsMatched = [];
var waiting = false;

var cards = document.getElementsByClassName("card");  
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", revealCard);
}