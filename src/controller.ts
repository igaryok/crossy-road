import { Player } from './models/player';
import { Road } from './models/road';
import { Tree } from './models/tree';
import { Car } from './models/car';

import { app } from './view';

import { mainScreen, roads  } from './config';

const KEYS = [];

export const roadsList = [];
export const treesList = [];
export const carsList = [];

const actionRoads = [];

export const player = new Player(mainScreen.width / 2, mainScreen.height - 15, './img/player.png');

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

    if(item.type === 'road') {

      actionRoads.push(road);
    }  
  });

  actionRoads.forEach(road => {
    if(road.canCreateItem) {
      const src = road.direction === 'right' ? './img/truck-right.png' : './img/truck-left.png';
      const car = new Car(road.centerRoad, src, road.direction);
      carsList.push(car);
      road.canCreateItem = false;
      road.waitingForCreateItem();
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

const nextIsIntersection = (a, x, y,  b) => {
  const aBox = a.getBounds();
  const bBox = b.getBounds();
 
  return aBox.x+x + aBox.width >= bBox.x &&
         aBox.x+x <= bBox.x + bBox.width &&
         aBox.y+y + aBox.height >= bBox.y &&
         aBox.y+y <= bBox.y + bBox.height;
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
    movePlayer.y = -2
  }

  if (KEYS['83']) {
    movePlayer.y = 2;
  }

  if (KEYS['68']) {
    movePlayer.x = 2;
  }

  if (KEYS['65']) {
    movePlayer.x = -2;
  }
  if(movePlayer.x || movePlayer.y) {
    if(!treesList.some(item => nextIsIntersection(player, movePlayer.x, movePlayer.y, item))) {
      player.move(movePlayer.x, movePlayer.y);
    }
  }
  
  actionRoads.forEach(road => {
    if(road.canCreateItem) {
      const src = road.direction === 'right' ? './img/truck-right.png' : './img/truck-left.png';
      const car = new Car(road.centerRoad, src, road.direction);
      app.stage.addChild(car);
      carsList.push(car);
      road.canCreateItem = false;
      road.waitingForCreateItem();
    }
  });

  carsList.forEach(car => {
    car.move()
    if(car.x > 616 || car.x < -16) {
      car.dead = true;
    }
  });

  carsList.forEach((car, index) => {
    if(car.dead) {
      app.stage.removeChild(car);
      carsList.splice(index, 1);
    }
  });
}
