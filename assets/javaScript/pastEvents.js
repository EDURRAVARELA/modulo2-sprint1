import { createCardPast, displayCard, createCategorySelector, displayCategories, filterByCheck} from '../module/function.js'

const pastEventsCards = document.getElementById('pastEventsCard')
const categorySelector = document.getElementById("categorySelector")
const nameSelector = document.getElementById("nameSelector")

let baseDate 

let events
let categories
fetch ('https://mindhub-xj03.onrender.com/api/amazing')
.then( response => response. json() )
.then( data =>{
baseDate =data.currentDate
events = data.events.filter(event => event.date < baseDate)
displayCard(events, pastEventsCards)
categories = Array.from(new Set( events.map( events => events.category)))
displayCategories(categories, categorySelector)
})
.catch(err => console. log(err))





categorySelector.addEventListener('change', event => {
  const filteredEvents = filterByCheck(events)
  displayCard(filteredEvents, pastEventsCards)
} ) 


nameSelector.addEventListener('input', event => {
  const search = event.target.value
  const filteredEvents = filterByCheck(events)
  let eventfilteredByName = []
for (let event of filteredEvents)
    if (event.name.includes(search)){
    eventfilteredByName.push(event)
    }
    displayCard(eventfilteredByName, pastEventsCards)
})
