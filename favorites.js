// const favoriteDrinksStr = localStorage.getItem('favoriteDrinksArr');
// let favoriteDrinksArr = favoriteDrinksStr ? JSON.parse(favoriteDrinksStr) : [];
console.log(typeof(favoriteDrinksArr), favoriteDrinksArr);
// Lookup full cocktail details by id
// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

async function renderCocktailsById(id) {
    document.body.classList += ' loading';
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const cockTailData = await response.json();
    const cockTailArr = cockTailData.drinks;
    setTimeout(()=> {
        if(cockTailArr !== 'no data found') {
            cockTailEl.innerHTML += cockTailArr.map(cockTail => cockTailCard(cockTail)).join('');          
        }
        else {
            cockTailEl.innerHTML = 'Your search has no results.  Please try again.'
        }
        document.body.classList.remove('loading');
    }, '500');
    
}
console.log(favoriteDrinksArr);
for (let i=0; i<favoriteDrinksArr.length; i++) {
    renderCocktailsById(favoriteDrinksArr[i]);
}

