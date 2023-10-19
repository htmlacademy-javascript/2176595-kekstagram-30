const profileNumber = 25;
const LikesCount = {
  MIN_LENGTH: 15,
  MAX_LENGTH: 200,
};
const CommentsCounts = {
  MIN_COMMENTS: 0,
  MAX_COMMENTS: 30,
};

const AvatarNumbers = {
  MIN_AVATARS: 1,
  MAX_AVATARS: 2,
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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const idComment = createIdGenerator();

const generateComment = () => ({
  id: idComment(),
  avatar: `img/avatar-${getRandomInteger(AvatarNumbers.MIN_AVATARS,AvatarNumbers.MAX_AVATARS)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createProfile = () => {
  const photos = [];
  for(let i = 1; i <= profileNumber; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      likes: getRandomInteger(LikesCount.MIN_LENGTH,LikesCount.MAX_LENGTH),
      comments: Array.from({length:getRandomInteger(CommentsCounts.MIN_COMMENTS, CommentsCounts.MAX_COMMENTS)}, generateComment),
      description: getRandomArrayElement(DESCRIPTIONS),
    });
  }
  return photos;
};

console.log(createProfile());
