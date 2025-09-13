export function smoothPath(points: { x: number; y: number }[], tension = 0.5) {
  if (points.length < 2) return "";
  let distance = `M ${points[0].x},${points[0].y} `; // move to the first point
  //Loop over each segment between p1 and p2
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]; // previous point or same if one
    const p1 = points[i]; // current point
    const p2 = points[i + 1]; // next point
    const p3 = points[i + 2] ?? p2; // point after next or same

    const d1x = ((p2.x - p0.x) * tension) / 6;
    const d1y = ((p2.y - p0.y) * tension) / 6;
    const c1x = p1.x + d1x;
    const c1y = p1.y + d1y;

    const d2x = ((p3.x - p1.x) * tension) / 6;
    const d2y = ((p3.y - p1.y) * tension) / 6;
    const c2x = p2.x - d2x;
    const c2y = p2.y - d2y;
    distance += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return distance;
}
