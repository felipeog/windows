import { render } from "./render";
import { updateWindow } from "./updateWindow";

export function animate() {
  updateWindow();
  render();

  requestAnimationFrame(animate);
}
