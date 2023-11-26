import { animate } from "../functions/animate";
import { broadcastChannel } from "../objects/broadcastChannel";
import { circle, circleGroup, lineGroup, svg } from "../objects/elements";
import { currentWindow } from "../objects/currentWindow";

export function handleWindowLoad() {
  currentWindow.position.x = window.screenLeft + window.innerWidth / 2;
  currentWindow.position.y = window.screenTop + window.innerHeight / 2;

  broadcastChannel.postMessage({
    action: "create",
    payload: currentWindow,
  });

  svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
  svg.setAttribute("width", window.innerWidth);
  svg.setAttribute("height", window.innerHeight);
  document.body.appendChild(svg);

  lineGroup.setAttribute("id", "lineGroup");
  svg.appendChild(lineGroup);

  circleGroup.setAttribute("id", "circleGroup");
  svg.appendChild(circleGroup);

  circle.setAttribute("data-id", currentWindow.id);
  circle.setAttribute("cx", currentWindow.position.x - window.screenLeft);
  circle.setAttribute("cy", currentWindow.position.y - window.screenTop);
  circle.setAttribute("r", 50);
  circle.setAttribute("fill", currentWindow.color);
  circleGroup.appendChild(circle);

  animate();
}
