import { from } from "rxjs";

export class TicketsService
{
    constructor(){
    }

    getTicketsByFlightId(flightId){
        return from(fetch(`http://localhost:3000/tickets?flightId=${flightId}`) 
        .then(response=>response.json()));
    }

    addTicket(ticket){
        const newTicket={
            method:"post",
            body: JSON.stringify(ticket),
            headers:{'Content-Type':'application/json'},
        };
        fetch(`http://localhost:3000/tickets`,newTicket).then((response)=>response.json())
        
    }
}