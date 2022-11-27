import PhotoApiService from './fetchFoto';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryInfoContainer = document.querySelector('.gallery');

const photoApiService = new PhotoApiService;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

loadMoreBtn.classList.add('is-hidden');

function onSearch(event) {
    event.preventDefault();

    galleryInfoContainer.innerHTML = '';
    photoApiService.searchQuery = event.currentTarget.elements.searchQuery.value;
    photoApiService.resetPage();
    photoApiService.fetchPhoto().then(showSearchMarkup).catch(error => error.massage);
    loadMoreBtn.classList.remove('is-hidden');
    
};

function onLoadMoreBtnClick() {
    photoApiService.fetchPhoto().then(showSearchMarkup).catch(error => error.massage);
}

function showSearchMarkup({ hits }) {
        const markup = hits
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<div class="photo-card">
                        <div class="photo-card__container">
                            <a href="${largeImageURL}">
                                <img src="${webformatURL}" alt="${tags}" width="400" height="200" loading="lazy"/>
                            </a>
                        </div>
                        <div class="info">
                            <p class="info-item">
                            <b class="info-item--bold">Likes</b><i class="info-item--italic">${likes}</i>
                            </p>
                            <p class="info-item">
                            <b class="info-item--bold">Views</b><i class="info-item--italic">${views}</i>
                            </p>
                            <p class="info-item">
                            <b class="info-item--bold">Comments</b><i class="info-item--italic">${comments}</i>
                            </p>
                            <p class="info-item">
                            <b class="info-item--bold">Downloads</b><i class="info-item--italic">${downloads}</i>
                            </p>
                        </div>
                    </div>`
        })
        .join('')

    galleryInfoContainer.insertAdjacentHTML('beforeend', markup);
    
    let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250
    });
    lightbox.refresh();

    return lightbox;
}


