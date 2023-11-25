import { circle, svg } from "../objects/elements";
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

    gsap.to(`line[data-id="${w.id}"]`, {
      attr: {
        x1: w.position.x - window.screenLeft,
        y1: w.position.y - window.screenTop,
        x2: currentWindow.position.x - window.screenLeft,
        y2: currentWindow.position.y - window.screenTop,
        "stroke-width": getStrokeWidth(w, currentWindow),
      },
    });
  });
}
