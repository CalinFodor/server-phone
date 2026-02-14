export class UI{
    constructor(PhoneManager,dashboard){
        this.phoneManager = PhoneManager;

        if(dashboard){
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

            //angle of photo
            this.angle = 0;
            this.photo = document.getElementById('display-img');

            //status variables for flashlight 
            this.flashOn = false;

            //listners for hardware buttons
            this.flashBtn.addEventListener("click", () => this.onFlashPress());
            this.vibBtn.addEventListener("click", () => this.onVibPress());
            this.photoBtn.addEventListener("click", () => this.onPhotoPress());
        }else{    
            //inputs in login
            this.user_input = document.getElementById('first');
            this.pass_input = document.getElementById('password');
            this.sub_button = document.getElementById('sub-button');

            this.sub_button.addEventListener("click",() => this.subPressed());
        }
    }

    async subPressed(){
        let user = this.user_input.value;
        let pass = this.pass_input.value;

        const logInData = {
            username:user,
            password:pass
        }

        const response = await this.phoneManager.sendLogInData(logInData);
        if(response.message === 'Login successful'){
            window.location.reload();
        }else{
            alert("Log In Wrong");
        }
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
        this.photoBtn.style.backgroundColor = "green";
        const data = await this.phoneManager.takePhoto();
        this.photo.src = data.photoUrl;
        if(!document.querySelector('.photbtn-container')){
		console.log("Buutons created");	
            document.querySelector('.img-container').insertAdjacentHTML('beforeend', 
                `<div class="photbtn-container">
		    <button id="hidephot-btn">Hide Photo</button>		
                    <button id="rotphot-btn">Rotate Photo</button>
                    <button id="savephot-btn">Save Photo</button>
                    <button id="delphot-btn">Delete Photo</button>
                </div>    
                    `);
            document.getElementById('rotphot-btn').addEventListener("click",() => this.rotatePhoto());  
        }    
        setTimeout(() => {
            this.photoBtn.style.backgroundColor = "white";
        },500);
    }

    rotatePhoto(){
        this.angle += 90;
        document.getElementById('display-img').style.transform = `rotate(${this.angle}deg)`; 
        document.getElementById('rotphot-btn').style.backgroundColor = "red";

        setTimeout(() => {
            document.getElementById('rotphot-btn').style.backgroundColor = "white";
        },500);
    }


}
