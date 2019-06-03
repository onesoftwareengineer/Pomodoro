const header = document.getElementById('header');
const main = document.getElementById('main');
const footer = document.getElementById('footer');
const buton = document.getElementById('buton');

//cate secunde are un Pomodoro, in cazul nostru 60 de minute a cate 60 de secunde
const pomodoroTime = 10;//60*60; 
let timer = pomodoroTime;

//defining loop in global scope to be able to stop setinterval 
let loop;

const film = document.createElement('video');
film.src = "cavalry.mp4";
film.load();

//functia care ruleaza timerul
function StartTimer() {    
    //schimba textul butonului deoarece a inceput timerul
    buton.innerText = 'Ia o pauza';
    loop = setInterval( () => {
        //verifica daca s-a terminat timpul
        if( timer > 0 ) {
            timer = timer - 1;
            main.innerHTML = `<h1>${timer}</h1>`;            
            console.log(timer);
        }
        //daca a ajuns la zero timerul, adica pomodoro-ul a ajuns la final
        else StartReward();
    },1000);
};

function StartReward () {
    clearTimeout(loop);
    main.innerHTML = '';
    //da drumul la fanfara, schimba timerul cu audio-ul cu stop the cavalry
    main.appendChild(film);
    film.play();
};

//reinitializeaza timerul, butonul si timpul
function StopTimer() {
    //reloads audio file
    film.load();
    //clears setinterval 
    clearTimeout(loop);
    //rests time
    timer = pomodoroTime;
    //refreshes timer displayed
    main.innerHTML = `<h1>${timer}</h1>`;
    //rests button text
    buton.innerText = 'Start Pomodoro';
};

buton.addEventListener('click', () => {
    if(buton.innerText === 'Start Pomodoro') StartTimer();
    else if (buton.innerText === 'Ia o pauza') StopTimer();
});
