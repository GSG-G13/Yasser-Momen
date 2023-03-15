let myIngredients = [];

document.querySelector("input.btn").addEventListener("click", (event) => {
  event.preventDefault();

  let myInput = document.querySelector(".myInput");
  addIngredient(`${myInput.value}`);

  myInput.value = "";
});

const showingredients = () => {
  document.querySelector(".myingredients").innerHTML = "";
  myIngredients.forEach((element) => {
    document.querySelector(
      ".myingredients"
    ).innerHTML += `<span onClick="deleteIngredient(${element.id})" id=${element.id}>${element.name}</span>`;
  });
};

const addIngredient = (ingredient) => {
  if (ingredient !== "") {
    myIngredients.push({
      name: `${ingredient}`,
      id: Math.floor(Math.random() * 1000),
    });
    showingredients();
    ShowResults();
  } else {
    alert("Enter valid ingredient value");
  }
};

const deleteIngredient = (idToRemove) => {
  myIngredients = myIngredients.filter((obj) => obj.id !== idToRemove);
  showingredients();
  console.log(myIngredients);
  ShowResults();
};

const ShowResults = () => {
  let query = "";
  if (myIngredients.length !== 0) {
    myIngredients.forEach((Ingredient) => {
      query += ` ${Ingredient.name}`;
    });
    xhrFunc(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=aa0ecd38&app_key=%20faaaf58a1de94869c3e7173cc85c005d%09&imageSize=REGULAR&random=true`,
      alterResultDom
    );
  } else {
    document.querySelector(
      ".box-container"
    ).innerHTML = `<span class="noData">There is no data to show</span>`;
  }
};

const alterResultDom = (data) => {
  let ResultContainer = document.querySelector(".box-container");
  ResultContainer.innerHTML = "";
  data.hits.forEach((result) => {
    ResultContainer.innerHTML += `<div class="box" data-aos="fade-up">
    <div class="image">
      <img src="${result.recipe.image}" alt="" />
      </div>
      <div class="content">
        <div class="title">${result.recipe.label}</div>
        <p>
          ${result.recipe.dishType}
        </p>
      </div>
      <div class="content">
        <a class="btn" onclick="show_Popup('${result.recipe.ingredientLines}')">More Details</a>
      </div>
    </div>`;
  });
  console.log(data.hits[0].recipe);
};

const show_Popup = (hit) => {
  document.body.innerHTML += `<div class="popup">${hit}</div>`;
  // console.log(hit);
  document.querySelector("#packages").addEventListener("click", function () {
    // Hide the element
    document.querySelector(".popup").style.display = "none";
  });
};

// ShowResults();
