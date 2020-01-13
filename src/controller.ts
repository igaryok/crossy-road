import { Player } from './models/player';
import { Road } from './models/road';
import { Tree } from './models/tree';
import { Car } from './models/car';
import { Baulk } from './models/baulk';

import { container, app } from './view';

import { mainScreen, roads, life, speed } from './config';

let countLife: number = life;

const KEYS = [];

export const roadsList = [];
export const treesList = [];
const movingItemsList = [];

const actionRoads = [];

export let player = new Player(mainScreen.width / 2, mainScreen.height - 15, './img/player.png');

export const setupRoads = () => {
  roads.forEach((item, index) => {
    const road = new Road(item.type, item.y);
    
    roadsList.push(road);
    
    if(item.type === 'plant' && index != 9) {
      const quantityTrees = Math.round(Math.random() * 3 + 3);
      for (let i = 1; i <= quantityTrees; i++) {
        const x = Math.round(Math.random() * 570 + 15);
        const tree = new Tree(x, item.y + 20);
        treesList.push(tree);
      }
    }

    if(item.type === 'road' || item.type === 'water') {
      actionRoads.push(road);
    }  
  });
}

const isIntersection = (a, b) => {
 const aBox = a.getBounds();
 const bBox = b.getBounds();

 return aBox.x + aBox.width > bBox.x &&
        aBox.x < bBox.x + bBox.width &&
        aBox.y + aBox.height > bBox.y &&
        aBox.y < bBox.y + bBox.height;
}

const nextIsIntersection = (a, aNextX, aNextY,  b) => {
  const aBox = a.getBounds();
  const bBox = b.getBounds();
 
  return aBox.x+aNextX + aBox.width >= bBox.x &&
         aBox.x+aNextX <= bBox.x + bBox.width &&
         aBox.y+aNextY + aBox.height >= bBox.y &&
         aBox.y+aNextY <= bBox.y + bBox.height;
 }

export const keyDown = event => {
  const { keyCode } = event;
  KEYS[keyCode] = true;
}

export const keyUp = event => {
  const { keyCode } = event;
  KEYS[keyCode] = false;
}

export const gameLoop = () => {
  const movePlayer = {
    x: 0,
    y: 0
  };

  if (KEYS['87']) {
    movePlayer.y = -speed
  }

  if (KEYS['83']) {
    movePlayer.y = speed;
  }

  if (KEYS['68']) {
    movePlayer.x = speed;
  }

  if (KEYS['65']) {
    movePlayer.x = -speed;
  }
  if(movePlayer.x || movePlayer.y) {
    if(!treesList.some(item => nextIsIntersection(player, movePlayer.x, movePlayer.y, item))) {
      player.move(movePlayer.x, movePlayer.y);
    }
  }

  movingItemsList.forEach(item => {
    if(isIntersection(player, item) && item.typeItem === 'car') {
      container.removeChild(player);
      countLife --;
      if(countLife !== 0) {
        player = new Player(mainScreen.width / 2, mainScreen.height - 15, './img/player.png');
        container.addChild(player);
      }
    }
  });

  actionRoads.forEach(road => {
    if(road.canCreateItem) {
      const srcCar = road.direction === 'right' ? './img/truck-right.png' : './img/truck-left.png';
      const item = road.type === 'road' ? new Car(road.centerRoad, srcCar, road.direction) : new Baulk(road.centerRoad ,road.direction);
      container.addChild(item);
      movingItemsList.push(item);
      road.canCreateItem = false;
      road.waitingForCreateItem();
    }
  });
  
  container.sortChildren();

  movingItemsList.forEach(item => {
    item.move()
    if(item.x > 630 || item.x < -30) {
      item.dead = true;
    }
  });

  movingItemsList.forEach((item, index) => {
    if(item.dead) {
      container.removeChild(item);
      movingItemsList.splice(index, 1);
    }
  });

  if(countLife < 1) app.ticker.stop();
}
