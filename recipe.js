document.addEventListener("DOMContentLoaded", () => {
    let recipeId = localStorage.getItem('selectedRecipeId')
    
    if(recipeId)
    fetch(`http://localhost:3000/recipes/${recipeId}`)
        .then(res => res.json())
        .then(recipe => { 
            document.getElementById('name'). innerText = recipe.name;
            document.getElementById('category').innerText = `Category: ${recipe.category}`;
            document.getElementById('image').src = recipe.picture;

            let ingredients = recipe.ingredients;
            let ul = document.getElementById('ingredient-list');

            for(let ingredient of ingredients){
                let li = document.createElement('li');
                li.innerText = ingredient;
                ul.appendChild(li);
            };

            let ol = document.getElementById('instruction-list');
            let instructions = recipe.cookingInstructions;
            for (let instruction of instructions){
                let li = document.createElement('li')
                li.innerText = instruction;

                ol.appendChild(li)
                
            }


        })
        .catch(error => console.error('Error:', error));
 

setupDarkmode();


});
 
function setupDarkmode(){
    let darkModeToggle = document.getElementById("darkmodeToggle")
    let navbar = document.getElementById("navbar");
    let ingredients = document.getElementById("ingredients")
    let instructions =document.getElementById("instructions")

    if(localStorage.getItem("darkMode") === "enabled"){
      


        document.body.classList.add("dark-mode");
        ingredients.classList.add("dark-mode");
        instructions.classList.add("dark-mode");
        navbar.classList.add("dark-mode");
        
        darkModeToggle.checked = true;
        
    }

    darkModeToggle.addEventListener("change", () => {
        if(darkModeToggle.checked){

        document.body.classList.add("dark-mode")
        ingredients.classList.add("dark-mode");
        instructions.classList.add("dark-mode")
        navbar.classList.add("dark-mode");




        localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            ingredients.classList.remove("dark-mode");
            instructions.classList.remove("dark-mode")
            navbar.classList.remove("dark-mode");


        localStorage.setItem("darkMode", "disabled");
        }   
    })
}

