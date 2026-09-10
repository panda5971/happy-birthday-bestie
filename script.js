const defs = document.getElementById("defs");
const group = document.getElementById("textHeart");

const MESSAGE = "Happy Birthday My Bhatijy";

function heartPath() {
  const points = [];

  const cx = 250;
  const cy = 255;

  const scale = 13;

  for (let i = 0; i <= 500; i++) {

    const t = (Math.PI * 2 * i) / 500;

    const x = 16 * Math.sin(t) ** 3;

    const y =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);

    points.push([
      cx + x * scale,
      cy - y * scale
    ]);
  }

  let d =
    `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;

  for (let i = 1; i < points.length; i++) {
    d +=
      ` L ${points[i][0].toFixed(2)} ${points[i][1].toFixed(2)}`;
  }

  return d;
}

function buildHeart() {

  group.innerHTML = "";

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

  const path =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

  path.setAttribute("id", "heartPath");
  path.setAttribute("d", heartPath());
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "none");

  defs.appendChild(path);

  const text =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );

  text.classList.add("heartText");

  const textPath =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "textPath"
    );

  textPath.setAttribute("href", "#heartPath");
  textPath.setAttribute("startOffset", "0%");

  textPath.textContent =
    `${MESSAGE}     ${MESSAGE}     ${MESSAGE}     ${MESSAGE}`;

  const animation =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );

  animation.setAttribute(
    "attributeName",
    "startOffset"
  );

  animation.setAttribute("from", "0%");
  animation.setAttribute("to", "100%");
  animation.setAttribute("dur", "20s");
  animation.setAttribute("repeatCount", "indefinite");
  animation.setAttribute("calcMode", "linear");

  textPath.appendChild(animation);
  text.appendChild(textPath);
  group.appendChild(text);
}

buildHeart();

/* ================= MUSIC ================= */

const music =
  document.getElementById("birthdayMusic");

const musicBtn =
  document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {

  if (music.paused) {

    music.play()
      .then(() => {
        musicBtn.textContent = "🔇 Stop Music";
      })
      .catch(() => {
        musicBtn.textContent = "🎵 Play Music";
      });

  } else {

    music.pause();

    musicBtn.textContent = "🎵 Play Music";
  }
});