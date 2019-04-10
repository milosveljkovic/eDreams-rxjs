import { from } from "rxjs";

export class Flights
{

    constructor(){
    }

    getFlightsByDepartureAndArrivalPlaces(From,To){

        var fromCity=From.charAt(0).toUpperCase()+From.slice(1).toLowerCase();
        var toCity=To.charAt(0).toUpperCase()+To.slice(1).toLowerCase();

        return from(fetch(`http://localhost:3000/flights?from=${fromCity}&to=${toCity}`)
        .then(resoponse=>resoponse.json())
    );
    }

}