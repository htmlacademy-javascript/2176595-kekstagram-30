import { createProfile } from './data.js';
import { renderGallery } from './gallery.js';
import { initUploadPhoto } from './form.js';

renderGallery(createProfile());
initUploadPhoto();
