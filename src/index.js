import { createMainContainer } from "./pageConstruction";
import { Flights } from "./flights"
import {interval,Observable,range,fromEvent,from,forkJoin,zip} from "rxjs";
import {take,filter,map,first,sampleTime,debounceTime,switchMap,TimeInterval,pairwise,scan} from "rxjs/operators";

var flights=new Flights();

createMainContainer(document.body);

function inputFrom()
{
  const txt=document.getElementById("inputFrom");
  fromEvent(txt,"input")
  .pipe(
    debounceTime(500),
    map(input=>input.target.value),
    filter(text=>text.length>2),
    switchMap(departureCity=>flights.getFlightByDepartureCity(departureCity))
  )
  .subscribe(x=>console.log(x));
}
inputFrom();
