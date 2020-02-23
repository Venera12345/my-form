var NAME_REGEX = /ё+/i;
var inputName = document.querySelector('.input-name');
var inputNumber = document.querySelector('.input-number');
var inputFile = document.querySelector('.input-file');
var btnSubmit = document.querySelector('.btn-submit');
var btnBack = document.querySelector('.btn-back');
var labelFile = document.querySelector('.label-file span');
var form = document.querySelector('.form');
var screenSuccess = document.querySelector('.wrapper-success');
var screenForm = document.querySelector('.wrapper-form');
var listRect = document.querySelector('.list-attempts');
var textNumber = document.querySelector('.number-attempt');
var btnSubmitActiv = btnSubmit.querySelector('svg rect');
var fragment = document.createDocumentFragment();
var current = 0;
var nameWrightIn = false;
var numberWrightIn = false;
var fileWrightIn = false;
var inputError = false;
function validateInputName() {
  var name = inputName.value.trim();
  return NAME_REGEX.test(name);
}
function validateInputNumber() {
  return (+inputNumber.value <= 8 && +inputNumber.value >= 1) ? true : false;
}
function validateInputFile() {
  return inputFile.files.length > 0 && [].every.call(inputFile.files, function (item) {
    return item.name && item.name.toLowerCase().endsWith('.jpg');
  })
}
function reportForError(input) {
  input.parentElement.classList.add('error-input');
  inputError = true;
  btnSubmit.classList.remove('active');
  btnSubmit.setAttribute('disabled', 'disabled');
  return false;
}
function cleanInput() {
  form.reset();
  btnSubmit.classList.remove('active');
  btnSubmit.setAttribute('disabled', 'disabled');
  labelFile.style.color = '#777';
  labelFile.textContent = 'Плеисхолдер - загрузка файла';
}
function setScreen(firstScreen, secondScreen) {
  screenSuccess.style.display = firstScreen;
  screenForm.style.display = secondScreen;
}
function activateBtn() {
  if (nameWrightIn && numberWrightIn && fileWrightIn && !inputError) {
    btnSubmit.classList.add('active');
    btnSubmit.removeAttribute('disabled');

  }
}
function createRectCurrent() {
  var element = document.createElement('li');
  element.classList.add('rect-current');
  fragment.appendChild(element);
  listRect.appendChild(fragment);
}
function removeMessegError(functionValidation, elementClassError) {
  if (functionValidation && elementClassError.parentElement.classList.contains('error-input')) {
    elementClassError.parentElement.classList.remove('error-input');
    inputError = false;
  }

}
inputName.addEventListener('change', function () {
  removeMessegError(validateInputName(), inputName);
  if (inputName.value.length > 0) {
    nameWrightIn = true;
    activateBtn();
  }
})
inputNumber.addEventListener('change', function () {
  removeMessegError(validateInputNumber(), inputNumber);
  if (inputNumber.value.length > 0) {
    numberWrightIn = true;
    activateBtn();
  }
})
inputFile.addEventListener('change', function () {
  var newText = inputFile.files[0].name.length < 24 ? inputFile.files[0].name : '...' + inputFile.files[0].name.slice(-24);
  labelFile.textContent = newText;
  labelFile.style.color = '#242D35';
  removeMessegError(validateInputFile(), inputFile.parentElement);
  if (inputFile.files.length > 0) {
    fileWrightIn = true;
    activateBtn();
  }

})
btnSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();
  var isValidForm = true;
  if (!validateInputName()) {
    isValidForm = reportForError(inputName);
  }
  if (!validateInputNumber()) {
    isValidForm = reportForError(inputNumber);
  }
  if (!validateInputFile()) {
    isValidForm = reportForError(inputFile.parentElement);
  }
  if (isValidForm) {
    current++;
    cleanInput();
    setScreen('flex', 'none');
    textNumber.textContent = current;
    createRectCurrent();
  }
});
btnBack.addEventListener('click', function () {
  setScreen('none', 'block');
});
