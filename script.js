
const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function follower() {
    window.addEventListener('mousemove',(det)=>{
        document.querySelector('.mini-circle').style.transform = `translate(${det.clientX}px, ${det.clientY}px) scale(${scaleX}, ${scaleY})`
    });
}

var Timeout;
var scaleX = 1
var scaleY = 1

function Scale() {
    
    clearTimeout(Timeout)

    let Prev_ValuesX = 0
    let Prev_ValuesY = 0

    window.addEventListener('click',(e)=>{
        let xdiff = e.clientX - Prev_ValuesX
        let Ydiff = e.clientY - Prev_ValuesY

        scaleX = gsap.utils.clamp(.8 , 1.2 , xdiff/100) 
        scaleY = gsap.utils.clamp(.8 , 1.2 , Ydiff/100)

        Prev_ValuesX = e.clientX
        Prev_ValuesY = e.clientY
        
        Timeout = setTimeout(function(det){
             document.querySelector('.mini-circle').style.transform = `translate(${det.clientX}px, ${det.clientY}px) scale(1,1)`
        },100)

    })
}

function animatepage1() {
    var t1 = gsap.timeline()

    t1.from('#nav',{
       y:'-10',
       opacity: 0,
       duration:1.5,
       ease:Expo.easeInOut
    })
    t1.to('.bound-element',{
        y:0,
    //    opacity: 0,
       duration:1.5,
       delay:-1,
       ease:Expo.easeInOut,
       stagger:.2
    })
    t1.from('.hero-footer',{
       y:'-10',
       opacity: 0,
       duration:1.5,
       delay:-1,
       ease:Expo.easeInOut
    })
}


document.querySelectorAll('.elem').forEach(function(elem, idx, allElems){
    var diffrot = 0;
    var rotate= 0;

    elem.addEventListener('mouseleave',(e)=>{  
        gsap.to(elem.querySelector('img'), {
            opacity:0,
            ease:Power3,
        })
    });

    elem.addEventListener('mousemove',(e)=>{
      allElems.forEach(function(otherElem){
        if(otherElem !== elem) {
          gsap.to(otherElem.querySelector('img'), 
          { opacity:0, 
           ease:Power3 
        });
    }
});
      var elemRect = elem.getBoundingClientRect();
      var img = elem.querySelector('img');
      var imgRect = img.getBoundingClientRect();
      var imgWidth = imgRect.width;
      var imgHeight = imgRect.height;
      var relX = e.clientX - elemRect.left;
      var relY = e.clientY - elemRect.top;
      diffrot = e.clientX - rotate;
      rotate = e.clientX;
      
      var minLeft = imgWidth/2;
      var maxLeft = elemRect.width - imgWidth/2;
      var minTop = imgHeight/2;
      var maxTop = elemRect.height - imgHeight/2;
      var finalLeft = Math.max(minLeft, Math.min(relX, maxLeft));
      var finalTop = Math.max(minTop, Math.min(relY, maxTop));
      gsap.to(img, {
          opacity:1,
          ease:Power3,
          top: finalTop - imgHeight/2,
          left: finalLeft - imgWidth/2,
          rotate:gsap.utils.clamp(-20,20,diffrot*0.8)
      })
    });
});



follower()
Scale()
animatepage1()