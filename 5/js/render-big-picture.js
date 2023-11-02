import { isEscapeKey } from './util';

const renderBigPicture = (picture) => {
  const bigPicture = document.querySelector('.big-picture');
  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  const comments = bigPicture.querySelector('.big-picture__social');
  const similarCommentsTemplate = document.querySelector('#comments');
  const commentsList = document.querySelector('.social-comments');
  const addComments = commentsList.querySelector('.social__comments-loader')
    .content
    .querySelector('.social__comment');
  const commentCount = comments.querySelector('.social-comment_count');
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  addComments.classList.add('hidden');
  const similarListFragment = document.createDocumentFragment();
  //После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
  const body = document.querySelector('body');
  body.classList.add('modal-open');


  //Я запуталась!!!)))))))))
  // Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
  document.getElementById('.big-picture__image').src = pictureData.url;
  //Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
  comments.querySelector('.likes-count').textContent = pictureData.likes;
  //Описание фотографии description вставьте строкой в блок .social__caption.
  comments.querySelector('.social__caption').textContent = pictureData.description;

  picture.forEach((pictureData) => {
  //Подставляем комментарии
    const commentElement = similarCommentsTemplate.cloneNode(true);
    const pictureComment = commentElement.querySelector('.social__img');
    pictureComment.src = pictureData.avatar;
    pictureComment.alt = pictureData.name;
    commentElement.querySelector('.social__text').textContent = pictureData.comments;
    similarListFragment.appendChild(commentElement);
  });

  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
};


export {renderBigPicture};
