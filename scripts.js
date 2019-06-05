const header = document.getElementById('header');
const main = document.getElementById('main');
const footer = document.getElementById('footer');
const buton = document.getElementById('buton');

//cate secunde are un Pomodoro, in cazul nostru 60 de minute a cate 60 de secunde
const pomodoroTime = 60*60; 
let timer = pomodoroTime;

//defining loop in global scope to be able to stop setinterval 
let loop;

const film = document.createElement('video');
film.src = "cavalry.mp4";
film.load();

//functia care ruleaza timerul
function StartTimer() {    
    //schimba textul butonului in ia o pauza deoarece a inceput timerul
    buton.innerText = 'Ia o pauza';
    loop = setInterval( () => {
        //verifica daca s-a terminat timpul
        if( timer > 0 ) {
            timer = timer - 1;
            let sirCeas = transformaInCeas(timer);
            header.innerHTML = `<h1>${sirCeas}</h1>`;
            document.title = `${sirCeas} min`;
            //console.log(timer);
        }
        //daca a ajuns la zero timerul, adica pomodoro-ul a ajuns la final
        else StartReward();
    },1000);
};

//transforma un numar de secunde intr-un string de tipul 03:35 unde 03 este numarul de minute si 35 este numarul de secunde
function transformaInCeas (x) {
    let minuteRamase = parseInt(x/60);
    let minuteRamaseZeci = parseInt(minuteRamase/10);
    let minuteRamaseUnitati = minuteRamase - minuteRamaseZeci*10;
    let secundeRamase = x - minuteRamase*60;
    let secundeRamaseZeci = parseInt(secundeRamase/10); 
    let secundeRamaseUnitati = secundeRamase - secundeRamaseZeci*10;
    return `${minuteRamaseZeci}${minuteRamaseUnitati}:${secundeRamaseZeci}${secundeRamaseUnitati}`;
};

function StartReward () {
    clearTimeout(loop);
    //header.innerHTML = '';
    //da drumul la fanfara, schimba timerul cu audio-ul cu stop the cavalry
    header.appendChild(film);
    film.play();
    buton.innerText = 'Reseteaza timerul';
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
    header.innerHTML = `<h1>60:00</h1>`;
    //rests button text
    buton.innerText = 'Start Pomodoro';
    document.title = 'Start Pomodoro';
};

buton.addEventListener('click', () => {
    if(buton.innerText === 'Start Pomodoro') {
        StartTimer();
        buton.classList.add('buton-pauza');
    }
    else if (buton.innerText === 'Ia o pauza' || buton.innerText === 'Reseteaza timerul') {
        StopTimer();
        buton.classList.remove('buton-pauza');
    }
});
