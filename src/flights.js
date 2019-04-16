import { from } from "rxjs";

export class Flights
{

    constructor(){
    }

    getFlightsByDepartureAndArrivalPlaces(From,To){
        var fromCity=From.charAt(0).toUpperCase()+From.slice(1).toLowerCase();
        var toCity=To.charAt(0).toUpperCase()+To.slice(1).toLowerCase();

        return from(fetch(`http://localhost:3000/flights?from=${fromCity}&to=${toCity}`)
        .then(resoponse=>resoponse.json())
        );
    }

    getFlightByPrices(PriceCheaperOrMoreExpensive)
    {
        var priceAndMode=PriceCheaperOrMoreExpensive.split(" ");
        if(priceAndMode[1]=='c'){
            return from(fetch(`http://localhost:3000/flights?price_lte=${priceAndMode[0]}`)
            .then(resoponse=>resoponse.json())
            );
        }else{
            return from(fetch(`http://localhost:3000/flights?price_gte=${priceAndMode[0]}`)
        .then(resoponse=>resoponse.json())
        );
        }
    }

}