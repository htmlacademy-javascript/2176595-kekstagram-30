import { normalizePath } from 'vite';
import { isEscapeKey } from './util.js';

const VALID_SYMBOLS = /^#[a-zа-я0-9]{1,19}$/i;
const MAX_HASHTAG_NUMBER = 25;
const ErrorMessage = {
  INVALID_COUNT_TAGS: `Максимум ${MAX_HASHTAG_NUMBER} хэштегов`,
  NOT_UNIQUE_TAGS: 'Хэш-теги повторяются',
  INVALID_TAGS: 'Неправильный хэш-тег',
};

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeUploadImageButton = uploadFormElement.querySelector('.img-upload__cancel');
const inputElement = uploadFormElement.querySelector('.img-upload__input');
const hashtagFieldElement = uploadFormElement.querySelector('.text__hashtags');
const commentFieldElement = uploadFormElement.querySelector('.text__descriptions');

const pristine = new Pristine(uploadFormElement, {
  classTo: '.img-upload__field-wrapper',
  errorTextParent: '.img-upload__field-wrapper',
  errorTextClass:'.img-upload__field-wrapper--error',
});

const openPictureForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePictureForm = () => {
  uploadFormElement.reset();
  pristine.reset();
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onFileInputChange = () => {
  openPictureForm();
};

const onCloseUploadImageButtonClick = () => {
  closePictureForm();
};

const isTextFieldFocus = () =>
  document.activeElement === hashtagFieldElement ||
  document.activeElement === commentFieldElement;

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt) && !isTextFieldFocus()) {
    evt.preventDefault();
    closePictureForm();
  }
}

//Приводим теги к нормальному виду
const normalizeTags = (tagString) => tagString
  .trim() //Обрезание пустых краев
  .split(' ') //Разделить пробелом, получаем массив тегов
  .filter((tag) => Boolean(tag.length)); //Выводим, если не пустой

//Задаем валидные хэштеги
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

//Максимальное число хэштегов
const hasValidNumber = (value) => normalizeTags(value).length <= MAX_HASHTAG_NUMBER;

//проверяем уникальность хэштега
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase()); //теги к одному регистру
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

//Валидаторы
pristine.addValidator(
  inputElement,
  hasValidNumber,
  ErrorMessage.INVALID_COUNT_TAGS,
  3,
  true
);

pristine.addValidator(
  inputElement,
  hasValidTags,
  ErrorMessage.INVALID_TAGS,
  1,
  true
);

pristine.addValidator(
  inputElement,
  hasUniqueTags,
  ErrorMessage.NOT_UNIQUE_TAGS,
  1,
  true
);

const initUploadPhoto = () => {
  inputElement.addEventListener('change', onFileInputChange);
  closeUploadImageButton.addEventListener('click', onCloseUploadImageButtonClick);
  uploadFormElement.addEventListener('click', onFormSubmit);
};

export {initUploadPhoto};

