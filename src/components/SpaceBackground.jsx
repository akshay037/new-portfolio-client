import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { ThemeContext } from "../App";

/** Soft circular sprite; without a map, GL points are squares. */
function createStarPointTexture(size = 64) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const cx = size / 2;
  const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.65)");
  grad.addColorStop(0.7, "rgba(255,255,255,0.15)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function buildStarLayer(count, spread, size, color, opacity, spriteMap) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const c = color instanceof THREE.Color ? color : new THREE.Color(color);
  const material = new THREE.PointsMaterial({
    map: spriteMap,
    color: c,
    size,
    transparent: true,
    opacity,
    sizeAttenuation: true,
    depthWrite: false,
  });
  return new THREE.Points(geometry, material);
}

/** Relative luminance of sRGB color in linear space (0–1). */
function isLightTheme(primaryHex) {
  const col = new THREE.Color(primaryHex);
  const [r, g, b] = [col.r, col.g, col.b].map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.55;
}

function spacePaletteFromTheme(theme) {
  const primary = new THREE.Color(theme.primary);
  const surface = new THREE.Color(theme.surface);
  const accent = new THREE.Color(theme.accent);
  const textMuted = new THREE.Color(theme.textMuted);

  const light = isLightTheme(theme.primary);

  const background = new THREE.Color();
  const fogColor = new THREE.Color();

  // ✅ LIGHT THEME FIX (white theme)
  if (light) {
    // ✅ Use EXACT theme color (no tint)
    background.set(theme.primary); // "#FFFFFF"
    fogColor.set(theme.primary);
  } else {
    // black & modernPurple
    const deep = new THREE.Color(0x0a0a18);

    background.copy(primary).lerp(surface, 0.5).lerp(deep, 0.22);

    fogColor.copy(background);
  }

  let distantColor;
  let brightColor;
  let dustColor;
  let distantOp;
  let brightOp;
  let dustOp;
  let fogDensity;

  const white = new THREE.Color(0xffffff);

  if (light) {
    // ✅ Stars darker for contrast on light bg
    fogDensity = 0.0001;

    const slate = new THREE.Color(0x0f172a);
    const slateMid = new THREE.Color(0x1e293b);

    distantColor = slateMid.clone().lerp(accent, 0.2);
    brightColor = slate.clone().lerp(accent, 0.35);
    dustColor = textMuted.clone().lerp(slate, 0.35);

    distantOp = 0.85;
    brightOp = 1;
    dustOp = 0.6;
  } else {
    // ✅ Dark themes (black + modernPurple)
    fogDensity = 0.00024;

    const pale = new THREE.Color(0xd8e4f0);

    distantColor = pale.clone().lerp(accent, 0.15);
    brightColor = white.clone().lerp(accent, 0.25);
    dustColor = accent.clone().lerp(white, 0.55);

    distantOp = 0.8;
    brightOp = 1;
    dustOp = 0.62;
  }

  return {
    background,
    fogColor,
    fogDensity,
    distantColor,
    brightColor,
    dustColor,
    distantOp,
    brightOp,
    dustOp,
  };
}

function applyPalette(scene, distant, bright, dust, theme) {
  const p = spacePaletteFromTheme(theme);
  scene.background.copy(p.background);
  if (scene.fog instanceof THREE.FogExp2) {
    scene.fog.color.copy(p.fogColor);
    scene.fog.density = p.fogDensity;
  }
  distant.material.color.copy(p.distantColor);
  distant.material.opacity = p.distantOp;
  bright.material.color.copy(p.brightColor);
  bright.material.opacity = p.brightOp;
  dust.material.color.copy(p.dustColor);
  dust.material.opacity = p.dustOp;
}

/**
 * Three.js starfield driven by ThemeContext. Place inside a `relative` parent
 * that spans the width you want (e.g. self-stretch under items-center).
 */
const SpaceBackground = () => {
  const { theme } = useContext(ThemeContext);
  const mountRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const ctxRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const p = spacePaletteFromTheme(themeRef.current);
    const starSprite = createStarPointTexture();

    const scene = new THREE.Scene();
    scene.background = p.background.clone();
    scene.fog = new THREE.FogExp2(p.fogColor.clone(), p.fogDensity);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 4000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    mount.appendChild(canvas);

    const distant = buildStarLayer(
      28000,
      28000,
      1.2,
      p.distantColor,
      p.distantOp,
      starSprite,
    );
    const bright = buildStarLayer(
      12000,
      2200,
      1.8,
      p.brightColor,
      p.brightOp,
      starSprite,
    );
    const dust = buildStarLayer(
      28000,
      14000,
      0.9,
      p.dustColor,
      p.dustOp,
      starSprite,
    );
    scene.add(distant, bright, dust);

    const setSize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, true);
    };

    setSize();
    let alive = true;
    requestAnimationFrame(() => {
      if (!alive) return;
      setSize();
      requestAnimationFrame(() => {
        if (!alive) return;
        setSize();
      });
    });

    const onWindowResize = () => setSize();
    window.addEventListener("resize", onWindowResize);
    const ro = new ResizeObserver(setSize);
    ro.observe(mount);

    ctxRef.current = { scene, camera, renderer, distant, bright, dust, mount };

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      distant.rotation.y += 0.00006;
      distant.rotation.x += 0.00002;
      bright.rotation.y += 0.0001;
      bright.rotation.x += 0.00003;
      dust.rotation.y -= 0.00004;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ctxRef.current = null;
      window.removeEventListener("resize", onWindowResize);
      ro.disconnect();
      [distant, bright, dust].forEach((points) => {
        points.material.map = null;
        points.geometry.dispose();
        points.material.dispose();
      });
      starSprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!theme) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    applyPalette(ctx.scene, ctx.distant, ctx.bright, ctx.dust, theme);
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0 box-border h-full min-h-full w-full min-w-full max-w-none overflow-hidden"
      aria-hidden
    />
  );
};

export default SpaceBackground;
