import { KEYBOARD_KEYS } from './constants';
import Scene from './scene';

export default class RoadFighters extends Scene {
  constructor(sk) {
    super(sk);
    this.name = 'Road Fighters';
    this.sk = sk;
    this.carPositions = [2 ,5];
    this.state = 'PLAY';
    this.road = [
      1, 1, 1, 0, 0, 1, 1, 1, 0, 0,
      1, 1, 1, 0, 0, 1, 1, 1, 0, 0
    ];
    this.trafic = [];
    this.driver = {
      x: 2,
      y: 8,
      car: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
        [1, 0, 1],
      ]
    };
    this.countToUpdate = 0;
    this.updateInterval = 10;
    this.trafficSpeed = 1;
    this.score = 0;
    this.levelUpScore = 500;

    this.init();
  }

  splash() {
    this.sk.fill('#676f58');
    this.sk.stroke('#1e1f0f');
    this.sk.strokeWeight(5);
    this.sk.text(
      `${this.name}`,
      this.gameCanvasOffset.x + this.gameCanvasSize.w * this.brickSize.w + 10,
      this.gameCanvasOffset.y + 12
    );
  }

  draw() {
    this.handleKeyboardInput();

    // this.drawGameCanvas();

    if (this.state === 'PLAY') {
      this.countToUpdate += this.trafficSpeed;

      if (this.countToUpdate >= this.updateInterval) {
        this.countToUpdate = 0;
        this.updateRoad();
        this.updateTraffic();
      }
    }

    this.sk.translate(this.gameCanvasOffset.x, this.gameCanvasOffset.y);
    this.drawRoad();

    this.drawTraffic();

    this.drawDriver();

    this.drawIndicators();
    this.sk.translate(-this.gameCanvasOffset.x, -this.gameCanvasOffset.y);

    if (this.state === 'LOSE') {
      this.drawLoseIndicator();
    }
  }

  init() {
    this.countToUpdate = 0;
    this.updateInterval = 10;
    this.trafficSpeed = 1;
    this.score = 0;

    this.driver.x = 2;
    this.driver.y = 8;

    this.traffic = [];

    this.spawnTrafficCar();

    this.state = 'PLAY';
    // sounds['traffic'].loop();
  }

  updateRoad() {
    const elementToAppend = this.road.splice(this.road.length - 1, 1);
    this.road = [...elementToAppend, ...this.road];
  }

  updateTraffic(direction = 1) {
    for (let i = this.traffic.length - 1; i >= 0; i--) {
      const trafficCar = this.traffic[i];
      const { car } = trafficCar;

      trafficCar.y += direction;

      if (trafficCar.y * this.brickSize.h > this.gameCanvasSize.h * this.brickSize.h) {
          this.traffic.splice(i ,1);
          this.handleAddScore();
          this.spawnTrafficCar();
      } else {
        if (this.checkCollision(trafficCar, this.driver)) {
          this.traffic.splice(i ,1);
          this.handleDecreaseScore();
          this.spawnTrafficCar();
        }
      }
    }
  }

  spawnTrafficCar() {
    const xPosition = this.sk.random(this.carPositions);
    this.traffic.push({
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

  handleDecreaseScore() {
    this.score -= 100;
    // sounds['hit'].play();

    if (this.score < 0) {
      if (this.trafficSpeed === 1 && this.score < 0) {
        // sounds['traffic'].stop();
        // sounds['lose'].play();
        this.state = 'LOSE';
      } else if (this.trafficSpeed > 1) {
        this.trafficSpeed -= 0.5;
        this.score = 0;
      }
    }
  }

  handleAddScore() {
    this.score += 100;
    // sounds['coin'].play();

    if (this.score === this.levelUpScore && this.trafficSpeed < 8) {
      // sounds['lvlUp'].play();
      this.trafficSpeed += 0.5;
      this.score = 0;
    }
  }

  spawnTrafficCar() {
    const xPosition = this.sk.random(this.carPositions);
    this.traffic.push({
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

  drawLoseIndicator() {
    this.sk.fill('black');
    this.sk.stroke('red');
    this.sk.rect(10, 50, 235, 60);

    this.sk.textSize(24);
    this.sk.fill('red');
    this.sk.text('YOU LOSER...', 20, 80);

    this.sk.textSize(12);
    this.sk.text('Press ESC to restart', 20, 100);
  }

  drawIndicators() {
    const leftMargin = 10;
    const indicatorsX = this.gameCanvasSize.w * this.brickSize.w + leftMargin;

    this.sk.textSize(12);
    this.sk.text('Road Fighters', indicatorsX, 10);

    this.sk.text(`Speed: ${this.trafficSpeed}`, indicatorsX, 30);
    this.sk.text(`Score: ${this.score}`, indicatorsX, 50);

    this.sk.textSize(10);
    this.sk.text('ARROWS: move', indicatorsX, 180);
    this.sk.text('ESC: pause/resume', indicatorsX, 200);
  }

  drawRoad() {
    for (let y = 0; y < this.gameCanvasSize.h; y++) {
      for (let x = 0; x < this.gameCanvasSize.w; x++) {
        if ((x === 0 || x === this.gameCanvasSize.w - 1) && this.road[y] === 1) {
          this.drawBrick({
            x: x * this.brickSize.w,
            y: y * this.brickSize.h,
            color: '#1e1f0f'
          });
        } else {
          this.drawBrick({
            x: x * this.brickSize.w,
            y: y * this.brickSize.h,
          });
        }
      }
    }
  }

  drawDriver() {
    this.drawCar({
      vehicle: this.driver,
      colors: {
        strokeColor: '#676f58',
        fillColor: '#113047',
      }
    });
  }

  drawCar(data) {
    const { vehicle, colors } = data;
    const { car } = vehicle;
    const { strokeColor, fillColor } = colors;
    for (let y = 0; y < car.length; y++) {
      for (let x = 0; x < car[0].length; x++) {
        if (
          car[y][x] == 1 &&
          vehicle.y * this.brickSize.h + y * this.brickSize.h >= 0 &&
          vehicle.y * this.brickSize.h + y * this.brickSize.h < this.gameCanvasSize.h * this.brickSize.h
        ) {
          this.drawBrick({
            x: vehicle.x * this.brickSize.w + x * this.brickSize.w,
            y: vehicle.y * this.brickSize.h + y * this.brickSize.h,
            color: fillColor,
          });
        }
      }
    }
  }

  drawTraffic() {
    for (const trafficCar of this.traffic) {
      this.drawCar({
        vehicle: trafficCar,
        colors: {
          strokeColor: '#676f58',
          fillColor: '#1e1f0f',
        }
      });
    }
  }

  checkCollision(a, b) {
    return (
      a.x === b.x &&
      a.y <= b.y + b.car.length && a.y + a.car.length >= b.y
    );
  }

  handleKeyboardInput() {
    if (this.state !== 'PLAY') return;

    if (this.sk.keyIsDown(this.sk.UP_ARROW)) {
        if (this.driver.y > 0) {
          this.driver.y -= 1;
          // if (!sounds['accelerate'].isPlaying()) {
          //   sounds['accelerate'].play();
          // }
        }
    } else if (this.sk.keyIsDown(this.sk.DOWN_ARROW)) {
        if (this.driver.y * this.brickSize.h + this.driver.car.length * this.brickSize.h < this.gameCanvasSize.h * this.brickSize.h) {
          this.driver.y += 1;
          // if (!sounds['accelerate'].isPlaying()) {
          //   sounds['accelerate'].play();
          // }
        }
    } else {
      // sounds['accelerate'].stop();
    }
  }

  handleKeyPress(keyCode) {
    if (this.state === 'PLAY') {
      if (keyCode === this.sk.LEFT_ARROW) {
          if (this.driver.x === 5) {
            // sounds['side'].play();
            this.driver.x = 2;
          } else {
            // sounds['wall'].play();
          }
      }

      if (keyCode === this.sk.RIGHT_ARROW) {
          if (this.driver.x === 2) {
            // sounds['side'].play();
            this.driver.x = 5;
          } else {
            // sounds['wall'].play();
          }
      }
    }

    if (keyCode === KEYBOARD_KEYS.P_KEY) {
      if (this.state === 'PLAY') {
        this.state = 'PAUSE';
        // sounds['traffic'].pause();
      }
      else if (this.state === 'PAUSE') {
        this.state = 'PLAY';
        // sounds['traffic'].loop();
      }
      else if (this.state === 'LOSE') this.init();
    }
  }
}