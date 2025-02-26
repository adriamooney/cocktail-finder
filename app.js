// Search cocktail by name
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// List all cocktails by first letter
// www.thecocktaildb.com/api/json/v1/1/search.php?f=a

// Search by ingredient
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

// Lookup full cocktail details by id
// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

// Lookup ingredient by ID
// www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

// Lookup a random cocktail
// www.thecocktaildb.com/api/json/v1/1/random.php

const cockTailEl = document.querySelector('.drinks__list');
const recipeEl = document.querySelector('.recipe__row');
// let isLoading = false;
// isLoading ? document.body.classList += ' loading' : document.body.classList.remove('loading');

function getCockTailByIngredient(event) {
    event.preventDefault();
    const ingredient = document.getElementById('form__search--input').value;
    renderCocktailsByIngredient(ingredient);
}

async function renderCocktailsByIngredient(ingredient) {
    document.body.classList += ' loading';
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const cockTailData = await response.json();
    const cockTailArr = cockTailData.drinks;
    setTimeout(()=> {
        if(cockTailArr !== 'no data found') {
            cockTailEl.innerHTML = cockTailArr.map(cockTail => cockTailCard(cockTail)).join('');          
        }
        else {
            cockTailEl.innerHTML = 'Your search has no results.  Please try again.'
        }
        document.body.classList.remove('loading');
    }, '500');
    
}



function cockTailCard(cockTail) {

return  `<div class="drink" id="${cockTail.strDrink.split(' ').join('')}">   
                <figure class="drink__img--wrapper">
                    <h3 class="drink__title">${cockTail.strDrink}</h3>
                    <img src="${cockTail.strDrinkThumb}" alt="" class="drink__img">
                    <div class="drink__overlay">
                        <button class="btn" onclick="getFullRecipe(${cockTail.idDrink})" class="drink__recipe--link"><i class="fa-solid fa-martini-glass"></i> Full Recipe</button>
                    </div>
                </figure>
            </div>`
     }



async function renderFullRecipe(id) {
    document.body.classList += ' loading';
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const cockTailData = await response.json();
    const cockTailArr = cockTailData.drinks;
    const thisCocktail = cockTailArr[0];
    
    


    setTimeout(()=> {
        if(cockTailArr !== 'no data found') {
            recipeEl.innerHTML = cockTailArr.map(cockTail => fullRecipeHTML(cockTail)).join(''); 
            getIngredientsList(thisCocktail);  
            recipeEl.scrollIntoView();     
        }
        else {
            recipeEl.innerHTML = 'Your search has no results.  Please try again.'
        }
        document.body.classList.remove('loading');
    }, '500');
} 

function getIngredientsList(cockTailArr) {
    for(let i=1; i<=15; i++) {
        
        if(cockTailArr['strIngredient' + i]) {
            console.log(cockTailArr['strIngredient' + i]);
            document.querySelector('.recipe__ingredients').innerHTML += `<li class="recipe__ingredient">${cockTailArr['strIngredient' + i]}</li>`;
        }
        
    }
}

function getFullRecipe(id) {
    renderFullRecipe(id);
}

function fullRecipeHTML(cockTail) {

    return ` <div class="recipe">
                <div class="recipe__info">
                    <h4 class="recipe__title">${cockTail.strDrink}</h4>
                    <div clas="recipe_description">
                        <p class="recipe__para">${cockTail.strInstructions}</p>
                        <p class="recipe__para">Serve in ${cockTail.strGlass}.</p>
                        <h4 class="recipe__subtitle">Ingredients</h4>
                        <ul class="recipe__ingredients"></ul>
                    </div>
                </div>
                <figure class="recipe__img--wrapper">
                    <img src="${cockTail.strDrinkThumb}" alt="" class="recipe__img" />
                </figure>
                <a class="back_to_top click" href="#${cockTail.strDrink.split(' ').join('')}"><i class="fa-solid fa-arrow-up"></i></a>
            </div>`
}


// strIngredient1 - strIngredient15  (null if none)
// strInstructions