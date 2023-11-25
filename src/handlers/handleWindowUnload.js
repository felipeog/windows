import { currentWindow } from "../objects/currentWindow";

export function handleWindowUnload() {
  localStorage.removeItem(currentWindow.id);
}
