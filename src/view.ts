import * as PIXI from 'pixi.js';

import { keyDown, keyUp, player, setupRoads, roadsList, treesList, carsList, gameLoop } from './controller';
import { mainScreen } from './config';



export const app = new PIXI.Application(mainScreen);

document.body.appendChild(app.view);

setupRoads();
roadsList.forEach(road => {
  app.stage.addChild(road);
});

treesList.forEach(tree => {
  app.stage.addChild(tree);
});

carsList.forEach(car => {
  app.stage.addChild(car);
  
});


app.stage.addChild(player);
app.ticker.add(gameLoop);

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
