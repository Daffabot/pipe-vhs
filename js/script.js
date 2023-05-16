var myGameArea;
var myGamePiece;
var myObstacles = [];
var myscore;
document.getElementById("canvascontainer").innerHTML = "";
var selectedChar = 'https://www.daffabot.my.id/pipe-vhs/img/aliandra.png';

// Tambahkan event listener untuk memilih karakter
document.getElementById("charSelect").addEventListener("change", function() {
  selectedChar = this.value;
  updateChar();
});

// Fungsi untuk mengubah gambar karakter
function updateChar() {
  myGamePiece.image.src = selectedChar;
}

function restartGame() {
document.getElementById("loadingit()").play();
document.getElementById("loadingit()").loop = true;
document.getElementById("myfilter").style.display = "none";
document.getElementById("myrestartbutton").style.display = "none";
myGameArea.stop();
myGameArea.clear();
myGameArea = {};
myGamePiece = {};
myObstacles = [];
myscore = {};
document.getElementById("canvascontainer").innerHTML = "";
startGame();
}
function startGame() {
    document.getElementById("loadingit()").play();
    document.getElementById("loadingit()").loop = true;
    document.getElementById("kontolodon").style.display = "none";
    document.getElementById("form").style.display = "none";
	document.getElementById("mybg").style.display = "block";
    myGameArea = new gamearea();
    myGamePiece = new component(50, 50, selectedChar, 10, 75, "image");
    myscore = new component("15px", "Consolas", "black", 220, 25, "text");
    myGameArea.start();
}

function gamearea() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 215;
    this.canvas.height = 160;    
    document.getElementById("canvascontainer").appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.pause = false;
    this.frameNo = 0;
    this.start = function() {
        this.interval = setInterval(updateGameArea, 20);
    }
    this.stop = function() {
        clearInterval(this.interval);
        this.pause = true;
    }
    this.clear = function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {

    this.type = type;
    if (type == "image") {
	    this.image = new Image();
        this.image.src = color;
    }
    this.score = 0;    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "image") {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } if (this.type == "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, 120, 20); // menyesuaikan nilai x dan y untuk menempatkan teks di sudut kiri bawah
        }
        
    }
    this.crashWith = function(otherobj) {
    var imgData = ctx.getImageData(this.x, this.y, this.width, this.height);
    for (var i = 0; i <= imgData.data.length; i += 9) {
    if (imgData.data[i + 36] > 0) {
    var x = (i / 4) % this.width + this.x;
    var y = Math.floor((i / 4) / this.width) + this.y;
    if (x >= otherobj.x && x <= otherobj.x + otherobj.width && y >= otherobj.y && y <= otherobj.y + otherobj.height) {
    return true;
    }
    }
    }
    return false;
    }
    
}

function updateGameArea() {
    var x, y, min, max, height, gap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            document.getElementById("myfilter").style.display = "block";
            document.getElementById("myrestartbutton").style.display = "block";
            document.getElementById("form").style.display = "block";
            document.getElementById("loadingit()").loop = false;
            document.getElementById("loadingit()").pause();
			totalscore();
			  setTimeout(function() {
          document.getElementById("text").innerHTML = count + ". SCORE: " + myscore.score;
        }, 500);
            return;
        } 
    }
    if (myGameArea.pause == false) {
        myGameArea.clear();
        myGameArea.frameNo += 1;
        myscore.score +=1;        
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            y = myGameArea.canvas.height - 100;
            min = 1;
            max = 100;
            height = Math.floor(Math.random()*(max-min+1)+min);
            min = 55;
            max = 70;
            gap = Math.floor(Math.random()*(max-min+1)+min);
            myObstacles.push(new component(10, height, "https://www.daffabot.my.id/pipe-vhs/img/pipe.png", x, 0, "image"));
            myObstacles.push(new component(10, x - height - gap, "https://www.daffabot.my.id/pipe-vhs/img/pipe.png", x, height + gap, "image"));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x += -1;
            myObstacles[i].update();
        }
        myscore.text="SCORE: " + myscore.score;        
        myscore.update();
        myGamePiece.x += myGamePiece.speedX;
        myGamePiece.y += myGamePiece.speedY;    
        myGamePiece.update();
        if (myGamePiece.x < 0) {
        myGamePiece.x = 0;
        } else if (myGamePiece.x + myGamePiece.width > myGameArea.canvas.width) {
        myGamePiece.x = myGameArea.canvas.width - myGamePiece.width;
        }
        
        if (myGamePiece.y < 0) {
        myGamePiece.y = 0;
        } else if (myGamePiece.y + myGamePiece.height > myGameArea.canvas.height) {
        myGamePiece.y = myGameArea.canvas.height - myGamePiece.height;
        }
		return;
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup(e) {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove(e) {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
const mainDiv = document.getElementById("main");
let count = 0;

function totalscore() {
count++;
const userDiv = document.createElement("div");
userDiv.id = "text";
userDiv.innerHTML = "<span>" + "</span>";
mainDiv.appendChild(userDiv);
setTimeout(function() {
   userDiv.id = "text" + count;
}, 1200);
const br1 = document.createElement("br");
mainDiv.appendChild(br1);
}

const selectEl = document.getElementById('charSelect');
const containerEl = document.getElementById('image-container');

selectEl.addEventListener('change', function() {
  const selectedOption = this.options[this.selectedIndex];
  selectedSrc = selectedOption.getAttribute('data-src');
  if (selectedSrc) {
  containerEl.style.backgroundImage = `url(${selectedSrc})`;
  } else {
  containerEl.style.backgroundImage = '';
  }
});

var link = document.getElementById('mybtn');
var element = document.getElementById('myElement');
  
  link.addEventListener('click', function() {
    element.classList.remove('hidden');
    element.classList.add('animate');
    document.getElementById("mybtn").style.display = "none";
    document.getElementById("playit()").play();
    setTimeout(function() {
    startGame();
    }, 3100);
  });
