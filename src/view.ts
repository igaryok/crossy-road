import * as PIXI from 'pixi.js';

import { keyDown, keyUp, player, setupRoads, roadsList, treesList, gameLoop } from './controller';
import { mainScreen } from './config';

// PIXI.settings.SORTABLE_CHILDREN = true;

export const app = new PIXI.Application(mainScreen);
export const container = new PIXI.Container();
container.sortableChildren = true;
document.body.appendChild(app.view);
app.stage.addChild(container);

setupRoads();
roadsList.forEach(road => {
  container.addChild(road);
});

treesList.forEach(tree => {
  container.addChild(tree);
});
container.addChild(player);

app.ticker.add(gameLoop);

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
