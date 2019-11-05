//the following variables can be changed to change the pomodoro program
const dailyHoursOfWork = 5;
const dailyPomodoroTarget = dailyHoursOfWork * 2; 
const pomodoroWorkTime = 25*60;
const pomodoroPauseTime = 5*60;
// used for tracking pomodoro's done today
let pomodorosDoneToday = 0;
//is used for counting down time left, can also be used for debugging by setting up time left for the counter
let totalTime;
//dailyReward stores the money bonus received
let dailyReward = 0;
//jiro ono quotes and images
const jiroOnoContent = [
    {
        quote: `<p>Once you decide on your occupation you must immerse yourself in your work.</p>`,
        image: `https://miro.medium.com/max/1400/1*J8Bw5e9O9AfmLNdDKRRv6A.jpeg`,
        sound: `once-you-decide-on-your-occupation1566206442.mp3`
    },
    {
        quote: `<p>You have to fall in love with your work. Never complain about your job.</p>`,
        image: `https://image.pbs.org/video-assets/pbs/independent-lens/101842/images/Mezzanine_831.jpg`,
        sound: `you-have-to-fall-in-love1566206396.mp3`
    },
    {
        quote: `<p>I do the same thing over and over, improving bit by bit. I’ll continue to climb.</p>`,
        image: `https://occ-0-1068-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSNo5D-8wqH4XKRyiFF9DPnyKp4IBbeLwhyHaetEyW3eAQQU4tjXoGuKac-Y8hVwwLhBZPd1hm9vBLT8KEQhsPdjkbj1vIt3mQ.jpg?r=4b4`,
        sound: `i-do-the-same1566206262.mp3`
    },
    {
        quote: `<p>It’s just about making an effort and repeating the same thing everyday.</p>`,
        image: `https://agoodmovietowatch.com/wp-content/uploads/tumblr_n2lhr4sadM1tv4t6uo9_1280.jpg`,
        sound: `its-just-about-making-an1566205812.mp3`
    },
    {
        quote: `<p>Seen many chefs who are self critical. Never seen anyone who is so hard on himself as Jiro.</p>`,
        image: `https://m.media-amazon.com/images/M/MV5BNGMwNjFkNjAtMDI2NS00NDI3LWIzYTAtNTEzZDkxMjZiMzQ5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNDAxOTExNTM@._V1_.jpg`,
        sound: `seen-many-chefs-who-are-self1566205820.mp3`
    },
    {
        quote: `<p>He is always trying to find ways to make the sushi better or to improve his skills.</p>`,
        image: `http://i.imgur.com/9VSqAX9.jpg`,
        sound: `he-is-always-trying-to-find1566206286.mp3`
    },
    {
        quote: `<p>It has to be better than last time.</p>`,
        image: `https://troybordun.files.wordpress.com/2013/03/vlcsnap-2013-03-16-21h30m37s155.png`,
        sound: `it-has-to-be-better-than1566206340.mp3`
    },
    {
        quote: `<p>You must dedicate your life to mastering your skill. That's the secret of success.</p>`,
        image: `https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2F1850516970.rsc.cdn77.org%2Fwordpress%2Fwp-content%2Fuploads%2F2012%2F07%2Fjiro-dreams-of-sushi-BD_01-600x338.jpg&f=1`,
        sound: `you-must-dedicate-your-life-to1566206493.mp3`
    },
    {
        quote: `<p>Always try to improve on yourself. Always strive to elevate your craft.</p>`,
        image: `https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic1.businessinsider.com%2Fimage%2F55c12c4f2acae7f4028bd2b5-1096-822%2Fyoshikazu%2520ono.png&f=1`,
        sound: `always-try-to-improve-on-yourself1566215011.mp3`
    },
    {
        quote: `<p>I've never once hated this job. I fell in love with my work and gave my life to it.</p>`,
        image: `https://media.npr.org/assets/img/2014/04/23/42-19208522_wide-2edfc261935eef04784c4c719f2b3d48e90df2c3.jpeg?s=1400`,
        sound: `ive-never-once-hated-this-job1566215492.mp3`
    },
    {
        quote: `<p>First, they take their work very seriously and consistently perform on the highest level.</p>`,
        image: `http://www.simplethingcalledlife.com/wp-content/uploads/2015/03/Yamamato-Food-Writer-Tips.png`,
        sound: `first-they-take-their-work-very1566215916.mp3`
    },
    {
        quote: `<p>My son must do this for the rest of his life.</p>`,
        image: `http://2.bp.blogspot.com/-HwEs7ttSB-o/UGL_cFU5GMI/AAAAAAAAC5c/hxI0CpH3kK4/s1600/Jiro+dreams+of+sushi+01.jpg`,
        sound: `my-son-must-do-this-for1566216138.mp3`
    },
    {
        quote: `<p>He always worked incredibly hard. He would only take a day off if it was a national holiday.</p>`,
        image: `https://jewelpie.com/wp-content/uploads/2017/09/Sukiyabashi-Jiro-restaurant-886x668.jpg`,
        sound: `he-always-worked-incredibly-hard1566227688.mp3`
    },
    {
        quote: `<p>The way of the shokunin is to repeat the same thing every day.</p>`,
        image: `https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcontemplatrix.files.wordpress.com%2F2012%2F11%2Fjiro-and-staff.jpg&f=1`,
        sound: `the-way-of-the-shokunin-is1566282172.mp3`
    }    
];
//selects different divs on page
const headsUpDisplay = document.getElementById('headsUpDisplay');
const instructions = document.getElementById('instructions');
const buttons = document.getElementById('buttons');
const body = document.querySelector('body');
//defining loop in global scope to be able to stop setinterval 
let loop;
//defining audio objects through Audio class
var pomodoroDoneSound = new Audio('bravo.mp3');
var pauseSound = new Audio('bell.mp3');
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
//sound variable is used to know if to mute random mp3 quotes
let sound = true;
//creates start pomodoro work, start pomodoro pause, stop pomodoro buttons
const startPomodoroWorkButton = createPomodoroButton('Start Pomodoro','pomodoro-start-button');
const stopPomodoroButton = createPomodoroButton('Stop Pomodoro','pomodoro-stop-button');
const startPomodoroPauseButton = createPomodoroButton('Start Pause','pomodoro-pause-button');
const exitPomodoroButton = createPomodoroButton('Exit Pomodoro','pomodoro-exit-button');
const spacingSpan = document.createElement('span');
spacingSpan.innerText = ' ';
buttons.appendChild(spacingSpan);
const anotherPomodoroButton = createPomodoroButton('New Pomodoro','another-pomodoro-button');


//function definitions begin here
//function to create new pomodoro buttons
function createPomodoroButton(text, id) {
    const newButton = document.createElement('button');
    newButton.innerText = text;
    newButton.id = id;
    newButton.style.display = 'none';
    //appends newly created element to the button section of the page
    buttons.appendChild(newButton);
    return newButton;
};

//toggling sound on or off
document.querySelector('body').addEventListener('click', (event) => {
    //click pe sound on determina sa fie sound off
    if( /soundon\.png$/.test(event.target.src) ) {
        soundOn.style.display = 'none';
        soundOff.style.display = 'block';
        pauseSound.muted = true;
        pomodoroDoneSound.muted = true;
        sound = false;
    }
    //click pe sound off determina sa fie sound on
    else if( /soundoff\.png$/.test(event.target.src) ) {
        soundOff.style.display = 'none';
        soundOn.style.display = 'block';
        pauseSound.muted = false;
        pomodoroDoneSound.muted = false;
        sound = true;
    }
});

//displays pomodoro home page
function homePage () {
    //afiseaza prima pagina
    body.style.backgroundImage = `url('https://www.shokunin.com/img/80mm/i5.jpg')`;
    body.style.backgroundSize = "cover";
    buttons.style.display = 'block';
    headsUpDisplay.innerHTML = `${pomodorosDoneToday/dailyPomodoroTarget*100}% done`;
    instructions.innerHTML = `<p>Start another Pomodoro, focus on one thing only otherwise stop the Pomodoro.</p>`;      
    startPomodoroWorkButton.style.display = 'block';
}

//function that displays the counter while work time is counting
function startPomodoro() {
    //displays ponodoro work-time, ogtherwise instructions from first page would be displayed
    headsUpDisplay.innerHTML = `${pomodoroWorkTime/60}:00`;
    //gets a random jiro object with quote, mp3 and photo
    const randomJiroObject = jiroOnoContent[ Math.floor( Math.random()*jiroOnoContent.length ) ];
    //displays random jiro photo
    body.style.backgroundImage = `url('${randomJiroObject.image}')`;
    //displays random jiro quote
    instructions.innerHTML = `${randomJiroObject.quote}`;
    //reads the quote, by playing a mp3 if sound is on
    quoteSound = new Audio(`audio/${randomJiroObject.sound}`);
    //plays sound only if sound is true, variable sound tells if sound was muted by the user, look at toggling sound on or off event listener
    if(sound) quoteSound.play();
    //adds the exit button
    stopPomodoroButton.style.display = 'block';
    //initializing total time to work with value of pomodoroWorkTime
    totalTime = pomodoroWorkTime;
    //start counting down work time, set interval to 1 second
    loop = setInterval( () => {
        //mutes sound in case user doesn't need it after it starts playing
        if(!sound) quoteSound.muted = true;
        else quoteSound.muted = false;
        //if totaltime is different from zero, so there is work time left
        if(totalTime) {
            totalTime -= 1;
            let sirCeas = transformaInCeas(totalTime);
            headsUpDisplay.innerHTML = `${sirCeas}`;
            document.title = `${sirCeas} min`;
        }
        //checks if time is zero and daily pomodoro target is done
        else if(totalTime === 0 && (pomodorosDoneToday+1) === dailyPomodoroTarget) {
            //mutes fireworks sound if pomodoro app sound is off
            runFireworks();
            window.clearTimeout(loop);
        }
        //else if time is zero, so pomodoro work time is already over
        else if(totalTime === 0 ) {
            pomodorosDoneToday += 1;
            //ofera recompensa
            serveDailyReward ()
            pauseSound.play();
            window.clearTimeout(loop);
            stopPomodoroButton.style.display = 'none';
            //displays ponodoro pause-time, otherwise 00:00 would be displayed from work time
            headsUpDisplay.innerHTML = `0${pomodoroPauseTime/60}:00`;
            //changes background to jiro happy theme
            body.style.backgroundImage = `url('https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.japantimes.2xx.jp%2Fwp-content%2Fuploads%2F2018%2F11%2Fn-michelin-z-20181128-870x535.jpg&f=1')`;
            //hides pomodoro stop button
            stopPomodoroButton.style.display = 'none';
            //shows pomodoro start pause or continue pomodoro button
            startPomodoroPauseButton.style.display = 'inline-block';
            //anotherPomodoroButton.style.display = 'inline-block';
            //updates instructions pane    
            instructions.innerHTML = `<p>Take a ${pomodoroPauseTime/60} min break and move a bit or continue to work without pause.</p>`;
        }
    },1000);
}

//function that displays the counter while pause time is counting
function pausePomodoro() {
    //changes background to pause theme
    body.style.backgroundImage = `url('http://www.ferdyonfilms.com/wp-content/uploads/2012/04/jiro-dreams-of-sushi-1.jpg')`;
    //initializes total time to pomodoro pause time
    totalTime = pomodoroPauseTime;
    loop = setInterval( () => {
        anotherPomodoroButton.style.display = 'none';
        startPomodoroPauseButton.style.display = 'none';
        instructions.innerHTML = `<p>Get up and start moving a bit, unfocus your eyesight, go to the toilet.</p>`;
        //if totaltime is different from zero, so there is pause time left
        if(totalTime) {
            totalTime -= 1;
            let sirCeas = transformaInCeas(totalTime);
            headsUpDisplay.innerHTML = `${sirCeas}`;
            document.title = `${sirCeas} min`;
        }
        //else if time is zero, so pomodoro pause time is already over
        else if(totalTime === 0 ) {
            pomodoroDoneSound.play();
            window.clearTimeout(loop);
            showRewardScreen();
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

//fireworks function
function runFireworks() {
    document.querySelector('body').innerHTML = `
        <video autoplay loop id="myVideo">
            <source src="fireworks.mp4" type="video/mp4">
        </video>
    `;
    if(!sound) document.getElementById('myVideo').muted = true;
}

// function serveDailyReward inspired by B.F.Skinner mice experiments
// returns a random reward that has been added to the daily reward
function serveDailyReward () {
    //premii si probabilitati:
    //0.01 sanse - 100 lei
    //0.09 sanse - 10 lei
    //0.2 sanse - nimic
    //0.7 sanse - 5 lei
    let randomReward = 0;
    let randomNumber = Math.random();
    if(randomNumber <= 0.01) randomReward = 100;
    else if(randomNumber <= 0.09) randomReward = 10;
    else if(randomNumber <= 0.2) {}
    else randomReward = 5;
    dailyReward+= randomReward;
    return randomReward;
}

//function that displays the reward screen
function showRewardScreen() {
    //shows reward you got by doing the pomodoro
    const reward = serveDailyReward();
    if(reward !== 0) {
        headsUpDisplay.innerText = `Get ${reward} lei`;
        instructions.innerHTML = `<p>Keep up the good work and you'll certainly get to be the best in what you do.</p>`;
        body.style.backgroundImage = `url('http://rulesforthemoderngirl.com/wp-content/uploads/2015/01/jiro_dreams_of_sushi_ver2_xlg.jpg')`;
    }
    else {
        headsUpDisplay.innerText = `Get ${reward} lei`;
        instructions.innerHTML = `<p>Better luck next time, keep doing those Pomodoro's Man.</p>`;
        body.style.backgroundImage = `url('https://i.imgur.com/LXQjNbk.jpg')`;        
    }
    exitPomodoroButton.style.display = 'inline-block';
}

//adding event listeners for all buttons
buttons.addEventListener ('click', (event)=> {
    if(event.target.id === 'pomodoro-start-button') {
        //hides start button
        startPomodoroWorkButton.style.display = 'none';
        startPomodoro();
    }
    else if(event.target.id === 'pomodoro-stop-button') {
        startPomodoroPauseButton.style.display = 'none';
        stopPomodoroButton.style.display = 'none';
        window.clearTimeout(loop);   
        homePage();
    }
    else if(event.target.id === 'another-pomodoro-button') {
        startPomodoroPauseButton.style.display = 'none';
        anotherPomodoroButton.style.display = 'none';
        startPomodoro();
    }
    else if(event.target.id === 'pomodoro-pause-button') {
        startPomodoroPauseButton.style.display = 'none';
        anotherPomodoroButton.style.display = 'none';
        pausePomodoro();
    }
    else if(event.target.id === 'pomodoro-exit-button') {
        exitPomodoroButton.style.display = 'none';
        homePage();
    }
});