import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector(`.pagination`);

  addHandlerClick(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn--inline`);
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  _buttonNextOrPrev(curPage, defaultVal = 1) {
    if (defaultVal === 0) {
      return ` 
      <button data-goto=${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
       </button>`;
    }
    return `<button data-goto=${
      curPage + 1
    }  class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._buttonNextOrPrev(curPage);
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return this._buttonNextOrPrev(curPage, 0);
    }
    //Other page
    if (curPage < numPages) {
      return `
      ${this._buttonNextOrPrev(curPage, 0)}
      ${this._buttonNextOrPrev(curPage)}
    `;
    }
    //Page 1 and there are NO pages
    return ``;
  }
}

export default new PaginationView();
