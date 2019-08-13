import {interval,fromEvent,Subject, combineLatest,merge,of,zip } from "rxjs";
import {map,sampleTime,debounceTime,switchMap,withLatestFrom,takeWhile,take} from "rxjs/operators";
import { FlightsService } from "../../Services/flightsService";
import {ReservationsService} from '../../Services/reservationsService';
import {MainPage} from './MainPage';

import {RouterComponent} from "../../Router/RouterComponent";

export class ReservationsPage{
    constructor(){
        this.flights=new FlightsService();
        this.reservationsService=new ReservationsService();
        this.mainPage=new MainPage();
    }
    
    createReservationsPage(flight){
        zip(
            this.flights.getFlightById(flight.id),
            this.reservationsService.getReservarionsByFlightId(flight.id)
            ).subscribe(
                flightAndReservations=>this.createReservationsContainer(flightAndReservations)
                );
    }

    createReservationsContainer(flightAndReservations){
        const contentContainer=document.getElementById("contentContainer");
        contentContainer.innerHTML="";

        const flightInfoReservationContainer=document.createElement("div");
        flightInfoReservationContainer.className="flightContainer";
        contentContainer.appendChild(flightInfoReservationContainer);

        const imgHolderContainer=document.createElement("div");
        imgHolderContainer.className="imgHolderContainer";
        flightInfoReservationContainer.appendChild(imgHolderContainer)

        const companyImg = document.createElement("img");
        companyImg.setAttribute("src", `../resources/${flightAndReservations[0][0].company}.jpg`);
        imgHolderContainer.appendChild(companyImg);

        const flightInfoContainer=document.createElement("div");
        flightInfoContainer.id="flightInfoContainer";
        flightInfoContainer.className="flightInfoContainer";
        flightInfoReservationContainer.appendChild(flightInfoContainer);

        this.mainPage.createInfoContainer(flightInfoContainer,flightAndReservations[0][0]);

        var reservations=flightAndReservations[1];
        this.createListOfReservation(contentContainer,reservations);
    }
  
    createListOfReservation(contentContainer,reservations){
  
        const reservationsListContainer=document.createElement("div");
        reservationsListContainer.className="reservationsListContainer";
        contentContainer.appendChild(reservationsListContainer);

        this.createTableWithReservations(reservations,reservationsListContainer);
  
    }
  
    createTableWithReservations(reservations,reservationsListContainer){
  
        const tabelWithReservations=document.createElement("table");
        tabelWithReservations.className="tableWithReservations";
        console.log(reservations);
  
        if(reservations.length==0){
            const pNoReservations=document.createElement("P");
            pNoReservations.innerHTML="No reservations for now.";
            pNoReservations.className="infoParagraphFromTo";
            reservationsListContainer.appendChild(pNoReservations);
        }else{
            let tableHeader="<tr><th>Name</th><th>Surname</th><th>City</th></tr>";
            let tableData="";
        
            reservations.forEach(reservation=>{
                tableData+="<tr><td>"+reservation.name+"</td><td>"+reservation.surname+"</td><td>"+reservation.city+"</td></tr>";
            })
            tableHeader+=tableData;
            tabelWithReservations.innerHTML=tableHeader;
        }
        reservationsListContainer.appendChild(tabelWithReservations);
    }
}
