import * as PIXI from 'pixi.js';
import { mainScreen } from '../config';

export class Player {
  sprite: PIXI.Sprite;
  
  constructor(x: number, y: number, src: string) {
    this.sprite = PIXI.Sprite.from(src);
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
  }
  
  static move(sprite: PIXI.Sprite, x_move: number, y_move: number) {
    if (sprite.x + x_move >= 15 && sprite.x + x_move <= mainScreen.width - 15) {
      sprite.x += x_move;
    };
    if (sprite.y + y_move >= 15 && sprite.y + y_move <= mainScreen.height - 15) {
      sprite.y += y_move;
    }
  }
};
