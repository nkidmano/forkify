import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/** Global state of app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/

const state = {};

async function controlSearch() {
  // 1. Get query from the view
  const query = searchView.getInput();

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);
    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    // 4. Search for recipe
    await state.search.getResult();
    // 5. Render results on UI
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});