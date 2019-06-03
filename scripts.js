const stopTheCavalry = `<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/326709754&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`;
const header = document.getElementById('header');
const main = document.getElementById('main');
const footer = document.getElementById('footer');
const buton = document.getElementById('buton');
//cate secunde are un Pomodoro, in cazul nostru 60 de minute a cate 60 de secunde
const pomodoroTime = 60*60; 
let timer = pomodoroTime;
//defining loop in global scope to be able to stop setinterval 
let loop;

function StartTimer() {    
    //schimba textul butonului deoarece a inceput timerul
    buton.innerText = 'Ia o pauza';
    loop = setInterval( () => {
        //verifica daca s-a terminat timpul
        if( timer > 0 ) {
            main.innerHTML = `<h1>${timer}</h1>`;
            timer = timer - 1;
            console.log(timer);
        }
        //daca a ajuns la zero timerul, adica pomodoro-ul a ajuns la final
        else {
            clearTimeout(loop);
            //da drumul la fanfara, schimba timerul cu audio-ul cu stop the cavalry
            main.innerHTML = stopTheCavalry;
        }
    },1000);
};

//reinitializeaza timerul, butonul si timpul
function StopTimer() {
    clearTimeout(loop);
    timer = pomodoroTime;
    main.innerHTML = `<h1>${timer}</h1>`;
    buton.innerText = 'Start Pomodoro';
};

buton.addEventListener('click', () => {
    if(buton.innerText === 'Start Pomodoro') StartTimer();
    else if (buton.innerText === 'Ia o pauza') StopTimer();
});
