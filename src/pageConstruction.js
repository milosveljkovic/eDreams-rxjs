
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

    const optionEuro=document.createElement("option");
    optionEuro.innerHTML="Euro/EUR";
    optionEuro.value="1 EUR";
    optionEuro.id="optionEuro";
    selectCurrency.appendChild(optionEuro);

    const optionRsd=document.createElement("option");
    optionRsd.innerHTML="Dinar/RSD";
    optionRsd.value="117.97 RSD";
    selectCurrency.appendChild(optionRsd);

    controlContainer.appendChild(selectCurrency);
}

function createDataContainer(bodyDiv){
    const dataContainer=document.createElement("div");
    dataContainer.className="dataContainer";
    bodyDiv.appendChild(dataContainer);

    createFlightsContainer(dataContainer);
    createRangeContainer(dataContainer);
    createPriceFlightsContainer(dataContainer);
    createContainerForFlightsWithDiscounts(dataContainer);
}

function createFlightsContainer(dataContainer){
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

function createRangeContainer(dataContainer){
    const rangeContainer=document.createElement("div");
    rangeContainer.className="rangeContainer";
    dataContainer.appendChild(rangeContainer);

    createControlsForPrices(rangeContainer);
}

function createControlsForPrices(rangeContainer){
    const paragraphSetPrice=document.createElement("p");
    paragraphSetPrice.innerHTML="Set price: ";
    paragraphSetPrice.className="paragraph";
    rangeContainer.appendChild(paragraphSetPrice);

    const rangeForPrice=document.createElement("input");
    rangeForPrice.type="range";
    rangeForPrice.className="rangeForPrice";
    rangeForPrice.id="rangeForPrice";
    rangeForPrice.value=0;
    rangeForPrice.min=0;
    rangeForPrice.max=300;
    rangeForPrice.step=10;
    rangeContainer.appendChild(rangeForPrice);

    const showPrice=document.createElement("p");
    showPrice.className="paragraph";
    showPrice.id="showPrice";
    showPrice.innerHTML=0+" EUR";
    rangeContainer.appendChild(showPrice);

    const paragraphShow=document.createElement("p");
    paragraphShow.innerHTML=". Show (cheaper-";
    paragraphShow.className="rangeParagraphs";
    rangeContainer.appendChild(paragraphShow); 

    const radioCheaper=document.createElement("input");
    radioCheaper.type="radio";
    radioCheaper.value="c";
    radioCheaper.name="priceRadio";
    radioCheaper.id="radioCheaper";
    radioCheaper.className="rangeParagraphs";
    rangeContainer.appendChild(radioCheaper);

    const paragraphMoreExpensive=document.createElement("p");
    paragraphMoreExpensive.innerHTML=") / (more expensive-";
    paragraphMoreExpensive.className="rangeParagraphs";
    rangeContainer.appendChild(paragraphMoreExpensive);

    const radioExpensive=document.createElement("input");
    radioExpensive.type="radio";
    radioExpensive.value="e";
    radioExpensive.name="priceRadio";
    radioExpensive.id="radioExpensive";    
    radioExpensive.className="rangeParagraphs";
    rangeContainer.appendChild(radioExpensive);

    const paragraphFlighs=document.createElement("p");
    paragraphFlighs.innerHTML=")  flights compared to price!";
    paragraphFlighs.className="rangeParagraphs";
    rangeContainer.appendChild(paragraphFlighs);
}

function createPriceFlightsContainer(dataContainer){
    const priceFlightsContainer=document.createElement("div");
    priceFlightsContainer.id="priceFlightsContainer";
    priceFlightsContainer.className="priceFlightsContainer";
    dataContainer.appendChild(priceFlightsContainer);
}

function createContainerForFlightsWithDiscounts(dataContainer)
{
    const discountFlightsContainer=document.createElement("div");
    discountFlightsContainer.className="discountFlightsContainer";
    discountFlightsContainer.id="discountFlightsContainer";
    dataContainer.appendChild(discountFlightsContainer);

    const pListOfFlights=document.createElement("p");
    pListOfFlights.id="pListOfFlights";
    pListOfFlights.className="rangeParagraphs";
    pListOfFlights.innerHTML="List of fligts (Blue standard price/Red discount price)";
    discountFlightsContainer.appendChild(pListOfFlights);

    const listOfFlights=document.createElement("ul");
    listOfFlights.id="listOfFlights";
    listOfFlights.className="listOfFlights";
    discountFlightsContainer.appendChild(listOfFlights);
}