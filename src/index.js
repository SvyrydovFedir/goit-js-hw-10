import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import '/node_modules/slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(breeds => {
    refs.loader.style.display = 'none';
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      refs.breedSelect.appendChild(option);
    });
    new SlimSelect({
      select: refs.breedSelect,
    });
    refs.breedSelect.addEventListener('change', handleBreedSelect);
  })
  .catch(() => {
    refs.loader.style.display = 'none';
  });

function handleBreedSelect() {
  const selectedBreedId = refs.breedSelect.value;
  refs.loader.style.display = 'block';
  refs.catInfo.style.display = 'none';
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      refs.loader.style.display = 'none';
      refs.catInfo.style.display = 'block';
      createMarkup(catData);
    })
    .catch(error => {
      console.log(error.message);
      refs.loader.style.display = 'none';
      Notiflix.Notify.failure(refs.error.textContent);
    });
}

function createMarkup(catData) {
  const { url, breeds } = catData[0];

  const htmlString = `
      <img src="${url}" width="700px" alt="${breeds[0].name}" class="catImage">
      <h1 class="breedName">${breeds[0].name}</h1>
      <p class="description">${breeds[0].description}</p>
      <p class="temperament">Temperament: ${breeds[0].temperament}</p>
    `;

  refs.catInfo.innerHTML = htmlString;
  refs.catInfo.classList.remove('is-hidden');
}
