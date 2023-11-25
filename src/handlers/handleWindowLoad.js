import { createSvgElement } from "../functions/createSvgElement";
import { currentWindow } from "../objects/currentWindow";
import { render } from "../functions/render";
import { svg, lineGroup, circleGroup, circle } from "../objects/elements";
import { updateWindow } from "../functions/updateWindow";
import { getStrokeWidth } from "../functions/getStrokeWidth";

export function handleWindowLoad() {
  currentWindow.position.x = window.screenLeft + window.innerWidth / 2;
  currentWindow.position.y = window.screenTop + window.innerHeight / 2;

  localStorage.setItem(currentWindow.id, JSON.stringify(currentWindow));

  const otherWindows = Object.keys(localStorage)
    .filter((key) => key !== currentWindow.id && key.startsWith("window:"))
    .map((key) => JSON.parse(localStorage.getItem(key)));

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

  otherWindows.forEach((w) => {
    const line = createSvgElement("line");
    line.setAttribute("data-id", w.id);
    line.setAttribute("x1", w.position.x - window.screenLeft);
    line.setAttribute("y1", w.position.y - window.screenTop);
    line.setAttribute("x2", currentWindow.position.x - window.screenLeft);
    line.setAttribute("y2", currentWindow.position.y - window.screenTop);
    line.setAttribute("stroke", "var(--foreground)");
    line.setAttribute("stroke-width", getStrokeWidth(w, currentWindow));
    lineGroup.appendChild(line);

    const circle = createSvgElement("circle");
    circle.setAttribute("data-id", w.id);
    circle.setAttribute("cx", w.position.x - window.screenLeft);
    circle.setAttribute("cy", w.position.y - window.screenTop);
    circle.setAttribute("r", 50);
    circle.setAttribute("fill", w.color);
    circleGroup.appendChild(circle);
  });

  updateWindow();
  render();
}
