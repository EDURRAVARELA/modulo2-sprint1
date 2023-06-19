export function createCard(object){
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
export function createCardPast(object){
  return `<div class="col">
  <div class="card h-100 p-4 bg-purple-dark">
    <img src="${object.image}" class="card-img-top rounded-4" alt=" ">
    <div class="card-body text-light">
      <h5 class="card-title">${object.name}</h5>
      <p class="card-text">${object.description}</p>
    </div>
    <div class="card-body d-flex text-light justify-content-around align-items-end">
      <p>${object.price}$</p>
      <a href="./details.html?id=${object._id}"
        class="card-link bg-purple text-light text-decoration-none rounded-3 p-1 button-details">Details</a>
    </div>
  </div>
</div>`
}

export function displayCard(array, elementHTML){
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

 export function createCategorySelector(array){
  return `<div class="d-flex m-2">
     <input type="checkbox" id="${array}" name="categories" value="${array}" />
     <label for="${array}">${array}</label>
   </div>`
   
}

export function displayCategories(array, elementHTML){
  let template = ""
  for (let eventCategory of array){
      template += createCategorySelector(eventCategory)
  }
  elementHTML.innerHTML = template
}

export function filterByCheck( array){
  const checkbox = Array.from( document.querySelectorAll('input[type=checkbox]:checked') ).map( check => check.value)
  if (checkbox.length == 0){
    return array
  }else {
  const filteredEvents = array.filter( event => checkbox.includes( event.category))
  return filteredEvents
  }
}


export function highestAttendance(array){
  let highest = 0;
  let position = "";
  for(let event of array){
      if((event.assistance * 100) / event.capacity > highest){
          highest = ((event.assistance / event.capacity) * 100).toFixed(2)
          position = event.name;
      }
  }    
  return position + " " + highest + "%"; 
}

export function lowestAttendance(array){
  let lowest = 100;
  let position = "";
  for(let event of array){
      if((event.assistance * 100) / event.capacity < lowest){
          lowest = ((event.assistance/ event.capacity) * 100).toFixed(2)
          position = event.name;
      }
  }    
  return position + " " + lowest + "%"
}

export function largerCapacity(array){
  let larger = 0;
  let position = "";
  for(let event of array){
      if(event.capacity > larger){
          larger = event.capacity
          position = event.name
      }
  }    
  return position + " " + larger.toLocaleString()
}

export function revenuesPerCategoryUpcoming(array, category){
  let totalRevenues = 0;
  for(let event of array ){
      if(event.category == category){
          totalRevenues += event.price * event.estimate;
      }
  }
  return totalRevenues;  
}

export function revenuesStatisticsUpcoming(array, category){
  let results = [];
  for(let i=0; i<category.length; i++){
      let revenueByCategory = {
          revenue: (parseFloat(revenuesPerCategoryUpcoming(array, category[i]))).toLocaleString()
      }
      results.push(revenueByCategory);
  }          
  return results;
}

export function percentageStatisticsUpcoming(array, category){
  let results = [];
    for(let i=0; i<category.length; i++){
        let percentageByCategory = {
            percentageAttendance: promedy(attendancePercentageUpcoming(array, category[i])).toFixed(2)
        }
        results.push(percentageByCategory);
    }
    return results;
}

export function attendancePercentageUpcoming(array, category){
  let porcentage = [];
  for(let event of array){
      if(event.category == category){
          porcentage.push((event.estimate / event.capacity) * 100);            
      }
  }return porcentage; 
}

export function promedy(array){
  let sum = 0;
  for(let event of array){
      sum += event
  }
  const promedy = sum / array.length;
  return promedy
}

export function revenuesPerCategoryPast(array, category){
  let totalRevenues = 0;
  for(let event of array){
      if(event.category == category){
          totalRevenues += event.price * event.assistance;
      }
  }
  return totalRevenues;  
}

export function revenuesStatisticsPast(array, category){
  let results = []
  for(let i=0; i<category.length; i++){
      let revenueByCategory = {
          revenue: (parseFloat(revenuesPerCategoryPast(array, category[i]))).toLocaleString()
      }
      results.push(revenueByCategory);
  }
  return results;       
}

export function attendancePercentagePast(array, category){
  let porcentage = [];
  for(let event of array){
      if(event.category == category){
          porcentage.push((event.assistance * 100) / event.capacity);            
      }
  }return porcentage; 
}

export function percentageStatisticsPast(array, category){
  let results = [];
  for(let i=0; i<category.length; i++){
      let percentageByCategory = {
          percentageByCategory: promedy(attendancePercentagePast(array, category[i])).toFixed(2)
      }
      results.push(percentageByCategory);
  }
  return results;
}