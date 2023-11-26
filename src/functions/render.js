import { circle, lineGroup, svg } from "../objects/elements";
import { currentWindow } from "../objects/currentWindow";
import { getStrokeWidth } from "./getStrokeWidth";
import { gsap } from "gsap";
import { state } from "../objects/state";

export function render() {
  const otherWindows = Object.values(state);

  svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
  svg.setAttribute("width", window.innerWidth);
  svg.setAttribute("height", window.innerHeight);

  gsap.to(circle, {
    attr: {
      cx: currentWindow.position.x - window.screenLeft,
      cy: currentWindow.position.y - window.screenTop,
    },
  });

  otherWindows.forEach((w) => {
    gsap.to(`circle[data-id="${w.id}"]`, {
      attr: {
        cx: w.position.x - window.screenLeft,
        cy: w.position.y - window.screenTop,
      },
    });
  });

  lineGroup.querySelectorAll("line").forEach((line) => {
    const from = state[line.dataset.from] ?? currentWindow;
    const to = state[line.dataset.to] ?? currentWindow;

    gsap.to(`[data-from="${from.id}"][data-to="${to.id}"]`, {
      attr: {
        x1: from.position.x - window.screenLeft,
        y1: from.position.y - window.screenTop,
        x2: to.position.x - window.screenLeft,
        y2: to.position.y - window.screenTop,
        "stroke-width": getStrokeWidth(from, to),
      },
    });
  });
}
