import { createCard, displayCard, createCategorySelector, displayCategories, filterByCheck} from '../module/function.js'


const cards = document.getElementById("card")
const categorySelector = document.getElementById("categorySelector")
const nameSelector = document.getElementById("nameSelector")


let events
let categories
fetch ('https://mindhub-xj03.onrender.com/api/amazing')
.then( response => response. json() )
.then( data =>{
events = data.events
displayCard(events, cards)
categories = Array.from(new Set( events.map( events => events.category)))
console.log(categories)
displayCategories(categories, categorySelector)
})
.catch(err => console. log(err))



categorySelector.addEventListener('change', event => {
  const filteredEvents = filterByCheck(events)
  console.log(filteredEvents)
  displayCard(filteredEvents, cards)
} ) 


nameSelector.addEventListener('input', event => {
  const search = event.target.value
  const filteredEvents = filterByCheck(events)
  let eventfilteredByName = []
for (let event of filteredEvents)
    if (event.name.includes(search)){
    eventfilteredByName.push(event)
    console.log(eventfilteredByName)
    }
    displayCard(eventfilteredByName, cards)
})

