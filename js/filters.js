import { renderGallery } from "./gallery.js";

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const defaultButtonElement = filtersFormElement.querySelector('#filter-default');
const randomButtonEleemnt = filtersFormElement.querySelector('#filter-random');
const discussedButtonElement = filtersFormElement.querySelector('#filter-discussed');


const MAX_RANDOM_FILTER = 2;

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
    while (randomIndexList < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)){
        randomIndexList.push(index);
      }
    }
    randomIndexList.map((index) => data[index]);
  },

  [FiltersEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => {
    return item2.comments.length - item1.comments.length
  });
};

const repaint = (event, filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach(item => item.remove());
  renderGallery(filteredData);
  const currentActiveElement = filtersFormElement.querySelector('.img-filters__button--active');
  currentActiveElement.classList.remove('.img-filters__button--active');
  event.target.classList.add('.img-filters__button--active');
};

onDefaultButtonClickHandler = () => {
  const data = filterHandlers[FiltersEnum.DEFAULT](data);
};

onRandomButtonClickHandler = () => {
  const data = filterHandlers[FiltersEnum.RANDOM](data);
};

onDiscussedButtonClickHandler = () => {
  const data = filterHandlers[FiltersEnum.DISCUSSED](data);
};

const initFilters = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  const filtered = [FiltersEnum.DISCUSSED](data);
  defaultButtonElement.addEventListener('click', (event) => {
    repaint(event, FiltersEnum.DEFAULT, data);
  });
  randomButtonEleemnt.addEventListener('click', (event) => {
    repaint(event, FiltersEnum.RANDOM, data);
  });
  discussedButtonElement.addEventListener('click', (event) => {
    repaint(event, FiltersEnum.DISCUSSED, data);
  });
};

export { initFilters };
