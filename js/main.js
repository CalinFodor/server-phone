import { UI } from "./UI.js"
import { PhoneManager } from "./PhoneManager.js"

async function startApp()
{
    const phoneManager = new PhoneManager(`ws://${window.location.host}`, (data) => ui.renderBars(data));
    const ui = new UI(phoneManager);

    await ui.renderBars();    

    setInterval(() => ui.renderBars(), 2000);
}

startApp();