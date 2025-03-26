document.addEventListener("DOMContentLoaded", () =>{
    let home = document.getElementById("Home");
    
    
    fetch(`http://localhost:3000/recipes`)
    .then(res => res.json())
    .then(recipes => {recipes.forEach(recipe => {
        let newDiv = document.createElement("div");
        let image = document.createElement("img")
        let name = document.createElement("p");
        let category = document.createElement("p");
        let saveBtn = document.createElement("button");
        let link = document.createElement('a')
            link.appendChild(newDiv)
            newDiv.className = 'card';
            //Image
            image.className = 'image';
            image.src = `${recipe.picture}`;
            image.alt =`${recipe.name}`;

            //Name
            name.className = 'name';
            name.innerText =`${recipe.name}`;


            //Category
            category.className = 'category';
            category.innerText=`Category: ${recipe.category}`;
           
            //Save
            saveBtn.innerText = `Save`;
            saveBtn.className = 'save';

            let elementsArray = [image, name, category, saveBtn]

            elementsArray.forEach(element => {
                newDiv.appendChild(element)
            })


        home.appendChild(newDiv);
    });
        
    })
});


