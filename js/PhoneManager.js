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
        await fetch(`http://192.168.222.114:3000/control/${command}`, { method: 'POST' });
    }

    async toggleVib(){
        await fetch(`http://192.168.222.114:3000/control/vibrate`, { method: 'POST' });
    }

}