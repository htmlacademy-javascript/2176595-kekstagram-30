import { renderGallery } from './gallery.js';
import { renderThumbnails } from './thumbnail.js';
import { debounce } from './util.js';

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const defaultButtonElement = filtersFormElement.querySelector('#filter-default');
const randomButtonEleemnt = filtersFormElement.querySelector('#filter-random');
const discussedButtonElement = filtersFormElement.querySelector('#filter-discussed');
const pictureContainerElement = document.querySelector('.pictures');

const MAX_RANDOM_FILTER = 10;

const FiltersEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [FiltersEnum.DEFAULT]: (data) => data,

  [FiltersEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)){
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },

  [FiltersEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};

const repaint = (event, filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderThumbnails(filteredData, pictureContainerElement);
  const currentActiveElement = filtersFormElement.querySelector('.img-filters__button--active');
  currentActiveElement.classList.remove('img-filters__button--active');
  event.target.classList.add('img-filters__button--active');
};

const debouncedRepaint = debounce(repaint);


const initFilters = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  defaultButtonElement.addEventListener('click', (event) => {
    debouncedRepaint(event, FiltersEnum.DEFAULT, data);
  });
  randomButtonEleemnt.addEventListener('click', (event) => {
    debouncedRepaint(event, FiltersEnum.RANDOM, data);
  });
  discussedButtonElement.addEventListener('click', (event) => {
    debouncedRepaint(event, FiltersEnum.DISCUSSED, data);
  });
};

export { initFilters };
