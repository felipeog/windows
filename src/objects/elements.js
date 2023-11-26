import { createSvgElement } from "../functions/createSvgElement";
import { currentWindow } from "../objects/currentWindow";

const svg = createSvgElement("svg");

const lineGroup = createSvgElement("g");
lineGroup.setAttribute("id", "lineGroup");

const circleGroup = createSvgElement("g");
circleGroup.setAttribute("id", "circleGroup");

const circle = createSvgElement("circle");
circle.setAttribute("data-id", currentWindow.id);
circle.setAttribute("r", 50);
circle.setAttribute("fill", currentWindow.color);

export { circle, circleGroup, lineGroup, svg };
