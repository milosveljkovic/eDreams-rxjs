
export function createMainContainer(body){
    if(!body){
        throw new Exception("Body doesn't exist");
    }

    const mainContainer=document.createElement("div");
    mainContainer.className="mainContainer";
    body.appendChild(mainContainer);

    createHeader(mainContainer);
    createBody(mainContainer);
}

function createHeader(mainContainer){
    const headerDiv=document.createElement("div");
    headerDiv.className="headerDiv";
    mainContainer.appendChild(headerDiv);

    createHeaderTitle(headerDiv);
}

function createHeaderTitle(headerDiv){
    const headerTitle=document.createElement("h1");
    headerTitle.innerHTML="- eDreams -";
    headerTitle.className="headerTitle";
    headerDiv.appendChild(headerTitle);
}

function createBody(mainContainer){
    const bodyDiv=document.createElement("div");
    bodyDiv.className="bodyDiv";
    mainContainer.appendChild(bodyDiv);

    createControlContainer(bodyDiv);
    createDataContainer(bodyDiv);
}

function createControlContainer(bodyDiv){
    const controlContainer=document.createElement("div");
    controlContainer.className="controlContainer";
    bodyDiv.appendChild(controlContainer);

    createControlsInControlContainer(controlContainer);
}

function createControlsInControlContainer(controlContainer){

    const paragraphFrom=document.createElement("p");
    paragraphFrom.innerHTML="From: ";
    paragraphFrom.className="paragraph";
    controlContainer.appendChild(paragraphFrom);

    const inputFrom=document.createElement("input");
    inputFrom.className="input";
    inputFrom.id="inputFrom";
    controlContainer.appendChild(inputFrom);

    const paragraphTo=document.createElement("p");
    paragraphTo.innerHTML="To: ";
    paragraphTo.className="paragraph";
    controlContainer.appendChild(paragraphTo);

    const inputTo=document.createElement("input");
    inputTo.className="input";
    inputTo.id="inputTo";
    controlContainer.appendChild(inputTo);

    const paragraphCurrency=document.createElement("p");
    paragraphCurrency.innerHTML="Change currency:";
    paragraphCurrency.className="paragraph";
    controlContainer.appendChild(paragraphCurrency);

    const selectCurrency=document.createElement("select");
    selectCurrency.id="selectCurrency";
    selectCurrency.className="selectCurrency";

    const optionDollar=document.createElement("option");
    optionDollar.innerHTML="Dollar";
    optionDollar.value=1.13;
    selectCurrency.appendChild(optionDollar);

    const optionEuro=document.createElement("option");
    optionEuro.innerHTML="Euro";
    optionEuro.value=1;
    selectCurrency.appendChild(optionEuro);

    const optionRsd=document.createElement("option");
    optionRsd.innerHTML="Dinar";
    optionRsd.value=117.97;
    selectCurrency.appendChild(optionRsd);

    controlContainer.appendChild(selectCurrency);

}

function createDataContainer(bodyDiv){
    const dataContainer=document.createElement("div");
    dataContainer.className="dataContainer";
    bodyDiv.appendChild(dataContainer);

    createFlightsContainer(dataContainer);
}

function createFlightsContainer(dataContainer)
{
    const flightsContainer=document.createElement("div");
    flightsContainer.className="flightsContainer";
    flightsContainer.id="flightsContainer";
    dataContainer.appendChild(flightsContainer);

    const pFromTo=document.createElement("p");
    pFromTo.className="pFromTo";
    pFromTo.id="pFromTo";
    flightsContainer.appendChild(pFromTo);

    const tableWithFlights=document.createElement("table");
    tableWithFlights.className="tableWithFlights";
    tableWithFlights.id="tableWithFlights";
    flightsContainer.appendChild(tableWithFlights);
    
}