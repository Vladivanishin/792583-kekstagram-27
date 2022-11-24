// // import { picturesContainer } from "./picture";

// const SHOW_COMMENTS = 5;

// const bigPicture = document.querySelector('.big-picture');
// const commentsToShowCount = bigPicture.querySelector('.social__comment-count');
// const commentsAllCount = document.querySelector('.comments-count');
// const commentList = document.querySelector('.social__comments');
// const commentsLoader = document.querySelector('.comments-loader');
// const body = document.querySelector('body');
// const cancelButton = document.querySelector('.big-picture__cancel');
// const maxTextCount = document.querySelector('.text-max');
// const buttonLoadComments = document.querySelector('.comments-loader');

// maxTextCount.classList.add('hidden');

// const createComment = ({ avatar, name, message }) => {
//   const comment = document.createElement('li');
//   comment.innerHTML =
//     '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
//   comment.classList.add('social__comment');

//   comment.querySelector('.social__picture').src = avatar;
//   comment.querySelector('.social__picture').alt = name;
//   comment.querySelector('.social__text').textContent = message;

//   return comment;
// };
// let count = 0;


// const renderComment = (comments) => {
//   commentList.innerHTML = '';
//   const commentToShow = comments.slice(0, count + SHOW_COMMENTS);
//   const fragment = document.createDocumentFragment();
//   comments.forEach((comment) => {
//     const commentElement = createComment(comment);
//     fragment.append(commentElement);
//   });
//   commentList.append(fragment);
//   buttonLoadComments.classList.toggle('hidden', comments.length === commentToShow.length);
//   commentsToShowCount.innerHTML = `${commentToShow.length} из <span class="comments-count">${comments.length}</span> комментариев`;
// };
// function commentsLoaderOnClick() {
//   // изменяем значение count прибавляя 5, следовательно slice станет (5, 10), отрисуется еще 5 штук
//   count += SHOW_COMMENTS;
//   renderComment();
//   // for (const comment of commentList.childNodes) {
//   //   if (count % 5 === 0) {
//   //     break;
//   //   } else if (comment.classList.contains('hidden')) {
//   //     comment.classList.remove('hidden');
//   //     count++;
//   //   }
//   // }
//   // commentsToShowCount.textContent = +commentsToShowCount.textContent + count;

//   // if (commentsToShowCount.textContent === commentsAllCount.textContent) {
//   //   buttonLoadComments.removeEventListener('click', commentsLoaderOnClick);
//   //   buttonLoadComments.replaceWith(buttonLoadComments.disabled);
//   // }
// }
// const hideBigPicture = () => {
//   bigPicture.classList.add('hidden');
//   body.classList.remove('modal-open');
//   document.removeEventListener('keydown', onEscKeyDown);
//   count = 0;
// };

// function onEscKeyDown(evt) {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     hideBigPicture();
//   }
// }

// const onCanselButtonClick = () => {
//   hideBigPicture();
// };

// const renderPictureDetails = ({ url, likes, description }) => {
//   bigPicture.querySelector('.big-picture__img img').src = url;
//   bigPicture.querySelector('.big-picture__img img').alt = description;
//   bigPicture.querySelector('.likes-count').textContent = likes;
//   bigPicture.querySelector('.social__caption').textContent = description;
// };

// const showBigPicture = (data) => {
//   bigPicture.classList.remove('hidden');
//   body.classList.add('modal-open');
//   document.addEventListener('keydown', onEscKeyDown);

//   renderPictureDetails(data);
//   renderComment(data.comments);
//   commentsAllCount.textContent = data.comments.length;
// };

// commentsLoader.addEventListener('click', commentsLoaderOnClick);
// cancelButton.addEventListener('click', onCanselButtonClick);

// export { showBigPicture };





import { isEscapeKey } from './util.js';


const MAX_COMMENTS_TO_SHOW = 5;

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsToShowCount = bigPicture.querySelector('.social__comment-count');
const body = document.querySelector('body');
let count = 0;

const createCommentItem = (comment) => {
  const newCommentItem = document.createElement('li');
  newCommentItem.classList.add('social__comment');
  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = 35;
  commentImage.height = 35;
  newCommentItem.append(commentImage);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  newCommentItem.append(commentText);
  return newCommentItem;
};

const showBigPicture = (picture) => {

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  const onPopupCloseButtonClick = () => {
    closeBigPicture();
  };

  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    closeButton.removeEventListener('click', onPopupCloseButtonClick);
    commentsLoader.removeEventListener('click', commentsLoaderOnClick);
    count = 0;
  }

  function commentsLoaderOnClick() {
    // изменяем значение count прибавляя 5, следовательно slice станет (5, 10), отрисуется еще 5 штук
    count += MAX_COMMENTS_TO_SHOW;
    renderCommentsSlice();
  }

  function renderCommentsSlice() {
    commentsContainer.innerHTML = '';
    const commentsFragment = document.createDocumentFragment();
    // создаем срез комментов, будет показываться 5 штук, при клике count перезапишется
    const commentsToShow = picture.comments.slice(0, count + MAX_COMMENTS_TO_SHOW);
    commentsToShow.forEach((comment) => {
      commentsFragment.append(createCommentItem(comment));
    });
    commentsContainer.append(commentsFragment);
    commentsLoader.classList.toggle('hidden', picture.comments.length === commentsToShow.length);
    commentsToShowCount.innerHTML = `${commentsToShow.length} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
  }

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  renderCommentsSlice();
  commentsLoader.addEventListener('click', commentsLoaderOnClick);

  closeButton.addEventListener('click', onPopupCloseButtonClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export { showBigPicture };
