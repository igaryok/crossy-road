import * as PIXI from 'pixi.js';
import { mainScreen } from '../config';

export class Car extends PIXI.Sprite {
  direction: string;
  
  constructor(y: number, src: string, direction: string) {

    super(PIXI.Texture.from(src))
    
    this.anchor.set(0.5);
    this.x = direction === 'right' ? 16 : 584;
    this.y = y;
    this.direction = direction;
  }
  
  move() {
    if (this.direction === 'right') {
      this.x += 2;
    } else {
      this.x -= 2;
    }
  }
};