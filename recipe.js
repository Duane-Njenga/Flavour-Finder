document.addEventListener("DOMContentLoaded", () => {
    let id = localStorage.getItem('selectedRecipeId')
    

    fetch(`http://localhost:3000/recipes/${id}`)
        .then(res => res.json())
        .then(recipe => {
            //FInish on the page load 
        });
 

setupDarkmode();
});
//Darkmode <<To be worked on 
function setupDarkmode(){
    let darkModeToggle = document.getElementById("darkmodeToggle")

    let welcome = document.getElementById("welcome-message");
    let navbar = document.getElementById("navbar");
    

    if(localStorage.getItem("darkMode") === "enabled"){
      


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




        localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            welcome.classList.remove("dark-mode");
            navbar.classList.remove("dark-mode");


        localStorage.setItem("darkMode", "disabled");
        }   
    })
}

