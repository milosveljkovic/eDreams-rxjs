import { from } from "rxjs";

export class ReservationsService
{
    constructor(){
    }

    getReservarionsByFlightId(flightId){
        return from(fetch(`http://localhost:3000/reservations?flightId=${flightId}`) 
        .then(response=>response.json()));
    }

}