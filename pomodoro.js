//the following variables can be changed to change the pomodoro program
const dailyPomodoroTarget = 16; 
const pomodoroWorkTime = 25*60;
const pomodoroPauseTime = 5*60;
let pomodorosDoneToday = 0;
let dailyRewardMoney = 0;
//reward array, it contains reward objects with rewards in cash and probabilities, all probabilities sum up to 100
const rewards = [
    {
        reward: 0,
        probability: 30 
    },
    {
        reward: 5,
        probability: 50 
    },
    {
        reward: 3,
        probability: 10
    },
    {
        reward: 7,
        probability: 4
    },
    {
        reward: 8,
        probability: 3
    },
    {
        reward: 9,
        probability: 2
    },
    {
        reward: 100,
        probability: 1
    }
];

//is used for counting down time left, can also be used for debugging by setting up time left for the counter
let totalTime;
//defining loop in global scope to be able to stop setinterval 
let loop;
let loop2;
//selects different divs on page
const body = document.querySelector('body');
//defining audio objects through Audio class
const soundPomodoroPause = new Audio('audio/pause2.mp3');
const soundPomodoroFinish = new Audio('audio/finish3.mp3');
const soundPomodoroStart = new Audio('audio/start.mp3');
const soundPomodoroStop = new Audio('audio/stop.mp3');
const soundPomodoroReward = new Audio('audio/reward.mp3');
//sound variable is used to know if to mute random mp3 quotes
let sound = true;
//hide sound off image because initially sound is on
document.querySelector('#sound-off-image').style.display = "none";


//adding event listeners for all buttons
body.addEventListener ('click', (event)=> {
    if(event.target.id === 'button-pomodoro-stop') {
        window.clearTimeout(loop);
        if(sound) soundPomodoroStop.play();   
        home();
    }
    else if(event.target.id === 'button-pomodoro-reward') {
        if(sound) soundPomodoroReward.play();
        window.clearTimeout(loop2);   
        window.clearTimeout(loop);   
        event.target.style.display = 'none';
        skinnerBox();
    }
    //toggling sound on or off with the next two if's
    else if(event.target.id === 'sound-on-image') {
        muteSound('true');
        event.target.style.display = 'none';
        event.target.nextElementSibling.style.display = 'block';
        sound = false;
    }
    else if (event.target.id === 'sound-off-image') {
        muteSound('false');
        event.target.style.display = 'none';
        event.target.previousElementSibling.style.display = 'block';
        sound = true;
    }
});

//function that mutes or unmutes all sound objects, it's parameter is a string taking either "true" or "false"
function muteSound(status) {
    console.log(status);
    soundPomodoroPause.muted = status;
    soundPomodoroStart.muted = status;
    soundPomodoroFinish.muted = status;
    soundPomodoroStop.muted = status;
}

//function that is given one of the 3 pomodoro screens (home, pomodoro or reward) and displays it while hiding the other 2
function displayScreen(screenName) {
    document.querySelector('#home').style.display = "none";                
    document.querySelector('#pomodoro').style.display = "none";                
    document.querySelector('#reward').style.display = "none";                
    document.querySelector(`#${screenName}`).style.display = "block";                
};

//function that displays the counter while work time is counting
function pomodoro() {
    // $('#pomodoro').hide().slideDown(500);
    const headsUpDisplay = document.getElementById('headsUpDisplay');
    const instructions = document.getElementById('instructions');
    displayScreen('pomodoro');
    headsUpDisplay.innerHTML = `${(pomodoroWorkTime+pomodoroPauseTime)/60}:00`;
    body.style.backgroundImage = `url('https://www.thespruce.com/thmb/3OWYXJtRD9QbIqwZyti5porC1DQ=/2103x1426/filters:fill(auto,1)/Lumina-Images-g-desk-stud-58ae39e63df78c345b4663c1.jpg')`;    
    //plays sound only if sound is true, variable sound tells if sound was muted by the user, look at toggling sound on or off event listener
    if(sound) soundPomodoroStart.play();    
    console.log(sound);
    //initializing total time to work with value of pomodoroWorkTime
    totalTime = pomodoroWorkTime + pomodoroPauseTime;
    //start counting down work time, set interval to 1 second
    loop = setInterval( () => {
        // console.log(totalTime);
        //if totaltime is different from zero, so there is work time left
        if(totalTime) {
            totalTime -= 1;
            let sirCeas = transformaInCeas(totalTime);
            headsUpDisplay.innerHTML = `${sirCeas}`;
            //if it's pause time 
            if(totalTime === pomodoroPauseTime) {
                instructions.innerHTML = `<p>Take a break, get away from your desk, move a bit, unfocus eyesight, go to the toilet.</p>`;      
                if(sound) soundPomodoroPause.play();    
            }
            document.title = totalTime %3 === 0 ? "Pomodoro" : "LIVE";


        }
        //else if time is zero, so pomodoro work time is already over
        else if(totalTime === 0 ) {
            pomodorosDoneToday++;
            if(sound) soundPomodoroFinish.play();
            //clears setinterval loop
            window.clearTimeout(loop);
            //hides pomodoro stop button and displays go to reward screen
            reward();
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

//function that displays the reward screen
function reward() {
    displayScreen('reward');
    loop2 = shuffleRewards();
    $('#reward').hide().delay(1000).slideDown('slow');
    document.querySelector('#button-pomodoro-reward').style.display = 'block';
    document.querySelector('div#reward div.instructions').innerHTML = `<p>Bravo, great job man. You have one minute to claim a reward.</p>`;
    totalTime = 60;
    body.style.backgroundImage = `url('https://nevadasmallbusiness.com/wp-content/uploads/2014/12/Fun-in-the-Workplace_142096246.jpg')`;                    
    loop = setInterval( () => {
        totalTime--;
        document.querySelector('#button-pomodoro-reward').innerText = `Get Your Reward (${totalTime} seconds)`;
        document.title = totalTime % 3 === 0 ? `Get Your` : `Reward`;
        if(totalTime === 0)
        {
            window.clearTimeout(loop);   
            home();
        }
    },1000)
}

//function used to displays rewards like they are shuffled
function shuffleRewards() {
    index = 0;
    const loop2 = window.setInterval(()=>{
        $('#reward div.headsUpDisplay #h1-reward')
        .text(rewards[index].reward + ' Lei')
        .fadeIn(200)
        .delay(100)
        .fadeOut(200);
        index = index+1 === rewards.length ? 0 : index+1 ;
    },500);
    return loop2;
}

//function that generates a variable reward like in B.F.Skinner box
function skinnerBox() {
    //function that takes an array of reward objects as argument and returns a random reward taking probabilities into consideration
    function generateVariableReward(rewardString) {
        const randomNumber = Math.ceil(Math.random()*100);
        let x = 0;
        let y = 1;
        do {
            if( randomNumber >= y && randomNumber < (y + rewardString[x].probability) ) {
                return rewardString[x].reward;
            }
            y+=rewardString[x].probability; 
            x++;
        }
        while (x<rewardString.length);    
    }

    const randomReward = generateVariableReward(rewards);
    dailyRewardMoney+=randomReward;
    $('#reward div.headsUpDisplay #h1-reward').fadeIn(200);
    document.querySelector('#reward div.headsUpDisplay #h1-reward').innerHTML = `${randomReward} Lei`;
    document.querySelector('#reward div.instructions').innerHTML = randomReward !== 0 ?
        `<p>Bravo, you won another ${randomReward} Lei. Keep it up Man!</p>` 
        : `<p>Shit happens, no win. Try another Pomodoro.</p>` ;
    $('#reward').delay(3000).slideUp('slow');
    window.setTimeout(home,4000);
}

//quote displayed above the textarea
const displayedQuote = document.querySelector("#home").firstElementChild;
//text the user entered
const enteredQuote = document.querySelector("#quote-input");

// function that displays home functionality
function home() {
    displayScreen('home');
    document.title = "Pomodoro";
    const randomQuote = quotesOnWorkEthic[Math.floor(Math.random()*quotesOnWorkEthic.length)];
    document.querySelector('body').style.backgroundImage = `url("${randomQuote.image}")`;
    displayedQuote.innerText =  randomQuote.quote;
    enteredQuote.placeholder = pomodorosDoneToday === 0 ?
    `Type the above text inspired by ${randomQuote.author} here and press enter to start a Pomodoro.` 
    : `Type the text inspired by ${randomQuote.author} and hit enter to start another Pomodoro. (You already finished ${pomodorosDoneToday} and won ${dailyRewardMoney} Lei)`;
}

//event listener for home screen to get users enter
enteredQuote.addEventListener('keypress', (event) => {
    let key = event.keyCode;
    if(key === 13) 
        if(enteredQuote.value === displayedQuote.innerText) { 
            $("#home").slideUp(500);
            setTimeout( ()=> {
                enteredQuote.value = "";
                pomodoro();
            }, 500);            
        }
        else {
            setTimeout( ()=> {
                enteredQuote.value = "";
                enteredQuote.placeholder = "Type the exact text, then press Enter.";
            }, 500);
        }
});