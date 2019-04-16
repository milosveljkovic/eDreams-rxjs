import { createMainContainer } from "./pageConstruction";
import { Flights } from "./flights"
import {interval,Observable,merge,range,fromEvent,from,zip,forkJoin,timer} from "rxjs";
import {take,filter,map,first,sampleTime,debounceTime,switchMap,TimeInterval,pairwise,scan,concat,withLatestFrom} from "rxjs/operators";

var flights=new Flights();

createMainContainer(document.body);


function findFlightsByDeparturePlaceAndArrivalPlace()
{
  const from=document.getElementById("inputFrom");
  const to=document.getElementById("inputTo");

  var streamInputFrom=fromEvent(from,"input")
  .pipe(
    map(input=>input.target.value));

  var streamInputTo=fromEvent(to,"input")
  .pipe(
    debounceTime(3000),
    map(input=>input.target.value)
  );

  streamInputTo.pipe(
    withLatestFrom(streamInputFrom),
    switchMap(FromTo=>flights.getFlightsByDepartureAndArrivalPlaces(FromTo[1],FromTo[0]))
  )
  .subscribe(x=>createTableWithFlights(x));
}

function createTableWithFlights(flightsList){
  const pFromTo=document.getElementById("pFromTo");
  const tabelWithFlights=document.getElementById("tableWithFlights");
  const selectCurrency=document.getElementById("selectCurrency");

  pFromTo.style.visibility="visible";
  var count=0;

  if(flightsList.length==0){
    pFromTo.innerHTML="Flights not found!"; 
    tabelWithFlights.style.visibility="hidden";
    selectCurrency.style.pointerEvents="none";
  selectCurrency.style.opacity=0.4;
  }else{
  tabelWithFlights.style.visibility="visible";
  selectCurrency.style.pointerEvents="all";
  selectCurrency.style.opacity=1;

  pFromTo.innerHTML=flightsList[0].from+"-"+flightsList[0].to; 
  let tableHeader="<tr><th>Departure date</th><th>Return date</th><th>Price</th></tr>";
  let tableData="";

  flightsList.forEach(flight=>{

      tableData+="<tr><td>"+flight.departure+"</td><td>"+flight.return+"</td><td id="+count+">"+flight.price+" EUR</td></tr>";
      count++;
  })
  tableHeader+=tableData;
  tabelWithFlights.innerHTML=tableHeader;
  }
}

function changeTheCurrency(){
  const selectCurrency=document.getElementById("selectCurrency");
  var currencyChange=fromEvent(selectCurrency,"change");

  currencyChange.pipe(
    map(currency=>currency.target.value)
  ).subscribe(currencyValue=>changeCurrencyInTable(currencyValue));

}

function changeCurrencyInTable(currencyValue){
  const tabelWithFlights=document.getElementById("tableWithFlights");
  var numberOfRows=tabelWithFlights.rows.length-1;

  var valueOfCurrency=currencyValue.split(" ");
  var count=0;

  while(count!=numberOfRows){
    var currentPriceAndCurrency=document.getElementById(`${count}`);
    var priceAndCurency=currentPriceAndCurrency.innerHTML.split(" ");
    var convertedPrice=convertCurrency(priceAndCurency);
    currentPriceAndCurrency.innerHTML=convertedPrice+" "+valueOfCurrency[1];
    count++;
  }
}

function convertCurrency(currentPriceAndCurrency){
    if(currentPriceAndCurrency[1]==="RSD"){
      return (currentPriceAndCurrency[0]/117.97).toFixed(2);
    }else{
      return (currentPriceAndCurrency[0]*117.97);
    }
}


function setPriceWithRange()
{
  const rangeForPrice=document.getElementById("rangeForPrice");
  fromEvent(rangeForPrice,"input")
  .pipe(
    map(input=>input.target.value))
    .subscribe(prices=>showPrices(prices));
}

function showPrices(price)
{
  const priceParagraph=document.getElementById("showPrice");
  priceParagraph.innerHTML=price+" EUR";

  const cheaperRadio=document.getElementById("radioCheaper");
  cheaperRadio.value=price+" c";

  const  moreExpensiveRadio=document.getElementById("radioExpensive");
  moreExpensiveRadio.value=price+" e";
}

function showFlightCheaperOrMoreExpensiveThanRangePrice()
{
  const radioButtons=document.getElementsByName("priceRadio");
  fromEvent(radioButtons,"change")
  .pipe(
    map(radioEvent=>radioEvent.target.value),
    switchMap(Price=>flights.getFlightByPrices(Price))
  ).subscribe(flights=>console.log(flights));
}

showFlightCheaperOrMoreExpensiveThanRangePrice();
setPriceWithRange();
findFlightsByDeparturePlaceAndArrivalPlace();
changeTheCurrency();