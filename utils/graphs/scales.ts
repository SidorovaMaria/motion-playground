export type graphDimensions = {
  SVG_W: number;
  SVG_H: number;
  SVG_PAD: number;
};
export type graphRanges = {
  t0: number;
  t1: number;
  xMin: number;
  xMax: number;
};
export type Sample = {
  t: number; //the time (in seconds)=> normalized 0-> 1 for the plotting
  x: number; // the position at time t -> between 0 and 1, maybe overshooting > 1
  v: number; // the velocity at time t
};

export function createScales(dimensions: graphDimensions, ranges: graphRanges) {
  const { SVG_W, SVG_H, SVG_PAD } = dimensions;
  const { t0, t1, xMin, xMax } = ranges;
  const tspan = Math.max(1e-6, t1 - t0);
  const xspan = Math.max(1e-6, xMax - xMin);
  const toPX = (t: number) => SVG_PAD + ((t - t0) / tspan) * (SVG_W - SVG_PAD * 2);
  const toPY = (x: number) => SVG_PAD + (1 - (x - xMin) / xspan) * (SVG_H - SVG_PAD * 2);

  const toXY = (t: number, x: number) => {
    const px = toPX(t);
    const py = toPY(x);
    return { px, py };
  };
  return { toPX, toPY, toXY };
}

/** Auto-fit ranges from samples, always including 0 and 1 lines. */
export function fitRanges(samples: { t: number; x: number }[]) {
  if (!samples.length) return { t0: 0, t1: 1, xMin: -0.2, xMax: 1.2 };
  const t0 = samples[0].t;
  const t1 = samples[samples.length - 1].t;
  let lo = Infinity,
    hi = -Infinity;
  for (const s of samples) {
    if (s.x < lo) lo = s.x;
    if (s.x > hi) hi = s.x;
  }
  lo = Math.min(lo, 1);
  hi = Math.max(hi, 1); // include target line (1)
  const pad = (hi - lo || 1) * 0.1;
  return { t0, t1, xMin: lo - pad, xMax: hi + pad };
}
