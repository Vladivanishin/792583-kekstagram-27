import { renderPictures } from './picture.js';
import { setUserFormSubmit, closeUserModal } from './form.js';
import { getData } from './api.js';

const SIMILAR_PICTURE_COUNT = 25;

getData((picture) => {
  renderPictures(picture.slice(0, SIMILAR_PICTURE_COUNT));
});
setUserFormSubmit(closeUserModal);
