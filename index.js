document.addEventListener("DOMContentLoaded", () => {
    

    fetch(`http://localhost:3000/recipes`)
        .then(res => res.json())
        .then(recipes => {
            recipes.forEach(recipe => createCard(recipe));
            loadSavedRecipes();
            linkRecipes(); 
        });
    setupDarkmode();
    
});

function createCard(recipe) {
    let home = document.getElementById("Home");

    let card = document.createElement("div");
    card.className = 'card';

    card.innerHTML = `
        <a href = "#" id = "${recipe.id}" class = "recipe-display"><img src="${recipe.picture}" alt="${recipe.name}" class="image">
        <p class="name">${recipe.name}</p></a>
        <p class="category">Category: ${recipe.category}</p>
        <button class="save" id="${recipe.id}">Save</button>
    `;

    home.appendChild(card);


    let saveBtn = card.querySelector('button');
    saveBtn.addEventListener('click', () => save(saveBtn, recipe));
}

function save(btn, recipe) {
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    let isSaved = savedRecipes.some(item => item.id === recipe.id);

    if (isSaved) {

        savedRecipes = savedRecipes.filter(item => item.id !== recipe.id);
        btn.classList.remove('saved');
        btn.classList.add('save');
        btn.innerText = 'Save';


        fetch(`http://localhost:3000/savedRecipes/${recipe.id}`, 
            { method: "DELETE",
                headers: 
                {"Content-Type": "application/json",
                    "Accept" : "application/json"
                },
             }
        );
    } else {

        savedRecipes.push(recipe);
        btn.classList.add('saved');
        btn.classList.remove('save');
        btn.innerText = 'Unsave';


        fetch("http://localhost:3000/savedRecipes", {
            method: "POST",
            headers:
            { "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(recipe)
        });
    }


    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
}

function loadSavedRecipes() {
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    savedRecipes.forEach(recipe => {
        let btn = document.querySelector(`button[id="${recipe.id}"]`);
        if (btn) {
            btn.classList.add('saved');
            btn.classList.remove('save');
            btn.innerText = 'Unsave';
        }
    });
}




//Dark Mode 
function setupDarkmode(){
    let darkModeToggle = document.getElementById("darkmodeToggle")

    let welcome = document.getElementById("welcome-message");
    let navbar = document.getElementById("navbar");
    

    if(localStorage.getItem("darkMode") === "enabled"){
      
        for(let element of cards ){
            element.classList.add("dark-mode")
        }

        document.body.classList.add("dark-mode");
        welcome.classList.add("dark-mode");
        navbar.classList.add("dark-mode");
        
        darkModeToggle.checked = true;
        
    }

    darkModeToggle.addEventListener("change", () => {
        if(darkModeToggle.checked){

        document.body.classList.add("dark-mode")
        welcome.classList.add("dark-mode");
        navbar.classList.add("dark-mode");


        for(let elment of cards ){
            elment.classList.add("dark-mode")
        }


        localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            welcome.classList.remove("dark-mode");
            navbar.classList.remove("dark-mode");


            for(let elment of cards ){
             elment.classList.remove("dark-mode");
            }

        localStorage.setItem("darkMode", "disabled");
        }   
    })
}




// Search Functionality
let searchInput = document.getElementById('searchInput');
let searchForm = document.getElementById('search')
let cards = document.getElementsByClassName("card");

function search(){
    let searchVal = searchInput.value

    for(let card of cards){
        let name = card.children[1].textContent;

            name = name.toLowerCase();
            searchVal = searchVal.toLowerCase();

        if(name.includes(searchVal)){
            console.log("Food Found");
            
        }else{
            card.classList.add('hidden');   
        }
            
        
        
    }
    
}


searchForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    search()
     
})




//Filter Functionality 
function filter() {
    let veganCheck = document.getElementById('Vegan').checked;
    let glutenCheck = document.getElementById('Gluten-Free').checked;
    let vegetarianCheck = document.getElementById('Vegetarian').checked;
    let pescCheck = document.getElementById('Pescatarian').checked;
    
    if((veganCheck || glutenCheck || pescCheck || vegetarianCheck) === true){
        for (let card of cards) {
            let category = card.querySelector('.category').innerText.replace('Category: ', '').toLowerCase();


            if (
                (veganCheck && category === 'vegan') ||
                (glutenCheck && category === 'gluten-free') ||
                (vegetarianCheck && category === 'vegetarian') ||
                (pescCheck && category === 'pescatarian')
            ){
                }else{
                card.classList.add('hidden');
            }
        }
    }else{
        location.reload();
    }
}

document.getElementById('Vegan').addEventListener('change', filter);
document.getElementById('Gluten-Free').addEventListener('change', filter);
document.getElementById('Vegetarian').addEventListener('change', filter);
document.getElementById('Pescatarian').addEventListener('change', filter);

//Links

function linkRecipes(){
let recipeLinks = document.getElementsByClassName('recipe-display')
    console.log(recipeLinks);
    
    
for(let element of recipeLinks){
    console.log(element);
    element.addEventListener('click', () => {
        localStorage.setItem('selectedRecipeId', element.getAttribute('id'))
        window.location.href = `recipe.html`
    })
    
}
}


