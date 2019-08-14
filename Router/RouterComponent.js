import {MainPage} from "../src/Pages/MainPage";
import {TicketPage} from "../src/Pages/TicketPage"

export class RouterComponent
{
    constructor(){
    }

    openMainPage(){
        var mainPage=new MainPage();
        mainPage.createMainContainer(document.getElementById("contentContainer"));
    }

    openTicketPage(flight){
        var ticketPage=new TicketPage();
        ticketPage.createTicketPage(flight);
    }

}