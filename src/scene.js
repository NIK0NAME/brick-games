export default class Scene {
  constructor(sk, props) {
    const { id } = props;
    this.sk = sk;
    this.id = id,
    this.brickSize = { w: 12, h: 12 };
    this.gameCanvasOffset = { x: 9, y: 9 };
    this.gameCanvasSize = { w: 10, h: 20 };
    this.color = {
      background: '#859373',
      foreground: '#838d72',
    };
    this.pressedKeys = [];
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

    this.sk.translate(this.gameCanvasOffset.x, this.gameCanvasOffset.y);
    this.sk.background('#838d72');
    this.sk.noStroke();
    this.sk.fill('#000');
    this.sk.rect(
      -2,
      -2,
      this.gameCanvasSize.w * this.brickSize.w + 4,
      this.gameCanvasSize.h * this.brickSize.h + 4
    );
    this.sk.fill('#838d72');
    this.sk.rect(
      -1,
      -1,
      this.gameCanvasSize.w * this.brickSize.w + 2,
      this.gameCanvasSize.h * this.brickSize.h + 2
    );

    for (let y = 0; y < this.gameCanvasSize.h; y++) {
      for (let x = 0; x < this.gameCanvasSize.w; x++) {
        this.drawBrick({
          x: x * this.brickSize.w,
          y: y * this.brickSize.h,
        });
      }
    }
    this.sk.translate(-this.gameCanvasOffset.x, -this.gameCanvasOffset.y);
  }

  handleKeyPress(keyCode) {
    if (!this.pressedKeys.includes(keyCode)) {
      this.pressedKeys.push(keyCode);
    }

    // console.log(this.id, this.pressedKeys);
  }

  removePressedKey(keyCode) {
    const keyIndex = this.pressedKeys.indexOf(keyCode);
    if (keyIndex !== -1) {
      this.pressedKeys.splice(keyIndex, 1);
    }
  }

  handleKeyReleased(keyCode) {
    this.removePressedKey(keyCode);
  }
}