// import { openUserModal, closeUserModal } from './user-modal.js';
import { resetScale, resetEffects } from './scale-effect.js';
import { isEnterKey, isEscapeKey, showAlert } from './util.js';
import { sendData } from './api.js';

const MAX_AMOUNT_TEXT = 140;
const MAX_HASHTAG_COUNT = 5;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'heic'];
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const orderForm = document.querySelector('.img-upload__form');
const btnFormSend = document.querySelector('#upload-submit');
const textArea = document.querySelector('.text__description');
const maxTextCount = document.querySelector('.text-max');
const hashtegArea = document.querySelector('.text__hashtags');
const fileField = document.querySelector('#upload-file');
const btnFormLoad = document.querySelector('.img-upload__label');
const formCreateImage = document.querySelector('.img-upload__overlay');
const documentBody = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const picturePreview = document.querySelector('.img-upload__preview img');
const fileChooser = document.querySelector('.img-upload__input');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const successElement = successTemplate.cloneNode(true);
const errorElement = errorTemplate.cloneNode(true);

const pristine = new Pristine(orderForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const onCancelButtonClick = () => {
  closeUserModal();
};
const onFileInputChange = () => {
  openUserModal();
};
const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

const uploadImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    picturePreview.src = URL.createObjectURL(file);
  }

};
pristine.addValidator(
  hashtegArea,
  validateTags,
  'Неправильно заполнены хэштеги'
);

orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

textArea.addEventListener('input', () => {
  if (textArea.value.length >= MAX_AMOUNT_TEXT) {
    maxTextCount.classList.remove('hidden');
  } else {
    maxTextCount.classList.add('hidden');
  }
});

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const onFocusBlurEscKeydown = () => {
  textArea.addEventListener('focus', () => {
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  textArea.addEventListener('blur', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
  });
  hashtegArea.addEventListener('focus', () => {
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  hashtegArea.addEventListener('blur', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
  });
};

function openUserModal(evt) {
  formCreateImage.classList.remove('hidden');
  documentBody.classList.add('modal-open');
  maxTextCount.classList.add('hidden');
  btnFormSend.disabled = false;
  onFocusBlurEscKeydown();
  uploadImage(evt);
  document.addEventListener('keydown', onPopupEscKeydown, { once: true });
}

function closeUserModal() {
  formCreateImage.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  resetScale();
  resetEffects();
  document.addEventListener('keydown', onPopupEscKeydown, { once: true });
}

btnFormLoad.addEventListener('click', () => {
  openUserModal();
});
btnFormLoad.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openUserModal();
  }
});
cancelButton.addEventListener('click', () => {
  closeUserModal();
});
cancelButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});

const deleteComment = () => {
  textArea.value = '';
};
const deleteHashtag = () => {
  hashtegArea.value = '';
};

const blockSubmitButton = () => {
  btnFormSend.disabled = true;
  btnFormSend.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  btnFormSend.disabled = false;
  btnFormSend.textContent = 'Сохранить';
};

const clearUploadInput = () => {
  fileChooser.value = '';
};

const closeErrorModal = () => {
  errorElement.remove();
};
const closeSuccessModal = () => {
  successElement.remove();
};

const clickOnEscSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    closeSuccessModal();
  }
};
const clickOnEscError = (evt) => {
  if (isEscapeKey(evt)) {
    closeErrorModal();
  }
};

const showSuccessAlert = () => {
  document.body.append(successElement);

  document.addEventListener('keydown', clickOnEscSuccess, { once: true });
};
const showErrorAlert = () => {
  document.body.append(errorElement);

  document.addEventListener('keydown', clickOnEscError, { once: true });
};

successElement.addEventListener('click', () => {
  closeSuccessModal();
});

errorElement.addEventListener('click', () => {
  closeErrorModal();
});

const setUserFormSubmit = (onSuccess) => {
  orderForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccessAlert();
          deleteComment();
          deleteHashtag();
          clearUploadInput();
          resetEffects();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
          showErrorAlert();
        },
        new FormData(evt.target),
      );
    }
  });
};

export { setUserFormSubmit, closeUserModal };
