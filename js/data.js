import {getRandomInteger, getRandomArrayElement} from './util.js';

const PROFILE_NUMBER = 25;
const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const CommentsCount = {
  MIN: 0,
  MAX: 30,
};

const AvatarsNumber = {
  MIN: 1,
  MAX: 2,
};

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Дарина',
  'Ваня',
  'Максим',
  'Ирина',
  'Арина',
  'Владислав',
  'Вероника',
  'Дарья',
  'Геннадий',
  'Петр',
  'Персимон',
  'Леонид',
  'Амелия',
];

const DESCRIPTIONS = [
  'Какой чудесный день ляля',
  'Жизнь прекрасна',
  'Куда сегодня сходить?',
  'йоу',
  'Жду подружек',
  'Не хватает только тебя',
  'Очередное путешестие',
  'Пархай как бабочка, жаль как пчела',
  'Смотрю вдаль',
  'Сижу дома',
  'Просто фотка',
  'Сейчас бы на море',
  'Просо фотография на память',
  'Здесь могло было быт быть ваше описание',
];

const createMessage = () => Array.from(
  {length: getRandomInteger(1,2)},
  () => getRandomArrayElement(COMMENTS),
).join(' ');

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getIdComment = createIdGenerator();

const generateComment = () => ({
  id: getIdComment(),
  avatar: `img/avatar-${getRandomInteger(AvatarsNumber.MIN,AvatarsNumber.MAX)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createProfile = () => {
  const photos = [];
  for(let i = 1; i <= PROFILE_NUMBER; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      likes: getRandomInteger(LikesCount.MIN,LikesCount.MAX),
      comments: Array.from({length:getRandomInteger(CommentsCount.MIN, CommentsCount.MAX)}, generateComment),
      description: getRandomArrayElement(DESCRIPTIONS),
    });
  }
  return photos;
};

export {createMessage, createIdGenerator, getIdComment, generateComment, createProfile};
