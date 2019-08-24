import {fromEvent,combineLatest} from "rxjs";
import { map,debounceTime,switchMap,withLatestFrom} from "rxjs/operators";

import { FlightsService } from "../../Services/flightsService";
import {RouterComponent} from "../../Router/RouterComponent";

export class MainPage{

    constructor(){
        this.flights=new FlightsService();
        this.router=new RouterComponent();
    }

    createMainContainer(contentContainer){

        contentContainer.innerHTML="";

        const mainContentContainer=document.createElement("div");
        mainContentContainer.className="mainContentContainer";
        contentContainer.appendChild(mainContentContainer);
        this.createBody(mainContentContainer);
    }
    
     createBody(mainContainer){
        this.createControlContainer(mainContainer);
        this.createDataContainer(mainContainer);
    }
    
    createControlContainer(mainContainer){
        const controlContainer=document.createElement("div");
        controlContainer.className="controlContainer";
        mainContainer.appendChild(controlContainer);
    
        this.createControlsInControlContainer(controlContainer);
    }
    
    createControlsInControlContainer(controlContainer){
        const paragraphFrom=document.createElement("p");
        paragraphFrom.innerHTML="From: ";
        paragraphFrom.className="paragraph font";
        controlContainer.appendChild(paragraphFrom);
    
        const inputFrom=document.createElement("input");
        inputFrom.className="input";
        inputFrom.id="inputFrom";
        controlContainer.appendChild(inputFrom);
    
        const paragraphTo=document.createElement("p");
        paragraphTo.innerHTML="To: ";
        paragraphTo.className="paragraph font";
        controlContainer.appendChild(paragraphTo);
    
        const inputTo=document.createElement("input");
        inputTo.className="input";
        inputTo.id="inputTo";
        controlContainer.appendChild(inputTo);
    
        const paragraphDateOfDeparture=document.createElement("p");
        paragraphDateOfDeparture.innerHTML="Date of departure: ";
        paragraphDateOfDeparture.className="paragraph font";
        controlContainer.appendChild(paragraphDateOfDeparture);
    
        const inputDateOfDeparture=document.createElement("input");
        inputDateOfDeparture.className="input";
        inputDateOfDeparture.type="date";
        inputDateOfDeparture.id="inputDateOfDeparture";
        controlContainer.appendChild(inputDateOfDeparture);
    
        const searchButton=document.createElement("button");
        searchButton.innerHTML="Search";
        searchButton.id="searchButton";
        searchButton.className="buttonDesign font";
        controlContainer.appendChild(searchButton);
    }
    
    createDataContainer(mainContainer){
        const dataContainer=document.createElement("div");
        dataContainer.className="dataContainer";
        mainContainer.appendChild(dataContainer);
        
        this.createFlightsContainer(dataContainer);
    }
    
    createFlightsContainer(dataContainer){
        const flightsContainer=document.createElement("div");
        flightsContainer.className="flightsContainer";
        flightsContainer.id="flightsContainer";
        dataContainer.appendChild(flightsContainer);
    
        const pFromTo=document.createElement("p");
        pFromTo.className="pFromTo";
        pFromTo.id="pFromTo";
        flightsContainer.appendChild(pFromTo);
    
        /*sadrzi listu letova */
        const listOfFlightsContainer=document.createElement("div");
        listOfFlightsContainer.className="listOfFlightsContainer";
        listOfFlightsContainer.id="listOfFlightsContainer";
        flightsContainer.appendChild(listOfFlightsContainer);
    
        this.searchFlights();
    }

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    searchFlights(){

        const searchButton=document.getElementById("searchButton");
      
        fromEvent(searchButton,"click").pipe(
          withLatestFrom(
              this.inputObservable(),
              this.dateOfDepartureObservable()
              ),
          switchMap(
              FromToDeparturedate=>this.flights.getFlightsByDepartureArrivalPlacesAndDepartureDate(FromToDeparturedate))
           ).subscribe(flights=>this.createListOfFlights(flights));
    }
      
    inputObservable(){

        const from=document.getElementById("inputFrom");
        const to=document.getElementById("inputTo");
      
        var streamInputFrom$=fromEvent(from,"input")
        .pipe(
          map(input=>input.target.value));
      
        var streamInputTo$=fromEvent(to,"input")
        .pipe(
          debounceTime(1000),
          map(input=>input.target.value)
        );
      
        return combineLatest(streamInputFrom$,streamInputTo$);
    }
      
    dateOfDepartureObservable(){
        const dateOfDeparture=document.getElementById("inputDateOfDeparture");
      
        return fromEvent(dateOfDeparture,"input")
        .pipe(
          map(input=>input.target.value)
        )
    }
      
    createListOfFlights(flights){
        const pFromTo=document.getElementById("pFromTo");
        const listOfFlightsContainer=document.getElementById("listOfFlightsContainer");
      
        while (listOfFlightsContainer.hasChildNodes()) {   
          listOfFlightsContainer.removeChild(listOfFlightsContainer.firstChild);
        }
      
        pFromTo.style.visibility="visible";
      
        if(flights.length==0){
            pFromTo.innerHTML="Looks like there aren't any flights between those places!"; 
        }else{
            pFromTo.innerHTML=flights[0].from+"-"+flights[0].to;

            flights.forEach(flight=>{
      
                const flightContainer=document.createElement("div");
                flightContainer.id="flightContainer";
                flightContainer.className="flightContainer";
                listOfFlightsContainer.appendChild(flightContainer);
        
                const imgHolderContainer=document.createElement("div");
                imgHolderContainer.className="imgHolderContainer";
                flightContainer.appendChild(imgHolderContainer)
        
                const companyImg = document.createElement("img");
                companyImg.setAttribute("src", `../resources/${flight.company}.jpg`);
                imgHolderContainer.appendChild(companyImg);
        
                const flightInfoContainer=document.createElement("div");
                flightInfoContainer.id="flightInfoContainer";
                flightInfoContainer.className="flightInfoContainer";
                flightContainer.appendChild(flightInfoContainer);
        
                this.createInfoContainer(flightInfoContainer,flight);
        
                const buttonContainer=document.createElement("div");
                buttonContainer.id="buttonContainer";
                buttonContainer.className="buttonContainer";
                flightContainer.appendChild(buttonContainer);
        
                this.createButtonContainer(buttonContainer,flight);
      
            })
        }
    }
      
    createInfoContainer(flightInfoContainer,flight){

        const pFromTo=document.createElement("paragraph");
        pFromTo.className="infoParagraphFromTo";
        pFromTo.innerHTML=flight.from+" - "+flight.to;
        flightInfoContainer.appendChild(pFromTo);

        const pDepartureDateAndTime=document.createElement("paragraph");
        var formatedDate=this.formatDate(flight.departure);
        pDepartureDateAndTime.innerHTML=formatedDate+" | "+flight.time;
        flightInfoContainer.appendChild(pDepartureDateAndTime);
        
        if(flight.availabletickets>10){
        const price=document.createElement("paragraph");
        price.className="infoParagraphFromTo";
        price.innerHTML="Price: "+flight.price+" EUR"
        flightInfoContainer.appendChild(price);

        const tickets=document.createElement("paragraph");
        tickets.className="tickets";
        tickets.innerHTML="Tickets: "+flight.availabletickets
        flightInfoContainer.appendChild(tickets);

        }else{
            const price=document.createElement("paragraph");
            price.className="infoParagraphFromTo";
            price.innerHTML="Price: <del>"+flight.price+"</del>, new price: "+flight.price/2+" EUR (50% off)";
            flightInfoContainer.appendChild(price);

            const tickets=document.createElement("paragraph");
            tickets.className="tickets attention";
            tickets.innerHTML="<span style='color:#CD0000'> Only "+flight.availabletickets+" tickets left!</span>"
            flightInfoContainer.appendChild(tickets);
        }
    }

    formatDate(date){
        var MMDDYYYY=date.split("-");
        return MMDDYYYY[1]+"/"+MMDDYYYY[2]+"/"+MMDDYYYY[0];
    }  

    createButtonContainer(buttonContainer,flight){
      
        // const buyTicketContainer=document.createElement("div");
        // buyTicketContainer.className="buyTicketContainer";
        // buttonContainer.appendChild(buyTicketContainer);
    
        const buyTicketButton=document.createElement("button");
        buyTicketButton.id=flight.id;
        buyTicketButton.innerHTML="Buy Ticket";
        buyTicketButton.className="buttonDesign font infoContainerButton";
        buttonContainer.appendChild(buyTicketButton);
    
        buyTicketButton.onclick=(ev)=>{
            this.router.openTicketPage(flight.id);
        }
    }

}