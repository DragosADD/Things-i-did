import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  //How to write documentation:
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.x recipe)
   * @param {boolean} [render = true] If false created create markup string instead of rendering to the dom
   * @returns {undefined | string} A markup is returned if render is false
   * @this {Object} View instance
   * @author Dediu Dragos
   * @todo Finnish implementation
   */
  // optional is put in []

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    // this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
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
        //as the name implies this checks to see if the nodes are the same or not, this is very complicated to understand
        //but only the value needs to be verified, the elements ofcourse will be different
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

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpiner() {
    const markup = `
      <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div> -->
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}
