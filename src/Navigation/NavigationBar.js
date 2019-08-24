import {RouterComponent} from "../../Router/RouterComponent";

var router=new RouterComponent();

export function createNavigationBar(){

    const navigationBarContainer=document.getElementById("navigationBarContainer");
    navigationBarContainer.className="navigationBarContainer";

    const navComponent=document.createElement("span");
    navComponent.className="navComponent";
    navigationBarContainer.appendChild(navComponent);

    const navigateToHome=document.createElement("img");
    navigateToHome.src="../resources/Home.png";

    navigateToHome.onclick=(ev)=>{
        router.openMainPage();
    }

    navComponent.appendChild(navigateToHome);

}