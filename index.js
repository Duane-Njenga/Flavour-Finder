document.addEventListener("DOMContentLoaded", () =>{
    let home = document.getElementById("Home");
    

    fetch(`http://localhost:3000/recipes`)
    .then(res => res.json())
    .then(recipes => {recipes.forEach(recipe => {
        let newDiv = document.createElement("div");
        let image = document.createElement("img");
        let ID = document.createElement("p")
        let name = document.createElement("p");
        let category = document.createElement("p");
        let saveBtn = document.createElement("button");
        let link = document.createElement("a")
            
            newDiv.className = 'card';
            //ID
            ID.className = 'hidden';
            ID.innerText = `${recipe.id}`;
            //Image
            image.className = 'image';
            image.src = `${recipe.picture}`;
            image.alt =`${recipe.name}`;
            link.appendChild(image)

            //Name
            name.className = 'name';
            name.innerText =`${recipe.name}`;


            //Category
            category.className = 'category';
            category.innerText=`Category: ${recipe.category}`;
           
            //Save
            saveBtn.innerText = `Save`;
            saveBtn.className = 'save';

            let elementsArray = [image, name, category, saveBtn, ID]
            
            elementsArray.forEach(element => {
                
                newDiv.appendChild(element)
            })

        
        home.appendChild(newDiv);
        })
    })


    function save() {
        let SaveButton = document.getElementsByClassName('save');
        console.log(SaveButton);
        
        for (let btn of SaveButton) {
            console.log(btn);
            
            let postCard = btn.parentElement.children; // Use children instead of childNodes
            console.log(btn.parentElement);
            
            let name = postCard[1].textContent;
            let category = postCard[2].innerText.replace('Category: ', '');
            let picture = postCard[0].src;
            let ID = postCard[4].textContent;
            console.log(ID);
            
            btn.addEventListener('click', () => {
        
                if (btn.classList.contains('save')) { // Use .contains() instead of ==
                    btn.classList.add('saved');
                    btn.classList.remove('save');
                    btn.innerText = 'Unsave';
        

                    fetch("http://localhost:3000/savedRecipes",  
                        {
                            method : "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept" : "application/json"
                            },
                            body : JSON.stringify({
                                id:`${ID}`,
                                name : `${name}`,
                                category: `${category}`,
                                picture : `${picture}`
                            })
                        }
                    );
                    
                } else {
                    btn.classList.remove('saved');
                    btn.classList.add('save');
                    btn.innerText = 'Save';

                    fetch(`http://localhost:3000/savedRecipes/${ID}`,  
                        {
                            method : "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept" : "application/json"
                            },
                            
                        }
                    );
                }
            });
        }
        

    }
        

save();

    
});





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

setupDarkmode();


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
    
    if(veganCheck || glutenCheck || pescCheck || vegetarianCheck === true){
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
        location.reload()
    }
}


document.getElementById('Vegan').addEventListener('change', filter);
document.getElementById('Gluten-Free').addEventListener('change', filter);
document.getElementById('Vegetarian').addEventListener('change', filter);
document.getElementById('Pescatarian').addEventListener('change', filter);


