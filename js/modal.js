//const buttonElems = document.querySelectorAll('.modal-pet');
const modalElem = document.querySelector('#modal-pet');
  
/*modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
`;*/

const closeModal = event => {
    
    const target = event.target;
  
    if ( target === modalElem ||
        ('.modal-close' && target.closest('.modal-close')) ||
        event.code === 'Escape'
    ) {
        
        modalElem.style.opacity = 0;
    
        setTimeout(() => {
            modalElem.style.visibility = 'hidden';
            document.body.classList.remove('ohidden');
        }, 300);
    
        window.removeEventListener('keydown', closeModal);
    }
}
  
const openModal = (e) => {
    e.preventDefault();
    
    document.body.classList.add('ohidden');
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal)
};
  
/* buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
}); */
  
modalElem.addEventListener('click', closeModal);
  
document.querySelector('.show-cards').addEventListener('click', function(event) {

    let cardElement = event.target.closest('.modal-pet');

    if (cardElement && this.contains(cardElement)) {
        //console.log(event.target.dataset.id);
        
        let petObj = petsObj[cardElement.dataset.id];
        document.querySelector('.modal-title').innerHTML = petObj.name;
        document.querySelector('.modal-description').innerHTML = petObj.description;
        document.querySelector('.modal-text').innerHTML = petObj.text;
        document.querySelector('.modal-img').src = `img/${petObj.img}`;
        document.querySelector('.modal-age').innerHTML = petObj.age;
        document.querySelector('.modal-inoculations').innerHTML = petObj.inoculations.join(', ');
        document.querySelector('.modal-diseases').innerHTML = petObj.diseases.join(', ');
        document.querySelector('.modal-parasites').innerHTML = petObj.parasites.join(', ');
        
        openModal(event);
    }
});