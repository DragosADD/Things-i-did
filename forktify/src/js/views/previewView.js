import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = ``;

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? `preview__link--active` : ``
        }" href="#${this._data.id}">
            <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.publisher}</p>
               <div class="preview__user-generated ${
                 this._data.key ? `` : `hidden`
               }">
                  <svg>
                  <use href="${icons}#icon-user"></use>
                  </svg>
                  </div>
              </div>
             </a>
          </li>
    `;
  }
}

export default new PreviewView();
//To remember to search.
//originally this markup was part of bookmarks and results but in order to avoid repetition the preview View was made and what was similar has been put here exectept the original markup obviously
//the problem is that my small brain doesnt understand why this fuck really wanted to to have the data here.
//mmy solution:
//put parameter recipe and use instead of this._data recipe, obviously. In bookmarks avoid using render method and write only previeView._generateMarkup(bookmark). This returns a array with every
//bookmark and joins it letter to create a string and it works.
//How it is done now as I might forget: The bulean was given because the markup is generated through the render function and in order for the full bookmark
//to be rendered, the clear function needs to be avoided until the full markup is fully generated. Doing it this way the data is set in preview so the this._data can be used(for some reason)
//
