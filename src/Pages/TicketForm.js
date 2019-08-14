import { range } from 'rxjs';
import {FlightsService} from '../../Services/flightsService'
import {TicketsService} from '../../Services/ticketsService';
import { debounceTime, switchMap } from 'rxjs/operators';

export class TicketForm{
    constructor(){
        this.flightService=new FlightsService();
        this.ticketService=new TicketsService();
    }

    createTicketForm(flight){

        const contentContainer=document.getElementById("contentContainer");

        const ticketFormContainer=document.createElement("div")
        ticketFormContainer.className="ticketFormContainer";
        contentContainer.appendChild(ticketFormContainer);

        this.createTitle(ticketFormContainer);
        this.createPassengerContainer(ticketFormContainer);
        this.createContactContainer(ticketFormContainer);
        this.createPackageContainer(ticketFormContainer);
        this.createCardNumberContainer(ticketFormContainer);
        this.createButtonContainer(ticketFormContainer,flight);
    }

    createTitle(ticketFormContainer){

        const titleContainer=document.createElement("div");
        titleContainer.className="controlContainer centro";
        ticketFormContainer.appendChild(titleContainer);

        const buyticketTitle=document.createElement("h3");
        buyticketTitle.innerHTML="Buy Ticket";
        buyticketTitle.className="reservationTitle font";
        titleContainer.appendChild(buyticketTitle);
    }

    createPassengerContainer(ticketFormContainer){
        const passengerContainer=document.createElement("div");
        passengerContainer.className="controlContainer centro";
        ticketFormContainer.appendChild(passengerContainer);

        const paragraphName=document.createElement("p");
        paragraphName.innerHTML="First name: ";
        paragraphName.className="paragraph font";
        passengerContainer.appendChild(paragraphName);
    
        const inputName=document.createElement("input");
        inputName.className="input";
        inputName.id="inputName";
        passengerContainer.appendChild(inputName);
    
        const paragraphSurname=document.createElement("p");
        paragraphSurname.innerHTML="Surname: ";
        paragraphSurname.className="paragraph font";
        passengerContainer.appendChild(paragraphSurname);
    
        const inputSurname=document.createElement("input");
        inputSurname.className="input";
        inputSurname.id="inputSurname";
        passengerContainer.appendChild(inputSurname);

        const paragraphEmail=document.createElement("p");
        paragraphEmail.innerHTML="Email: ";
        paragraphEmail.className="paragraph font";
        passengerContainer.appendChild(paragraphEmail);
    
        const inputEmail=document.createElement("input");
        inputEmail.className="input";
        inputEmail.id="inputEmail";
        passengerContainer.appendChild(inputEmail);
    }

    createContactContainer(ticketFormContainer){

        const contactContainer=document.createElement("div");
        contactContainer.className="controlContainer centro";
        ticketFormContainer.appendChild(contactContainer);

        const paragraphCity=document.createElement("p");
        paragraphCity.innerHTML="City: ";
        paragraphCity.className="paragraph font";
        contactContainer.appendChild(paragraphCity);
    
        const inputCity=document.createElement("input");
        inputCity.className="input";
        inputCity.id="inputCity";
        contactContainer.appendChild(inputCity);
    
        const paragraphAddress=document.createElement("p");
        paragraphAddress.innerHTML="Address: ";
        paragraphAddress.className="paragraph font";
        contactContainer.appendChild(paragraphAddress);
    
        const inputAddress=document.createElement("input");
        inputAddress.className="input";
        inputAddress.id="inputAddress";
        contactContainer.appendChild(inputAddress);

        const paragraphPhone=document.createElement("p");
        paragraphPhone.innerHTML="Phone number: ";
        paragraphPhone.className="paragraph font";
        contactContainer.appendChild(paragraphPhone);
    
        const inputPhone=document.createElement("input");
        inputPhone.className="input";
        inputPhone.id="inputPhone";
        contactContainer.appendChild(inputPhone);
    }

    createPackageContainer(ticketFormContainer){

        const packagesContainer=document.createElement("div");
        packagesContainer.className="packagesContainer centro";
        ticketFormContainer.appendChild(packagesContainer);

        range(1,3)
        .subscribe(number=>this.createPackages(number,packagesContainer))

    }

    createPackages(packageNumber,packagesContainer){

        const packageContainer=document.createElement("div");
        packageContainer.className="packageContainer";
        packagesContainer.appendChild(packageContainer);

        var backgroundColor;
        var packageTitle;
        var extraLuggage;
        var freeWiFi;
        var food;
        var drink;
        var privacy;
        var price;

        switch(packageNumber){
            case 1:
                packageTitle="1. Silver";
                backgroundColor="#D3D3D3";
                extraLuggage="10kg";
                freeWiFi=false;
                food=false;
                drink=true;
                privacy=false;
                price=20;
                break;
            case 2:
                packageTitle="2. Gold";
                backgroundColor="#CFB53B";
                extraLuggage="25kg";
                freeWiFi=false;
                food=true;
                drink=true;
                privacy=false;
                price=30;
                break;
            case 3:
                packageTitle="3. Platinum";
                backgroundColor="#1168bf";
                extraLuggage="60kg";
                freeWiFi=true;
                food=true;
                drink=true;
                privacy=true;
                price=50;
                break;
        }
        packageContainer.style.backgroundColor=backgroundColor;

        const packetTitleHolder=document.createElement("h2");
        packetTitleHolder.className="packetTitleHolder font";
        packetTitleHolder.innerHTML=packageTitle;
        packageContainer.appendChild(packetTitleHolder);

        const divider=document.createElement("hr");
        divider.className="divider";
        packageContainer.appendChild(divider);

        const extraLuggageHolder=document.createElement("p");
        extraLuggageHolder.className="packageParagraph font";
        extraLuggageHolder.innerHTML="Extra luggage: "+extraLuggage;
        packageContainer.appendChild(extraLuggageHolder);

        const freeWiFiHolder=document.createElement("p");
        freeWiFiHolder.className="packageParagraph font";
        var wifi=freeWiFi?"&#10003":"X";
        freeWiFiHolder.innerHTML="Free wifi: "+wifi;
        packageContainer.appendChild(freeWiFiHolder);

        const foodHolder=document.createElement("p");
        foodHolder.className="packageParagraph font";
        var freeFood=food?"&#10003":"X";
        foodHolder.innerHTML="Food: "+freeFood;
        packageContainer.appendChild(foodHolder);

        const drinkHolder=document.createElement("p");
        drinkHolder.className="packageParagraph font";
        var freeDrink=drink?"&#10003":"X";
        drinkHolder.innerHTML="Drink: "+freeDrink;
        packageContainer.appendChild(drinkHolder);

        const privacyHolder=document.createElement("p");
        privacyHolder.className="packageParagraph font";
        var havePrivaci=privacy?"&#10003":"X";
        privacyHolder.innerHTML="Privacy: "+havePrivaci;
        packageContainer.appendChild(privacyHolder);

        const dividerx=document.createElement("hr");
        dividerx.className="divider";
        packageContainer.appendChild(dividerx);

        const priceHolder=document.createElement("p");
        priceHolder.className="priceHolder font";
        priceHolder.innerHTML="Price: "+price+" EUR";
        packageContainer.appendChild(priceHolder);

        const radioButtonPackage=document.createElement("input");
        radioButtonPackage.type="radio";
        radioButtonPackage.id="radioButtonPackage";
        radioButtonPackage.name="package";
        radioButtonPackage.value=price;
        packageContainer.appendChild(radioButtonPackage);
    }

    createCardNumberContainer(ticketFormContainer){

        const cardContainer=document.createElement("div");
        cardContainer.className="controlContainer centro";
        ticketFormContainer.appendChild(cardContainer);

        const paragraphCardNumber=document.createElement("p");
        paragraphCardNumber.innerHTML="Card number: ";
        paragraphCardNumber.className="paragraph font";
        cardContainer.appendChild(paragraphCardNumber);
    
        const inputCardNumber=document.createElement("input");
        inputCardNumber.className="input";
        inputCardNumber.id="inputCardNumber";
        cardContainer.appendChild(inputCardNumber);

    }

    createButtonContainer(ticketFormContainer,flight){

        const buttonBuyTicketContainer=document.createElement("div");
        buttonBuyTicketContainer.className="controlContainer centro";
        ticketFormContainer.appendChild(buttonBuyTicketContainer);

        const buttonBuyTicket=document.createElement("button");
        buttonBuyTicket.innerHTML="Buy Ticket";
        buttonBuyTicket.className="buttonBuyTicket font";
        buttonBuyTicketContainer.appendChild(buttonBuyTicket);

        flight:{
            flight.availabletickets-=1;
        }

        buttonBuyTicket.onclick=(ev)=>{
            var packagePrice;
            document.getElementsByName("package").forEach(radiobtn=>{
                if(radiobtn.checked===true){packagePrice=radiobtn.value}
            })
            var packageType=Number.parseInt(packagePrice)===20?
            "silver":Number.parseInt(packagePrice)===30?
            "gold":"platinum";

            var ticket={
                id:0,
                flightId:flight.id,
                name:document.getElementById("inputName").value,
                surname:document.getElementById("inputSurname").value,
                city:document.getElementById("inputCity").value,
                address:document.getElementById("inputAddress").value,
                email:document.getElementById("inputEmail").value,
                phone:document.getElementById("inputPhone").value,
                cardnumber:document.getElementById("inputCardNumber").value,
                package:packageType,
                ticketprice:Number.parseInt(flight.price)+Number.parseInt(packagePrice)
            }

            this.flightService.updateFlight(flight);
            setTimeout(()=>{
                this.ticketService.addTicket(ticket);
            },1000);
            
        }
    }
}