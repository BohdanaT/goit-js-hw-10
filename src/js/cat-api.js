import axios from 'axios';

const API_KEY = 'live_QkebcY9z04uyzUfMm57sZHy9EIOozR1LDzHouCTE8QgY3YKpQSHY3G4stNxNPEP7';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds';
    
    return axios.get(url).then(r => r.data);
};

function fetchCatByBreed(breedId) {
    const url = 'https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}';

    return axios.get(url).then(r => r.data);
};

