console.log('%c HI', 'color: firebrick')

let breeds = []

document.addEventListener("DOMContentLoaded",function() {
    loadDogImages()
    loadDogBreeds()
    addBreedSelectListener()
})

function loadDogImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => {
            json.message.forEach(image => addImage(image))
        })
}

function addImage(dogPicUrl){  
    let imgDiv = document.getElementById("dog-image-container")
    let dogImgUrl = document.createElement("img")
    dogImgUrl.src = dogPicUrl
    imgDiv.appendChild(dogImgUrl)
}

function loadDogBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => {
            breeds = Object.keys(json.message) //breeds are listed as keys in the JSON
            breeds.forEach(breed => addBreed(breed))
        })
}

function addBreed(breed){
    console.log(breed)
    let breedUl = document.getElementById("dog-breeds")
    let breedLi = document.createElement("li")
    breedLi.addEventListener("click", updateColor)
    breedLi.style.cursor = "pointer"

    breedLi.innerHTML = breed
    breedUl.appendChild(breedLi)
    
}

function updateColor(e){
    e.target.style.color = "cornflowerblue"
}

function addBreedSelectListener(){
    let breedDropdown = document.getElementById("breed-dropdown")
    breedDropdown.addEventListener("change", filterBreeds)
}

function filterBreeds(e){
    let letter = e.target.value
    filteredBreeds = breeds.filter(breed => breed.startsWith(letter))
    console.log(filteredBreeds)

    let breedUl = document.getElementById("dog-breeds")
    clearUl(breedUl)
    filteredBreeds.forEach(breed => addBreed(breed))
}

function clearUl(ul){
    let li = ul.lastElementChild
    while(li){
        ul.removeChild(li)
        li = ul.lastElementChild     
    }
}


