export function getStrokeWidth(window1, window2) {
  const distance = Math.hypot(
    window1.position.x - window2.position.x,
    window1.position.y - window2.position.y
  );
  const strokeWidth = Math.max(1, 10 - distance / 100);

  return strokeWidth;
}
