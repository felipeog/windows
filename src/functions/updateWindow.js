import { broadcastChannel } from "../objects/broadcastChannel";
import { currentWindow } from "../objects/currentWindow";

export function updateWindow() {
  currentWindow.position.x = window.screenLeft + window.innerWidth / 2;
  currentWindow.position.y = window.screenTop + window.innerHeight / 2;

  broadcastChannel.postMessage({
    action: "update",
    payload: currentWindow,
  });
}
