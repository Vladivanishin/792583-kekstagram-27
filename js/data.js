// import {
//   getRandomPositiveInteger,
//   getRandomArrayElement,
//   createRandomIdFromRangeGenerator
// } from './util.js';

// const MESSAGES = ['Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
//   'Только дай знать...где ты находишься.',
//   'Это ты когда? Щас ты дома уже?',
//   'Как тебе удается делать такие фотокарточки?',
//   'Ого!'
// ];
// const NAMES = [
//   'Александр',
//   'Виктория',
//   'Владимир',
//   'Анастасия',
//   'Игорь',
//   'Женя',
//   'Сергей',
//   'Светлана',
//   'Владислав',
// ];
// const DESCRIPTIONS = [
//   'Просто фото',
//   'Тестирую новый iPhone 14 Pro Max',
//   'Хотели бы оказаться на моем месте?:D',
//   'Ловите очередной шедевр',
//   'А ты смог бы снять лучше?',
//   'Надо повторить',
//   'Вот так вот.',
//   'Это вчера. Щас я дома уже!',
//   'Круто да?',
// ];
// const COUNT_OBJECTS = 25;
// const COUNT_MIN_INTEGER = 1;
// const COUNT_MAX_INTEGER = 6;
// const MIN_LIKES = 15;
// const MAX_LIKES = 200;
// const generadeCommentId = createRandomIdFromRangeGenerator(COUNT_MIN_INTEGER, 1000);

// const createComments = () => ({
//   id: generadeCommentId(),
//   avatar: `img/avatar-${getRandomPositiveInteger(COUNT_MIN_INTEGER, COUNT_MAX_INTEGER)}.svg`,
//   message: getRandomArrayElement(MESSAGES),
//   name: getRandomArrayElement(NAMES),
// });

// const getArrayComments = Array.from({ length: getRandomPositiveInteger(COUNT_MIN_INTEGER, COUNT_MAX_INTEGER) }, createComments);

// const getRandomObject = (elem, number) => ({
//   id: number + 1,
//   url: `photos/${number + 1}.jpg`,
//   description: getRandomArrayElement(DESCRIPTIONS),
//   likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
//   comments: Array.from({ length: getRandomPositiveInteger(COUNT_MIN_INTEGER, COUNT_MAX_INTEGER) }, createComments),
// });

// const getArrayPictures = Array.from({ length: COUNT_OBJECTS }, getRandomObject);

// export {
//   getArrayPictures,
//   COUNT_OBJECTS,
//   getRandomPositiveInteger,
//   getArrayComments,
// };
