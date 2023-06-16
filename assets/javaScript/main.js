
const cards = document.getElementById("card")
const categorySelector = document.getElementById("categorySelector")
const nameSelector = document.getElementById("nameSelector")


let events
let category
let categorySet
let categories
fetch ('https://mindhub-xj03.onrender.com/api/amazing')
.then( response => response. json() )
.then( data =>{
events = data.events
displayCard(events, cards)
category = events.map( events => events.category)
categorySet = new Set( category)
categories = Array.from(categorySet)
displayCategories(categories, categorySelector)
})
.catch(err => console. log(err))

function createCard(object){
    return `<div class="col">
    <div class="card h-100 p-4 bg-purple-dark">
      <img src="${object.image}" class="card-img-top rounded-4" alt=" ">
      <div class="card-body text-light">
        <h5 class="card-title">${object.name}</h5>
        <p class="card-text">${object.description}</p>
      </div>
      <div class="card-body d-flex text-light justify-content-around align-items-end">
        <p>${object.price}$</p>
        <a href="./assets/pages/details.html?id=${object._id}"
          class="card-link bg-purple text-decoration-none text-light rounded-3 p-1 button-details">Details</a>
      </div>
    </div>
  </div>`
}

function displayCard(array, elementHTML){
    let template = ""
    if (array.length > 0){
    for (let event of array){
        template += createCard(event)
    }
    elementHTML.innerHTML = template
  }else {
    elementHTML.innerHTML = `<h2>There are no events that meet your search criteria. </h2>`
  }
}



function createCategorySelector(array){
       return `<div class="d-flex m-2">
          <input type="checkbox" id="${array}" name="categories" value="${array}" />
          <label for="${array}">${array}</label>
        </div>`
        
}

function displayCategories(array, elementHTML){
  let template = ""
  for (let eventCategory of array){
      template += createCategorySelector(eventCategory)
  }
  elementHTML.innerHTML = template
}


categorySelector.addEventListener('change', event => {
  const filteredEvents = filterByCheck(events)
  displayCard(filteredEvents, cards)
} ) 

function filterByCheck( array){
  const checkbox = Array.from( document.querySelectorAll('input[type=checkbox]:checked') ).map( check => check.value)
  if (checkbox.length == 0){
    return array
  }else {
  const filteredEvents = events.filter( event => checkbox.includes( event.category))
  return filteredEvents
  }
}

nameSelector.addEventListener('input', event => {
  const search = event.target.value
  const filteredEvents = filterByCheck(events)
  let eventfilteredByName = []
for (let event of filteredEvents)
    if (event.name.includes(search)){
    eventfilteredByName.push(event)
    }
    displayCard(eventfilteredByName, cards)
})

