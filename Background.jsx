import React, { useRef, useEffect } from 'react';

/* ─────────────────────────────────────────────────────
   NOTOSAN-STYLE ILLUSTRATED PARALLAX BACKGROUND
   Canvas-based — layered illustrated nature scene
   Warm palette: purple sky → orange horizon → teal water
───────────────────────────────────────────────────── */

const PALETTE = {
  skyTop:      '#1a0f2e',
  skyMid:      '#3d1f5a',
  skyHorizon:  '#c4654a',
  glow:        '#f4a460',
  waterfall:   '#b8d4e8',
  waterfallFoam: '#e8f4f8',
  mtFar:       '#2a1845',
  mtMid:       '#1d3a4a',
  mtNear:      '#1a4a3a',
  treeFar:     '#0f2a1e',
  treeMid:     '#0a1f15',
  rock1:       '#2d2238',
  rock2:       '#1e2d38',
  plantDark:   '#061410',
  plantMid:    '#0d2218',
  plantLight:  '#1a3d28',
  water:       '#1a3550',
  waterGlow:   '#2a5a7a',
  fog:         'rgba(180,160,220,0.08)',
  fogDense:    'rgba(200,180,240,0.15)',
};

function drawScene(ctx, W, H, scroll, mouse, t) {
  ctx.clearRect(0, 0, W, H);

  const scrollRatio = Math.min(scroll / (document.body.scrollHeight - window.innerHeight || 1), 1);
  const mx = mouse.x; // -1 to 1
  const my = mouse.y; // -1 to 1

  /* ── 1. SKY GRADIENT ───────────────────────────── */
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.75);
  sky.addColorStop(0,    PALETTE.skyTop);
  sky.addColorStop(0.45, PALETTE.skyMid);
  sky.addColorStop(0.75, '#7a3a5a');
  sky.addColorStop(1,    PALETTE.skyHorizon);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  /* ── 2. SUN / GLOW ─────────────────────────────── */
  const sunX = W * 0.72 + mx * 12;
  const sunY = H * 0.38 + my * 6;
  const sunG = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * 0.3);
  sunG.addColorStop(0,   'rgba(255,200,100,0.55)');
  sunG.addColorStop(0.3, 'rgba(220,140,80,0.3)');
  sunG.addColorStop(0.6, 'rgba(180,100,80,0.12)');
  sunG.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = sunG;
  ctx.fillRect(0, 0, W, H);

  /* ── 3. FAR MOUNTAINS ──────────────────────────── */
  drawMountains(ctx, W, H, mx, my, {
    parallaxX: 0.01, parallaxY: 0.005,
    offsetX: 0, baseY: H * 0.52,
    peaks: [
      [0.0, 0.20], [0.12, 0.10], [0.22, 0.06], [0.32, 0.14],
      [0.43, 0.04], [0.55, 0.12], [0.68, 0.02], [0.80, 0.18],
      [0.92, 0.08], [1.0,  0.22],
    ],
    color: PALETTE.mtFar,
    alphaTop: 0.95,
  });

  /* ── 4. MID MOUNTAINS ──────────────────────────── */
  drawMountains(ctx, W, H, mx, my, {
    parallaxX: 0.025, parallaxY: 0.01,
    offsetX: W * 0.05,
    baseY: H * 0.60,
    peaks: [
      [0.0, 0.32], [0.10, 0.18], [0.25, 0.28], [0.40, 0.12],
      [0.52, 0.22], [0.65, 0.08], [0.78, 0.20], [0.90, 0.14],
      [1.0,  0.30],
    ],
    color: PALETTE.mtMid,
    alphaTop: 0.98,
  });

  /* ── 5. WATERFALL ───────────────────────────────── */
  drawWaterfall(ctx, W, H, mx, my, t, scrollRatio);

  /* ── 6. NEAR MOUNTAIN / CLIFF ──────────────────── */
  drawMountains(ctx, W, H, mx, my, {
    parallaxX: 0.04, parallaxY: 0.02,
    offsetX: -W * 0.05,
    baseY: H * 0.70,
    peaks: [
      [0.0, 0.50], [0.08, 0.30], [0.18, 0.42], [0.30, 0.22],
      [0.45, 0.32], [0.60, 0.15], [0.75, 0.28], [0.90, 0.20],
      [1.0,  0.45],
    ],
    color: PALETTE.mtNear,
    alphaTop: 1,
  });

  /* ── 7. WATER / LAKE AT BASE ───────────────────── */
  drawWater(ctx, W, H, mx, my, t);

  /* ── 8. FAR TREELINE ─────────────────────────────  */
  drawTrees(ctx, W, H, mx, my, {
    parallaxX: 0.06, parallaxY: 0.03,
    baseY: H * 0.65, minH: H * 0.08, maxH: H * 0.14,
    count: 26, spread: 1.1, color: PALETTE.treeFar,
  });

  /* ── 9. NEAR TREELINE ──────────────────────────── */
  drawTrees(ctx, W, H, mx, my, {
    parallaxX: 0.10, parallaxY: 0.05,
    baseY: H * 0.75, minH: H * 0.14, maxH: H * 0.22,
    count: 18, spread: 1.0, color: PALETTE.treeMid,
  });

  /* ── 10. ROCKS (left cluster) ──────────────────── */
  drawRocks(ctx, W, H, mx, my, t);

  /* ── 11. FOREGROUND FOLIAGE ─────────────────────── */
  drawFoliage(ctx, W, H, mx, my, t);

  /* ── 12. DEER silhouette ────────────────────────── */
  drawDeer(ctx, W, H, mx, my, t);

  /* ── 13. BIRDS ──────────────────────────────────── */
  drawBirds(ctx, W, H, t);

  /* ── 14. BOTTOM FOG ─────────────────────────────── */
  drawFog(ctx, W, H, t);

  /* ── 15. VIGNETTE ───────────────────────────────── */
  const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, W*0.8);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(10,5,20,0.65)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);
}

/* ─── MOUNTAINS ─── */
function drawMountains(ctx, W, H, mx, my, opts) {
  const { parallaxX, parallaxY, offsetX, baseY, peaks, color } = opts;
  const dx = mx * W * parallaxX;
  const dy = my * H * parallaxY;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0 + offsetX + dx, baseY + dy);

  peaks.forEach(([xRatio, yRatio]) => {
    ctx.lineTo(W * xRatio + offsetX + dx, baseY - H * yRatio + dy);
  });

  ctx.lineTo(W + offsetX + dx, baseY + dy);
  ctx.lineTo(W + offsetX + dx, H);
  ctx.lineTo(0 + offsetX + dx, H);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

/* ─── WATERFALL ─── */
function drawWaterfall(ctx, W, H, mx, my, t, scrollRatio) {
  const wx = W * 0.62 + mx * 15;
  const wy = H * 0.18 + my * 8;
  const ww = W * 0.06;
  const wh = H * 0.45;

  // Main flow
  const wg = ctx.createLinearGradient(wx, wy, wx + ww * 0.5, wy + wh);
  wg.addColorStop(0,   'rgba(200,230,255,0.9)');
  wg.addColorStop(0.3, 'rgba(180,215,245,0.75)');
  wg.addColorStop(0.7, 'rgba(160,200,235,0.6)');
  wg.addColorStop(1,   'rgba(140,190,225,0.3)');
  ctx.fillStyle = wg;

  ctx.save();
  ctx.beginPath();
  // Slight wave motion
  const wave = Math.sin(t * 2) * 3;
  ctx.moveTo(wx + wave, wy);
  ctx.lineTo(wx + ww + wave * 0.5, wy);
  ctx.quadraticCurveTo(wx + ww * 1.3 + wave, wy + wh * 0.5, wx + ww * 0.8, wy + wh);
  ctx.lineTo(wx + wave * 0.3, wy + wh);
  ctx.quadraticCurveTo(wx - ww * 0.1, wy + wh * 0.5, wx + wave, wy);
  ctx.fill();
  ctx.restore();

  // Animated streaks
  for (let i = 0; i < 6; i++) {
    const sx = wx + (i / 6) * ww * 0.8 + Math.sin(t * 1.5 + i) * 2;
    const sy = wy + ((t * 0.4 + i * 0.17) % 1) * wh;
    const sh = wh * (0.1 + Math.random() * 0.15);
    const sg = ctx.createLinearGradient(sx, sy, sx, sy + sh);
    sg.addColorStop(0, 'rgba(255,255,255,0)');
    sg.addColorStop(0.5, 'rgba(255,255,255,0.6)');
    sg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = sg;
    ctx.lineWidth = 1.5;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + Math.sin(t + i) * 2, sy + sh);
    ctx.stroke();
    ctx.restore();
  }

  // Splash pool
  const poolG = ctx.createRadialGradient(wx + ww / 2, wy + wh, 0, wx + ww / 2, wy + wh, ww * 2);
  poolG.addColorStop(0, 'rgba(200,230,255,0.5)');
  poolG.addColorStop(0.4, 'rgba(150,200,235,0.2)');
  poolG.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = poolG;
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(wx + ww / 2 + Math.sin(t) * 2, wy + wh + 4, ww * 2, ww * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/* ─── WATER / LAKE ─── */
function drawWater(ctx, W, H, mx, my, t) {
  const waterY = H * 0.76;
  const dx = mx * 8;

  const wg = ctx.createLinearGradient(0, waterY, 0, H);
  wg.addColorStop(0, PALETTE.waterGlow);
  wg.addColorStop(0.3, PALETTE.water);
  wg.addColorStop(1, '#0d1f30');
  ctx.fillStyle = wg;
  ctx.fillRect(0, waterY, W, H - waterY);

  // Shimmer
  for (let i = 0; i < 8; i++) {
    const sx = (W * (i / 8) + t * 18 + dx) % W;
    const sy = waterY + 8 + (i % 3) * 12;
    const sl = 30 + Math.sin(t * 2 + i) * 15;
    ctx.save();
    ctx.strokeStyle = 'rgba(200,230,255,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + sl, sy);
    ctx.stroke();
    ctx.restore();
  }
}

/* ─── TREES ─── */
function drawTrees(ctx, W, H, mx, my, opts) {
  const { parallaxX, parallaxY, baseY, minH, maxH, count, spread, color } = opts;
  const dx = mx * W * parallaxX;
  const dy = my * H * parallaxY;

  ctx.save();
  ctx.fillStyle = color;

  for (let i = 0; i < count; i++) {
    // Deterministic positions
    const seed = (i * 137.508 + 42) % 1;
    const seed2 = (i * 73.197 + 11) % 1;
    const x = (seed * W * spread - W * (spread - 1) / 2 + dx);
    const y = baseY + seed2 * H * 0.04 + dy;
    const h = minH + seed2 * (maxH - minH);
    const w = h * 0.35;

    // Pine tree shape
    ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x + w * 0.5, y - h * 0.4);
    ctx.lineTo(x + w * 0.35, y - h * 0.4);
    ctx.lineTo(x + w * 0.7, y - h * 0.0 + h * 0.1);
    ctx.lineTo(x - w * 0.7, y - h * 0.0 + h * 0.1);
    ctx.lineTo(x - w * 0.35, y - h * 0.4);
    ctx.lineTo(x - w * 0.5, y - h * 0.4);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

/* ─── ROCKS ─── */
function drawRocks(ctx, W, H, mx, my, t) {
  const dx = mx * 20;
  const dy = my * 8;
  const baseY = H * 0.72;

  const rocks = [
    { x: W * 0.08, y: baseY, rx: W * 0.07, ry: H * 0.07, c: PALETTE.rock1 },
    { x: W * 0.16, y: baseY + H * 0.03, rx: W * 0.04, ry: H * 0.05, c: PALETTE.rock2 },
    { x: W * 0.04, y: baseY + H * 0.04, rx: W * 0.03, ry: H * 0.03, c: PALETTE.rock1 },
    { x: W * 0.82, y: baseY + H * 0.01, rx: W * 0.06, ry: H * 0.06, c: PALETTE.rock2 },
    { x: W * 0.90, y: baseY + H * 0.03, rx: W * 0.04, ry: H * 0.04, c: PALETTE.rock1 },
    { x: W * 0.55, y: baseY + H * 0.02, rx: W * 0.03, ry: H * 0.03, c: PALETTE.rock2 },
  ];

  rocks.forEach(r => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(r.x + dx * 0.3, r.y + dy * 0.3, r.rx, r.ry, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = r.c;
    ctx.fill();
    // Highlight
    ctx.beginPath();
    ctx.ellipse(r.x + dx * 0.3 - r.rx * 0.2, r.y + dy * 0.3 - r.ry * 0.3, r.rx * 0.3, r.ry * 0.2, -0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(180,140,200,0.15)';
    ctx.fill();
    ctx.restore();
  });
}

/* ─── FOREGROUND FOLIAGE ─── */
function drawFoliage(ctx, W, H, mx, my, t) {
  const dx = mx * 30;
  const baseY = H * 0.78;

  // Large foreground leaves (left)
  ctx.save();
  for (let i = 0; i < 7; i++) {
    const seed = (i * 91.3 + 5) % 1;
    const lx = W * 0.0 + seed * W * 0.22 + dx * 0.6;
    const ly = baseY + seed * H * 0.1;
    const len = H * 0.18 + seed * H * 0.12;
    const angle = -Math.PI / 4 + seed * Math.PI * 0.5 + Math.sin(t * 0.4 + i) * 0.04;

    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(angle);
    // Leaf blade
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(len * 0.15, -len * 0.3, len, -len * 0.05);
    ctx.quadraticCurveTo(len * 0.15, len * 0.05, 0, 0);
    ctx.fillStyle = i % 2 === 0 ? PALETTE.plantMid : PALETTE.plantLight;
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  // Right foliage cluster
  ctx.save();
  for (let i = 0; i < 6; i++) {
    const seed = (i * 67.9 + 13) % 1;
    const lx = W * 0.78 + seed * W * 0.22 + dx * 0.7;
    const ly = baseY + seed * H * 0.08;
    const len = H * 0.15 + seed * H * 0.1;
    const angle = Math.PI + seed * Math.PI * 0.6 + Math.sin(t * 0.35 + i + 2) * 0.04;

    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(len * 0.15, -len * 0.25, len, -len * 0.04);
    ctx.quadraticCurveTo(len * 0.15, len * 0.05, 0, 0);
    ctx.fillStyle = i % 2 === 0 ? PALETTE.plantDark : PALETTE.plantMid;
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  // Bottom grass blades
  ctx.save();
  for (let i = 0; i < 40; i++) {
    const seed = (i * 47.1 + 7) % 1;
    const gx = seed * W + dx * 0.8;
    const gy = H * 0.80 + (i % 4) * H * 0.02;
    const gh = H * 0.05 + seed * H * 0.04;
    const sway = Math.sin(t * 0.6 + i * 0.4) * 4;
    ctx.strokeStyle = seed > 0.5 ? PALETTE.plantMid : PALETTE.plantLight;
    ctx.lineWidth = 1.5;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.quadraticCurveTo(gx + sway, gy - gh * 0.5, gx + sway * 1.5, gy - gh);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

/* ─── DEER SILHOUETTE ─── */
function drawDeer(ctx, W, H, mx, my, t) {
  const dx = mx * 25;
  const baseX = W * 0.42 + dx * 0.5;
  const baseY = H * 0.735 + my * 5;
  const s = H * 0.10; // scale

  ctx.save();
  ctx.fillStyle = 'rgba(30, 18, 45, 0.92)';

  // Body
  ctx.beginPath();
  ctx.ellipse(baseX, baseY - s * 0.5, s * 0.55, s * 0.32, -0.15, 0, Math.PI * 2);
  ctx.fill();

  // Head (slightly lowered — grazing)
  const headX = baseX + s * 0.45;
  const headY = baseY - s * 0.25 + Math.sin(t * 0.4) * 3;
  ctx.beginPath();
  ctx.ellipse(headX, headY, s * 0.18, s * 0.14, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.beginPath();
  ctx.moveTo(baseX + s * 0.3, baseY - s * 0.55);
  ctx.lineTo(headX - s * 0.1, headY - s * 0.05);
  ctx.lineTo(headX + s * 0.05, headY + s * 0.1);
  ctx.lineTo(baseX + s * 0.42, baseY - s * 0.35);
  ctx.closePath();
  ctx.fill();

  // Legs
  const legData = [
    [baseX - s * 0.35, 0.12, 0.06],
    [baseX - s * 0.18, 0.1, 0.05],
    [baseX + s * 0.15, 0.1, 0.05],
    [baseX + s * 0.32, 0.12, 0.06],
  ];
  legData.forEach(([lx, lh, lw]) => {
    ctx.beginPath();
    ctx.rect(lx - s * lw, baseY - s * 0.1, s * lw * 2, s * lh * 2.2);
    ctx.fill();
  });

  // Ear
  ctx.beginPath();
  ctx.moveTo(headX - s * 0.05, headY - s * 0.12);
  ctx.lineTo(headX + s * 0.05, headY - s * 0.28);
  ctx.lineTo(headX + s * 0.18, headY - s * 0.1);
  ctx.closePath();
  ctx.fill();

  // Antlers
  ctx.strokeStyle = 'rgba(30,18,45,0.92)';
  ctx.lineWidth = s * 0.035;
  ctx.lineCap = 'round';
  // Left antler
  ctx.beginPath();
  ctx.moveTo(headX - s * 0.05, headY - s * 0.22);
  ctx.lineTo(headX - s * 0.15, headY - s * 0.52);
  ctx.lineTo(headX - s * 0.28, headY - s * 0.65);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(headX - s * 0.18, headY - s * 0.42);
  ctx.lineTo(headX - s * 0.05, headY - s * 0.52);
  ctx.stroke();
  // Right antler
  ctx.beginPath();
  ctx.moveTo(headX + s * 0.05, headY - s * 0.22);
  ctx.lineTo(headX + s * 0.12, headY - s * 0.52);
  ctx.lineTo(headX + s * 0.22, headY - s * 0.64);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(headX + s * 0.15, headY - s * 0.42);
  ctx.lineTo(headX + s * 0.04, headY - s * 0.50);
  ctx.stroke();

  ctx.restore();
}

/* ─── BIRDS ─── */
function drawBirds(ctx, W, H, t) {
  const birds = [
    { baseX: 0.30, baseY: 0.18, speed: 0.055, offset: 0 },
    { baseX: 0.32, baseY: 0.17, speed: 0.055, offset: 0.12 },
    { baseX: 0.34, baseY: 0.19, speed: 0.055, offset: 0.28 },
    { baseX: 0.14, baseY: 0.22, speed: 0.04, offset: 1.2 },
    { baseX: 0.16, baseY: 0.23, speed: 0.04, offset: 1.35 },
  ];

  ctx.save();
  ctx.strokeStyle = 'rgba(200,160,240,0.7)';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';

  birds.forEach(b => {
    const x = (b.baseX * W + t * W * b.speed + b.offset * W) % (W * 1.4) - W * 0.2;
    const y = b.baseY * H + Math.sin(t * 2 + b.offset * 10) * H * 0.012;
    const flap = Math.sin(t * 5 + b.offset * 8) * 4;
    const sz = 6;

    ctx.beginPath();
    ctx.moveTo(x - sz, y + flap);
    ctx.quadraticCurveTo(x, y - flap * 0.5, x + sz, y + flap);
    ctx.stroke();
  });
  ctx.restore();
}

/* ─── BOTTOM FOG ─── */
function drawFog(ctx, W, H, t) {
  // Rolling fog at the base
  for (let layer = 0; layer < 3; layer++) {
    const offset = (t * 8 * (layer + 1) * 0.3) % (W * 2);
    const fogY = H * (0.72 + layer * 0.04);
    const fogH = H * 0.06;
    const fg = ctx.createLinearGradient(0, fogY, 0, fogY + fogH);
    fg.addColorStop(0, `rgba(160,140,200,${0.12 - layer * 0.03})`);
    fg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fg;
    ctx.save();
    ctx.beginPath();
    const pts = 8;
    ctx.moveTo(-offset, fogY + fogH);
    for (let i = 0; i <= pts; i++) {
      const px = -offset + i * W * 2.5 / pts;
      const py = fogY + Math.sin((i / pts) * Math.PI * 4 + t * 0.5) * fogH * 0.4;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.lineTo(-offset + W * 2.5, fogY + fogH);
    ctx.lineTo(-offset, fogY + fogH);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

/* ─── MAIN COMPONENT ─── */
export default function Background({ mousePos }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    let startTime = null;
    const loop = (ts) => {
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;
      drawScene(ctx, canvas.width, canvas.height, scrollRef.current, mousePos.current, t);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
