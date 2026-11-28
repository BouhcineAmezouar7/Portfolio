// Scroll Scribble Path by Made for Award: https://www.madeforaward.com/ui/interactions/scroll-scribble-path
// Free and open source (MIT). If it helped, a star means a lot: https://github.com/shivc868/madeforaward-ui
"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

export type ScrollScribblePathProps = {
  /** your sections; the line runs through them */
  children?: ReactNode;
  /** the coats of paint, first to arrive to last; the last is what stays */
  colors?: string[];
  /** the page colours it moves through as you scroll */
  backgrounds?: string[];
  /** width of the line, px; it thins on narrow screens */
  width?: number;
  /** how far behind each coat runs, as a share of the whole line */
  trail?: number;
  /** how often the line ties itself in a loop, 0–1 */
  loops?: number;
  /** how far it swings from side to side, 0–1 */
  wander?: number;
  /** start tangled and end straight; off keeps it wild all the way */
  untangle?: boolean;
  /** a different number draws a different line */
  seed?: number;
  /** how the line mixes with what's under it */
  blend?: "multiply" | "screen" | "normal";
  /** seconds the line takes to catch up with the scroll */
  smooth?: number;
  /** the scrolling element, when it isn't the window */
  scroller?: Element | null;
  className?: string;
  /** CSS selector of the hero; measured so the route works at every screen size. */
  heroSelector?: string;
  /** [x%, y%] points inside the hero, ordered from top to bottom. */
  heroWaypoints?: Point[];
  /** Elements the thread should visit and loop around after leaving the hero. */
  threadTargetSelector?: string;
  /** Whether later section headings reuse the hero's deliberate loop treatment. */
  routeThroughTargets?: boolean;
  /** Sections that each receive their own procedural continuation. */
  proceduralSectionSelector?: string;
};

type Point = [number, number];

// A small seeded random, so a seed always draws the same line.
function seeded(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Plans the line for this exact box, so it fits any height and any screen. It's
// the path of a pen tip circling as it travels down the page: where the circling
// outruns the travel the line loops, like cursive, and as the circle shrinks the
// loops open into waves and then a straight run. One continuous curve, no joins.
function plan(
  width: number,
  height: number,
  tuning: { loops: number; wander: number; untangle: boolean; seed: number },
) {
  const random = seeded(tuning.seed);
  const span = Math.min(width, 900);
  const turns = Math.min(
    40,
    Math.round((tuning.loops * height) / (span * 0.3)),
  );
  const steps = turns * 14 + 28;
  const phase = random() * Math.PI * 2;
  const sway = 1.1 + random() * 0.9;
  // Each turn gets its own size, so no two loops match.
  const sizes = Array.from({ length: turns + 2 }, () => 0.62 + random() * 0.76);
  const points: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const calm = tuning.untangle ? (1 - t) ** 0.85 : 1;
    const turn = t * turns;
    const index = Math.floor(turn);
    const between = turn - index;
    const size =
      sizes[index] +
      (sizes[index + 1] - sizes[index]) * between * between * (3 - 2 * between);
    const radius = Math.min(width, height) * 0.16 * size * calm;
    const angle = turn * Math.PI * 2 + phase;
    // It comes home to the middle over the last stretch, wherever it wandered.
    const home = tuning.untangle
      ? 1 -
        gsap.parseEase("power2.inOut")(gsap.utils.clamp(0, 1, (t - 0.8) / 0.2))
      : 1;
    const swing =
      Math.sin(t * sway * Math.PI * 2 + phase) *
      width *
      0.3 *
      tuning.wander *
      (tuning.untangle ? 0.25 + 0.75 * calm : 1) *
      home;
    points.push([
      width / 2 + swing + Math.sin(angle) * radius,
      -40 + (height + 80) * t + Math.cos(angle) * radius,
    ]);
  }
  return points;
}

// A calm alternative for content sections: one broad S-curve, with just enough
// seeded variation to keep consecutive sections from feeling copied.
function planSimpleSection(
  width: number,
  height: number,
  seed: number,
  index: number,
  finish = false,
) {
  const random = seeded(seed + (index + 1) * 137);
  const amplitude = width * (0.14 + random() * 0.08);
  const phase = index % 2 === 0 ? 0 : Math.PI;
  const curveHeight = finish ? height * 0.72 : height;
  const points: Point[] = [[width / 2, -20]];

  for (let step = 1; step < 6; step++) {
    const progress = step / 6;
    points.push([
      width / 2 + Math.sin(progress * Math.PI * 2 + phase) * amplitude,
      progress * curveHeight,
    ]);
  }

  if (finish) {
    const endX = width * 0.62;
    const bend = Math.min(12, Math.max(5, width * 0.008));
    points.push(
      [width / 2, curveHeight],
      [width * 0.57, height * 0.78],
      [endX, height * 0.83],
      [endX + bend, height * 0.87],
      [endX - bend, height * 0.9],
      [endX, height * 0.94],
    );
  } else {
    points.push([width / 2, height + 20]);
  }
  return points;
}

// Catmull-Rom through the points, as cubic Béziers: smooth like a hand, no corners.
function toPath(points: Point[]) {
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const clamp = gsap.utils.clamp(0, 1);
// How far down the screen the tip of the line stays as you scroll.
const TIP_SPOT = 0.8;

// A thick line that paints itself down the page as you scroll, in coats: the first
// colour leads and the others follow over it, so the tip is a run of stripes. By
// default it starts in tangles and straightens out, and the page shifts colour as
// it goes. Reduced motion shows the finished line and a single page colour.
export default function ScrollScribblePath({
  children,
  colors = ["#111111", "#1f3bff", "#ff2d95"],
  backgrounds = ["#ffd400", "#ff9ec4", "#9be3ff", "#c6f36b"],
  width = 46,
  trail = 0.035,
  loops = 0.3,
  wander = 1,
  untangle = true,
  seed = 7,
  blend = "multiply",
  smooth = 2,
  scroller,
  className = "",
  heroSelector = "#hero",
  heroWaypoints,
  threadTargetSelector = ".home-thread-target",
  routeThroughTargets = true,
  proceduralSectionSelector = ".home-tone",
}: ScrollScribblePathProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const startRef = useRef<SVGCircleElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const svg = svgRef.current;
      const start = startRef.current;
      const tip = tipRef.current;
      if (!root || !svg || !start || !tip) return;
      const paths = pathRefs.current
        .slice(0, colors.length)
        .filter((p) => p !== null);
      if (!paths.length) return;
      const still = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const paintPage =
        backgrounds.length > 1
          ? gsap.utils.interpolate(backgrounds)
          : () => backgrounds[0] ?? "transparent";
      // `drawn` is how much of the line is out, `page` how far down the page we are.
      const state = { drawn: 0, page: 0 };
      type PathGeometry = ReturnType<typeof MotionPathPlugin.stringToRawPath>;
      let pathGeometry: PathGeometry | undefined;
      let pathData = "";
      let boxSize = "";
      let layoutKey = "";
      let measuredHeight = 0;
      let observedElements: HTMLElement[] = [];
      const positionAt = (geometry: PathGeometry, progress: number) =>
        MotionPathPlugin.getPositionOnPath(geometry, progress) as { x: number; y: number };
      // How low the line has reached by each point along it. Loops double back, so
      // the line's length says little about where its tip is on the page: this
      // lets the scroll ask for a height instead, keeping the tip on screen.
      const SAMPLES = 600;
      const lowest = new Float32Array(SAMPLES + 1);
      const drawnFor = (y: number) => {
        let low = 0;
        let high = SAMPLES;
        while (low < high) {
          const middle = (low + high) >> 1;
          if (lowest[middle] < y) low = middle + 1;
          else high = middle;
        }
        return low / SAMPLES;
      };

      const paint = () => {
        if (!pathGeometry) return;
        // Near the very end the later coats catch up, so the last one finishes.
        const finish =
          trail *
          (paths.length - 1) *
          gsap.utils.clamp(0, 1, (state.page - 0.9) / 0.1);
        const reach = state.drawn + finish;
        paths.forEach((path, i) => {
          const share = clamp(reach - trail * i);
          // Hidden at zero: a round cap on an empty dash would still show as a dot.
          path.style.visibility = share <= 0.0005 ? "hidden" : "visible";
          path.style.strokeDashoffset = String(1 - share);
        });
        const lead = clamp(reach);
        const point = positionAt(pathGeometry, lead);
        tip.setAttribute("cx", String(point.x));
        tip.setAttribute("cy", String(point.y));
        tip.style.visibility = lead <= 0.0005 ? "hidden" : "visible";
        root.style.backgroundColor = paintPage(state.page);
      };

      const draw = () => {
        const boxWidth = root.clientWidth;
        const boxHeight = root.clientHeight;
        if (boxWidth < 2 || boxHeight < 2) return;
        const hero = heroWaypoints && heroWaypoints.length >= 2
          ? root.querySelector<HTMLElement>(heroSelector)
          : null;
        const targets = hero && routeThroughTargets
          ? Array.from(root.querySelectorAll<HTMLElement>(threadTargetSelector))
              .filter((target) => !hero.contains(target))
          : [];
        const sections = hero && !targets.length
          ? Array.from(root.querySelectorAll<HTMLElement>(proceduralSectionSelector))
              .filter((section) => !section.contains(hero))
          : [];
        observedElements = hero ? [hero, ...targets, ...sections] : [];

        const rootBox = hero ? root.getBoundingClientRect() : null;
        const measure = (element: HTMLElement) => {
          const box = element.getBoundingClientRect();
          return {
            left: box.left - (rootBox?.left ?? 0),
            top: box.top - (rootBox?.top ?? 0),
            width: box.width,
            height: box.height,
          };
        };
        const heroBox = hero ? measure(hero) : null;
        const targetBoxes = targets.map(measure);
        const sectionBoxes = sections.map(measure);
        const size = `${boxWidth} ${boxHeight}`;
        const key = JSON.stringify([
          size,
          heroBox && [heroBox.top, heroBox.height],
          targetBoxes,
          sectionBoxes.map(({ top, height }) => [top, height]),
        ]);
        if (key === layoutKey) return false;
        layoutKey = key;
        measuredHeight = boxHeight;
        if (size !== boxSize) {
          svg.setAttribute("viewBox", `0 0 ${size}`);
          boxSize = size;
        }

        let points: Point[];
        if (heroBox && heroWaypoints) {
          const heroTop = heroBox.top;
          const heroHeight = heroBox.height;
          const heroBottom = heroTop + heroHeight;

          // Hero coordinates are percentages (0–100), not fixed pixels.
          const custom: Point[] = heroWaypoints.map(([x, y]) => [
            (x / 100) * boxWidth,
            heroTop + (y / 100) * heroHeight,
          ]);

          if (targetBoxes.length) {
            // Continue the same hand-drawn route through every major title.
            // Each stop gets a loose elliptical orbit, then the line crosses
            // the page toward the following section.
            const routed: Point[] = [...custom];
            let previous = routed[routed.length - 1];

            targetBoxes.forEach(({ left, top, width: targetWidth, height: targetHeight }, index) => {
              const clockwise = index % 2 === 0;
              const centerX = gsap.utils.clamp(
                boxWidth * 0.12,
                boxWidth * 0.88,
                left + targetWidth * (clockwise ? 0.76 : 0.28),
              );
              const centerY = top + targetHeight * 0.5;
              const radiusX = gsap.utils.clamp(
                Math.min(54, boxWidth * 0.12),
                Math.min(210, boxWidth * 0.25),
                targetWidth * 0.2,
              );
              const radiusY = gsap.utils.clamp(42, 130, targetHeight * 0.72);
              const approachX = clockwise
                ? centerX - radiusX * 1.1
                : centerX + radiusX * 1.1;

              routed.push(
                [
                  previous[0] * 0.7 + approachX * 0.3,
                  Math.max(previous[1] + 36, centerY - radiusY * 1.8),
                ],
                [approachX, centerY - radiusY * 0.25],
              );

              const turns = 14;
              for (let step = 0; step <= turns; step++) {
                const progress = step / turns;
                const angle =
                  (clockwise ? 1 : -1) * progress * Math.PI * 2 + Math.PI;
                routed.push([
                  centerX + Math.cos(angle) * radiusX,
                  centerY + Math.sin(angle) * radiusY,
                ]);
              }

              const exitX = clockwise
                ? centerX + radiusX * 0.55
                : centerX - radiusX * 0.55;
              routed.push([exitX, top + targetHeight + radiusY * 0.65]);
              previous = routed[routed.length - 1];
            });

            routed.push(
              [
                previous[0] * 0.7 + boxWidth * 0.5 * 0.3,
                Math.min(boxHeight - 90, previous[1] + 160),
              ],
              [boxWidth * 0.5, boxHeight + 30],
            );
            points = routed;
          } else {
            // Give every section its own deterministic hand-drawn character
            // instead of stretching one repeated motion over the whole page.
            const continuation = sectionBoxes.flatMap(({ top, height }, index) => {
              const sectionHeight = Math.max(100, height);
              const generated = planSimpleSection(
                boxWidth,
                sectionHeight,
                seed,
                index,
                index === sectionBoxes.length - 1,
              );

              return generated.map(([x, y]): Point => [
                x,
                top + y,
              ]);
            });

            // Fall back to one generated continuation if the consumer does
            // not expose section wrappers.
            if (!continuation.length) {
              const remaining = Math.max(100, boxHeight - heroBottom);
              continuation.push(
                ...planSimpleSection(boxWidth, remaining, seed, 0, true).map(
                  ([x, y]): Point => [x, heroBottom + y],
                ),
              );
            }

            points = [...custom, ...continuation];
          }
        } else {
          points = plan(boxWidth, boxHeight, { loops, wander, untangle, seed });
        }

        const d = toPath(points);
        const stroke = Math.max(2, width * Math.min(1, boxWidth / 900));
        paths.forEach((path) => {
          path.setAttribute("stroke-width", String(stroke));
        });
        start.setAttribute("cx", String(points[0][0]));
        start.setAttribute("cy", String(points[0][1]));
        start.setAttribute("r", String(Math.max(3.5, stroke * 1.6)));
        tip.setAttribute("r", String(stroke * 2.1));
        tip.setAttribute("stroke-width", String(Math.max(1.5, stroke * 0.75)));
        if (d !== pathData) {
          pathData = d;
          paths.forEach((path) => path.setAttribute("d", d));
          // Cache distances along the same cubic curves the SVG renders.
          pathGeometry = MotionPathPlugin.cacheRawPathMeasurements(
            MotionPathPlugin.stringToRawPath(d),
            32,
          );
          let low = -Infinity;
          for (let i = 0; i <= SAMPLES; i++) {
            low = Math.max(low, positionAt(pathGeometry, i / SAMPLES).y);
            lowest[i] = low;
          }
        }
        return true;
      };
      draw();

      const viewHeight = () =>
        scroller ? scroller.clientHeight : window.innerHeight;

      const watchLayout = (onResize: () => void) => {
        let frame: number | undefined;
        let observed = new Set<Element>();
        const syncObservers = () => {
          const next = new Set([root, ...observedElements, ...(scroller ? [scroller] : [])]);
          for (const element of observed) {
            if (!next.has(element)) observer.unobserve(element);
          }
          for (const element of next) {
            if (!observed.has(element)) observer.observe(element);
          }
          observed = next;
        };
        let viewportHeight = viewHeight();
        const observer = new ResizeObserver(() => {
          if (frame !== undefined) return;
          frame = requestAnimationFrame(() => {
            frame = undefined;
            const changed = draw();
            syncObservers();
            const nextHeight = viewHeight();
            if (changed || nextHeight !== viewportHeight) onResize();
            viewportHeight = nextHeight;
          });
        });
        syncObservers();
        return () => {
          observer.disconnect();
          if (frame !== undefined) cancelAnimationFrame(frame);
        };
      };

      if (still) {
        state.drawn = state.page = 1;
        const paintStill = () => {
          paint();
          root.style.backgroundColor = backgrounds[0] ?? "transparent";
        };
        paintStill();
        return watchLayout(paintStill);
      }

      // The tip holds a steady spot down the screen, so there's always line in
      // view, and the page opens with some of it already out. A loop is drawn in
      // one go as the tip reaches it, which is what the smoothing is for.
      const drawnAt = (progress: number) => {
        const from = viewHeight() * TIP_SPOT;
        return drawnFor(from + (measuredHeight + 60 - from) * progress);
      };
      state.drawn = 0;
      state.page = 0;
      paint();

      const time = Math.max(smooth, 0.01);

      const toDrawn = gsap.quickTo(state, "drawn", {
        duration: time,
        ease: "power3.out",
        onUpdate: paint,
      });

      const toPage = gsap.quickTo(state, "page", {
        duration: time,
        ease: "power3.out",
        onUpdate: paint,
      });

      let drawnTarget: number | undefined;
      let pageTarget: number | undefined;
      const aim = (progress: number) => {
        const nextDrawn = drawnAt(progress);
        if (nextDrawn !== drawnTarget) {
          drawnTarget = nextDrawn;
          toDrawn(nextDrawn);
        }
        if (progress !== pageTarget) {
          pageTarget = progress;
          toPage(progress);
        }
      };

      // INITIAL ANIMATION — ONLY ON PAGE LOAD / REFRESH
      let introFinished = false;

      const intro = gsap.to(state, {
        drawn: drawnAt(0),
        duration: 4,
        delay: 0.1,
        ease: "power2.inOut",
        onUpdate: paint,
        onComplete: () => {
          introFinished = true;
          aim(scrollTrigger.progress);
        },
      });

      // NORMAL SCROLL ANIMATION
      const scrollTrigger = ScrollTrigger.create({
        trigger: root,
        scroller: scroller ?? undefined,
        start: "top top",
        end: "bottom bottom",

        onUpdate: (self) => {
          if (!introFinished) return;
          aim(self.progress);
        },

        onRefresh: (self) => {
          if (!introFinished) return;
          aim(self.progress);
        },
      });

      const stopWatchingLayout = watchLayout(() => {
        // Keep the existing tween state on the new curve before updating targets.
        paint();
        ScrollTrigger.refresh();
      });

      return () => {
        intro.kill();
        scrollTrigger.kill();
        stopWatchingLayout();
      };
    },
    {
      scope: rootRef,
      dependencies: [
        colors.join(),
        backgrounds.join(),
        width,
        trail,
        loops,
        wander,
        untangle,
        seed,
        smooth,
        scroller,
        heroSelector,
        threadTargetSelector,
        routeThroughTargets,
        proceduralSectionSelector,
        JSON.stringify(heroWaypoints),
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: backgrounds[0] }}
    >
      {children}
      <svg
        ref={svgRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        style={{ mixBlendMode: blend }}
        fill="none"
      >
        {colors.map((color, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            pathLength={1}
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 1"
            strokeDashoffset={1}
          />
        ))}
        <circle ref={startRef} fill={colors[0]} />
        <circle
          ref={tipRef}
          fill="none"
          stroke={colors[0]}
          style={{ visibility: "hidden" }}
        />
      </svg>
    </div>
  );
}
