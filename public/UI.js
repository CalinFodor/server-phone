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

        //hardware control buttons
        this.flashBtn = document.getElementById('flash-btn');
        this.vibBtn = document.getElementById('vib-btn');
        this.photoBtn = document.getElementById('photo-btn');

        //status variables for flashlight 
        this.flashOn = false;

        //listners for hardware buttons
        this.flashBtn.addEventListener("click", () => this.onFlashPress());
        this.vibBtn.addEventListener("click", () => this.onVibPress());
        this.photoBtn.addEventListener("click", () => this.onPhotoPress());

        //inputs in login
        this.user_input = document.getElementById('first');
        this.pass_input = document.getElementById('password');
        this.sub_button = document.getElementById('sub-button');

        this.sub_button.addEventListener("click",() => this.subPressed());
        
    }

    async subPressed(){
        let user = this.user_input.value;
        let pass = this.pass_input.value;

        const logInData = {
            username:user,
            password:pass
        }

        await this.phoneManager.sendLogInData(logInData);
    }

    async renderBars(data) {

        this.batBar.innerText = data.battery.display;
        this.batBar.style.width = data.battery.display;

        this.storText.innerText = data.storage.display;
        this.storBar.style.width = data.storage.percent;
        this.storBar.innerText = data.storage.percent;

        this.memText.innerText = data.memory.display;
        this.memBar.innerText = data.memory.percent;
        this.memBar.style.width = data.memory.percent;
    }

    async onFlashPress(){

        this.flashOn = !this.flashOn; 
    
        this.phoneManager.toggleFlash(this.flashOn);

        this.flashBtn.innerText = this.flashOn ? "Flashlight Off" : "Flashlight On";
        this.flashBtn.style.backgroundColor = this.flashOn ? "yellow" : "white";
    }

    async onVibPress(){
        this.phoneManager.toggleVib();

        this.vibBtn.style.backgroundColor = "blue";

        setTimeout(() => {
            this.vibBtn.style.backgroundColor = "white";
        },1000);
    }

    async onPhotoPress(){
        this.photoBtn.backgroundColor = "green";
        const data = await this.phoneManager.takePhoto();
        document.getElementById('display-img').src = data.photoUrl;

        setTimeout(() => {
            this.photoBtn.style.backgroundColor = "white";
        },500);
    }

}