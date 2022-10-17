import { async } from 'regenerator-runtime';
import { API_URL, RES_PRE_PAGE, KEY } from './config';
import { AJAX } from './helper';
// import { getJSON, sendJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: '',
    page: 1,
    resultsPerPage: RES_PRE_PAGE,
  },
  bookmarks: [],
};
const createRecipeObj = function (data) {
  // this is made because of duplicate it is also needed for the recipe that will be sent to the api, it will be rendered imediatly
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), // if recipe.key exists the object will remain, that object will be destructured and key:recipe.key wil remain
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObj(data);

    state.bookmarks.forEach(bm => {
      if (bm.id === state.recipe.id) state.recipe.bookmarked = bm.bookmarked;
    }); // different from tutorial aswell, check out the turial if you re bored but again it feels like he forgot that the data is here.
  } catch (err) {
    console.error(`${err} ATENTIE!!`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} ATENTIE!!`);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQT= oldQT * newServings/oldServings // 2 * 8 /4 = 4, quick maths
  });
  state.recipe.servings = newServings;
};

const persistBookmark = function () {
  localStorage.setItem(`bookmarks`, JSON.stringify(state.bookmarks)); //set bookmarks in local storage
};

export const addBookmark = function () {
  // Add bookmark

  // Mark curent state.recipe as bookmark.
  if (!state.recipe.bookmarked) {
    // changed as the tutorial one didnt makes sense to me,
    //the state is already here and there is no reason to do the logic in controller
    state.recipe.bookmarked = true;
    state.bookmarks.push(state.recipe);
    persistBookmark();
  } else {
    state.recipe.bookmarked = false;
    state.bookmarks.map((bkm, i) => {
      if (bkm.id === state.recipe.id) state.bookmarks.splice(i, 1); // kill the one that is marked as false, this way te order of the old ones doesnt change
      console.log(state.bookmarks);
    });
    persistBookmark();
  }
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (state.recipe.id === id) state.recipe.bookmarked = false;
  persistBookmark();
};

const init = function () {
  const storage = localStorage.getItem(`bookmarks`);
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

//Used debugging
// const clearBookmarks = function () {
//   localStorage.clear(`bookmarks`);
// };

// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => {
        return entry[0].startsWith(`ingredient`) && entry[1] !== ``;
      })
      .map(ing => {
        const ingredientsArr = ing[1].split(',').map(el => el.trim());
        if (ingredientsArr.length !== 3)
          throw new Error(
            `Wrong ingredient format. Please use the correct format`
          );

        const [quantity, unit, description] = ingredientsArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObj(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

//Things to add

//1) Display the number of pages between pagination(how many pages are);
//2)Sort search results by duration or number of ingredients;
//3) Perform ingredient validation in view, before submiting the form;
//4)Perform ingredient validation in view, before submitting the form;
//5) Improve recipe ingredient input: separate in multiple fields and allow more than 6 ingredients;

//6) Shopping list feature : button on recipe to add ingreddients to a list;
//7) Weekly meal planing feature: assign recipes to the next 7 days and show on a weekly calendar;
//8) Get nutrition data on each ingredient from spponacular API (https://spoonacular.com/food-api) and calculate total calories of recipe
