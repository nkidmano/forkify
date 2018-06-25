import { elements } from './base';

function limitRecipeTitle(title, limit = 17) {
  let newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit)
        newTitle.push(cur);
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(' ')} ...`;
  }
  return title;
}

function renderRecipe(recipe) {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

function createButton(page, type) {
  return `
    <button class="btn-inline results__btn--${type}" data-goto=${(type === 'prev') ? page - 1 : page + 1}>
    <span>Page ${(type === 'prev') ? page - 1 : page + 1}</span>
      <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${(type === 'prev') ? 'left' : 'right'}"></use>
      </svg>
    </button>
  `;
}

function renderButtons(page, numResults, resultPerPage) {
  const pages = Math.ceil(numResults / resultPerPage);
  let button;

  if (page === 1 && pages > 1) {
    // Only button to go to next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Both buttons
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // Only button to go to prev page
    button = createButton(page, 'prev');
  }

  elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
}

export function getInput() {
  return elements.searchInput.value;
}

export function clearInput() {
  elements.searchInput.value = '';
}

export function renderResults(recipes, page = 1, resultPerPage = 10) {
  // Render result for current page
  const start = (page - 1) * resultPerPage ;
  const end = page * resultPerPage ;

  recipes.slice(start, end).forEach(renderRecipe);
  // Render pagination buttons
  renderButtons(page, recipes.length, resultPerPage);
}

export function clearResults() {
  elements.searchResultList.innerHTML = '';
  elements.searchResultPages.innerHTML = '';
}
