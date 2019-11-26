document.querySelector('body').style.backgroundImage = `url('https://nevadasmallbusiness.com/wp-content/uploads/2014/12/Fun-in-the-Workplace_142096246.jpg')`;  

const tariCarusel = document.querySelectorAll('.tari');

//$('.tari').hide();
// $('#text')

//     .text('Franta')
 
//     .slideDown(1000)
//     .delay(3000)
//     .slideUp(1000)
//     .delay(3000)
//     .text('Roma')
//     .slideDown(1000)
//     .delay(3000)
//     .slideUp(1000)

const array = ['100 Lei','Un smartwatch','50 Lei', 'Nimic'];
$('#text').hide();
index = 0;
const loop = window.setInterval(()=>{
    $('#text')
    .text(array[index])
    .fadeIn(200)
    .delay(100)
    .fadeOut(200);
    // window.setTimeout( () => {
    //     $('#text').hide();        
    // }, 800);
    index = index+1 === array.length ? 0 : index+1 ;
},400)

document.querySelector('#button-pomodoro-reward').addEventListener('click', (event)=>{
    event.target.style.display="none";
    window.setInterval( ()=>{    
        window.clearTimeout(loop);
        $('#text').text('50 Lei').fadeIn(500);
    },1000);
});