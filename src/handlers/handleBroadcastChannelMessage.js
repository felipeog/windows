import { createSvgElement } from "../functions/createSvgElement";
import { currentWindow } from "../objects/currentWindow";
import { getStrokeWidth } from "../functions/getStrokeWidth";
import { lineGroup, circleGroup } from "../objects/elements";
import { state } from "../objects/state";

export function handleBroadcastChannelMessage(event) {
  if (event.data.action === "create") {
    state[event.data.payload.id] = event.data.payload;

    createElements(event.data.payload);
  }

  if (event.data.action === "update") {
    if (!state[event.data.payload.id]) {
      createElements(event.data.payload);
    }

    state[event.data.payload.id] = event.data.payload;
  }

  if (event.data.action === "delete") {
    delete state[event.data.payload.id];

    const line = lineGroup.querySelector(
      `line[data-id="${event.data.payload.id}"]`
    );
    const circle = circleGroup.querySelector(
      `circle[data-id="${event.data.payload.id}"]`
    );

    lineGroup.removeChild(line);
    circleGroup.removeChild(circle);
  }
}

function createElements(w) {
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
}
