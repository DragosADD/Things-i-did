import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector(`.pagination`);

  addHandlerClick(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      e.preventDefault();
      const btn = e.target.closest(`.btn--inline`);
      if (!btn) return;
      const pages = [...document.querySelectorAll(`.btn--inline`)];

      pages.forEach(el => {
        if (el.classList.contains(`active`)) el.classList.remove(`active`);
      });
      if (btn.id === `first`) btn.nextElementSibling.classList.add(`active`);

      if (btn.id === `last`)
        btn.previousElementSibling.classList.add(`.active`);

      btn.classList.add(`active`);

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
  _displayPaginationNum(pages) {
    const result = [];
    for (let i = 0; i < pages; i++) {
      result.push(
        `<a class = "btn--inline" data-goto=${i + 1} href="#">${i + 1}</a>`
      );
    }
    return result;
  }

  _buttonNextOrPrev(curPage, defaultVal = 1) {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // if (defaultVal === 0) {
    //   return `
    //   <button data-goto=${
    //     curPage - 1
    //   } class="btn--inline pagination__btn--prev">
    //     <svg class="search__icon">
    //         <use href="${icons}#icon-arrow-left"></use>
    //     </svg>
    //     <span>Page ${curPage - 1}</span>
    //    </button>`;
    // }
    return `<div class="pagination1">
            <a class = "btn--inline" data-goto=${1} id='first' href="#">&laquo;</a>
            ${this._displayPaginationNum(numberOfPages).join(``)}
            <a class = btn--inline data-goto=${numberOfPages} id = 'last' href="#">&raquo;</a>
        </div>`;

    //   return `<button data-goto=${
    //     curPage + 1
    //   }  class="btn--inline pagination__btn--next">
    //   <span>Page ${curPage + 1}</span>
    //   <svg class="search__icon">
    //     <use href="${icons}#icon-arrow-right"></use>
    //   </svg>
    // </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // //Page 1 and there are other pages
    if ((curPage === 1 && numPages > 1) || curPage <= numPages) {
      return this._buttonNextOrPrev(curPage);
    }

    // //last page
    // if (curPage === numPages && numPages > 1) {
    //   return this._buttonNextOrPrev(curPage, 0);
    // }
    // //Other page
    // if (curPage < numPages) {
    //   return `
    //   ${this._buttonNextOrPrev(curPage, 0)}
    //   ${this._buttonNextOrPrev(curPage)}
    // `;
    // }
    //Page 1 and there are NO pages
    return ``;
  }
}

export default new PaginationView();
