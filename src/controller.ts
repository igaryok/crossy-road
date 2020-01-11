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
  if (KEYS['87']) {
    if (player.y >= 17) {
      player.y -= 2;
    }
  }

  if (KEYS['83']) {
    if (player.y <= mainScreen.height - 17) {
      player.y += 2;
    }

  }

  if (KEYS['68']) {
    if (player.x <= mainScreen.width - 17) {
      player.x += 2;
    }

  }

  if (KEYS['65']) {
    if (player.x >= 17) {
      player.x -= 2;
    }
  }
}
