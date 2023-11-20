//import { createProfile } from './data.js';
import { renderGallery } from './gallery.js';
import { initUploadPhoto } from './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';
import { initFilters } from './filters.js';

const bootstrap = async() => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initFilters();
  } catch(error){
    showErrorMessage();
  }
};

bootstrap();
initUploadPhoto();
