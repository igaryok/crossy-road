import * as PIXI from 'pixi.js';

import {keyDown, keyUp, player, gameLoop} from './controller';


const app = new PIXI.Application({
  width: 600,
  height: 400,
  backgroundColor: 0xAAAAAA
});

document.body.appendChild(app.view);

app.stage.addChild(player);
app.ticker.add(gameLoop);

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
