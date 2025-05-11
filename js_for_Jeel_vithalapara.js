

const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
//const track1 = document.querySelectorAll('.mainphoto');
const cards = document.querySelectorAll('.card');

const easing = 0.10;
let startY = 0;
let endY = 0;
let raf;

const lerp = (start,end,t) => start * (1-t) + end * t;
window.onload = function () {
      // Check if the redirect already happened
      if (!localStorage.getItem('redirectedOnce')) {
        // Set the flag so it only happens once
        localStorage.setItem('redirectedOnce', 'true');
        // Redirect to loading page
        window.location.href = "loading_page.html";
      }
    };

window.addEventListener('DOMContentLoaded', () => {
  // Create a black overlay div that covers the screen
  const fadeOverlay = document.createElement('div');
  Object.assign(fadeOverlay.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    opacity: 1,
    zIndex: 9999,
    pointerEvents: 'none',
    transition: 'opacity 2s ease-in'
  });

  document.body.appendChild(fadeOverlay);

  // Start fading out the overlay
  requestAnimationFrame(() => {
    fadeOverlay.style.opacity = '0';
  });

  // Remove the overlay after transition
  fadeOverlay.addEventListener('transitionend', () => {
    fadeOverlay.remove();
  });
});

window.onload = checkScreenSize;
function checkScreenSize() {
  if (window.innerWidth < 800) {
      alert("Devloper is lazy to optimize website for small devices 😞 but you can still visit 😊.  ''I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.'' ~Bill Gates😎 ");
  }
}



function updateScroll() {
  startY = lerp(startY,endY,easing);
  gallery.style.height = `${track.clientHeight}px`;
  track.style.transform = `translateY(-${startY}px)`;
  activateParallax();
  raf = requestAnimationFrame(updateScroll);
  if (startY.toFixed(1) === window.scrollY.toFixed(1)) cancelAnimationFrame(raf);
}

function startScroll() {
  endY = window.scrollY; 
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(updateScroll);
}

function parallax(card) {
  const wrapper = card.querySelector('.card-image-wrapper');
  const diff = card.offsetHeight - wrapper.offsetHeight;
  const {top} = card.getBoundingClientRect();
  const progress = top / window.innerHeight;
  const yPos = diff * progress;
  wrapper.style.transform = `translateY(${yPos}px)`;
}

const activateParallax = () => cards.forEach(parallax);

function init() {
  activateParallax();
  startScroll();
}

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}
document.addEventListener('contextmenu', (e) => e.preventDefault());

window.addEventListener('load',updateScroll,false);
window.addEventListener('scroll',init,false);
window.addEventListener('resize',updateScroll,false);


elements.forEach((element) => {
  // Add touchstart event listener
  element.addEventListener('touchstart', () => {
    element.classList.add('touch-hover-effect');
  });

  element.addEventListener('touchend', () => {
    // Remove touch effect
    element.classList.remove('touch-hover-effect');
  });
});

