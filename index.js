document.getElementById("button").addEventListener('click', () => {
    let inputValue = document.getElementById('inputName').value;
    let details = document.getElementById("details");
    details.innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            const items = document.getElementById("items");
            items.innerHTML = "";
            if (data.meals == null) {
                document.getElementById("msg").style.display = "block";
            } else {
                document.getElementById("msg").style.display = "none";
                data.meals.forEach(meal => {
                    let itemDiv = document.createElement("div");
                    itemDiv.className = "m-2 singleItem";
                    itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`);
                    let itemInfo = `
                    <div class="card " style="width: 12rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body text-center">
                            <h5 class="card-text">${meal.strMeal}</h5>
                        </div>
                    </div>
                    `;
                    itemDiv.innerHTML = itemInfo;
                    items.appendChild(itemDiv);
                });
            }
        });
});

function details(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(detail => {
            let meal = detail.meals[0];
            console.log(meal);
            let detailsContainer = document.getElementById("details");
            detailsContainer.innerHTML = "";
            let detailsDiv = document.createElement("div");
            detailsDiv.className = "card";
            let detailsInfo = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-text">${meal.strMeal}</h3>
                            <h6>Ingredients</h6>
                            <ul>
                                <li>${meal.strArea}</li>
                                <li>${meal.strCategory}</li>
                                <li>${meal.strIngredient1}</li>
                                <li>${meal.strIngredient2}</li>
                                <li>${meal.strIngredient3}</li>
                                <li>${meal.strIngredient4}</li>
                                <li>${meal.strIngredient5}</li>
                            </ul>
                        </div>
                        <div id="recipe">
                            <button class="btn btn-warning" onclick="hideRecipeDetails()">Hide details</button>
                            <pre id="instructions">${meal.strInstructions}</pre>
                        </div>
                        <button class="btn btn-primary py-2" id="getrecipe" onclick="showRecipeDetails()">Show details</button>
                    </div>
                </div>
            `;
            detailsDiv.innerHTML = detailsInfo;
            detailsContainer.appendChild(detailsDiv);
        });
}

function showRecipeDetails() {
    let recipeDetails = document.getElementById("recipe");
    recipeDetails.style.display = "block";
}

function hideRecipeDetails() {
    let recipeDetails = document.getElementById("recipe");
    recipeDetails.style.display = "none";
}
