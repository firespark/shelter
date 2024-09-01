const arrowLeft = document.querySelector('#arrow-left');
const arrowRight = document.querySelector('#arrow-right');

let currentPets = [];
let leftPets = [];
let rightPets = [];

let singleCardOffset = 328;
let visibleCards;

if (document.documentElement.scrollWidth >= 1200) {
    visibleCards = 3;    
}

if (document.documentElement.scrollWidth < 1200) {
    visibleCards = 2;
}

if (document.documentElement.scrollWidth < 768) {
    visibleCards = 1;
}

let defautOffset = 984;
let animOffset = singleCardOffset * visibleCards;
let resetDirection = null;
let isAnimating = false;

const carousel = document.querySelector('.slides');
let cardList = carousel.querySelectorAll('.card');
const emptyCard = cardList[3].cloneNode(true);


function initializeCards() {
    rightPets = [];
    leftPets = []
    getPets();
    animOffset = singleCardOffset * visibleCards;
    let petsToRender = [...currentPets];
    let generateStart = 3;
    let generateEnd = 6;
    if (visibleCards == 2){
        generateStart = 3;
        generateEnd = 5;
    }
    if (visibleCards == 1){
        generateStart = 3;
        generateEnd = 4;
    }
    for (let i = generateStart; i < generateEnd; i++) {
        fillCard(i, petsToRender[0]);
        petsToRender.shift();
    }
}

initializeCards();

for (let i = 0; i < cardList.length; i++) {
    cardList[i].style.transform = `translateX(-${defautOffset}px)`;
}

window.addEventListener('resize', () => {
    resizeWindow();
});

function resizeWindow() {

    let lastVisibleCards = visibleCards;
    if (document.documentElement.scrollWidth >= 1200) {
        visibleCards = 3;
        
    }

    if (document.documentElement.scrollWidth < 1200) {
        visibleCards = 2;
    }

    if (document.documentElement.scrollWidth < 768) {
        visibleCards = 1;
    }
    //console.log(visibleCards)
    //console.log(document.documentElement.scrollWidth)
    if (lastVisibleCards != visibleCards) {
        initializeCards();
        //console.log(currentPets)
    }
}

function setupTransitionListeners() {
    cardList.forEach(card => {
        card.addEventListener('transitionend', function (event) {
            if ((resetDirection === 'left' || resetDirection === 'right') && event.propertyName === 'transform') {
                if (resetDirection === 'left') {
                    resetPositionLeft();
                } else if (resetDirection === 'right') {
                    resetPositionRight();
                }
                resetDirection = null;
                isAnimating = false;
            }
        });
    });
}
setupTransitionListeners();


function getPet() {
    let pet = Math.floor(Math.random() * (Object.keys(petsObj).length));
    if (currentPets.indexOf(pet) >= 0 || leftPets.indexOf(pet) >= 0 || rightPets.indexOf(pet) >= 0) {
        pet = getPet();
    }
    return pet;
}

function getPets() {
    currentPets = []
    while (currentPets.length < visibleCards) {
        currentPets.push(getPet());
    }
}

function fillCard(position, petID) {
    let newCard = emptyCard.cloneNode(true);
    try {
        
        newCard.firstElementChild.children[0].lastElementChild.src = `img/${petsObj[petID].img}`
        newCard.firstElementChild.children[1].textContent = petsObj[petID].name
    }
    catch {
        console.log(`Bad ID ${petID} `)
    }
    cardList[position].innerHTML = newCard.innerHTML;
    cardList[position].dataset.id = petID;
}


function resetPositionLeft() {
    let tempArray = [];
    let idArray = [];
    cardList.forEach(card => {
        card.classList.add('no-transition');
    });
    for (let i = 0; i < cardList.length; i++) {
        cardList[i].style.transform = `translateX(-${defautOffset}px)`;
        if (i >= visibleCards){
            tempArray.push(cardList[i].innerHTML);
            idArray.push(cardList[i].dataset.id);
        }
    }
    for (let i = 0; i < tempArray.length; i++) {
        cardList[i].innerHTML = tempArray[i];
        cardList[i].dataset.id = idArray[i];
    }
    void carousel.offsetWidth;
    cardList.forEach(card => card.classList.remove('no-transition'));
}


function resetPositionRight() {
    let tempArray = new Array(visibleCards).fill(emptyCard.innerHTML);
    let idArray = new Array(visibleCards);
    idArray.fill(0);
    cardList.forEach(card => {
        card.classList.add('no-transition');
    });
    for (let i = 0; i < cardList.length; i++) {
        cardList[i].style.transform = `translateX(-${defautOffset}px)`;
        if (i < cardList.length - visibleCards)
            tempArray.push(cardList[i].innerHTML); 
            idArray.push(cardList[i].dataset.id);
    }
    for (let i = 0; i < tempArray.length; i++) {
        cardList[i].innerHTML = tempArray[i]
        cardList[i].dataset.id = idArray[i];
    }
    void carousel.offsetWidth;
    cardList.forEach(card => card.classList.remove('no-transition'));
}


arrowLeft.onclick = function () {
    if (isAnimating) return;
    isAnimating = true;
    leftPets = currentPets;
    currentPets = rightPets;
    if (currentPets.length != visibleCards) {
        getPets();
    }
    rightPets = [];

    let petsToRender = [...currentPets];
    let generateStart = cardList.length - visibleCards;
    let generateEnd = cardList.length;
    if (visibleCards == 2){
        generateStart = 5;
        generateEnd = 7;
    }
    if (visibleCards == 1){
        generateStart = 4;
        generateEnd = 5;
    }
    for (let i = generateStart; i < generateEnd; i++) {
        fillCard(i, petsToRender[0]);
        petsToRender.shift();
    }
    for (let i = 0; i < cardList.length; i++) {
        let currentOffset = -defautOffset;
        currentOffset -= animOffset;
        cardList[i].style.transform = `translateX(${currentOffset}px)`;
    }
    void carousel.offsetWidth;
    resetDirection = 'left';

};

arrowRight.onclick = function () {
    if (isAnimating) return;
    isAnimating = true;
    rightPets = currentPets;
    currentPets = leftPets;
    if (currentPets.length != visibleCards) {
        getPets();
    }
    leftPets = [];

    let petsToRender = [...currentPets];
    let generateStart = 0;
    let generateEnd = visibleCards;
    if (visibleCards == 2){
        generateStart = 1;
        generateEnd = 3;
    }
    if (visibleCards == 1){
        generateStart = 2;
        generateEnd = 3;
    }
    for (let i = generateStart; i < generateEnd; i++) {
        fillCard(i, petsToRender[0]);
        petsToRender.shift();
    }
    for (let i = 0; i < cardList.length; i++) {
        let currentOffset = -defautOffset;
        currentOffset += animOffset;
        cardList[i].style.transform = `translateX(${currentOffset}px)`;
    }
    void carousel.offsetWidth;
    resetDirection = 'right';
};




