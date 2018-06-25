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
  const page = parseInt(button.dataset.goto);
  searchView.clearResults();
  searchView.renderResults(state.search.result, page);
});

/**
 * RECIPE CONTROLLER
 */

const r = new Recipe(47107);
r.getRecipe();
