const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro");

const roadImg = new Image ()
roadImg.src = "/images/road.png";
const carImg = new Image ()
carImg.src = "/images/car.png";

const car = {
  height: canvas.height/5,
  width: canvas.width/7,
  speed: 1.5,
}

let carX = canvas.width/2 - car.width/2
let carY = canvas.height - car.height

let isMovingLeft = false
let isMovingRight = false

let score = 0
let gameOver = false
let animateId

let obstacleX = getRandomInt(60, 400)
let obstacleY
let obstacleWidth = getRandomInt(10, 200)
let obstacleSpeed = 2

const drawObstacle = () => {
  ctx.beginPath()
  ctx.fillStyle = 'tomato'
  ctx.rect(obstacleX, 0, obstacleWidth, 50)
  ctx.fill()
  ctx.closePath()
}

const animate = () => {
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(carImg, carX, carY, car.width, car.height)
  

  if (isMovingLeft && carX > 60){
    carX-= car.speed
  }
  else if(isMovingRight && carX < canvas.width - car.width - 55) {
    carX += car.speed
  }

  setInterval(() => {
    drawObstacle()

    obstacleY +=obstacleSpeed

    if(obstacleY > canvas.height){
      score +=1
    }
    
  }, 1000);

  
  if (canvas.width == 0) {
    gameOver = true
  }

  if (gameOver) {
    cancelAnimationFrame(animateId)
  }
  else {
    animateId = requestAnimationFrame(animate)
  }

};



window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame()
  };

  function startGame() {
    canvas.style.display = 'block'
    startScreen.style.display = 'none'
    animate()
  }
};

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    isMovingLeft = true
  }
  if (event.key === 'ArrowRight') {
    isMovingRight = true
  }
});

document.addEventListener('keyup', event => {
  if (event.key === 'ArrowLeft') {
    isMovingLeft = false
  }
  if (event.key === 'ArrowRight') {
    isMovingRight = false
  }
})
