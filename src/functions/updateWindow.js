import { broadcastChannel } from "../objects/broadcastChannel";
import { currentWindow } from "../objects/currentWindow";

export function updateWindow() {
  const target = {
    x: window.screenLeft + window.innerWidth / 2,
    y: window.screenTop + window.innerHeight / 2,
  };
  const newPosition = {
    x: getPositionWithInertia(currentWindow.position.x, target.x),
    y: getPositionWithInertia(currentWindow.position.y, target.y),
  };

  currentWindow.position.x = newPosition.x;
  currentWindow.position.y = newPosition.y;

  broadcastChannel.postMessage({
    action: "update",
    payload: currentWindow,
  });
}

function getPositionWithInertia(current, target) {
  const distance = target - current;

  if (Math.abs(distance) < 0.01) {
    return target;
  }

  return current + distance * 0.2;
}
