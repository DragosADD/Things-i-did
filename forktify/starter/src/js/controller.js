// import icons from `../img/icons.svg`;// Parcel 1
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2
//5ed6604591c37cdc054bc8f7// to be used as a quick
// 5ed6604691c37cdc054bd015
///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    //getting the id of the recipe
    const id = window.location.hash.slice(1);
    //in case there is no id available for now
    if (!id) return;
    recipeView.renderSpiner();

    //0)Update results to mark view updated
    resultsView.update(model.getSearchResultPage());
    // 2)Update bookmark preview
    bookmarksView.update(model.state.bookmarks);
    //1) Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};
const controllSearchResults = async function () {
  try {
    resultsView.renderSpiner();
    // 1)Gett search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3)Render Results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    //4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3)Render New Results
  // resultsView.render(model.state.search.results);
  // resultsView.render(model.getSearchResultPage(goToPage));
  //4) Render NEW initial pagination buttons
  // paginationView.render(model.state.search);
  resultsView.update(model.getSearchResultPage(goToPage));
};

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1)Add or remove bookmark
  model.addBookmark(model.state.recipe);
  //2)Update recipe view
  recipeView.update(model.state.recipe);
  //3)Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlLoadBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpiner();

    //upload data
    await model.uploadRecipe(newRecipe);

    //render data
    recipeView.render(model.state.recipe);

    //As borat used to say GREAT SUCCES
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change id in the url
    window.history.pushState(null, ``, `#${model.state.recipe.id}`); // window.history is the api and push state will allow to change the url, it takes 3 arugments state, title and url
    //window.history.back()//this is another api function that can make the web page go back

    //toggle modal
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`Atentie 2`, err); //in order to catch the error he turning this function in async function was needed because the promise was not waited from model
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlLoadBookmark); // in bookmarks we give the load event and when that is fullfiled, the preview is rendered here
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controllSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();

// window.addEventListener(`hashchange`, showRecipe);
// window.addEventListener(`load`, showRecipe);
