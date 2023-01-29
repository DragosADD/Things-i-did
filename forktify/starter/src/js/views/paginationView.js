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
      if (btn.id === `first`)
        btn.nextElementSibling.nextElementSibling.classList.add(`active`);
      else if (btn.id === `last`)
        btn.previousElementSibling.previousElementSibling.classList.add(
          `active`
        );
      else btn.classList.add(`active`);

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  _displayPaginationNum(pages) {
    const result = [];
    let done = true;
    if (pages < 5) {
      for (let i = 0; i < pages; i++) {
        this._tempFunction(result);
      }
    } else {
      for (let i = 0; i < pages; i++) {
        if (i > 2 && i < pages - 2) {
          if (done) {
            result.push(`<a>...</a>`);
            done = false;
          }
        } else {
          result.push(
            `<a class = "btn--inline" data-goto=${i + 1} href="#">${i + 1}</a>`
          );
        }
      }
    }
    return result;
  }

  _buttonNextOrPrev(curPage, defaultVal = 1) {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    return `<div class="pagination1">
              <a class = "btn--inline" data-goto=${1} id='first' href="#">&Lang;</a>
              <a class = "btn--inline" data-goto=${2} id='first' href="#">&langle;</a>
              ${this._displayPaginationNum(10).join(``)}
              <a class = "btn--inline" data-goto=${2} id='first' href="#">&rangle;</a>
              <a class = btn--inline data-goto=${numberOfPages} id = 'last' href="#">&Rang;</a>
          </div>`;
    // if (defaultVal === 0) {-------------------------legacy
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

    //   return `<button data-goto=${
    //     curPage + 1
    //   }  class="btn--inline pagination__btn--next">
    //   <span>Page ${curPage + 1}</span>
    //   <svg class="search__icon">
    //     <use href="${icons}#icon-arrow-right"></use>
    //   </svg>
    // </button>`;
  }

  update(data) {
    // the prupose of this method is to redo only the text , not render every element again
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll(`*`)); //here are selected the new elements that were supposed to be rendered but now it will be different
    const curElements = Array.from(this._parentElement.querySelectorAll(`*`)); // here are selected the current elemtns which have not yet been update

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //0)Update text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ``
      ) {
        //as the name implies this checks to see if the nodes are the same or not,the value needs to be verified, the elements ofcourse will be different
        //also first child actually returns the first node and node Value gives the text of it if there is one, this only allows  to change only the text
        curEl.textContent = newEl.textContent; //this still applies as you are actually changing the text, before it was equaling everything
      }
      //1)Update changed attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

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
