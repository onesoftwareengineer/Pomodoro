//jiro ono quotes and images
const jiroOnoContent = [
    {
        quote: `<p>Once you decide on your occupation you must immerse yourself in your work.</p>`,
        image: `https://miro.medium.com/max/1400/1*J8Bw5e9O9AfmLNdDKRRv6A.jpeg`
    },
    {
        quote: `<p>You have to fall in love with your work.Never complain about your job.</p>`,
        image: `https://image.pbs.org/video-assets/pbs/independent-lens/101842/images/Mezzanine_831.jpg`
    },
    {
        quote: `<p>I do the same thing over and over, improving bit by bit. I’ll continue to climb.</p>`,
        image: `https://occ-0-1068-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSNo5D-8wqH4XKRyiFF9DPnyKp4IBbeLwhyHaetEyW3eAQQU4tjXoGuKac-Y8hVwwLhBZPd1hm9vBLT8KEQhsPdjkbj1vIt3mQ.jpg?r=4b4`
    },
    {
        quote: `<p>It’s just about making an effort and repeating the same thing everyday.</p>`,
        image: `https://agoodmovietowatch.com/wp-content/uploads/tumblr_n2lhr4sadM1tv4t6uo9_1280.jpg`
    },
    {
        quote: `<p>Seen many chefs who are self critical. Never seen anyone who is so hard on himself as Jiro.</p>`,
        image: `https://m.media-amazon.com/images/M/MV5BNGMwNjFkNjAtMDI2NS00NDI3LWIzYTAtNTEzZDkxMjZiMzQ5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNDAxOTExNTM@._V1_.jpg`
    },
    {
        quote: `<p>He is always trying to find ways to make the sushi better or to improve his skills.</p>`,
        image: `http://i.imgur.com/9VSqAX9.jpg`
    },
    {
        quote: `<p>It has to be better than last time.</p>`,
        image: `https://troybordun.files.wordpress.com/2013/03/vlcsnap-2013-03-16-21h30m37s155.png`
    }
];
const afisaj = document.getElementById('afisaj');
const instructiuni = document.getElementById('instructiuni');
const butoane = document.getElementById('butoane');
const body = document.querySelector('body');
let totalTime;
let pomodoroFinalizateAstazi = 0;
//defining loop in global scope to be able to stop setinterval 
let loop;
//defining audio objects through Audio class
var aplauze = new Audio('pause.mp3');
var horn = new Audio('arnold.mp3');
//creating and appending soundon image to DOM
const soundOn = document.createElement('img');
soundOn.src = 'soundon.png';
soundOn.className = 'sound';
document.querySelector('body').append(soundOn);
//creating sound off, appending it and hiding it
const soundOff = document.createElement('img');
soundOff.src = 'soundoff.png';
soundOff.className = 'sound';
document.querySelector('body').append(soundOff);
soundOff.style.display = 'none';


//toggling sound on or off
document.querySelector('body').addEventListener('click', (event) => {
    //click pe sound on determina sa fie sound off
    if( /soundon\.png$/.test(event.target.src) ) {
        soundOn.style.display = 'none';
        soundOff.style.display = 'block';
        aplauze.muted = true;
        horn.muted = true;
    }
    //click pe sound off determina sa fie sound on
    else if( /soundoff\.png$/.test(event.target.src) ) {
        soundOff.style.display = 'none';
        soundOn.style.display = 'block';
        aplauze.muted = false;
        horn.muted = false;
    }
});


//afiseaza prima pagina
function homePage () {
    const randomJiroObject = jiroOnoContent[ Math.floor( Math.random()*jiroOnoContent.length ) ];
    body.style.backgroundImage = `url('${randomJiroObject.image}')`;
    body.style.backgroundSize = "cover";
    butoane.style.display = 'block';
    afisaj.innerHTML = `${Math.ceil( pomodoroFinalizateAstazi/12*100 )}<span style="font-size: 28px; vertical-align: super;">%</span>`;
    instructiuni.innerHTML = `${randomJiroObject.quote}`;   
    butoane.innerHTML = `<button id="30">Porneste lucrul</button>`;
};


butoane.addEventListener ('click', (event)=> {
    if(event.target.id === '30') startPomodoro();
    else if(event.target.id === 'exit') {
        clearTimeout(loop);   
        homePage();
    }
});


function startPomodoro() {
    butoane.innerHTML = `<button id="exit">Opreste lucrul</button>`;
    //se creaza timpul de lucru si timpul de pauza in secunde in functia de durata pomodoro-ului
    let pauseTime = 5*60; 
    totalTime = 35*60;
    //afiseza mesajele din header valabile pentru timpul de lucru
    instructiuni.innerHTML = `<p>Concentreaza-te asupra serviciului sau programarii. Altceva inseamna oprirea lucrului.</p>`;
    
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
            pomodoroFinalizateAstazi += 1;
            homePage();
        }
        if(totalTime === pauseTime) {
            aplauze.play();
            instructiuni.innerHTML = `<p>Ia o pauza de 5 minute: mergi la toaleta, fa miscare, exerseaza-ti vederea.</p>`;       
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