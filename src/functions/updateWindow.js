import { broadcastChannel } from "../objects/broadcastChannel";
import { currentWindow } from "../objects/currentWindow";

export function updateWindow() {
  const newPosition = {
    x: window.screenLeft + window.innerWidth / 2,
    y: window.screenTop + window.innerHeight / 2,
  };
  const isSameX = currentWindow.position.x === newPosition.x;
  const isSameY = currentWindow.position.y === newPosition.y;

  if (!isSameX || !isSameY) {
    currentWindow.position.x = newPosition.x;
    currentWindow.position.y = newPosition.y;
    broadcastChannel.postMessage(currentWindow);
    localStorage.setItem(currentWindow.id, JSON.stringify(currentWindow));
  }

  setTimeout(() => {
    updateWindow();
  }, 0);
}
