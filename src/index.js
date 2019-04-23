import { createMainContainer } from "./pageConstruction";
import { Flights } from "./flights"
import {interval,Observable,merge,range,fromEvent,from,zip,forkJoin,timer,Subject, combineLatest} from "rxjs";
import {take,filter,map,first,sampleTime,debounceTime,switchMap,pairwise,scan,concat,withLatestFrom} from "rxjs/operators";

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
  .subscribe(flightsList=>createTableWithFlights(flightsList));
}

function createTableWithFlights(flightsList){
  const pFromTo=document.getElementById("pFromTo");
  const tabelWithFlights=document.getElementById("tableWithFlights");
  const selectCurrency=document.getElementById("selectCurrency");

  pFromTo.style.visibility="visible";
  var count=0;

  if(flightsList.length==0){
    pFromTo.innerHTML="Looks like there aren't any flights between those places!"; 
    tabelWithFlights.style.visibility="hidden";
    selectCurrency.style.pointerEvents="none";
    selectCurrency.style.opacity=0.4;
  }else{
  const optionEuro=document.getElementById("optionEuro");
  optionEuro.selected=true;
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
    var priceAndCurrency=currentPriceAndCurrency.innerHTML.split(" ");
    var convertedPrice=convertCurrency(priceAndCurrency);
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


function RangeObservable(){
  const rangeForPrice=document.getElementById("rangeForPrice");
  return fromEvent(rangeForPrice,"input")
  .pipe(
    map(input=>input.target.value));
}

function showPrices(){
  const priceParagraph=document.getElementById("showPrice");
  RangeObservable()
  .subscribe(price=>{priceParagraph.innerHTML=price+" EUR";});
}

function showFlightCheaperOrMoreExpensiveThanRangePrice(){
  const radioButtons=document.getElementsByName("priceRadio");
  const StreamRadio=fromEvent(radioButtons,"click")
  .pipe(
    map(radioEvent=>radioEvent.target.value)
  );

  combineLatest(
    RangeObservable(),
    StreamRadio)
    .pipe(
    debounceTime(1000),
    switchMap(Price=>flights.getFlightByPrices(Price))
    )
  .subscribe(flights=>createContainerWithFlightsByPrice(flights));
}

function createContainerWithFlightsByPrice(flights){
  const priceFlightsContainer=document.getElementById("priceFlightsContainer");
  priceFlightsContainer.innerHTML="";
  if(flights.length==0){alertFlightByPriceNotFounded();}
  else{
  flights.forEach(flight=>{
      
      var newPriceFlight=document.createElement("span");
      newPriceFlight.className="priceFlightSpan";
      priceFlightsContainer.appendChild(newPriceFlight);

      var paragraphFlightDepartureDate=document.createElement("p");
      paragraphFlightDepartureDate.innerHTML=flight.departure;
      paragraphFlightDepartureDate.className="paragraphSpan";
      newPriceFlight.appendChild(paragraphFlightDepartureDate);

      var paragraphFromTo=document.createElement("p");
      paragraphFromTo.innerHTML=flight.from+"-"+flight.to;
      paragraphFromTo.className="paragraphSpanFromTo";
      newPriceFlight.appendChild(paragraphFromTo);

      var paragraphPrice=document.createElement("p");
      paragraphPrice.innerHTML=flight.price+" EUR";
      paragraphPrice.className="paragraphSpan";
      newPriceFlight.appendChild(paragraphPrice);
    }
  )
}
  
}

function alertFlightByPriceNotFounded(){
  var alertSubject=new Subject();
  alertSubject.pipe(
    sampleTime(1000)
  ).subscribe(message=>alert(message));
  alertSubject.next("Looks like there aren't any flights!");
}

showFlightCheaperOrMoreExpensiveThanRangePrice();
showPrices();
findFlightsByDeparturePlaceAndArrivalPlace();
changeTheCurrency();