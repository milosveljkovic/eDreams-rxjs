import { createNavigationBar } from './Navigation/NavigationBar'
import {MainPage} from "./Pages/MainPage";
import {createMainTitle} from './MainTitle'

const mainPage=new MainPage();

createNavigationBar();
createMainTitle();
mainPage.createMainContainer(document.getElementById("contentContainer"));
