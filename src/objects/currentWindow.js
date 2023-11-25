export const currentWindow = {
  id: `window:${crypto.randomUUID()}`,
  color:
    "rgb(" +
    Math.random() * 255 +
    ", " +
    Math.random() * 255 +
    ", " +
    Math.random() * 255 +
    ")",
  position: {
    x: 0,
    y: 0,
  },
};
