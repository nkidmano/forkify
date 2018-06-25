import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/

const state = {};

/**
 * SEARCH CONTROLLER
 */
async function controlSearch() {
  // 1. Get query from the view
  const query = searchView.getInput();

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);
    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);
    // 4. Search for recipe
    await state.search.getResult();
    // 5. Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResultPages.addEventListener('click', e => {
  const button = e.target.closest('.btn-inline');

  if (button) {
    const page = parseInt(button.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, page);
  }
});

/**
 * RECIPE CONTROLLER
 */

async function controlRecipe() {
  // Get id from URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare for UI changes

    // Create new recipe object
    state.recipe = new Recipe(id);
    // Get recipe data
    await state.recipe.getRecipe();
    // Calc servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();
    // Render recipe
    console.log(state.recipe);
  }
}

window.addEventListener('hashchange', controlRecipe);
