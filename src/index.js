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

function createTableWithFlights(flightsList)
{
  const tabelWithFlights=document.getElementById("tableWithFlights");
  let tableHeader="<tr><th>From</th><th>To</th><th>Departure date</th><th>Return date</th><tr>";
  let tableData="";

  flightsList.forEach(flight=>{

      tableData+="<tr><td>"+flight.from+"</td><td>"+flight.to+"</td><td>"+flight.departure+"</td><td>"+flight.return+"</td></tr>";
  })
  tableHeader+=tableData;
  tabelWithFlights.innerHTML=tableHeader;

}

findFlightsByDeparturePlaceAndArrivalPlace();