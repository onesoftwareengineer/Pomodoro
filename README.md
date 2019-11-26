# Pomodoro

Scope of this web app: 
- To help you become an industrious person if you are lazy
- To help you learn the benefits of being industrious

Application has 3 screens:

1. Homescreen
    shows number of pomodoro's done today
    displays a random quote by famous people like Elon Musk
    displays instructions like "write down I work hard because and then the above quote to start a new pomodoro"
    displays text field where user can input the quote
        if user doesn't write it properly instruction updates "There was a typo, write again "..." "
        if user writes down properly, he is forwarded to the pomodoroscreen

2. Pomodoroscreen
    play pomodoro start sound, always the same like 1 bell
    changes bar title to "Work"
    displays pomodoro stop button
        if user clicks he is forwarded to the homescreen
    start countdown from [pomodoro time] to zero.
    when it's [pause time]
        play pomodoro pause sound, always the same like 2 bells
        changes instructions to "Take a break: move a bit, unfocus eyesight, go to the toilet."
        changes bar title to "Break"
    when pomodoro is done 
        plays rewars sound, always the same like applause
        increments pomodoros done today    
        redirect to rewardscreen 

3. Rewardscreen
    changes bar title to "Reward"
    displays get your reward button with countdown timer to 1 minute on button 
        if user doesn't click on that button within 1 minute, user is forwarded to homescreen
        if user clicks on that button the following happens
            animaton: shuffles money and reward products and displays reward
                various reward
                near miss style
                sometimes you don't get anything
            adds reward to daily total
            animation: shows today's total reward in money or products
            in 3 seconds redirects user to Homescreen
                
http://dev2.slicejack.com/fullscreen-video-demo/index.html
https://slicejack.com/fullscreen-html5-video-background-css/


Make sound work properly so that it plays even if it's muted and then if you mute it you can hear it
Make notification work : take a break / get your reward