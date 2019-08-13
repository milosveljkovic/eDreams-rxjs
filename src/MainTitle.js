
export function createMainTitle(){

        const mainTitle=document.getElementById("mainTitle");

        const headerDiv=document.createElement("div");
        headerDiv.className="headerDiv";
        mainTitle.appendChild(headerDiv);

        const headerTitle=document.createElement("h1");
        headerTitle.innerHTML="- eDreams -";
        headerTitle.className="headerTitle";
        headerDiv.appendChild(headerTitle);

}