import { Player } from './models/player';
import { Road } from './models/road';
import { Tree } from './models/tree';
import { Car } from './models/car';
import { Baulk } from './models/baulk';
import { Text } from './models/textLife';

import { container, app } from './view';

import { mainScreen, roads, life, speed } from './config';

export let countLife: number = life;

const KEYS = [];

export const roadsList = [];
export const treesList = [];
const movingItemsList = [];
const actionRoads = [];

export let player = new Player(mainScreen.width / 2, mainScreen.height - 20, './img/player.png');
let viewNumberLife = new Text(String(countLife));

const checkTree = (x: number, y: number) => {
  if(treesList.some(tree => (Math.abs(tree.x - x) < 30 && tree.y === y))) {
    return false;
  }
  if(Math.abs(player.x - x) < 30 && player.y === y) {
    return false;
  }
  
  return true;
}

export const setupRoads = () => {
  roads.forEach((item, index) => {
    const road = new Road(item.type, item.y);
    
    roadsList.push(road);
    
    if(item.type === 'plant') {
      const quantityTrees = Math.round(Math.random() * 3 + 3);
      for (let i = 1; i <= quantityTrees; i++) {
        let x = Math.round(Math.random() * 570 + 15);
        while(!checkTree(x, item.y + 20)) { 
          x = Math.round(Math.random() * 570 + 15);
        }
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

const isIntersectionBaulk = (player: PIXI.Sprite, baulk: PIXI.Sprite) => {
  const playerBox = player.getBounds();
  const baulkBox = baulk.getBounds();

  return playerBox.x + playerBox.width - 16 > baulkBox.x &&
         playerBox.x + 16 < baulkBox.x + baulkBox.width &&
         playerBox.y + playerBox.height - 16 > baulkBox.y &&
         playerBox.y + 16 < baulkBox.y + baulkBox.height;
}

const isIntersectionWater = (player: PIXI.Sprite, water: PIXI.Graphics) => {
  const playerBox = player.getBounds();
  const waterBox = water.getBounds();

  return playerBox.x + playerBox.width - 20 >= waterBox.x &&
         playerBox.x+20 <= waterBox.x + waterBox.width &&
         playerBox.y + playerBox.height - 20 >= waterBox.y &&
         playerBox.y+20 <= waterBox.y + waterBox.height;
}

export const keyDown = event => {
  const { keyCode } = event;
  KEYS[keyCode] = true;
  console.log(keyCode);
}

export const keyUp = event => {
  const { keyCode } = event;
  KEYS[keyCode] = false;
}

export const gameLoop = () => {
  container.addChild(viewNumberLife);
  const movePlayer = {
    x: 0,
    y: 0
  };

  if (KEYS['87'] || KEYS['38']) {
    movePlayer.y = -speed
  }

  if (KEYS['83'] || KEYS['40']) {
    movePlayer.y = speed;
  }

  if (KEYS['68'] || KEYS['39']) {
    movePlayer.x = speed;
  }

  if (KEYS['65'] || KEYS['37']) {
    movePlayer.x = -speed;
  }
  if(movePlayer.x || movePlayer.y) {
    if(!treesList.some(item => nextIsIntersection(player, movePlayer.x, movePlayer.y, item))) {
      player.move(movePlayer.x, movePlayer.y);
    }
  }
  player.onBaulk = false;
  movingItemsList.forEach(item => {
    if(item.typeItem === 'car' && isIntersection(player, item)) {
      container.removeChild(player);
      container.removeChild(viewNumberLife);
      countLife --;
      viewNumberLife = new Text(String(countLife));
      container.addChild(viewNumberLife);
      if(countLife !== 0) {
        player = new Player(mainScreen.width / 2, mainScreen.height - 15, './img/player.png');
        container.addChild(player);
      }
    }
    if(item.typeItem === 'baulk' && isIntersectionBaulk(player, item)) {
      player.onBaulk = true;
      player.swim(item.x);
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
    if(road.type === 'water' && isIntersectionWater(player, road) && !player.onBaulk) {
      container.removeChild(player);
      container.removeChild(viewNumberLife);
      countLife --;
      viewNumberLife = new Text(String(countLife));
      container.addChild(viewNumberLife);
      if(countLife !== 0) {
        player = new Player(mainScreen.width / 2, mainScreen.height - 15, './img/player.png');
        container.addChild(player);
      }
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
