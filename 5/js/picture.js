import { renderBigPicture } from './render-big-picture';

const renderPictures = (pictures) => {
  const similarListPictures = document.querySelector('.pictures');
  const similarPicturesTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const similarListFragment = document.createDocumentFragment();

  pictures.forEach((pictureData) => {
    const pictureElement = similarPicturesTemplate.cloneNode(true);
    const pictureImage = pictureElement.querySelector('.picture__img');
    //Адрес изображения url подставьте как атрибут src изображения.
    pictureImage.src = pictureData.url;
    //Описание изображения description подставьте в атрибут alt изображения.
    pictureImage.alt = pictureData.description;
    //Количество лайков likes выведите в блок .picture__likes.
    pictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
    //Количество комментариев comments выведите в блок .picture__comments.
    pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;
    pictureElement.addEventListener('click', () => renderBigPicture(pictureData));
    similarListFragment.appendChild(pictureElement);
  });

  similarListPictures.appendChild(similarListFragment);
};

export {renderPictures};
