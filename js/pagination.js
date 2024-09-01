const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

const createPetsArr = () => {
    let pets = [0, 1, 2, 3, 4, 5, 6, 7];
    pets = shuffle(pets);
    let outputPets = [];
    for (let i = 0; i < 6; i++) {
        pets.unshift(...pets.splice(1));
        outputPets = [...outputPets, ...pets];
    }

    return outputPets;
}


const outputPets = createPetsArr();

const cardsContainer = document.querySelector('.cards-container');
const currentPage = document.querySelector('#current-page span');
const rightNav = document.querySelector('#right-nav');
const leftNav = document.querySelector('#left-nav');
const rightEndNav = document.querySelector('#right-end-nav');
const leftEndNav = document.querySelector('#left-end-nav');

const total = 48;
let count = 8;
let page = 1;
let totalPages = total / count;




const createPetsHtml = () => {
    let output = '';
    for (let i = count * page - count; i < count * page; i++) {
        let petObj = petsObj[outputPets[i]];
        output += `<div class="card modal-pet" data-id=${outputPets[i]}>
                            <a href="#">
                                <div class="card-image">
                                    <img src="img/${petObj.img}" alt="">
                                </div>
                                <div class="card-title">${petObj.name}</div>
                                <div class="card-link">
                                    <span class="button-primary-o">Learn more</span>
                                </div>
                            </a>
                        </div>`;
    }
    cardsContainer.innerHTML = output;
}
resizeWindow();


rightNav.onclick = function () {
    if (page < totalPages) {
        page++;
        currentPage.innerHTML = page;
        createPetsHtml();
        leftNav.classList.remove('inactive');
        leftEndNav.classList.remove('inactive');
    }
    if (page > totalPages - 1) {
        rightNav.classList.add('inactive');
        rightEndNav.classList.add('inactive');
    }
};

leftNav.onclick = function () {
    if (page > 1) {
        page--;
        currentPage.innerHTML = page;
        createPetsHtml();
        rightNav.classList.remove('inactive');
        rightEndNav.classList.remove('inactive');
    }
    if (page <= 1) {
        leftNav.classList.add('inactive');
        leftEndNav.classList.add('inactive');
    }
};

rightEndNav.onclick = function () {
    page = totalPages;
    currentPage.innerHTML = page;
    createPetsHtml();
    leftNav.classList.remove('inactive');
    leftEndNav.classList.remove('inactive');
    rightNav.classList.add('inactive');
    rightEndNav.classList.add('inactive');
    
};

leftEndNav.onclick = function () {
    page = 1;
    currentPage.innerHTML = page;
    createPetsHtml();
    leftNav.classList.add('inactive');
    leftEndNav.classList.add('inactive');
    rightNav.classList.remove('inactive');
    rightEndNav.classList.remove('inactive');
    
};

function resizeWindow() {
    let currenCount = count;

    if (document.documentElement.scrollWidth >= 1200) {
        count = 8;
    }

    if (document.documentElement.scrollWidth < 1200) {
        count = 6;
    }

    if (document.documentElement.scrollWidth < 768) {
        count = 3;
    }
    if (currenCount != count) {
        page = 1;
        currentPage.innerHTML = page;
      
        leftNav.classList.add('inactive');
        leftEndNav.classList.add('inactive');
        rightNav.classList.remove('inactive');
        rightEndNav.classList.remove('inactive');
    }
    
    totalPages = total / count;
    createPetsHtml();
}

window.addEventListener('resize', () => {
    resizeWindow();
});


