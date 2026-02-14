import { API_BASE_URL } from "./settings.js";

export class PhoneManager{

    constructor(url,onDataReceived){
        this.socket = new WebSocket(url);

        this.socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if(msg.type === "stats"){
                onDataReceived(msg.data);
            }

        }
    }
    

    async getPhoneStats(){
        const res = await(fetch(this.apiUrl));
        const data = await res.json();
        return data;
    }

    async toggleFlash(state){
        const command = state ? "flashlight-on":"flashlight-off";
        await fetch(`${API_BASE_URL}/control/${command}`, { method: 'POST' });
    }

    async toggleVib(){
        const command = "vibrate";
        await fetch(`${API_BASE_URL}/control/${command}`, { method: 'POST' });
    }

    async takePhoto(){
        const response = await fetch(`${API_BASE_URL}/control/take-photo`, { method: 'POST' });
        const data = await response.json();
        return data;
    }

    

}
