import * as PIXI from 'pixi.js';

import { keyDown, keyUp, player, gameLoop } from './controller';
import { mainScreen } from './config';


const app = new PIXI.Application(mainScreen);

document.body.appendChild(app.view);

app.stage.addChild(player);
app.ticker.add(gameLoop);

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
