export class UI{
    constructor(PhoneManager){
        this.phoneManager = PhoneManager;

        //status bars
        this.batBar = document.getElementById('bat-bar');
        this.storBar = document.getElementById('stor-bar');
        this.memBar = document.getElementById('mem-bar');

        //text labels
        this.storText = document.getElementById('stor-text');
        this.memText = document.getElementById('mem-text');
        
    }

    async renderBars() {
        const data = await this.phoneManager.getPhoneStats();

        this.batBar.innerText = data.battery.display;
        this.batBar.style.width = data.battery.display;

        this.storText.innerText = data.storage.display;
        this.storBar.style.width = data.storage.percent;
        this.storBar.innerText = data.storage.percent;

        this.memText.innerText = data.memory.display;
        this.memBar.innerText = data.memory.percent;
        this.memBar.style.width = data.memory.percent;
    }


}