import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class bookmarksView extends View {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = `No recipe saved in bookmark`;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener(`load`, function (e) {
      e.preventDefault();
      handler();
    });
  }

  _generateMarkup() {
    if (!this._data) return;
    return this._data
      .map(bookmark => {
        return previewView.render(bookmark, false);
      })
      .join(``);
  }
}

export default new bookmarksView();
