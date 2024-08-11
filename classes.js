class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
    this.position = position;
    this.image = image;
      this.frames = { ...frames, val: 0, elapsed: 0 };
      this.image.onload = () => {
        this.width = this.image.width / this.frames.max;
        this.height = this.image.height;
      };
      this.moving = false;
      this.sprites = sprites;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frames.val * this.width, // crop start position y
      0, // crop start position x
      this.image.width / this.frames.max, // crop width divided by 4
      this.image.height, // crop the full height
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );

    if (!this.moving) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    // slow down sprite movement
    if (this.frames.elapsed % 10 === 0) {
      // player movement animation
      // navigating through image frames of movement
      if (this.frames.val < this.frames.max - 1) {
        this.frames.val++;
      } else {
        this.frames.val = 0;
      }
    }
  }
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48; // 12 x 4 - size of the square
    this.height = 48; // 12 x 4
  }

  draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0)"; // red
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
