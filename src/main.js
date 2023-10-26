console.log('APP READY');

const roadWidth = 10;
const roadHeight = 20;

const chunkSize = 10;

const carPositions = [2 ,5];

const offset = { x: 100, y: 100 };

let road = [
  1, 1, 1, 0, 0, 1, 1, 1, 0, 0,
  1, 1, 1, 0, 0, 1, 1, 1, 0, 0
];

const traffic = [];

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

function setup() {
  createCanvas(400, 400);
  spawnTrafficCar();
}

let countToUpdate = 0;
let updateInterval = 10;
let trafficSpeed = 0.8;
let score = 0;

function draw() {
  handleKeyboardInput();

  background('#a7a994');

  countToUpdate += trafficSpeed;

  if (countToUpdate >= updateInterval) {
    countToUpdate = 0;
    updateRoad();
    updateTraffic();
  }

  text('BRICK GAMES', 100, 80);

  translate(offset.x, offset.y);
  drawRoad();

  drawTraffic();

  drawDriver();

  drawIndicators();
  translate(0, 0);
}

function updateRoad() {
  const elementToAppend = road.splice(road.length - 1, 1);
  road = [...elementToAppend, ...road];
}

function updateTraffic(direction = 1) {
  for (let i = traffic.length - 1; i >= 0; i--) {
    const traficCar = traffic[i];
    const { car } = traficCar;

    traficCar.y += direction;

    if (traficCar.y * chunkSize > roadHeight * chunkSize) {
        traffic.splice(i ,1);
        score += 100;
        spawnTrafficCar();
    }
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
  for (const traficCar of traffic) {
    drawCar({
    vehicle: traficCar,
      colors: {
        strokeColor: '#676f58',
        fillColor: '#1e1f0f',
      }
    });
  }
}

function handleKeyboardInput() {
  if (keyIsDown(UP_ARROW)) {
      if (driver.y > 0) {
        driver.y -= 1;
      }
  }

  if (keyIsDown(DOWN_ARROW)) {
      if (driver.y * chunkSize + driver.car.length * chunkSize < roadHeight * chunkSize) {
        driver.y += 1;
      }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
      if (driver.x === 5) {
        driver.x = 2;
      }
  }

  if (keyCode === RIGHT_ARROW) {
      if (driver.x === 2) {
        driver.x = 5;
      }
  }
}
