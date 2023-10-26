console.log('APP READY');

const roadWidth = 10;
const roadHeight = 20;

const chunkSize = 10;

const carPositions = [2 ,5];

const offset = { x: 100, y: 100 };
const sounds = {};

// PLAY, PAUSE, LOSE
let state = 'PLAY';

let road = [
  1, 1, 1, 0, 0, 1, 1, 1, 0, 0,
  1, 1, 1, 0, 0, 1, 1, 1, 0, 0
];

let traffic = [];

const driver = {
  x: 2,
  y: 8,
  car: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
    [1, 0, 1],
  ]
}

let countToUpdate = 0;
let updateInterval = 10;
let trafficSpeed = 1;
let score = 0;
let levelUpScore = 500;

function preload() {
  soundFormats('wav');
  sounds['lvlUp'] = loadSound('src/assets/lvl-up.wav');
  sounds['hit'] = loadSound('src/assets/hit2.wav');
  sounds['coin'] = loadSound('src/assets/coin.wav');
  sounds['lose'] = loadSound('src/assets/lose.wav');
  sounds['ambient'] = loadSound('src/assets/ambient.wav');
  sounds['side'] = loadSound('src/assets/side.wav');
  sounds['wall'] = loadSound('src/assets/wall.wav');
  sounds['accelerate'] = loadSound('src/assets/accelerate2.wav');
}

function setup() {
  createCanvas(400, 400);
  initGame();
}

function draw() {
  handleKeyboardInput();

  background('#a7a994');

  if (state === 'PLAY') {
    countToUpdate += trafficSpeed;

    if (countToUpdate >= updateInterval) {
      countToUpdate = 0;
      updateRoad();
      updateTraffic();
    }
  }

  textSize(12);
  text('BRICK GAMES', 100, 80);

  translate(offset.x, offset.y);
  drawRoad();

  drawTraffic();

  drawDriver();

  drawIndicators();
  translate(-offset.x, -offset.y);

  if (state === 'LOSE') {
    fill('black');
    stroke('red');
    rect(50, 50, 280, 60);

    textSize(24);
    fill('red');
    text('YOU LOSER...', 60, 85);

    textSize(12);
    text('Press ESC to restart', 60, 100);
  }
}

function initGame() {
  countToUpdate = 0;
  updateInterval = 10;
  trafficSpeed = 1;
  score = 0;

  driver.x = 2;
  driver.y = 8;

  traffic = [];

  spawnTrafficCar();
  sounds['ambient'].loop();

  state = 'PLAY';
}

function updateRoad() {
  const elementToAppend = road.splice(road.length - 1, 1);
  road = [...elementToAppend, ...road];
}

function updateTraffic(direction = 1) {
  for (let i = traffic.length - 1; i >= 0; i--) {
    const trafficCar = traffic[i];
    const { car } = trafficCar;

    trafficCar.y += direction;

    if (trafficCar.y * chunkSize > roadHeight * chunkSize) {
        traffic.splice(i ,1);
        handleAddScore();
        spawnTrafficCar();
    } else {
      if (checkCollision(trafficCar, driver)) {
        traffic.splice(i ,1);
        handleDecreaseScore();
        spawnTrafficCar();
      }
    }
  }
}

function handleDecreaseScore() {
  score -= 100;
  sounds['hit'].play();

  if (score < 0) {
    if (trafficSpeed === 1 && score < 0) {
      sounds['ambient'].stop();
      sounds['lose'].play();
      state = 'LOSE';
    } else if (trafficSpeed > 1) {
      trafficSpeed -= 0.5;
      score = 0;
    }
  }
}

function handleAddScore() {
  score += 100;
  sounds['coin'].play();

  if (score === levelUpScore && trafficSpeed < 8) {
    sounds['lvlUp'].play();
    trafficSpeed += 0.5;
    score = 0;
  }
}

function spawnTrafficCar() {
  const xPosition = random(carPositions);
  traffic.push({
    x: xPosition,
    y: -4,
    car: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
      [1, 0, 1],
    ]
  });
}

function drawIndicators() {
  const leftMargin = 10;
  const indicatorsX = roadWidth * chunkSize + leftMargin;

  text(`Speed: ${trafficSpeed}`, indicatorsX, 10);
  text(`Score: ${score}`, indicatorsX, 30);
}

function drawRoad() {
  for (let y = 0; y < roadHeight; y++) {
    for (let x = 0; x < roadWidth; x++) {
      if ((x === 0 || x === roadWidth - 1) && road[y] === 1) {
        fill('#1e1f0f');
        stroke('#676f58');
        strokeWeight(1);
        rect(x * chunkSize, y * chunkSize, chunkSize, chunkSize);
      } else {
        fill('#838d72');
        stroke('#859373');
        strokeWeight(1);
        rect(x * chunkSize, y * chunkSize, chunkSize, chunkSize);
      }
    }
  }

  noFill();
  stroke('#000');
  strokeWeight(1);
  rect(0, 0, roadWidth * chunkSize, roadHeight * chunkSize);
}

function drawDriver() {
  drawCar({
    vehicle: driver,
    colors: {
      strokeColor: '#676f58',
      fillColor: '#113047',
    }
  });
}

function drawCar(data) {
  const { vehicle, colors } = data;
  const { car } = vehicle;
  const { strokeColor, fillColor } = colors;
  for (let y = 0; y < car.length; y++) {
    for (let x = 0; x < car[0].length; x++) {
      if (
        car[y][x] == 1 &&
        vehicle.y * chunkSize + y * chunkSize >= 0 &&
        vehicle.y * chunkSize + y * chunkSize < roadHeight * chunkSize
      ) {
        fill(fillColor);
        stroke(strokeColor);
        strokeWeight(1);
        rect(
          vehicle.x * chunkSize + x * chunkSize,
          vehicle.y * chunkSize + y * chunkSize,
          chunkSize,
          chunkSize
        );
      }
    }
  }
}

function drawTraffic() {
  for (const trafficCar of traffic) {
    drawCar({
    vehicle: trafficCar,
      colors: {
        strokeColor: '#676f58',
        fillColor: '#1e1f0f',
      }
    });
  }
}

function checkCollision(a, b) {
  return (
    a.x === b.x &&
    a.y <= b.y + b.car.length && a.y + a.car.length >= b.y
  );
}

function handleKeyboardInput() {
  if (keyIsDown(UP_ARROW)) {
      if (driver.y > 0) {
        driver.y -= 1;
        if (!sounds['accelerate'].isPlaying()) {
          sounds['accelerate'].play();
        }
      }
  } else if (keyIsDown(DOWN_ARROW)) {
      if (driver.y * chunkSize + driver.car.length * chunkSize < roadHeight * chunkSize) {
        driver.y += 1;
        if (!sounds['accelerate'].isPlaying()) {
          sounds['accelerate'].play();
        }
      }
  } else {
    sounds['accelerate'].stop();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
      if (driver.x === 5) {
        sounds['side'].play();
        driver.x = 2;
      } else {
        sounds['wall'].play();
      }
  }

  if (keyCode === RIGHT_ARROW) {
      if (driver.x === 2) {
        sounds['side'].play();
        driver.x = 5;
      } else {
        sounds['wall'].play();
      }
  }

  if (keyCode === 27) {
    if (state === 'PLAY') {
      state = 'PAUSE';
      sounds['ambient'].pause();
    }
    else if (state === 'PAUSE') {
      state = 'PLAY';
      sounds['ambient'].loop();
    }
    else if (state === 'LOSE') initGame();
  }
}
