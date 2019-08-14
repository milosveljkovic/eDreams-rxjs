import { from } from "rxjs";

export class FlightsService
{
    constructor(){
    }

    getFlightsByDepartureAndArrivalPlaces(From,To){
        var fromCity=From.charAt(0).toUpperCase()+From.slice(1).toLowerCase();
        var toCity=To.charAt(0).toUpperCase()+To.slice(1).toLowerCase();

        return from(fetch(`http://localhost:3000/flights?from=${fromCity}&to=${toCity}`)
        .then(response=>response.json()));
    }

    getFlightsByDepartureArrivalPlacesAndDepartureDate(FromToDeparturedate){
         var fromCity=FromToDeparturedate[1][0].charAt(0).toUpperCase()+FromToDeparturedate[1][0].slice(1).toLowerCase();
         var toCity=FromToDeparturedate[1][1].charAt(0).toUpperCase()+FromToDeparturedate[1][1].slice(1).toLowerCase();
         var DepartureDate=FromToDeparturedate[2];
         
         return from(fetch(`http://localhost:3000/flights?from=${fromCity}&to=${toCity}&departure=${DepartureDate}`)
        .then(response=>response.json()));
    }

    getFlightsByFilters(filter){
        console.log(filter);
        return from(fetch(`http://localhost:3000/flights`) 
        .then(response=>response.json()));
    }

    getFlightByPrices(PriceCheaperOrMoreExpensive){
        if(PriceCheaperOrMoreExpensive[1]=='c'){
            return from(fetch(`http://localhost:3000/flights?price_lte=${PriceCheaperOrMoreExpensive[0]}`)
            .then(response=>response.json()));
        }else{
            return from(fetch(`http://localhost:3000/flights?price_gte=${PriceCheaperOrMoreExpensive[0]}`)
        .then(response=>response.json()));
        }
    }

    getFlightByDate(currentDate){
        //DATE FORMAT YYYY/MM/DD-shortDate 
        var day=currentDate.getDate();
        (day<10)?day="0"+day:day;
        var mon=currentDate.getMonth()+1;
        (mon<10)?mon="0"+mon:mon;
        var shortDate=+currentDate.getFullYear()+"/"+mon+"/"+day
        return from(fetch(`http://localhost:3000/flights?departure=${shortDate}`)
        .then(response=>response.json()));
    }

    getFlightBasedOnLastDepartureDate(){
        return from(fetch(`http://localhost:3000/flights?_sort=departure&_order=desc`)
        .then(response=>response.json())
        .then(listOfFlighs=>listOfFlighs[0]));
    }

    getAllFlights(){
        return from(fetch(`http://localhost:3000/flights`) 
        .then(response=>response.json()));
    }

    getFlightById(id){
        return from(fetch(`http://localhost:3000/flights?id=${id}`) 
        .then(response=>response.json()));
    }

    updateFlight(flight){
        const newFlight={
            method:"put",
            body: JSON.stringify(flight),
            headers:{'Content-Type':'application/json'},
        };
        return from(fetch(`http://localhost:3000/flights/${flight.id}`,newFlight).then((response)=>response.json()))
    }
}