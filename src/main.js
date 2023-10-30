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

  document.querySelectorAll('.console-button').forEach((element) => {
    element.addEventListener('click', () => {
      console.log('console-case button pressed', {element});
      switch (element.title) {
        case 'left': gameMenu.handleKeyPress(37); break;
        case 'right': gameMenu.handleKeyPress(39); break;
        case 'up': gameMenu.handleKeyPress(38); break;
        case 'down': gameMenu.handleKeyPress(40); break;
        case 'rotate': gameMenu.handleKeyPress(13); break;
        case 'off': gameMenu.handleKeyPress(27); break;
        case 'sp': gameMenu.handleKeyPress(80); break;
      }
    });
  });
}

const P5 = new p5(sketch, 'canvas-container');
