`use strict`;

// Done, should be reviewed when bored to make the code more readable and easy to udestand, def too much cluter

import View from './view.js';
import icons from 'url:../../img/icons.svg'; // this is from legacy, at the begginng there was only next or pref, could use the icons to replace the arrows.

class PaginationView extends View {
  _parentElement = document.querySelector(`.pagination`);

  #numPages;
  _currentTarget;

  addHandlerClick(handler) {
    const theHandler = function (e) {
      e.preventDefault();
      const btn = e.target.closest(`.btn--inline`);

      //making sure that the right button is in the object and that the additional buttons switch easily

      if (btn.classList.contains(`first`))
        this._currentTarget = document.getElementById(`1`);
      else if (btn.classList.contains(`last`)) {
        this.#numPages = Math.ceil(
          this._data.results.length / this._data.resultsPerPage
        );
        this._currentTarget = document.getElementById(`${this.#numPages}`);
      } else if (btn.classList.contains(`Secondfirst`)) {
        if (!document.getElementById(`${this._data.page - 1}`)) return;
        this._currentTarget = document.getElementById(`${this._data.page - 1}`); //giving the current target instantly, the buttons that side buttons next to the wished one will be deleted anyway
      } else if (btn.classList.contains(`Secondlast`)) {
        if (!document.getElementById(`${this._data.page + 1}`)) return;
        this._currentTarget = document.getElementById(`${this._data.page + 1}`);
      } else {
        this._currentTarget = btn; // self explanatory
      }

      if (!btn) return;

      const goToPage = Number(+this._currentTarget.id);
      handler(goToPage); //
    };
    this._parentElement.addEventListener(`click`, theHandler.bind(this));
  }

  _displayPaginationNum(pages) {
    // displays the pages buttons with numbers
    const result = [];

    if (pages < 5) {
      //if there are less than 5 pages  fuck it, post everything
      for (let i = 0; i < pages; i++) {
        result.push(
          `<a class = "btn--inline" id=${i + 1} href="#">${i + 1}</a>`
        );
      }
    } else {
      // set initial tempalte of pagination, not directly linked to anything
      result.push(`<a class = "btn--inline active" id=${1} href="#">${1}</a>`);
      result.push(`<a class = "btn--inline" id=${2} href="#">${2}</a>`);
      result.push([`<a class = "iterations" >.....</a>`]);
      result.push(`<a class = "btn--inline" id=${pages} href="#">${pages}</a>`);
    }
    return result;
  }

  _buttonNextOrPrev(curPage, defaultVal = 1) {
    // this ca be done as a render function whilist also taking some code from update
    //goes with display pagination, should be named something else but im lazy

    //sets up the initial pagination
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); //lazy to change, to be renamed
    return `
              <a class = "btn--inline first" id =  href="#">&Lang;</a>
              <a class = "btn--inline Secondfirst"  href="#">&langle;</a>
              ${this._displayPaginationNum(numberOfPages).join(``)}
              <a class = "btn--inline Secondlast" href="#">&rangle;</a>
              <a class = "btn--inline last"   href="#">&Rang;</a>
          `;
  }

  update(data) {
    // data argument it was from before, useless for now
    const removeButtonsWThis = removeButtons.bind(this); // function below
    //below is activating buttons
    document
      .querySelectorAll(`.btn--inline`)
      .forEach(el => el.classList.remove(`active`));

    this._currentTarget.classList.add(`active`);

    if (this.#numPages < 5) return; // this can be avoided, kinda uselss but at the same time could be some good practice to rethink this.
    if (+this._currentTarget.id === 1) {
      //Just because I want 2 to show at the begining
      removeButtonsWThis();
      this._currentTarget.insertAdjacentHTML(
        `afterend`,
        `<a class = "btn--inline" id="2"  href="#">2</a>` +
          `<a class = "iterations" >.....</a>`
      );
      return;
    }

    removeButtonsWThis();

    //this puts buttons with dots before the target
    if (+this._currentTarget.id - 1 !== 1) {
      this._currentTarget?.insertAdjacentHTML(
        `beforebegin`,
        puncte(this._currentTarget.id - 1) +
          `<a class = "btn--inline" id=${
            +this._currentTarget.id - 1
          } href="#">${+this._currentTarget.id - 1}</a>`
      );
    }
    //this puts buttons with dots before the target
    if (
      +this._currentTarget.id !== this.#numPages &&
      +this._currentTarget.id + 1 !== this.#numPages
    ) {
      if (document.getElementById(`${+this._currentTarget.id + 1}]`)) return;
      console.log(this._currentTarget, `2`);
      this._currentTarget?.insertAdjacentHTML(
        `afterend`,

        `<a class = "btn--inline" id=${+this._currentTarget.id + 1}  href="#">${
          +this._currentTarget.id + 1
        }</a>` + puncte(this._currentTarget.id + 1)
      );
    }

    function removeButtons() {
      // this points to undefined and it's purpose is to removed every button el
      for (let i = 1; i <= this.#numPages; i++) {
        if (i !== 1 && i !== this.#numPages && i !== +this._currentTarget.id) {
          document.getElementById(`${i}`)?.remove();
          document.querySelector(`.iterations`)?.remove();
        }
      }
    }

    function puncte(page, maxPage) {
      // syntax to add above, returns nothing or dots
      if (page > 2 || page < maxPage - 1)
        return `<a class = "iterations" >.....</a>`;
      else return ``;
    }
  }
  _generateMarkup() {
    // needs to be redone
    const curPage = this._data.page;
    this.#numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if ((curPage === 1 && this.#numPages > 1) || curPage <= this.#numPages) {
      return this._buttonNextOrPrev(curPage);
    }
    return ``;
  }
}

export default new PaginationView();
