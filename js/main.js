import { UI } from "./UI.js"
import { PhoneManager } from "./PhoneManager.js"

async function startApp()
{
    const phoneManager = new PhoneManager();
    const ui = new UI(phoneManager);

    setInterval(ui.renderBars, 5000);
    ui.renderBars();    
}

startApp();