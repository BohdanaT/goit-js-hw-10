import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectBreed = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
// const loaderEl = document.querySelector('.loader');
// const errorEl = document.querySelector('.error');


selectBreed.addEventListener('change', onSelectChange);

function createSelectMarkup(breeds) {
    const selectMarkup = breeds
        .map(breed => {
        return `<option value='${breed.id}'>${breed.name}</option>`
    })
        .join(' ');

    selectBreed.innerHTML = selectMarkup;

    selectBreed.style.visibility = 'inherit';
    new SlimSelect({
        select: '#js-select',
    });
};

function createCardMarkup(breed) {
    const markupSelectCat = el => {
        return `<h1>${el.breeds[0].name}</h1>
        <p><strong>Description: </strong>${el.breeds[0].description}</p>
        <p><strong>Temperament: </strong>${el.breeds[0].temperament}</p>
        <img src="${el.url}" alt="${el.breeds[0].name}"></img>`;
    };
    
    catInfoContainer.innerHTML = markupSelectCat(breed[0]);
};

function onSelectChange(e) {
    Notiflix.Loading.circle('Loading data, please wait...');

    catInfoContainer.innerHTML = '';

    const fetchOneCat = fetchCatByBreed(e.target.value);

    fetchOneCat
        .then(breed => {
        createCardMarkup(breed);
        Notiflix.Loading.remove();
        })
        .catch(err => errorMessage(err));

    // loaderEl.classList.remove('is-hidden');
    // errorEl.classList.add('is-hidden');
};

Notiflix.Loading.circle('Loading data, please wait...');

fetchBreeds()
    .then(r => {
    createSelectMarkup(r);
    Notiflix.Loading.remove();
    // loader.classList.add('is-hidden');
    })
    .catch(err => errorMessage(err));


function errorMessage() {
  Notiflix.Loading.remove();
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
  // loader.classList.add('is-hidden');
  // error.classList.remove('is-hidden');
};