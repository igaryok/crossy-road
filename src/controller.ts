import { Player } from './models/player';
import { mainScreen } from './config';

const KEYS = [];

export const player = new Player(mainScreen.width / 2, mainScreen.height - 15, './img/player.png').sprite;

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
    Player.move(player, movePlayer.x, movePlayer.y);
  }
}
