import { isEscapeKey } from './util.js';
import { renderComments } from './comment.js';
import { initCommentList } from './comment.js';

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButton = bigPictureElement.querySelector('.big-picture__cancel');


const hidePicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.addEventListener('keydown, onDocumentKeydown');
};

const onClosePictureButtonClick = () => {
  hidePicture();
};

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    hidePicture();
  }
}

const renderPicture = ({ url, description, likes, comments }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showPicture = (pictureData) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  renderComments(pictureData.comments);
  renderPicture(pictureData);
  initCommentList();
};

closePictureButton.addEventListener('click', onClosePictureButtonClick);

export { showPicture };

// import { isEscapeKey } from './util';

// const renderBigPicture = (picture) => {
//   const comments = bigPicture.querySelector('.big-picture__social');
//
//   const commentsList = document.querySelector('.social-comments');
//   const addComments = commentsList.querySelector('.social__comments-loader')
//     .content
//     .querySelector('.social__comment');
//   const commentCount = comments.querySelector('.social-comment_count');

//   commentCount.classList.add('hidden');
//   addComments.classList.add('hidden');

//   //После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.


//   const similarListFragment = document.createDocumentFragment();
//   //Я запуталась!!!)))))))))
//   // Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
//
//   //Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
//   comments.querySelector('.likes-count').textContent = pictureData.likes;
//   //Описание фотографии description вставьте строкой в блок .social__caption.


//

//   closeButton.addEventListener('click', () => {
//
//   });

//   document.addEventListener('keydown', (evt) => {
//     if(isEscapeKey(evt)) {
//       evt.preventDefault();
//       bigPicture.classList.add('hidden');
//       body.classList.remove('modal-open');
//     }
//   });
// };


// export {renderBigPicture};
