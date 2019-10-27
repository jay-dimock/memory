var allImages = [
    "Andorian", "Android", "Bajoran", "Betazoid",
    "Bolian", "Borg", "Cardassian", "Changeling",
    "Denobulan", "Ferengi", "Human", "Jem_Hadar",
    "Kazon", "Klingon", "Ocampa","Orion",
    "Q", "Romulan", "Suliban", "Talaxian",
    "Trill", "Vidiian", "Vorta", "Vulcan",
];

var arrOfImages = [];
var cardsPicked = [];    
var cardsMatched = [];
var waiting = false;

function configureImages(numberOfPairs) {   

    for(var i=0; i<allImages.length; i++) {
        arrOfImages.push(allImages[i]);
    }

    shuffle(arrOfImages); //put images in random order
    arrOfImages.splice(numberOfPairs, arrOfImages.length-numberOfPairs); //only keep desired number of pairs
    
    //make a copy of each
    for(var i=arrOfImages.length-1; i >=0; i--) {
        arrOfImages.push(arrOfImages[i]);        
    }

    shuffle(arrOfImages);
}

function displayCards(arr) {
    var container = document.getElementById("container");

    container.innerHTML = "";

    for(var i=0; i<arr.length; i++) {
        var newImgElement = document.createElement("img");
        newImgElement.src = "static/images/" + arr[i] + ".jpg";
        newImgElement.alt = "Hidden"
        newImgElement.id = i;
        newImgElement.className = "card";
        container.appendChild(newImgElement);
    }

    var cards = document.getElementsByClassName("card");  
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", revealCard);
}
}
function shuffle(arr) {
    for (var i=0; i<arr.length; i++) {
        var idx1 = Math.floor(Math.random() * arr.length);
        var idx2 = Math.floor(Math.random() * arr.length);
        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }
    return arr;
}   
function hideACard(idx) {
    var specifiedCard = document.getElementById(idx);
    specifiedCard.src = "static/images/Hidden.jpg";
    specifiedCard.alt = "Hidden";
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

    clickedImage.src = "static/images/" + imgName + ".jpg" 
    clickedImage.alt = imgName;
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



// Entry point
var textbox = document.getElementById("myForm").elements[0];
textbox.value = "9";
configureBoard();


function configureBoard() {
    var textbox = document.getElementById("myForm").elements[0];
    var numberOfPairs = textbox.value;
    if (numberOfPairs === "") return;

    

    if (numberOfPairs > allImages.length)
    {
        numberOfPairs = allImages.length;
        textbox.value = numberOfPairs;
    }

    arrOfImages = [];
    cardsPicked = []; 
    cardsMatched = [];

    configureImages(numberOfPairs);
    displayCards(arrOfImages);

    for (var i = 0; i < arrOfImages.length; i++) {
        hideACard(i);
    }

    
    
}