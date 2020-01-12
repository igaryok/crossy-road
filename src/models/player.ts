import * as PIXI from 'pixi.js';
import { mainScreen } from '../config';

export class Player extends PIXI.Sprite{
  
  constructor(x: number, y: number, src: string) {
    super(PIXI.Texture.from(src));
    this.anchor.set(0.5);
    this.x = x;
    this.y = y;
    this.zIndex = 2;
  }
  
  move(x_move: number, y_move: number) {
    if (this.x + x_move >= 15 && this.x + x_move <= mainScreen.width - 15) {
      this.x += x_move;
    };
    if (this.y + y_move >= 15 && this.y + y_move <= mainScreen.height - 15) {
      this.y += y_move;
    }
  }
};
