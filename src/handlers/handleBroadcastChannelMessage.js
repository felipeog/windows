import { createSvgElement } from "../functions/createSvgElement";
import { currentWindow } from "../objects/currentWindow";
import { getStrokeWidth } from "../functions/getStrokeWidth";
import { lineGroup, circleGroup } from "../objects/elements";
import { state } from "../objects/state";

export function handleBroadcastChannelMessage(event) {
  if (event.data.action === "create") {
    createElements(event.data.payload);
  }

  if (event.data.action === "update") {
    if (!state[event.data.payload.id]) {
      createElements(event.data.payload);
    } else {
      state[event.data.payload.id] = event.data.payload;
    }
  }

  if (event.data.action === "delete") {
    deleteElements(event.data.payload);
  }
}

function createElements(w) {
  state[w.id] = w;

  const circle = createSvgElement("circle");
  circle.setAttribute("data-id", w.id);
  circle.setAttribute("cx", w.position.x - window.screenLeft);
  circle.setAttribute("cy", w.position.y - window.screenTop);
  circle.setAttribute("r", 50);
  circle.setAttribute("fill", w.color);
  circleGroup.appendChild(circle);

  const allWindows = [currentWindow, ...Object.values(state)];
  for (let fromIndex = 0; fromIndex < allWindows.length; fromIndex++) {
    const from = allWindows[fromIndex];

    for (let toIndex = fromIndex + 1; toIndex < allWindows.length; toIndex++) {
      const to = allWindows[toIndex];

      const existingLine = lineGroup.querySelector(
        `[data-from="${from.id}"][data-to="${to.id}"]`
      );
      if (existingLine) {
        continue;
      }

      const line = createSvgElement("line");
      line.setAttribute("data-from", from.id);
      line.setAttribute("data-to", to.id);
      line.setAttribute("x1", from.position.x - window.screenLeft);
      line.setAttribute("y1", from.position.y - window.screenTop);
      line.setAttribute("x2", to.position.x - window.screenLeft);
      line.setAttribute("y2", to.position.y - window.screenTop);
      line.setAttribute("stroke", "var(--foreground)");
      line.setAttribute("stroke-width", getStrokeWidth(from, to));
      lineGroup.appendChild(line);
    }
  }
}

function deleteElements(w) {
  delete state[w.id];

  const circle = circleGroup.querySelector(`[data-id="${w.id}"]`);
  const lines = lineGroup.querySelectorAll(
    `[data-from="${w.id}"],[data-to="${w.id}"]`
  );

  circleGroup.removeChild(circle);
  lines.forEach((line) => lineGroup.removeChild(line));
}
