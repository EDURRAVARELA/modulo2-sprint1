let baseDate = new Date(data.currentDate);
console.log(baseDate)

let upcomingEventsCards = document.getElementById('upcomingEventsCard');

function createCard(object){
    return `<div class="col">
    <div class="card h-100 p-4 bg-purple-dark">
      <img src="${object.image}" class="card-img-top rounded-4" alt=" ">
      <div class="card-body text-light">
        <h5 class="card-title">${object.name}</h5>
        <p class="card-text">${object.description}</p>
      </div>
      <div class="card-body d-flex text-light justify-content-around align-items-end">
        <p>${object.price}</p>
        <a href="./details.html"
          class="card-link bg-purple text-light text-decoration-none rounded-3 p-1 button-details">Details</a>
      </div>
    </div>
  </div>`
}
let eventDate

function displayCard(array, elementHTML){
    for (let event of array){
    eventDate = new Date(event.date)
    if( baseDate < eventDate){
    let template = ""
        template += createCard(event)
    
    elementHTML.innerHTML += template
    }
}

}


displayCard(data.events, upcomingEventsCards)
