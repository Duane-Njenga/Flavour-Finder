document.addEventListener("DOMContentLoaded", () =>{
    let home = document.getElementById("Home");
    
    
    fetch(`http://localhost:3000/recipes`)
    .then(res => res.json())
    .then(recipes => {recipes.forEach(recipe => {
        let newDiv = document.createElement("div");
        let image = document.createElement("img")
        let name = document.createElement("p");
        let category = document.createElement("p");
        let span = document.createElement("span");
        let saveBtn = document.createElement("button");

            newDiv.className = 'card';

            image.className = 'image';
            image.src = `${recipe.picture}`;
            image.alt =`${recipe.name}`
            newDiv.appendChild(image);

            name.className = 'name';
            name.innerText =`${recipe.name}`;
            newDiv.appendChild(name)

            span.className = 'like-glyph';
            newDiv.appendChild(span);

            category.className = 'category';
            category.innerText=`Category: ${recipe.category}`;

            newDiv.appendChild(category)            

            saveBtn.innerText = `Save`;
            newDiv.appendChild(saveBtn)

        

        home.appendChild(newDiv);
    });
        
    })
})
;