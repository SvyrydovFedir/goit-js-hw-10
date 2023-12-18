import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY =
  'live_Tp6XYoC4mqNDkvmp8Zb7UiHtvlwAzxaP8LD3GuqpfpSJ7A9NUeCtAafaYf6EyOfy';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios
    .get(BASE_URL)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
