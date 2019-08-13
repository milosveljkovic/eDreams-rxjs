import {MainPage} from "../src/Pages/MainPage";
import {ReservationsPage} from "../src/Pages/ReservationsPage"

export class RouterComponent
{
    constructor(){
    }

    openMainPage(){
        var mainPage=new MainPage();
        mainPage.createMainContainer(document.getElementById("contentContainer"));
    }

    openReservationsPage(flight){
        var reservationsPage=new ReservationsPage();
        reservationsPage.createReservationsPage(flight);
    }

}