let position = 0;
const speed=1.3;

const lidersTrack=document.querySelector('.liders-track');
const liders = document.querySelectorAll('.liders-card');


liders.forEach(lider =>{
    const clone = lider.cloneNode(true);
    lidersTrack.appendChild(clone);
});

function moveslider(){

    position -=speed;

    const totalwidth = lidersTrack.scrollWidth/2;
    if(Math.abs(position)>=totalwidth)position=0;
    lidersTrack.style.transform = `translateX(${position}px)`; 
    requestAnimationFrame(moveslider)

}

moveslider();



