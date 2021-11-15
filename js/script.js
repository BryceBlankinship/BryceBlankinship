"use strict";
let body = document.body;
let tilted = false;
let toggleTilt = function () {
    tilted = !tilted;
    if (tilted)
        body.classList.add('details');
    else
        body.classList.remove('details');
};
//body.addEventListener('click', toggleTilt);
//body.addEventListener('touchstart', toggleTilt);
if (location.pathname.match(/fullcpgrid/i))
    setTimeout(toggleTilt, 1000);

window.onscroll = function() {unlockCard()};

function unlockCard() {
    if (document.documentElement.scrollTop >= 870) {
        body.classList.add('details');
    }else{
        body.classList.remove('details');
    }
}

let speedlineLink = document.getElementById('speedlineLink');

speedlineLink.addEventListener("mouseenter", function(event) {
    event.target.style.textShadow = "-2px 2px #242424";
    event.target.style.marginLeft = "-5px";
    event.target.style.marginTop = "5px";
});

speedlineLink.addEventListener("mouseleave", function(event) {
    event.target.style.textShadow = "-5px 5px #242424";
    event.target.style.marginLeft = "5px";
    event.target.style.marginTop = "-5px";
});