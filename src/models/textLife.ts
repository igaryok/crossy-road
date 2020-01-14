import * as PIXI from 'pixi.js';

export class Text extends PIXI.Text {
  constructor(str: string) {
    super(`L: ${str}`);
    this.anchor.set(0.5);
    this.x = 20;
    this.y = 10;
    this.style = new PIXI.TextStyle({
      fill: 0x000000,
      fontSize: 20,
      fontFamily: 'Arial',
      fontStyle: 'bold',
      stroke: 0xFFFFFF,
      strokeThickness: 3
    }); 
  }
}
