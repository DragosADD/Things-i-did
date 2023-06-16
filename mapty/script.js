'use strict';

const george = `george`;

class Workout {
  id = (Date.now() + ``).slice(-`10`);
  date = new Date();
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; //array[lat, lng]
    this.distance = distance; //in km
    this.duration = duration; // in min
  }
  _setDiscription() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = `running`;
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDiscription();
  }
  calcPace() {
    //min/km
    return (this.pace = this.duration / this.distance);
  }
}

class Cycling extends Workout {
  type = `cycling`;
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDiscription();
  }

  calcSpeed() {
    //km/h
    return (this.speed = this.distance / (this.duration / 60));
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 170);
// const cycling1 = new Cycling([39, 12], 27, 95, 523);

// console.log(run1, cycling1);

//////////////////////////////////////////////////
/////////Aplication Architecture
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnDelWorkout = document.querySelector(`.button__DeleteAllWOrkouts`);
const sidebar = document.querySelector(`.sidebar`);
const mapDiv = document.querySelector(`#map`);
const btnCrescator = document.querySelector(`#crescator`);
const btnDescrescator = document.querySelector(`#descrescator`);
const sortGroup = document.querySelector(`#sortGroup`);

class App {
  #mapZoomLevel = 14;
  #map;
  #mapEvent;
  #workout = [];
  #sortCrescator = true;
  #sortDescrator = true;
  constructor() {
    //get user's position
    this._getPosition();
    //get data from local storage
    this._getLocalStorage();
    //option to delete workouts
    this._deleteAllWorkouts();
    //Atach event handlers
    form.addEventListener(`submit`, this._newWorkout.bind(this));
    inputType.addEventListener(`change`, this._toggleElevationField);
    containerWorkouts.addEventListener(`click`, this._moveToPopUp.bind(this));
    btnCrescator.addEventListener(`click`, this._getLocalStorage.bind(this));
    btnDescrescator.addEventListener(`click`, this._getLocalStorage.bind(this));
  }

  get workoutData() {
    return [...this.#workout.slice()];
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert(`Could not get your position`);
        }
      );
    }
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    console.log(`https://www.google.ro/maps/@${latitude},${longitude}z`);
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    //handling clicks on map
    this.#map.on(`click`, this._showForm.bind(this));
    this.#workout.forEach(work => {
      this._renderWorkoutMaker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove(`hidden`);
    inputDistance.focus();
  }
  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        ``;

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _toggleElevationField() {
    inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
    inputCadence.closest(`.form__row`).classList.toggle(`form__row--hidden`);
  }
  _newWorkout(e) {
    const validInputs = function (...inputs) {
      return inputs.every(inp => Number.isFinite(inp));
    };
    const allPositive = function (...inputs) {
      return inputs.every(inp => inp > 0);
    };

    const inputFunction = function (jew, name, [...inputs]) {
      const third = function (alibaba) {
        if (alibaba === `running`) return `Cadence`;
        if (alibaba === `cycling`) return `Elevation`;
      };
      const final = [];

      jew.forEach(function (el) {
        if (el === inputs[0]) {
          final.push(`Distance`);
        }
        if (el === inputs[1]) {
          final.push(`Duration`);
        }
        if (el === inputs[2]) {
          final.push(third(name));
        }
      });
      return final;
    };

    function freeHtml() {
      document.querySelector(`.modal`).classList.remove(`hidden`);
      document.querySelector(`.overlay`).classList.remove(`hidden`);
    }

    function hideHtml() {
      document.querySelector(`.modal`).classList.add(`hidden`);
      document.querySelector(`.overlay`).classList.add(`hidden`);
    }

    function killPopUp() {
      const tick = function () {
        const sec = String(time % 60);
      };
    }
    function timeStamp() {
      const tick = function () {
        labelTimer.textContent = time;
        if (time === 0) {
          clearInterval(timer);
          hideHtml();
          document.querySelector(`.btn--close-modal`).nextSibling.remove();
          document
            .querySelector(`.btn--close-modal`)
            .removeEventListener(`click`);
        }
        time--;
      };

      let time = 5;
      tick();

      const timer = setInterval(tick, 1000);
    }

    function warningShowWindow(html) {
      document
        .querySelector(`.btn--close-modal`)
        .insertAdjacentHTML(`afterend`, html);
      if (isModalClosed === false) {
        document
          .querySelector(`.btn--close-modal`)
          .addEventListener(`click`, function (e) {
            hideHtml();
            document.querySelector(`.btn--close-modal`).nextSibling.remove();
            closeModal = !closeModal;
            e.target.removeEventListener(`click`, warningShowWindow);
          });
      }
      timeStamp();
    }

    const findNotFiniteInputs = function ([...inputs]) {
      freeHtml();
      const jew = inputs.filter(el => !Number.isFinite(el));
      if (jew.length === 0) {
        return true;
      } else {
        const html = `<h2 id = "textAlert">
        In order to process an workout all fields must contain numbers
        </h2>`;
        document
          .querySelector(`.btn--close-modal`)
          .insertAdjacentHTML(`afterend`, html);

        document
          .querySelector(`.btn--close-modal`)
          .addEventListener(`click`, function () {
            hideHtml();
            document.querySelector(`.btn--close-modal`).nextSibling.remove();
          });
      }
    };

    const findNegativeInputs = function ([...inputs], name) {
      freeHtml();
      const jew = inputs.filter(el => el < 0);
      if (jew.length === 0) return;
      const html = `<h2 id = "textAlert">
            Please note that the ${[
              ...inputFunction(jew, name, [...inputs]),
            ]} are negative numbers, enter pozitive numbers.
        </h2>`;
      document
        .querySelector(`.btn--close-modal`)
        .insertAdjacentHTML(`afterend`, html);

      document
        .querySelector(`.btn--close-modal`)
        .addEventListener(`click`, function () {
          hideHtml();
          document.querySelector(`.btn--close-modal`).nextSibling.remove();
        });
    };

    e.preventDefault();

    //Get data from form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //If running, create runing object
    if (type === `running`) {
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        if (findNotFiniteInputs([distance, duration, cadence])) {
          findNegativeInputs([distance, duration, cadence], `running`);
        }
      } else {
        workout = new Running([lat, lng], distance, duration, cadence);
      }
    }

    //if activity is cycling, create cycling obj
    if (type === `cycling`) {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration, elevation)
      ) {
        if (findNotFiniteInputs([distance, duration, elevation], `cycling`)) {
          findNegativeInputs([distance, duration, elevation], `cycling`);
        }
      } else {
        workout = new Cycling([lat, lng], distance, duration, elevation);
      }
    }

    if (workout) {
      //Add new workout to workout array
      this.#workout.push(workout);
      //Render workout on map,

      //Render new workout on list
      this._renderWorkoutMaker(workout);

      //Hide Form and clear input fields

      //Render workout on list
      this._renderWorkout(workout);
    }

    //Render form + clear input fields
    this._hideForm();

    //Set local storage to all workouts
    this._setLocalStorage();

    //Option to delete all workouts
    this._deleteAllWorkouts();
  }

  _renderWorkoutMaker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 150,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`} ${workout.description}`
      )
      .openPopup();
  }
  _renderWorkout(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
  <h2 class="workout__title">${
    workout.description
  } <button class='button_DeleteWorkout btn-text-right workout__hidden' id = ${
      workout.id
    } >Delete Workout</button></h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`
      }</span>
      <input class="workout__value" id = ${
        workout.id
      } name = "distance" value = ${workout.distance}></input>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <input class="workout__value" id = ${
        workout.id
      }  name = "duration" value = ${workout.duration}></input>
      <span class="workout__unit">min</span>
    </div>`;
    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <input class="workout__value" id = ${
            workout.id
          }  name = "cadence" value = ${workout.cadence}></input>
          <span class="workout__unit">spm</span>
        </div>
        <button  type = "button" id = "${
          workout.id
        }" class = "button__Workout workout__hidden">Edit</button>   
      </li>
      `;

    if (workout.type === 'cycling') {
      html += `
             <div class="workout__details">
               <span class="workout__icon">⚡️</span>
               <span class="workout__value">${workout.speed.toFixed(1)}</span>
               <span class="workout__unit">km/h</span>
             </div>
             
             <div class="workout__details">
             <span class="workout__icon">⛰</span>
             <input class="workout__value" id = ${
               workout.id
             }  name = "elevationGain" value = ${workout.elevationGain}></input>
             <span class="workout__unit">m</span>               
             </div>
             <button type = "button" id = "${
               workout.id
             }" class = "button__Workout workout__hidden">Eddit</button>                        
           </li>
           `;
    }
    form.insertAdjacentHTML('afterend', html);
    this._editWorkout(this.workoutData);
    console.log(this.workoutData);
  }
  //clear input fields
  _moveToPopUp(e) {
    if (!this.#map) return;
    const workoutEl = e.target.closest(`.workout`);
    if (!workoutEl) return;
    // const workoutEl = this.#workout.find(work => (work.id = this.#workout.id));
    const workout = this.#workout.find(
      work => work.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    //using public interface
    // workout.clicks();
  }
  _setLocalStorage() {
    localStorage.setItem(`workout`, JSON.stringify(this.#workout));
    console.log(JSON.parse(localStorage.getItem(`workout`)));
    if (!this.#workout.length > 0) {
      localStorage.removeItem(`workout`);
    }
  }
  _getLocalStorage(e) {
    const data = JSON.parse(localStorage.getItem(`workout`));
    console.log(data);
    if (!data) return;
    const removableItems = document.querySelectorAll(`.workout`);
    removableItems.forEach(el => el.remove());
    const arr = [];
    data.forEach(function (el) {
      if (el.type === `running`) {
        const thing = new Running(
          el.coords,
          el.distance,
          el.duration,
          el.cadence
        );
        thing.id = el.id;
        arr.push(thing);
      } else if (el.type === `cycling`) {
        const thing = new Cycling(
          el.coords,
          el.distance,
          el.duration,
          el.elevationGain
        );
        thing.id = el.id;
        arr.push(thing);
      }
    });
    this.#workout = arr;

    if (e) {
      if (e.target.id === `crescator`) {
        if (this.#sortCrescator) {
          data.sort((a, b) => {
            if (a.distance > b.distance) {
              return 1;
            }
            if (a.distance < b.distance) {
              return -1;
            }
          });
          this.#sortCrescator = !this.#sortCrescator;
          this.#sortDescrator = true;
        }
      }
      if (e.target.id === `descrescator`) {
        if (this.#sortDescrator) {
          data.sort((a, b) => {
            if (a.distance > b.distance) {
              return -1;
            }
            if (a.distance < b.distance) {
              return 1;
            }
          });
        }
        this.#sortDescrator = !this.#sortDescrator;
        this.#sortCrescator = true;
      }
    }
    data.forEach(work => {
      this._renderWorkout(work);
    });
  }

  _editWorkout(workoutData) {
    // let button;
    let buttonW;

    const createQuery = function (type) {
      return document.querySelector(`[name = "${type}"][id = "${buttonW.id}"]`);
    };

    const targetInput = function (e) {
      this._deleteWorkout(e);
      const target = e.target.closest(`input`);
      if (!target) return;
      buttonW =
        target.parentElement.parentElement.querySelector(`.button__Workout`);
      if (!buttonW) return;
      buttonW.classList.remove(`workout__hidden`);
      this._hideOtherButtons(
        `.button__Workout`,
        `.button_DeleteWorkout`,
        buttonW,
        [mapDiv]
      );

      buttonW.addEventListener(`click`, schimba.bind(this));
    };

    const schimba = function (e) {
      workoutData.forEach(function (workout) {
        if (Number(workout.id) == Number(buttonW.id)) {
          const distanceQuery = createQuery(`distance`);
          workout.distance = Number(distanceQuery.value);

          const durationQuery = createQuery(`duration`);
          workout.duration = Number(durationQuery.value);

          const cadenceQuery = createQuery(`cadence`);
          const elevationGainQuery = createQuery(`elevationGain`);
          if (cadenceQuery) workout.cadence = Number(cadenceQuery.value);
          if (elevationGainQuery)
            workout.elevationGain = Number(elevationGainQuery.value);
        }
      });

      this.#workout = workoutData;
      this._setLocalStorage();
      buttonW.classList.add(`workout__hidden`);
    };

    containerWorkouts.addEventListener(`click`, targetInput.bind(this));
  }
  _hideOtherButtons(classNameCurr, classNameSecond, button, containers) {
    const butonele = [
      ...document.querySelectorAll(classNameCurr),
      ...document.querySelectorAll(classNameSecond),
    ];
    butonele.forEach(function (el) {
      if (Number(el.id) !== Number(button.id)) {
        el.classList.add(`workout__hidden`);
      }
    });

    containers.forEach(function (cont) {
      cont.addEventListener(`click`, function (e) {
        butonele.forEach(function (el) {
          el.classList.add(`workout__hidden`);
        });
      });
    });
  }

  _deleteWorkout(e) {
    let buttonDel;
    const data = this.workoutData;
    const acutallyDeleting = function () {
      const index = this.workoutData.findIndex(
        workout => Number(workout.id) === Number(buttonDel.id)
      );
      data.splice(index, 1);
      this.#workout = data;
      this._setLocalStorage();
      location.reload();
    };
    const targetDel = e.target.closest(`h2`);
    if (!targetDel) return;
    buttonDel = targetDel.parentElement.querySelector(`.button_DeleteWorkout`);
    buttonDel.classList.remove(`workout__hidden`);
    this._hideOtherButtons(
      `.button_DeleteWorkout`,
      `.button__Workout`,
      buttonDel,
      [mapDiv]
    );
    buttonDel.addEventListener(`click`, acutallyDeleting.bind(this));
  }

  _deleteAllWorkouts() {
    if (localStorage.getItem(`workout`) === null) {
      btnDelWorkout.classList.add(`workout__hidden`);
      sortGroup.classList.add(`workout__hidden`);
      return;
    }
    btnDelWorkout.classList.remove(`workout__hidden`);
    sortGroup.classList.remove(`workout__hidden`);
    btnDelWorkout.addEventListener(`click`, function (e) {
      localStorage.removeItem(`workout`);
      location.reload();
      btnDelWorkout.classList.add(`workout__hidden`);
    });
  }
}
const app = new App();
