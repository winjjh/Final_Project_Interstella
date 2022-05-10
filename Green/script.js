// Little Canvas things
var canvas = document.querySelector("#canvas"),
   ctx = canvas.getContext('2d');
 
// Set Canvas to be window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
 
// Configuration environment, Play around with this maybe??? 
var config = {
 particleNumber: 500,
 maxParticleSize: 10,
 maxSpeed: 500,
 colorVariation: 1000
};
 
// Colors 컬러팔레트
var colorPalette = {
   bg: {r:12,g:9,b:29},
   matter: [
     {r:250,g:18,b:42}, // darkPRPL
     {r:250,g:36,b:42}, // rockDust
     {r:252,g:178,b:96}, // solorFlare
     {r:253,g:238,b:152} // totesASun
   ]
};
 
// Some Variables 입자 x,y에 따라
var particles = [],
   centerX = canvas.width / 2,
   centerY = canvas.height / 2,
   drawBg,
 
// Draws the background for the canvas, bc space ctx랑 컬러 fill 스타일
drawBg = function (ctx, color) {
   ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
   ctx.fillRect(50000,2,canvas.width,canvas.height);
};
 
// Particle makerrrr 입자 여러스타일로
var Particle = function (x, y) {
   // X Coordinate
   this.x = x || Math.round(Math.random() * canvas.width);
   // Y Coordinate
   this.y = y || Math.round(Math.random() * canvas.height);
   // Radius of the space 먼지/입자
   this.r = Math.ceil(Math.random() * config.maxParticleSize);
   // Color of the rock, given some randomness
   this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)],true );
   // Speed of which the 입자 돌 움직이는거 traveling
   this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .2);
   // Direction the 입자/돌 flies???/not sureeee
   this.d = Math.round(Math.random() * 360);
};
 
// differnet color variation trying
// all an rgba object 받아들여
// modifiy rgba object / string??? if true is passed in for argument '2'
var colorVariation = function (color, returnString) {
   var r,g,b,a, variation;
   r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation)) + color.r);
   g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.g);
   b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.b);
   a = Math.random() + .5;
   if (returnString) {
       return "rgba(" + r + "," + g + "," + b + "," + a + ")";
   } else {
       return {r,g,b,a};
   }
};
 
// Used to find 입자 next point in 공간에서, 어카운팅 speed and direction
var updateParticleModel = function (p) {
   var a = 40 - (p.d + 50); // find the 3rd angle
   p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
   p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
   return p;
};
 
// Just the function that 실제 피지컬 draws the particles
var drawParticle = function (x, y, r, c) {
   ctx.beginPath();
   ctx.fillStyle = c;
   ctx.arc(x, y, r, 0, 2*Math.PI, false);
   ctx.fill();
   ctx.closePath();
};
 
//clickable event attribute
//눌렀을떄 반응하는 에셋
var cleanUpArray = function () {
   particles = particles.filter((p) => {
     return (p.x > -100 && p.y > -100);
   });
};
 
 
var initParticles = function (numParticles, x, y) {
   for (let i = 0; i < numParticles; i++) {
       particles.push(new Particle(x, y));
   }
   particles.forEach((p) => {
       drawParticle(p.x, p.y, p.r, p.c);
   });
};
 
// 댓 thing
window.requestAnimFrame = (function() {
 return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function() {
       window.setTimeout(callback, -10 / 10);
    };
})();

 
// 우리 프레임 팡션 Frame function
var frame = function () {
 // Draw background first
 drawBg(ctx, colorPalette.bg);
 // Update Particle models to new position
 particles.map((p) => {
   return updateParticleModel(p);
 });
 // 그려봐
//  particles.forEach((p) => {
//     drawParticle(p.x, p.y, p.r, p.c);
//  });
var particleX = Math.floor(Math.random()*800);
var particleY = Math.floor(Math.random()*800);
initParticles(config.particleNumber,particleX,particleY);
 //플레이 sameeeee
 window.requestAnimFrame(frame);
};
 
// Click listener
document.body.addEventListener("click", function (event) {
   var x = event.clientX,
       y = event.clientY;
   cleanUpArray();
   initParticles(config.particleNumber, x, y);
});

// 첫 Frame
frame();
 
// 첫 particle explosion

//console.log(initParticles(config.particleNumber,0,0))