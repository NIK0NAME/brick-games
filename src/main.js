import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import Menu from './menu';
import { KEYBOARD_KEYS } from './constants';
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
    gameMenu.handleMenuKeyPress(sk.keyCode);
  }

  sk.keyReleased = () => {
    gameMenu.handleMenuKeyReleased(sk.keyCode);
  }

  document.querySelectorAll('.console-button').forEach((element) => {
    element.addEventListener('click', () => {
      switch (element.title) {
        case 'left': gameMenu.handleKeyPress(KEYBOARD_KEYS.LEFT_ARROW); break;
        case 'right': gameMenu.handleKeyPress(KEYBOARD_KEYS.RIGHT_ARROW); break;
        case 'up': gameMenu.handleKeyPress(KEYBOARD_KEYS.UP_ARROW); break;
        case 'down': gameMenu.handleKeyPress(KEYBOARD_KEYS.DOWN_ARROW); break;
        case 'rotate': gameMenu.handleKeyPress(KEYBOARD_KEYS.ENTER); break;
        case 'off': gameMenu.handleKeyPress(KEYBOARD_KEYS.ESCAPE); break;
        case 'sp': gameMenu.handleKeyPress(KEYBOARD_KEYS.P_KEY); break;
      }
    });
  });
}

const P5 = new p5(sketch, 'canvas-container');
