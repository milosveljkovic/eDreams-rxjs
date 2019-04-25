import { from } from "rxjs";

export class Flights
{
    constructor(){
    }

    getFlightsByDepartureAndArrivalPlaces(From,To){
        var fromCity=From.charAt(0).toUpperCase()+From.slice(1).toLowerCase();
        var toCity=To.charAt(0).toUpperCase()+To.slice(1).toLowerCase();

        return from(fetch(`http://localhost:3000/flights?from=${fromCity}&to=${toCity}`)
        .then(resoponse=>resoponse.json()));
    }

    getFlightByPrices(PriceCheaperOrMoreExpensive){
        if(PriceCheaperOrMoreExpensive[1]=='c'){
            return from(fetch(`http://localhost:3000/flights?price_lte=${PriceCheaperOrMoreExpensive[0]}`)
            .then(resoponse=>resoponse.json()));
        }else{
            return from(fetch(`http://localhost:3000/flights?price_gte=${PriceCheaperOrMoreExpensive[0]}`)
        .then(resoponse=>resoponse.json()));
        }
    }

    getFlightByDate(currentDate){
        //DATE FORMAT DD/MM/YYYY-shortDate
        console.log(currentDate);
        var day=currentDate.getDate();
        (day<10)?day="0"+day:day;
        var mon=currentDate.getMonth()+1;
        (mon<10)?mon="0"+mon:mon;
        var shortDate=mon+"/"+day+"/"+currentDate.getFullYear();
        return from(fetch(`http://localhost:3000/flights?departure=${shortDate}`)
        .then(resoponse=>resoponse.json()));
    }

    sortFlightsByDate(){
        return from(fetch(`http://localhost:3000/flights?_sort=departure&_order=desc`)
        .then(resoponse=>resoponse.json()));
    }

    getAllFlights(){
        return from(fetch(`http://localhost:3000/flights`) 
        .then(resoponse=>resoponse.json()));
    }
}