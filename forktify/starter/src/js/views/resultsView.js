import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultsVIew extends View {
  _parentElement = document.querySelector(`.results`);
  _errorMessage = `No recipes found for your query! Please try again ;)`;
  _message = '';

  _generateMarkup() {
    if (!this._data) return;
    return this._data
      .map(recipe => {
        return previewView.render(recipe, false);
      })
      .join(``);
  }
}

export default new ResultsVIew();
