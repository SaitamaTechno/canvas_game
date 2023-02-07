
var player1;

function startGame() {
    myGameArea.start();
    player1 = new component(30, 30, "red", 10, 120);
    myrect = new component(30, 30, "blue", 100, 120);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }    
}

function updateGameArea() {
    myGameArea.clear();
    player1.speedX = 0;
    player1.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37] && player1.x>myrect.x+30) {player1.speedX = -5; }
    if (myGameArea.keys && myGameArea.keys[39]) {player1.speedX = 5; }
    if (myGameArea.keys && myGameArea.keys[38]) {player1.speedY = -5; }
    if (myGameArea.keys && myGameArea.keys[40]) {player1.speedY = 5; }
    player1.newPos();
    player1.update();
    myrect.update();
    console.log(player1.x)
}