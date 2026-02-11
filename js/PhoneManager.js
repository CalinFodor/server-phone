export class PhoneManager{

    constructor(){
        this.apiUrl = "http://192.168.222.114:3000/stats";
    }

    async getPhoneStats(){
        const res = await(fetch(this.apiUrl));
        const data = await res.json();
        return data;
    }

    async toggleFlash(state){
        const command = state ? "flashlight-on":"flashlight-off";
        console.log(command);
        await fetch(`http://192.168.222.114:3000/control/${command}`, { method: 'POST' });
    }

    async toggleVib(){
        const command = "vibrate";
        await fetch(`http://192.168.222.114:3000/control/${command}`, { method: 'POST' });
    }

    async takePhoto(){
        const response = await fetch(`http://192.168.222.114:3000/control/take-photo`, { method: 'POST' });
        const data = await response.json();
        return data;
    }

}