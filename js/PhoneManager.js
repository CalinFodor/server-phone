export class PhoneManager{

    constructor(){
        this.apiUrl = "http://192.168.222.114:3000/stats";
    }

    async getPhoneStats(){
        const res = await(fetch(this.apiUrl));
        const data = await res.json();
        return data;
    }

}