import {zip} from "rxjs";
import { FlightsService } from "../../Services/flightsService";
import {TicketsService} from '../../Services/ticketsService';
import {MainPage} from './MainPage';
import {TicketForm} from './TicketForm';

export class TicketPage{
    constructor(){
        this.flights=new FlightsService();
        this.ticketsService=new TicketsService();
        this.mainPage=new MainPage();
        this.ticketForm=new TicketForm();
    }
    
    createTicketPage(flightId){
        zip(
            this.flights.getFlightById(flightId),
            this.ticketsService.getTicketsByFlightId(flightId)
            ).subscribe(
                flightAndTickets=>this.createTicketContainer(flightAndTickets)
                );
    }

    createTicketContainer(flightAndTickets){
        const contentContainer=document.getElementById("contentContainer");
        contentContainer.innerHTML="";

        const flightInfoTicketsContainer=document.createElement("div");
        flightInfoTicketsContainer.className="flightContainer";
        contentContainer.appendChild(flightInfoTicketsContainer);

        const imgHolderContainer=document.createElement("div");
        imgHolderContainer.className="imgHolderContainer";
        flightInfoTicketsContainer.appendChild(imgHolderContainer)

        const companyImg = document.createElement("img");
        companyImg.setAttribute("src", `../resources/${flightAndTickets[0][0].company}.jpg`);
        imgHolderContainer.appendChild(companyImg);

        const flightInfoContainer=document.createElement("div");
        flightInfoContainer.id="flightInfoContainer";
        flightInfoContainer.className="flightInfoContainer textCentered";
        flightInfoTicketsContainer.appendChild(flightInfoContainer);

        this.mainPage.createInfoContainer(flightInfoContainer,flightAndTickets[0][0]);

        var tickets=flightAndTickets[1];
        this.createListOfTickets(contentContainer,tickets);
        this.createTicketButtonContainer(contentContainer,flightAndTickets[0][0]);
    }
  
    createListOfTickets(contentContainer,tickets){
  
        const ticketsListContainer=document.createElement("div");
        ticketsListContainer.className="ticketsListContainer";
        contentContainer.appendChild(ticketsListContainer);

        this.createTableWithTicketInfo(tickets,ticketsListContainer);
    }
  
    createTableWithTicketInfo(tickets,ticketsListContainer){
  
        const tabelWithTickets=document.createElement("table");
        tabelWithTickets.className="tabelWithTickets";
  
        if(tickets.length==0){
            const pNoTickets=document.createElement("P");
            pNoTickets.innerHTML="No tickets for now.";
            pNoTickets.className="infoParagraphFromTo";
            ticketsListContainer.appendChild(pNoTickets);
        }else{
            let tableHeader="<tr><th>Name</th><th>Surname</th><th>City</th><th>Address</th><th>Package</th></tr>";
            let tableData="";
            tickets.forEach(ticket=>{
                tableData+="<tr><td>"+ticket.name+"</td><td>"+ticket.surname+"</td><td>"+ticket.city+"</td><td>"+ticket.address+"</td><td>"+ticket.package+"</td></tr>";
            })
            tableHeader+=tableData;
            tabelWithTickets.innerHTML=tableHeader;
        }
        ticketsListContainer.appendChild(tabelWithTickets);
    }

    createTicketButtonContainer(contentContainer,flight){

        const buyButtonContainer=document.createElement("div")
        buyButtonContainer.className="buyButtonContainer";
        contentContainer.appendChild(buyButtonContainer);

        const spanParagraph=document.createElement("span");
        spanParagraph.className="spanDesign";
        buyButtonContainer.appendChild(spanParagraph);
        
        if(flight.availabletickets===0){
            const pBuyTicket=document.createElement("p")
            pBuyTicket.className="pBookTicket";
            pBuyTicket.innerHTML="No tickets available.";
            spanParagraph.appendChild(pBuyTicket);
        }else{
            const pBuyTicket=document.createElement("p")
            pBuyTicket.className="pBookTicket";
            pBuyTicket.innerHTML="You want to buy ticket for this flight? Go on Continue!";
            spanParagraph.appendChild(pBuyTicket);

            const spanButton=document.createElement("span");
            spanButton.className="spanDesign";
            buyButtonContainer.appendChild(spanButton);

            const continueButton=document.createElement("button");
            continueButton.className="buttonDesign";
            continueButton.innerHTML="Continue";
            spanButton.appendChild(continueButton);

            continueButton.onclick=(ev)=>{
                buyButtonContainer.innerHTML="";
                this.ticketForm.createTicketForm(flight);
            }
        }
    }
}
