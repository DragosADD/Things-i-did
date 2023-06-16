import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeVIew extends View {
  _parentElement = document.querySelector(`.upload`);
  _message = `Recipe was succesfully uploaded`;

  _window = document.querySelector(`.add-recipe-window`);
  _overlay = document.querySelector(`.overlay`);
  _btnOpen = document.querySelector(`.nav__btn--add-recipe`);
  _btnClose = document.querySelector(`.btn--close-modal`);

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle(`hidden`);
    this._window.classList.toggle(`hidden`);
    //made because in the handler function the this pointed to the button and
    //it is the only way i can think off to use bind
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(`click`, this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener(`click`, this.toggleWindow.bind(this));
    this._overlay.addEventListener(`click`, this.toggleWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      // this is browser api and that can be used on form elements and it will return an
      //object that does not make sense but if you destructure it, all the values will be there as arrays
      //the values will be 0 as the description and 1 as the value that will be typed
      const data = Object.fromEntries(dataArr); //bascially oposite of Array.prototype.entries()
      //from entries takes an array with multiple arrays, 0 is the key and 1 is the data and converts it
      //into an object
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeVIew();
