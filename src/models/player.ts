import * as PIXI from 'pixi.js';

export class Player {
  sprite: PIXI.Sprite;
  
  constructor(x: number, y: number, src: string) {
    this.sprite = PIXI.Sprite.from(src);
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
  }
};
