import * as PIXI from 'pixi.js';
import { mainScreen } from '../config';

export class Player extends PIXI.Sprite{
  // sprite: PIXI.Sprite;
  
  constructor(x: number, y: number, src: string) {
    super(PIXI.Texture.from(src));
    // this.sprite = PIXI.Sprite.from(src);
    this.anchor.set(0.5);
    this.x = x;
    this.y = y;
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
