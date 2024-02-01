const canvas = document.querySelector("#canvas");
const intro = document.querySelector("#intro");
const ctx = canvas.getContext("2d");
const c = intro.getContext("2d");
const startBtn = document.querySelector("#start-btn");
const exitBtn = document.querySelector("#exit-btn");
const homeBtn = document.querySelector("#home");
const back = document.querySelector("#return");

const CANVAS_WIDTH = canvas.width = intro.width = 1024;
const CANVAS_HEIGHT = canvas.height  = intro.height = 576;
const staggeredFrames = 15;

const room1 = new Image();
room1.src = "./assets/room1.png";

const room2 = new Image();
room2.src = "./assets/room2.png";

const floor = new Image();
floor.src = "./assets/floor.png";

const bathroom = new Image();
bathroom.src = "./assets/bathroom.png";

const lives1 = new Image();
lives1.src = "./assets/heart_logo.png";

const lives2 = new Image();
lives2.src = "./assets/heart_logo.png";

const lives3 = new Image();
lives3.src = "./assets/heart_logo.png";

const character = new Image();
character.src = "./assets/Ivy.png";

const star = new Image();
star.src = "./assets/star.png";

const caterpillar = new Image();
caterpillar.src = "./assets/caterpillar.png";

let gameFrame = 0;
let yb1 = 0;
let yb2 = 1024;
let yb3 = 2120;
let yc1 = 1400;
let Pathdiff = Math.floor(Math.random() * 1000) + 300;
let gameSpeed = 0;
let score = 0;
let finalScore = 0;
let starCount = 0;

let starGap = Math.floor(Math.random() * 950) + 500;
let starX = Math.floor(Math.random() * 800) + 400;
let starY = Math.floor(Math.random() * 800) + 300;
let starX2 = starX + starGap;
let starY2 = Math.floor(Math.random() * 600) + 200;

class Player {
    constructor() {
        this.position = {
            x: 70,
            y: 270
        };
        this.velocity = {
            vy: 0
        };
        this.width = 100;
        this.height = 100;
        this.spriteWidth = 64;
        this.spriteHeight = 64;
        this.frameX = 0;
        this.frameY = 0;
        this.load = false;
        this.gravity = 0.4;
        this.debug = false;
        this.life1 = true;
        this.life2 = true;
        this.life3 = true;
        this.message = false;
    }

    draw() {
        ctx.drawImage(character, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
            this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height);
        if(this.debug) {
            ctx.strokeStyle = "rgb(255, 255, 255)";
            ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
        }
        if(this.life1)   ctx.drawImage(lives1, 610, 65, 20, 20);
        if(this.life2)   ctx.drawImage(lives2, 640, 65, 20, 20);
        if(this.life3)   ctx.drawImage(lives3, 670, 65, 20, 20);
    }

    update() {
        this.position.y += this.velocity.vy;
        if(this.position.y + this.height < 500) {
            this.velocity.vy += this.gravity;
        }
        else this.velocity.vy = 0;

        if(gameFrame % staggeredFrames === 0) {
            if(this.frameX <= 7 ) {
                this.frameX++;
            }
            else {
                this.frameX = 2;
            }
        }
    }
}

const player = new Player();

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    c.drawImage(room2, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    c.drawImage(floor, 0, 480);
    c.drawImage(caterpillar, 0, 0, 64, 64, 800, 430, 60, 60);
    c.drawImage(caterpillar, 0, 0, 64, 64, 900, 430, 60, 60);
    c.fillStyle = "black";
    c.strokeStyle = "white";
    c.font = "60px Arial";
    c.fillText("IVY DASH", 370, 100);
    c.strokeText("IVY DASH", 370, 100);
    c.drawImage(character, player.frameX * player.spriteWidth, player.frameY * player.spriteHeight, player.spriteWidth, player.spriteHeight, player.position.x, player.position.y, player.width, player.height);
    ctx.drawImage(room1, yb1, 0, 1024, CANVAS_HEIGHT);
    ctx.drawImage(room2, yb2, 0, 1096, CANVAS_HEIGHT);
    ctx.drawImage(bathroom, yb3, 0, 1096, CANVAS_HEIGHT);
    ctx.drawImage(floor, 0, 480);
    ctx.drawImage(caterpillar, 0, 0, 64, 64, yc1, 430, 60, 60);
    ctx.drawImage(caterpillar, 0, 0, 64, 64, yc1 + Pathdiff, 430, 60, 60);
    ctx.drawImage(star, starX, starY, 60, 60);
    ctx.drawImage(star, starX2, starY2, 60, 60);
    ctx.drawImage(star, 40, 20, 20, 20);
    ctx.fillStyle = "black";
    ctx.font = "25px Arial";
    ctx.fillText(" X " + starCount, 60, 40);
    gameFrame++;

    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.strokeText("Score: " + score, 600, 50);
    ctx.fillText("Score: " + score, 600, 50);

    yb1 -= gameSpeed/2;
    yb2 -= gameSpeed/2;
    yb3 -= gameSpeed/2;
    yc1 -= gameSpeed;
    starX -= gameSpeed;
    starX2 -= gameSpeed;

    if(player.debug) {
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(yc1, 300, 80, 80);
        ctx.strokeRect(yc1 + Pathdiff, 300, 80, 80);
    }

    if(yb1 + 1024 < 0) yb1 = 2192;
    if(yb2 + 1096 < 0) yb2 = 2120;
    if(yb3 + 1096 < 0) yb3 = 2120;
    if(yc1 + 100 < -600) {
        yc1 = 820;
        Pathdiff = Math.floor(Math.random() * 400) + 300;
    }
    if(starX + 60 < -10) {
        starX = 900;
        starY = Math.floor(Math.random() * 60) + 80;
    }
    if(starX2 + 60 < -10) {
        starGap = Math.floor(Math.random() * 100) + 100;
        starX2 = 900 + starGap;
        starY2 = Math.floor(Math.random() * 60) + 80;
    }

    if(player.position.x  + player.width >= yc1 + 40 &&
        player.position.x < yc1 + 40 &&
        player.position.y + player.height >= 250) {
            yc1 = 2000;
            starX = 900;
            starY = Math.floor(Math.random() * 60) + 80;
            starGap = Math.floor(Math.random() * 100) + 100;
            starX2 = 900 + starGap;
            starY2 = Math.floor(Math.random() * 60) + 80;
            if(player.life1 === true) {
                player.life1 = false;
            }
            else if(player.life1 === false && player.life2 === true) {
                player.life2 = false;
            }
            else if(player.life1 === false && player.life2 === false && player.life3 === true) {
                player.life3 = false;
                player.load = false;
                finalScore = score;
                player.message = true;
                gameSpeed = 0;
                score = 0;
                player.life1 = true;
                player.life2 = true;
                player.life3 = true;
                homeBtn.style.display = "flex";
                exitBtn.style.display = "none";
            }
        }
    
    if(player.position.x + player.width >= yc1 + Pathdiff + 25 &&
        player.position.x < yc1 + Pathdiff + 50 &&
        player.position.y + player.height >= 440) {
            yc1 = 2000;
            Pathdiff = Math.floor(Math.random() * 400) + 300;
            starX = 900;
            starY = Math.floor(Math.random() * 60) + 80;
            starGap = Math.floor(Math.random() * 100) + 100;
            starX2 = 900 + starGap;
            starY2 = Math.floor(Math.random() * 60) + 80;
            if(player.life1 === true) {
                player.life1 = false;
            }
            else if(player.life1 === false && player.life2 === true) {
                player.life2 = false;
            }
            else if(player.life1 === false && player.life2 === false && player.life3 === true) {
                player.life3 = false;
                player.load = false;
                finalScore = score;
                player.message = true;
                gameSpeed = 0;
                score = 0;
                player.life1 = true;
                player.life2 = true;
                player.life3 = true;
                homeBtn.style.display = "flex";
                exitBtn.style.display = "none";
            }
        }

    if(player.position.x + 0.1 + player.width > starX &&
        player.position.y - 0.1 < starY + 20 &&
        player.position.x - 0.1 < starX + 20) {
            score += 50;
            starCount++;
            starX = 900;
            starY = Math.floor(Math.random() * 60) + 80;
        }

    if(player.position.x + 0.1 + player.width > starX2 &&
        player.position.y - 0.1 < starY2 + 20 &&
        player.position.x - 0.1 < starX2 + 20) {
            score += 50;
            starCount++;
            starGap = Math.floor(Math.random() * 100) + 100;
            starX2 = 900 + starGap;
            starY2 = Math.floor(Math.random() * 60) + 80;
        }
    
        if(player.message === true) {
            ctx.font = "50px Arial";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.fillText("Final Score: " + finalScore, 350, 150);
            ctx.strokeText("Final Score: " + finalScore, 350, 150);
        }

    window.requestAnimationFrame(animate);
    player.draw();
    player.update();
}
animate();

window.addEventListener("keydown", (e) => {
    switch(e.key) {
        case "ArrowUp": {
            if(player.velocity.vy === 0) {
                player.velocity.vy = -16;
            }
        break
        }
        case "d": {
            player.debug = !player.debug;
        }
        break
    }
})

function start() {
    player.load = true;
    startBtn.style.display = "none";
    canvas.style.display = "flex";
    intro.style.display = "none";
    exitBtn.style.display = "flex";
    back.style.display = "none";
    gameSpeed = 6;
}

function exitGame() {
    yc1 = 1200;
    player.load = false;
    startBtn.style.display = "flex";
    canvas.style.display = "none";
    intro.style.display = "flex";
    exitBtn.style.display = "none";
    homeBtn.style.display = "none";
    back.style.display = "flex";
    gameSpeed = 0;
    score = 0;
    finalScore = 0;
    player.message = false;
    starCount = 0;
    player.life1 = true;
    player.life2 = true;
    player.life3 = true;
}