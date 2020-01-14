import * as PIXI from 'pixi.js';

export class Tree extends PIXI.Graphics {

  constructor(x: number, y: number) {
    super();
    this.beginFill(0x3E6913);
    this.drawCircle(x, y, 15);
    this.endFill();
  } 
}
