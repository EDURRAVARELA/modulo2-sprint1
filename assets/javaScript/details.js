const card = document.getElementById("card")

const params = new URLSearchParams( location.search )

const id = params.get("id")
console.log(id)

const eventDetails = data.events.find( element => element._id == id )


card.innerHTML =
`<div class="row g-0">
        <div class="col-md-4 d-flex align-items-center justify-content-center p-2">
          <img src="${eventDetails.image}" class="img-fluid rounded-start" alt="">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${eventDetails.name}</h5>
            <p class="card-text">Date:${eventDetails.date}</p>
            <p class="card-text">${eventDetails.description}</p>
            <p class="card-text">Category:${eventDetails.category}</p>
            <p class="card-text">Place:${eventDetails.place}</p>
            <p class="card-text">Capacity:${eventDetails.assistance}</p>
            <p class="card-text">Assistance:${eventDetails.assistance}</p>
            <p class="card-text">Price:${eventDetails.price}</p>
          </div>
        </div>
      </div>`