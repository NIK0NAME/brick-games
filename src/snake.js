export default class Snake {
  constructor(sk) {
    this.sk = sk;
    this.name = 'Snake';
  }

  splash() {
    this.sk.fill('#676f58');
    this.sk.stroke('#1e1f0f');
    this.sk.text(`${this.name}`, 10, 50);
  }
}