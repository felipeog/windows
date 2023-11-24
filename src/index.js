import { gsap } from "gsap";

const ns = "http://www.w3.org/2000/svg";
const id = `window:${crypto.randomUUID()}`;
const color =
  "rgb(" +
  Math.random() * 255 +
  ", " +
  Math.random() * 255 +
  ", " +
  Math.random() * 255 +
  ")";

addEventListener("storage", (event) => {
  const lineGroup = document.querySelector("#lineGroup");
  const circleGroup = document.querySelector("#circleGroup");

  if (event.oldValue && !event.newValue) {
    const line = document.querySelector(`line[data-id="${event.key}"]`);
    const circle = document.querySelector(`circle[data-id="${event.key}"]`);

    lineGroup.removeChild(line);
    circleGroup.removeChild(circle);
  }

  if (!event.oldValue && event.newValue) {
    const w = JSON.parse(event.newValue);

    const line = document.createElementNS(ns, "line");
    line.setAttribute("data-id", w.id);
    line.setAttribute("x1", w.position.x - window.screenLeft);
    line.setAttribute("y1", w.position.y - window.screenTop);
    line.setAttribute("x2", w.position.x - window.screenLeft);
    line.setAttribute("y2", w.position.y - window.screenTop);
    line.setAttribute("stroke", "var(--foreground)");
    lineGroup.appendChild(line);

    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("data-id", w.id);
    circle.setAttribute("cx", w.position.x - window.screenLeft);
    circle.setAttribute("cy", w.position.y - window.screenTop);
    circle.setAttribute("r", 50);
    circle.setAttribute("fill", w.color);
    circleGroup.appendChild(circle);
  }
});

function render() {
  const currentWindow = JSON.parse(localStorage.getItem(id));
  const otherWindowsKeys = Object.keys(localStorage).filter(
    (key) => key !== currentWindow.id && key.startsWith("window:")
  );
  const otherWindows = otherWindowsKeys.map((key) =>
    JSON.parse(localStorage.getItem(key))
  );

  const svg = document.querySelector("svg");
  svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
  svg.setAttribute("width", window.innerWidth);
  svg.setAttribute("height", window.innerHeight);

  gsap.to(`[data-id="${currentWindow.id}"]`, {
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
      },
    });
  });

  localStorage.setItem(
    id,
    JSON.stringify({
      ...currentWindow,
      position: {
        x: window.screenLeft + window.innerWidth / 2,
        y: window.screenTop + window.innerHeight / 2,
      },
    })
  );

  requestAnimationFrame(render);
}

window.onload = () => {
  const currentWindow = {
    id,
    color,
    position: {
      x: window.screenLeft + window.innerWidth / 2,
      y: window.screenTop + window.innerHeight / 2,
    },
  };

  localStorage.setItem(id, JSON.stringify(currentWindow));

  const otherWindowsKeys = Object.keys(localStorage).filter(
    (key) => key !== currentWindow.id && key.startsWith("window:")
  );
  const otherWindows = otherWindowsKeys.map((key) =>
    JSON.parse(localStorage.getItem(key))
  );

  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
  svg.setAttribute("width", window.innerWidth);
  svg.setAttribute("height", window.innerHeight);
  document.body.appendChild(svg);

  const lineGroup = document.createElementNS(ns, "g");
  lineGroup.setAttribute("id", "lineGroup");
  svg.appendChild(lineGroup);

  const circleGroup = document.createElementNS(ns, "g");
  circleGroup.setAttribute("id", "circleGroup");
  svg.appendChild(circleGroup);

  otherWindows.forEach((w) => {
    const line = document.createElementNS(ns, "line");
    line.setAttribute("data-id", w.id);
    line.setAttribute("x1", w.position.x - window.screenLeft);
    line.setAttribute("y1", w.position.y - window.screenTop);
    line.setAttribute("x2", currentWindow.position.x - window.screenLeft);
    line.setAttribute("y2", currentWindow.position.y - window.screenTop);
    line.setAttribute("stroke", "var(--foreground)");
    lineGroup.appendChild(line);

    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("data-id", w.id);
    circle.setAttribute("cx", w.position.x - window.screenLeft);
    circle.setAttribute("cy", w.position.y - window.screenTop);
    circle.setAttribute("r", 50);
    circle.setAttribute("fill", w.color);
    circleGroup.appendChild(circle);
  });

  const circle = document.createElementNS(ns, "circle");
  circle.setAttribute("data-id", currentWindow.id);
  circle.setAttribute("cx", currentWindow.position.x - window.screenLeft);
  circle.setAttribute("cy", currentWindow.position.y - window.screenTop);
  circle.setAttribute("r", 50);
  circle.setAttribute("fill", currentWindow.color);
  circleGroup.appendChild(circle);

  render();
};

window.onbeforeunload = () => {
  localStorage.removeItem(id);
};
