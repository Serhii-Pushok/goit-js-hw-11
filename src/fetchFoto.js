import Notiflix from 'notiflix';
import axios from 'axios';

const axios = require('axios').default;

export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
    }

    async fetchPhoto() {
        try {
            const response = await axios.get(`https://pixabay.com/api/?key=31594853-2af2c4fff94d4bdce2676b077&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`);

            const { hits, totalHits } = response.data;
            
            if (hits.length === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }

            if (this.page >= (totalHits / this.perPage)) {
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                loadMoreBtn.classList.add('is-hidden')
            } else {
                Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            }
            
            this.page += 1;
                
            return { hits, totalHits };

        } catch (error) {
            console.log(error);
        }
    }
        
resetPage() {
        this.page = 1;
    }
}