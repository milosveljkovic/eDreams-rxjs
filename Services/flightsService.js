import { from } from "rxjs";

export class FlightsService
{
    constructor(){
    }

    getFlightsByDepartureArrivalPlacesAndDepartureDate(FromToDeparturedate){
         var fromCity=FromToDeparturedate[1][0].charAt(0).toUpperCase()+FromToDeparturedate[1][0].slice(1).toLowerCase();
         var toCity=FromToDeparturedate[1][1].charAt(0).toUpperCase()+FromToDeparturedate[1][1].slice(1).toLowerCase();
         var DepartureDate=FromToDeparturedate[2];
         
         return from(fetch(`http://localhost:3000/flights?from=${fromCity}&to=${toCity}&departure=${DepartureDate}`)
        .then(response=>response.json()));
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