export default class Scene {
  constructor(sk, props = null) {
    this.sk = sk;
    this.brickSize = { w: 12, h: 12 };
    this.gameCanvasOffset = { x: 9, y: 9 };
    this.color = {
      background: '#859373',
      foreground: '#838d72',
    };
  }

  drawBrick(props) {
    const { x, y, color } = props;
    const { background, foreground } = this.color;
    const { w, h } = this.brickSize;
    const foregroundColor = color ?? foreground;

    this.sk.noStroke();

    // out line brick
    this.sk.fill(foregroundColor);
    this.sk.rect(x, y, w, h);

    // out line brick
    this.sk.fill(background);
    this.sk.rect(x + 1, y + 1, w - 2, h - 2);

    // out line brick
    this.sk.fill(foregroundColor);
    this.sk.rect(x + 2, y + 2, w - 4, h - 4);
  }

  drawGameCanvas() {
    this.sk.background('#838d72');
    this.sk.noStroke();
    this.sk.fill('#000');
    this.sk.rect(this.gameCanvasOffset.x - 2, this.gameCanvasOffset.y - 2, this.roadWidth * this.brickSize.w + 4, this.roadHeight * this.brickSize.h + 4);
    this.sk.fill('#838d72');
    this.sk.rect(this.gameCanvasOffset.x - 1, this.gameCanvasOffset.y - 1, this.roadWidth * this.brickSize.w + 2, this.roadHeight * this.brickSize.h + 2);
  }
}