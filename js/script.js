let myGameArea;
let myGamePiece;
let myObstacles = [];
let myscore;

const canvasContainer = document.getElementById("canvascontainer");
canvasContainer.innerHTML = "";
let selectedChar = 'https://www.daffabot.my.id/pipe-vhs/img/aliandra.png';

document.getElementById("charSelect").addEventListener("change", function() {
  selectedChar = this.value;
  updateChar();
});

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
  canvasContainer.innerHTML = "";
  startGame();
}

function startGame() {
  document.getElementById("loadingit()").play();
  document.getElementById("loadingit()").loop = true;
  document.getElementById("kontolodon").style.display = "none";
  document.getElementById("form").style.display = "none";
  document.getElementById("mybg").style.display = "block";
  myGameArea = new GameArea();
  myGamePiece = new Component(50, 50, selectedChar, 10, 75, "image");
  myscore = new Component("15px", "Consolas", "black", 220, 25, "text");
  myGameArea.start();
}

function GameArea() {
  this.canvas = document.createElement("canvas");
  this.canvas.width = 215;
  this.canvas.height = 160;
  canvasContainer.appendChild(this.canvas);
  this.context = this.canvas.getContext("2d");
  this.pause = false;
  this.frameNo = 0;
  this.start = function() {
    this.interval = setInterval(updateGameArea, 20);
  };
  this.stop = function() {
    clearInterval(this.interval);
    this.pause = true;
  };
  this.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
}

function Component(width, height, color, x, y, type) {
  this.type = type;
  if (type === "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    const ctx = myGameArea.context;
    if (this.type === "image") {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    if (this.type === "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, 120, 20);
    }
  };
  this.crashWith = function(otherobj) {
    const imgData = myGameArea.context.getImageData(this.x, this.y, this.width, this.height);
    for (let i = 0; i <= imgData.data.length; i += 9) {
      if (imgData.data[i + 36] > 0) {
        const x = (i / 4) % this.width + this.x;
        const y = Math.floor(i / 4 / this.width) + this.y;
        if (x >= otherobj.x && x <= otherobj.x + otherobj.width && y >= otherobj.y && y <= otherobj.y + otherobj.height) {
          return true;
        }
      }
    }
    return false;
  };
}

function updateGameArea() {
  for (let i = 0; i < myObstacles.length; i += 1) {
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
  if (myGameArea.pause === false) {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myscore.score += 1;
    if (myGameArea.frameNo === 1 || everyinterval(150)) {
      const x = myGameArea.canvas.width;
      const y = myGameArea.canvas.height - 100;
      const height = Math.floor(Math.random() * 100) + 1;
      const gap = Math.floor(Math.random() * 15) + 55;
      myObstacles.push(new Component(10, height, "https://www.daffabot.my.id/pipe-vhs/img/pipe.png", x, 0, "image"));
      myObstacles.push(new Component(10, x - height - gap, "https://www.daffabot.my.id/pipe-vhs/img/pipe.png", x, height + gap, "image"));
    }
    for (let i = 0; i < myObstacles.length; i += 1) {
      myObstacles[i].x += -1;
      myObstacles[i].update();
    }
    myscore.text = "SCORE: " + myscore.score;
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
  return (myGameArea.frameNo / n) % 1 === 0;
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

const selectEl = document.getElementById("charSelect");
const containerEl = document.getElementById("image-container");

selectEl.addEventListener("change", function() {
  const selectedOption = this.options[this.selectedIndex];
  selectedSrc = selectedOption.getAttribute("data-src");
  containerEl.style.backgroundImage = selectedSrc ? `url(${selectedSrc})` : "";
});

const link = document.getElementById("mybtn");
const element = document.getElementById("myElement");

link.addEventListener("click", function() {
  element.classList.remove("hidden");
  element.classList.add("animate");
  document.getElementById("mybtn").style.display = "none";
  document.getElementById("playit()").play();
  setTimeout(function() {
    startGame();
  }, 3100);
});
