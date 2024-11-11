const apiKey = "c83c4e28d4bf4565b4619af372702fe6";

// Function to fetch recipes based on search query
async function fetchRecipes(query) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`
    );
    const data = await response.json();
    displayRecipes(data.results);
    console.log(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

// Function to display recipes in the recipe grid
function displayRecipes(recipes) {
  const recipeGrid = document.getElementById("recipe-grid");
  recipeGrid.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-card-content">
                <h3>${recipe.title}</h3>
                <p>Preparation time: ${recipe.readyInMinutes} mins</p>
            </div>
        `;

    recipeCard.addEventListener("click", () => showRecipeDetails(recipe.id));

    recipeGrid.appendChild(recipeCard);
  });
}

// Function to show recipe details in a modal (for simplicity, we'll use alert here)
async function showRecipeDetails(id) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
    );
    const recipe = await response.json();

    alert(
      `Recipe: ${recipe.title}\n\nIngredients:\n${recipe.extendedIngredients
        .map((i) => i.original)
        .join("\n")}`
    );
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}

// Search button event listener
document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value;
  fetchRecipes(query);
});
