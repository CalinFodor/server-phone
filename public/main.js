import { UI } from "./UI.js"
import { PhoneManager } from "./PhoneManager.js"
import { LogInManager } from "./LogInManager.js";

async function startApp()
{   
    const phoneManager = new PhoneManager(`ws://${window.location.host}`, (data) => {
        ui.renderBars(data);
    });

    const ui = new UI(phoneManager,true);
}

async function StartLogIn()
{
    const logInManager = new LogInManager();
    const ui = new UI(logInManager,false);

}

if(document.getElementById("sub-button")){
    StartLogIn();
}else{
    startApp();
}

