import { createProfile } from './data.js';

const similarListPictures = document.querySelector('.pictures');
const similarPicturesTemplate = document.querySelector('#picture').content;

const similarPictures = createProfile ();

similarPictures.forEach((pictureData) => {
  const pictureElement = similarPicturesTemplate.cloneNode(true);
  //Адрес изображения url подставьте как атрибут src изображения.
  pictureElement.querySelector('.picture__img').src = pictureData.url;
  //Описание изображения description подставьте в атрибут alt изображения.
  pictureElement.querySelector('.picture__img').alt = pictureData.description;
  //Количество лайков likes выведите в блок .picture__likes.
  pictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
  //Количество комментариев comments выведите в блок .picture__comments.
  pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;
  similarListPictures.appendChild(pictureElement);
});

export { similarPictures };
