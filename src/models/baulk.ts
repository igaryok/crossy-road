import * as PIXI from 'pixi.js';
import { speed } from '../config';

export class Baulk extends PIXI.Sprite {
  direction: string;
  typeItem: string = 'baulk';

  constructor(y: number, direction: string) {
    super(PIXI.Texture.from('./img/baulk.png'))
    this.anchor.set(0.5);
    this.x = direction === 'right' ? -30 : 630;
    this.y = y;
    this.direction = direction;
    this.zIndex = 1;
  }
  
  move() {
    if (this.direction === 'right') {
      this.x += speed;
    } else {
      this.x -= speed;
    }
  }

}