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
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`,
            alterResultDom
        );
    } else {
        document.querySelector(
            ".box-container"
        ).innerHTML = `<span class="noData">There is no data to show</span>`;
    }
};

const alterResultDom = (data) => {
    console.log(data)
    let ResultContainer = document.querySelector(".box-container");
    ResultContainer.innerHTML = "";
    data.drinks.forEach((result) => {
        ResultContainer.innerHTML += `
                <div class="box" data-aos="fade-up">
          <div class="image">
            <img src="${result.strDrinkThumb}" alt="" />
            <!-- <h3><i class="fas fa-utensils"></i> Burger</h3> -->
          </div>
          <div class="content">
            <div class="title">${result.strDrink}</div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero,
              vitae.
            </p>
          </div>
        </div>
        `
    });
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