const SCALE_RANGE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const PICTURE_FILTERS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const btnSmaller = document.querySelector('.scale__control--smaller');
const btnBigger = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLavel = document.querySelector('.effect-level__value');

const defaultScale = 100;

const scaleImage = (value = defaultScale) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onBtnSmallerClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - SCALE_RANGE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBtnBiggerClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_RANGE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => {
  scaleImage();
};

btnSmaller.addEventListener('click', onBtnSmallerClick);
btnBigger.addEventListener('click', onBtnBiggerClick);

const DEFAULT_EFFECT = PICTURE_FILTERS[0];
let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    sliderElement.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = PICTURE_FILTERS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};
const onSliderUpdate = () => {
  image.style.filter = 'none';
  image.className = '';
  effectLavel.value = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  image.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  image.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLavel.value = sliderValue;
};
const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};
noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
updateSlider();

form.addEventListener('change', onFormChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetScale, resetEffects };
