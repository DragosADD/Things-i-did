'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const nav = document.querySelector(`.nav`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);
const header = document.querySelector(`.header`);
const imgTargets = document.querySelectorAll(`img[data-src]`);

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener(`click`, openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Btn scroll
btnScrollTo.addEventListener(`click`, function (e) {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

////////////////////////////////////////////////////////////
//Page navigation

// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

//1.Add event listener to common parent element
//2.Determine what element originated the event
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

const h1 = document.querySelector(`h1`);

// Tabbed componenet

tabsContainer.addEventListener(`click`, function (e) {
  e.preventDefault();
  const clicked = e.target.closest(`.operations__tab`); //getting the target itself, no matter if we click the span or not

  //guard close
  if (!clicked) return; //if nothing is clicked, in other words if clicked will be null we will close the function by returning nothing, if it is true we can continue
  tabs.forEach(t => t.classList.remove(`operations__tab--active`)); //taking out the activated button
  tabsContent.forEach(t => t.classList.remove(`operations__content--active`)); //taking out the activated text
  clicked.classList.add(`operations__tab--active`); //ading the efect to the selected button
  const id = clicked.getAttribute(`data-tab`); //geting the preperty of the element

  document
    .querySelector(`.operations__content--${id}`) //geting the class with the id from before
    .classList.add(`operations__content--active`); //adding the class to the text
});
//Menu fade animation version 1

const handleHover = function (e) {
  ////This function can onlly take the even handler
  //the this keyword takes the value that is asigned in the bind call
  {
    if (e.target.classList.contains(`nav__link`)) {
      const link = e.target;
      const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
      const logo = link.closest(`.nav`).querySelector(`img`);

      siblings.forEach(el => {
        if (el !== link) {
          el.style.opacity = this;
        }
      });
      logo.style.opacity = this;
    }
  }
};

nav.addEventListener(`mouseover`, handleHover.bind(0.5)); ///if we need more poramaters
//we can simply pass an array
nav.addEventListener(`mouseout`, handleHover.bind(1));

////////////////////////////////////////////////////////////////
// Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   //this will call the object observer (down)
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// }; // this function will be called each time when the element(section1) is intersecting the root and
// //trashhould that is defined at obsOptions

// const obsOptions = {
//   root: null,
//   threshould: [0, 1, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add(`sticky`);
  } else nav.classList.remove(`sticky`);
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Reveal sections
const allSections = document.querySelectorAll(`.section`);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove(`section--hidden`);
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.25,
});

allSections.forEach(function (section) {
  // section.classList.add(`section--hidden`);
  sectionObserver.observe(section);
});

////////////////////////////////////////////////////////
//Lazi loading images

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  ///Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener(`load`, function () {
    entry.target.classList.remove(`lazy-img`);
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});
////////////////////////////////////////////////
/////Building a slider component

const slider = function () {
  const slides = document.querySelectorAll(`.slide`);
  const btnLeft = document.querySelector(`.slider__btn--left`);
  const btnRight = document.querySelector(`.slider__btn--right`);
  const maxSlide = slides.length;
  const dotContainer = document.querySelector(`.dots`);

  let currentSlide = 0;

  // const slider = document.querySelector(`.slider`);
  // slider.style.transform = `scale(0.4) translateX(-800px)`;
  // slider.style.overflow = `visible`;
  // style;

  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  // 0%, 100%,200%,300%

  //Next slide

  //Functions

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%`)
    );
  };

  // const createDots = function () {
  //   slides.forEach(function (_, i) {
  //     dotContainer.insertAdjacentHTML(
  //       'beforeend',
  //       `<button class="dots__dot" data-slide="${i}"></button>`
  //     );
  //   });
  // };

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="dots__dot" data-slide ="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => dot.classList.remove(`dots__dot--active`));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide === 0;
    else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide - 1 < 0) currentSlide === 0;
    else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };

  init();

  ////event handlers
  btnRight.addEventListener(`click`, nextSlide);

  btnLeft.addEventListener(`click`, previousSlide);

  document.addEventListener(`keydown`, function (e) {
    if (e.key === `ArrowLeft`) {
      previousSlide();
    } else if (e.key === `ArrowRight`) {
      nextSlide();
    }
  });

  dotContainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      // console.log(e.target.dataset);
      const { slide } = e.target.dataset; // selecting the element itself
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

// btnLeft.addEventListener(`click`, function () {
//   currentSlide--;

//   //3-1
// });

/*
///////////////////////////////////////////////////////////
// Sticky navigation // bad performance way
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener(`scroll`, function (e) {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) {
    nav.classList.add(`sticky`);
  } else nav.classList.remove(`sticky`);
});
*/
/*
//Menu fade animation version 1

const handleHover = function (e, opacity) {
  {
    if (e.target.classList.contains(`nav__link`)) {
      const link = e.target;
      const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
      const logo = link.closest(`.nav`).querySelector(`img`);

      siblings.forEach(el => {
        if (el !== link) {
          el.style.opacity = opacity;
        }
      });
      logo.style.opacity = opacity;
    }
  }
};

nav.addEventListener(`mouseover`, function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener(`mouseout`, function (e) {
  handleHover(e, 1);
});
*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/*
//Going downwards: child

console.log(h1.querySelectorAll(`.highlight`));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = `white`;
h1.lastElementChild.style.color = `orangered`;

//Going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(`.header`).style.background = `var(--gradient-secondary)`; //closest element

h1.closest(`h1`).style.background = `var(--gradient-primary)`; //chaing the color to itself

//going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = `scale(0.5)`;
});
*/
/*
////////////////////////////////////////
/////////Selecting Elements

// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);

const header = document.querySelector(`.header`);
const allSections = document.querySelectorAll(`.section`);
// console.log(allSections);
document.getElementById(`section--1`);
const allButtons = document.getElementsByTagName(`buttons`);
// console.log(allButtons);

document.getElementsByClassName(`btn`);

//Creating and inserting elemnts
//.insertAdjacentHTML
const message = document.createElement(`div`);
message.classList.add(`cookie-message`);
// message.textContent = `We used cookied for improved functionality and analytics`;
message.innerHTML = `We use cookie for improved functionality and anyalytics <button class = "btn btn--close--cookie"btn--close--cookie">Got it!</button>`;

// header.prepend(message);//this shows the message at the top
header.append(message); //mesajul se muta jos din cauza ca exista doar un mesaj. Cand se foloseste querry selector se creaza doar un node, nodurile nu se duplicheaza sau updateaza
// header.append(message.cloneNode(true)); //cloneaza mesajul

//header.before(message)//puts the message before the whole header
//header.after(message)// puts the message after the whole header

//Delete elements
document
  .querySelector(`.btn--close--cookie`)
  .addEventListener(`click`, function () {
    message.remove(); //old way was message.parentElement.removeChild(message)
  });

//Styles
message.style.backgroundColor = `#37383D`;
message.style.width = `120%`;

// console.log(message.style.height); // the style property works only for things that we set outselfs, so for example the numbers for the ones above should work
// console.log(message.style.backgroundColor); //this work as it is set by us

// // console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + `px`;

document.documentElement.style.setProperty(`--color-primary`, `orangered`);
*/
/*
//Atributes
const logo = document.querySelector(`.nav__logo`);
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = `Beautiful minimalist logo`; //setting up a new attribute

//doesnt waork is it is not a default prepert
console.log(logo.designer);
console.log(logo.getAttribute(`designer`)); //another way to read the value above
logo.setAttribute(`company`, `Bankist`); //setting up a new attribute

console.log(logo.src); //this is a link
console.log(logo.getAttribute(`src`)); //this is the actual value and more relevant

const link = document.querySelector(`.nav__link--btn`);
console.log(link.href);
console.log(link.getAttribute(`href`)); //with this yyou are actually getting the url

//Data attributes
console.log(logo.dataset.versionNumber);

//Classses
logo.classList.add(`c`);
logo.classList.remove(`c`);
logo.classList.toggle(`c`);
logo.classList.contains(`c`); //no includes

//Don't use
logo.className = `jonas`;
*/

// const btnScrollTo = document.querySelector(`.btn--scroll-to`);
// const section1 = document.querySelector(`#section--1`);

// btnScrollTo.addEventListener(`click`, function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   // console.log(s1coords);

//   // console.log(e.target.getBoundingClientRect());

//   // console.log(`Current scroll (X/Y) `, window.pageXOffset, window.pageYOffset); //shows the potion of the scoll or rather how much it was scrolled

//   // console.log(
//   //   `height/width viewport`,
//   //   document.documentElement.clientHeight,
//   //   document.documentElement.clientWidth //it shows the size of the thing that we are seeing on the broser, the page itself, it excludes scroll bars
//   // );

//   // //Scrolling

//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // ); //it is need the potion from the op to the viewport, not the page

//   // window.scrollTo({
//   //   //moder++
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: `smooth`, //////this method includes smooth behaviour and looks way better than the one above
//   // });
//   section1.scrollIntoView({
//     //this is the most modern way bu only in modern browser
//     behavior: 'smooth',
//   });
// });
/*
//Different events
const h1 = document.querySelector(`h1`);

const alertH1 = function (e) {
  alert(`addEventListener: Great! You are reading the heading`);
  // h1.removeEventListener(`mouseenter`, alertH1); //after the even tiggers we remove it like this
};

h1.addEventListener(`mouseenter`, alertH1);

setTimeout(() => h1.removeEventListener(`mouseenter`, alertH1), 3000);

// h1.onmouseenter = function (e) {
//   //Accepts online on function
//   alert(`Onmouseenter : Great you are reading the event :D`);
// };
*/
// rgb(255,255,255

const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
/*
////////////////////////////////////////////////////////////////
///////////Event propagation
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {
  //this points to the element of the event listener
  this.style.backgroundColor = randomColor();
  console.log(`Link`, e.target, e.currentTarget, e.currentTarget === this);
  //stop this event propagation
  // e.stopPropagation();
});
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`Container`, e.target, e.currentTarget);
});
document.querySelector(`.nav`).addEventListener(`click`, function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`Nav`, e.target, e.currentTarget);
});
*/

document.addEventListener(`DOMContentLoaded`, function (e) {
  console.log(`Html parsed and Dom tree build`, e);
});

window.addEventListener(`load`, function (e) {
  console.log(`Page fully loaded`, e);
});

// window.addEventListener(`beforeunload`, function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue``;
// });
