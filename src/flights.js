import { from } from "rxjs";

export class Flights
{

    constructor(){
    }

    getAllFlights(){
        return from(fetch(`http://localhost:3000/flights`)
        .then(resoponse=>resoponse.json())
    );
    }

    getFlightByDepartureCity(departureCity){
        return from(fetch(`http://localhost:3000/flights?from=${departureCity}`)
        .then(resoponse=>resoponse.json())
    );
    }

}