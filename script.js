const svg = document.getElementById("heartSvg");
const defs = document.getElementById("defs");
const group = document.getElementById("textHeart");

const MESSAGE = "Happy Birthday My Bhatijy";
const REPEAT = `${MESSAGE}     ${MESSAGE}     ${MESSAGE}     ${MESSAGE}     ${MESSAGE}     ${MESSAGE}`;

/* ==================================================
   HEART PATH
   ================================================== */

function heartPath(scale = 1) {
  const pts = [];

  const cx = 250;
  const cy = 255;

  for (let i = 0; i <= 400; i++) {
    const t = (Math.PI * 2 * i) / 400;

    const x = 16 * Math.sin(t) ** 3;

    const y =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);

    pts.push([
      cx + x * 12 * scale,
      cy - y * 12 * scale
    ]);
  }

  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;

  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`;
  }

  return d;
}

/* ==================================================
   CREATE ANIMATION
   ================================================== */

function makeAnimation() {
  const animation = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );

  animation.setAttribute("attributeName", "startOffset");
  animation.setAttribute("from", "0%");
  animation.setAttribute("to", "100%");
  animation.setAttribute("dur", "22s");
  animation.setAttribute("repeatCount", "indefinite");
  animation.setAttribute("calcMode", "linear");

  return animation;
}

/* ==================================================
   BUILD HEART
   ================================================== */

function buildHeart() {
  group.innerHTML = "";

  /* Glow */
  defs.innerHTML = `
    <filter
      id="softGlow"
      x="-30%"
      y="-30%"
      width="160%"
      height="160%"
    >
      <feGaussianBlur
        stdDeviation="0.8"
        result="blur"
      />

      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  `;

  /* One clean moving heart text */

  const pathId = "heartMovingPath";

  const path = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );

  path.setAttribute("id", pathId);
  path.setAttribute("d", heartPath(0.96));
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "none");

  defs.appendChild(path);

  /* Text */

  const text = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );

  text.classList.add("heartText");

  text.setAttribute("dy", "1.5");

  /* Text path */

  const textPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "textPath"
  );

  textPath.setAttribute("href", `#${pathId}`);
  textPath.setAttribute("startOffset", "0%");

  textPath.textContent = REPEAT;

  /* Animation */

  const animation = makeAnimation();

  textPath.appendChild(animation);
  text.appendChild(textPath);
  group.appendChild(text);
}

/* ==================================================
   START HEART
   ================================================== */

buildHeart();

/* ==================================================
   MUSIC
   ================================================== */

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "🔇 Stop Music";
  } else {
    music.pause();
    musicBtn.textContent = "🎵 Play Music";
  }
});