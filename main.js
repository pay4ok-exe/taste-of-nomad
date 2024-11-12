const apiKey = "834f3882ee6845ab9a68e8f3addef005";

async function searchRecipes() {
  const searchQuery = document.getElementById("query").value;
  loadRecipes(searchQuery);
}

async function loadRecipes(query) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=20`
    );
    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

function displayRecipes(recipes) {
  const recipeList = document.getElementById("results");
  recipeList.innerHTML = "";
  if (recipes.length == 0) {
    recipeList.innerHTML = "No recipes found.";
  } else {
    recipes.forEach((recipe) => {
      const recipeItem = document.createElement("div");
      recipeItem.className = "recipe-item";
      const recipeTitle = document.createElement("h3");
      recipeTitle.textContent = recipe.title;
      const recipeImage = document.createElement("img");
      recipeImage.src = recipe.image;
      recipe.alt = recipe.title;
      const recipeLink = document.createElement("a");
      recipeLink.href = "#";
      recipeLink.textContent = "View Recipe";
      recipeLink.onclick = async function () {
        await showRecipeDetails(recipe.id);
      };
      recipeItem.appendChild(recipeImage);
      recipeItem.appendChild(recipeTitle);
      recipeItem.appendChild(recipeLink);
      recipeList.appendChild(recipeItem);
    });
  }
}

async function showRecipeDetails(recipeId) {
  const recipeDetailsDiv = document.getElementById("recipe-details");
  const recipeContentDiv = document.getElementById("recipe-content");
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    );
    const recipeData = await response.json();
    recipeContentDiv.innerHTML = `
        <h2 class="recipe-title">${recipeData.title}</h2>
        <img class="recipe-image" src="${recipeData.image}" alt="${
      recipeData.title
    }">
        <div class="recipe-details">
          <h3 class="ingredients-title">Ingredients</h3>
          <ul class="ingredients-list">
            ${recipeData.extendedIngredients
              .map((ingredient) => `<li>${ingredient.original}</li>`)
              .join("")}
          </ul>
          <div class="instructions-collapse">
            <button onclick="toggleInstructions()" class="instructions-toggle">Show Instructions</button>
            <ol class="instructions-list" style="display:none;">
              ${recipeData.instructions
                .split(/(?<=\.)\s/)
                .map((step) => `<li>${step}</li>`)
                .join("")}
            </ol>
          </div>
        </div>
    `;
    recipeDetailsDiv.style.display = "flex";
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}

function toggleInstructions() {
  const instructions = document.querySelector(".instructions-list");
  const buttonText = document.querySelector(".instructions-toggle");
  if (instructions.style.display === "none") {
    instructions.style.display = "block";
    buttonText.textContent = "Hide Instructions";
  } else {
    instructions.style.display = "none";
    buttonText.textContent = "Show Instructions";
  }
}

function closeRecipeDetails() {
  const recipeDetailsDiv = document.getElementById("recipe-details");
  recipeDetailsDiv.style.display = "none";
}

function displayDefaultRecipes() {
  loadRecipes("chicken"); // Change this to any default dish you prefer
}
