import { Player } from './models/player';
const KEYS = [];

export const player = new Player(300, 200).sprite;

export const keyDown = event => {
  const { keyCode } = event;
  console.log(event.keyCode);
  KEYS[keyCode] = true;
}

export const keyUp = event => {
  const { keyCode } = event;
  console.log(keyCode);
  KEYS[keyCode] = false;
}

export const gameLoop = () => {
  if (KEYS['87']) {
    player.y -= 2;
  }
  if (KEYS['83']) {
    player.y += 2;
  }
  if (KEYS['68']) {
    player.x += 2;
  }
  if (KEYS['65']) {
    player.x -= 2;
  }
}
