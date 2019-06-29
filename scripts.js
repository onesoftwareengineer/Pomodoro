const afisaj = document.getElementById('afisaj');
const instructiuni = document.getElementById('instructiuni');
const butoane = document.getElementById('butoane');
const body = document.querySelector('body');
let totalTime;
let pomodoroFinalizateAstazi = 0;
//defining loop in global scope to be able to stop setinterval 
let loop;
var aplauze = new Audio('applause.mp3');
var horn = new Audio('horn.wav');


//afiseaza prima pagina
function homePage () {
    body.style.backgroundImage = "url('https://optoutlife.com/wp-content/uploads/2018/04/rawpixel-550994-unsplash.jpg')";
    butoane.style.display = 'block';
    afisaj.innerHTML = `00:00`;

    instructiuni.innerHTML = `
        <h2> Astazi ai castigat ${pomodoroFinalizateAstazi*5} lei facand ${pomodoroFinalizateAstazi} Pomodoro.</h2>
        <h2>Trage tare altfel pierzi ${(16-pomodoroFinalizateAstazi)*5} de lei.</h2>
    `;   

    butoane.innerHTML = `
        <button id="30">Start 30 Min Pomodoro</button>
        <button id="60">Start 60 Min Pomodoro</button>
    `;
};

butoane.addEventListener ('click', (event)=> {
    if(event.target.id === '30') startPomodoro(30);
    else if(event.target.id === '60') startPomodoro(60);
    else if(event.target.id === 'exit') {
        clearTimeout(loop);   
        homePage();
    }
});


//functia care se ruleaza, fie de 25 sau 50 de minute de munca in functie de durata pomodorului 30 respectiv 60 de minute
//parametrul pomodoroTime este in minute
function startPomodoro(pomodoroTime) {
    
    butoane.innerHTML = `
        <button id="exit">Exit Pomodoro</button>
    `;

    //se creaza timpul de lucru si timpul de pauza in secunde in functia de durata pomodoro-ului
    let pauseTime;
    let valoarePomodoro;
    if (pomodoroTime === 60) {
        totalTime = 50*60;
        pauseTime = 10*60;
        //valoare pomodoro este de 1 daca are 30 de min sau 2 daca are 60 de min
        valoarePomodoro = 2;        
    }
    else if (pomodoroTime === 30) {
        totalTime = 30*60;
        pauseTime = 5*60;   
        valoarePomodoro = 1;     
    }

    //afiseza mesajele din header valabile pentru timpul de lucru
    instructiuni.innerHTML = `<h2>Concentreaza-te asupra unui singur lucru.</h2>`;
    loop = setInterval( () => {
        
        //verifica daca este vreme de lucru
        if(totalTime) {
            totalTime -= 1;
            let sirCeas = transformaInCeas(totalTime);
            afisaj.innerHTML = `${sirCeas}`;
            document.title = `${sirCeas} min`;
            //console.log(timer);
        }
        else if(totalTime === 0 ) {
            horn.play();
            clearTimeout(loop);   
            pomodoroFinalizateAstazi += valoarePomodoro;
            homePage();
        }
        if(totalTime === pauseTime) {
            aplauze.play();
            instructiuni.innerHTML = `<h2>Ia o pauza, fa putina miscare.</h2>`;                
        }
    },1000); 
}

//functia care transforma un numar de secunde intr-un string de tipul 03:35 unde 03 este numarul de minute si 35 este numarul de secunde
function transformaInCeas (x) {
    let minuteRamase = parseInt(x/60);
    let minuteRamaseZeci = parseInt(minuteRamase/10);
    let minuteRamaseUnitati = minuteRamase - minuteRamaseZeci*10;
    let secundeRamase = x - minuteRamase*60;
    let secundeRamaseZeci = parseInt(secundeRamase/10); 
    let secundeRamaseUnitati = secundeRamase - secundeRamaseZeci*10;
    return `${minuteRamaseZeci}${minuteRamaseUnitati}:${secundeRamaseZeci}${secundeRamaseUnitati}`;
};