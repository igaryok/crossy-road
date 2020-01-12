import * as PIXI from 'pixi.js';

export class Road extends PIXI.Graphics{
  direction: string;
  canCreateItem: boolean;
  centerRoad: number;

  constructor(type: string, y: number) {
    super();
    const selectColor = (str: string) => {
      switch (str) {
        case 'plant':
          return 0xCC9933;
        case 'road':
          return 0xAAAAAA;
        case 'water':
          return 0X00ACEE;
        default:
          return 0xAAAAAA;
      }
    }
    const color = selectColor(type);

    this.lineStyle(1, 0xFFFFFF, 1);
    this.beginFill(color, 0.25);
    this.drawRect(0, y, 600, 40);
    this.endFill();

    this.direction = Math.random() > 0.5 ? 'left' : 'right';
    this.centerRoad = y + 20;
    this.canCreateItem = true;
  }

  waitingForCreateItem() {
    const timer = Math.round(Math.random()*3000 + 1000);
    setTimeout(() => {
      this.canCreateItem = true;
    }, timer);
  }
  
}
