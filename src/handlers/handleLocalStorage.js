import { circleGroup, lineGroup } from "../objects/elements";
import { createSvgElement } from "../functions/createSvgElement";
import { state } from "../objects/state";

export function handleLocalStorage(event) {
  if (event.oldValue && !event.newValue) {
    delete state[event.key];

    const line = lineGroup.querySelector(`line[data-id="${event.key}"]`);
    const circle = circleGroup.querySelector(`circle[data-id="${event.key}"]`);

    lineGroup.removeChild(line);
    circleGroup.removeChild(circle);
  }

  if (!event.oldValue && event.newValue) {
    const w = JSON.parse(event.newValue);
    state[w.id] = w;

    const line = createSvgElement("line");
    line.setAttribute("data-id", w.id);
    line.setAttribute("x1", w.position.x - window.screenLeft);
    line.setAttribute("y1", w.position.y - window.screenTop);
    line.setAttribute("x2", w.position.x - window.screenLeft);
    line.setAttribute("y2", w.position.y - window.screenTop);
    line.setAttribute("stroke", "var(--foreground)");
    lineGroup.appendChild(line);

    const circle = createSvgElement("circle");
    circle.setAttribute("data-id", w.id);
    circle.setAttribute("cx", w.position.x - window.screenLeft);
    circle.setAttribute("cy", w.position.y - window.screenTop);
    circle.setAttribute("r", 50);
    circle.setAttribute("fill", w.color);
    circleGroup.appendChild(circle);
  }
}
