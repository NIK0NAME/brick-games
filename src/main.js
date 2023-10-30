import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import Menu from './menu';
import './style.css';

console.log('APP READY');

const consoleCase = { min: 320, max: 380 };

const canvasInitialSize = { w: 251, h: 254 };
const canvas = { w: canvasInitialSize.w, h: canvasInitialSize.h };

const sketch = (sk) => {
  const gameMenu = new Menu(sk);
  // sk.preload = () => {
  //   sk.soundFormats('wav');
  //   sounds['lvlUp'] = loadSound('src/assets/lvl-up.wav');
  //   sounds['hit'] = loadSound('src/assets/hit2.wav');
  //   sounds['coin'] = loadSound('src/assets/coin.wav');
  //   sounds['lose'] = loadSound('src/assets/lose.wav');
  //   sounds['traffic'] = loadSound('src/assets/traffic.wav');
  //   sounds['side'] = loadSound('src/assets/side.wav');
  //   sounds['wall'] = loadSound('src/assets/wall.wav');
  //   sounds['accelerate'] = loadSound('src/assets/accelerate2.wav');
  // }

  sk.setup = () => {
    sk.createCanvas(canvas.w, canvas.h);
  }

  sk.draw = () => {
    gameMenu.draw();
  }

  sk.keyPressed = () => {
    gameMenu.handleKeyPress(sk.keyCode);
  }
}

const P5 = new p5(sketch, 'canvas-container');
