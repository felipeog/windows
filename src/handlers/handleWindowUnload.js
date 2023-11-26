import { broadcastChannel } from "../objects/broadcastChannel";
import { currentWindow } from "../objects/currentWindow";

export function handleWindowUnload() {
  broadcastChannel.postMessage({
    action: "delete",
    payload: currentWindow,
  });
}
