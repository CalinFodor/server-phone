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

    async sendLogInData(loginData) {
        try {
            const response = await fetch('http://192.168.222.114:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(loginData) 
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Success:', data);
            return data;

        } catch (error) {
            console.error('Connection or Logic Error:', error.message);
        }
    }

}