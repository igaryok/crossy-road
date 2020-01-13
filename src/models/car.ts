import * as PIXI from 'pixi.js';
import { speed } from '../config';

export class Car extends PIXI.Sprite {
  direction: string;
  typeItem: string = 'car';
  
  constructor(y: number, src: string, direction: string) {

    super(PIXI.Texture.from(src))
    
    this.anchor.set(0.5);
    this.x = direction === 'right' ? 16 : 584;
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
};