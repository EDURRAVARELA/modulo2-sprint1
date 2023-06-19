import {highestAttendance, lowestAttendance, largerCapacity, percentageStatisticsUpcoming, revenuesStatisticsUpcoming, revenuesStatisticsPast, percentageStatisticsPast} from '../module/function.js'

const firstTable = document.getElementById("firstTable")
const secondTable = document.getElementById("secondTable")
const thirdTable = document.getElementById("thirdTable")

let baseDate
let events
let pastEvents
let upcomingEvents
let categories
let categoriesPast
let categoriesUpcoming

fetch ('https://mindhub-xj03.onrender.com/api/amazing')
.then( response => response. json() )
.then( data =>{
baseDate =data.currentDate
events = data.events
pastEvents = data.events.filter(event => event.date < baseDate)
upcomingEvents = data.events.filter(event => event.date > baseDate)
categories = Array.from(new Set( events.map( events => events.category)))
categoriesPast = Array.from(new Set( pastEvents.map( events => events.category)))
categoriesUpcoming = Array.from(new Set( upcomingEvents.map( events => events.category)))
let eventHighestAttendance = highestAttendance(pastEvents)
let eventLowestAttendance = lowestAttendance(pastEvents)
let eventLargerCapacity = largerCapacity(events)

const eventStatics = {
            highest: eventHighestAttendance,
            lowest: eventLowestAttendance,
            larger: eventLargerCapacity
}

const firstTableTemplate =
                            `<tr>
                                <td>${eventStatics.highest}</td>
                                <td>${eventStatics.lowest}</td>
                                <td>${eventStatics.larger}</td>
                            </tr>`

firstTable.innerHTML = firstTableTemplate

const revenuesUpcomingEvents = revenuesStatisticsUpcoming(upcomingEvents, categoriesUpcoming)

const percentagesUpcomingEvents = percentageStatisticsUpcoming(upcomingEvents, categoriesUpcoming)
        

const arrayUpcomingEvents = categoriesUpcoming.map((category, index)=>{
     return{
            category: category,
            revenue: revenuesUpcomingEvents[index].revenue,
            percentage: percentagesUpcomingEvents[index].percentageAttendance
        }
    })

        const secondTableTemplate = arrayUpcomingEvents.reduce((acc, act) =>{
                return  acc +  `<tr>
                                <td>${act.category}</td>
                                <td>$${act.revenue}</td>
                                <td>${act.percentage}%</td>
                            </tr>`           
        },"")
        
        secondTable.innerHTML = secondTableTemplate;

        const revenuesPastEvents = revenuesStatisticsPast(pastEvents, categoriesPast)
        console.log(revenuesPastEvents);

        const percentagesPastEvents = percentageStatisticsPast(pastEvents, categoriesPast)
        console.log(percentagesPastEvents);

        const arrayPastEvents = categoriesPast.map((category, index)=>{
            return{
                category: category,
                revenue: revenuesPastEvents[index].revenue,
                percentage: percentagesPastEvents[index].percentageByCategory
            }
        });

        console.log(arrayPastEvents);

        const thirdTableTemplate = arrayPastEvents.reduce((acc, act) =>{
            return  acc +  `<tr>
                                <td>${act.category}</td>
                                <td>$${act.revenue}</td>
                                <td>${act.percentage}%</td>
                            </tr>`
        },"")
        
        thirdTable.innerHTML = thirdTableTemplate;

})
.catch(err => console. log(err))