import Scene from './scene';

export default class Snake extends Scene {
  constructor(sk) {
    super(sk, { id: 'snake' });
    this.sk = sk;
    this.name = 'Snake';
  }

  init() {

  }

  splash() {
    this.sk.fill('#676f58');
    this.sk.stroke('#1e1f0f');
    this.sk.text(`${this.name}`, 10, 50);
  }

  draw() {

  }

  handleKeyPress(keyCode) {
    
  }
}