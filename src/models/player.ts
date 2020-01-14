import * as PIXI from 'pixi.js';
import { mainScreen } from '../config';

export class Player extends PIXI.Sprite{
  onBaulk: boolean;
  
  constructor(x: number, y: number, src: string) {
    super(PIXI.Texture.from(src));
    this.anchor.set(0.5);
    this.x = x;
    this.y = y;
    this.zIndex = 2;
    this.onBaulk = false;
  }
  
  move(x_move: number, y_move: number) {
    if (this.x + x_move >= 15 && this.x + x_move <= mainScreen.width - 15) {
      this.x += x_move;
    };
    if (this.y + y_move >= 15 && this.y + y_move <= mainScreen.height - 15) {
      this.y += y_move;
    }
  }

  swim(newX: number) {
    if (newX >= 15 && newX <= mainScreen.width - 15) {
      this.x = newX;
    }
  }
};
