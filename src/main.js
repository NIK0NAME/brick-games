import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import Menu from './menu';
import { KEYBOARD_KEYS } from './constants';
import './style.css';
import GameController from './game-controller';

console.log('APP READY');

const consoleCase = { min: 320, max: 380 };

const canvasInitialSize = { w: 251, h: 254 };
const canvas = { w: canvasInitialSize.w, h: canvasInitialSize.h };

function main() {
  const sketch = (sk) => {
    const gameController = new GameController(sk);
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
      gameController.draw();
    }

    sk.keyPressed = () => {
      gameController.keyPress(sk.keyCode);
    }

    sk.keyReleased = () => {
      gameController.keyReleased(sk.keyCode);
    }

    document.querySelectorAll('.console-button').forEach((element) => {
      element.addEventListener('click', () => {
        switch (element.title) {
          case 'left': gameController.keyPress(KEYBOARD_KEYS.LEFT_ARROW); break;
          case 'right': gameController.keyPress(KEYBOARD_KEYS.RIGHT_ARROW); break;
          case 'up': gameController.keyPress(KEYBOARD_KEYS.UP_ARROW); break;
          case 'down': gameController.keyPress(KEYBOARD_KEYS.DOWN_ARROW); break;
          case 'rotate': gameController.keyPress(KEYBOARD_KEYS.ENTER); break;
          case 'off': gameController.keyPress(KEYBOARD_KEYS.ESCAPE); break;
          case 'sp': gameController.keyPress(KEYBOARD_KEYS.P_KEY); break;
        }
      });
    });
  }

  const P5 = new p5(sketch, 'canvas-container');
}

main();
