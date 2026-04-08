/** Portfolio color modes */
export const THEMES = {
  black: {
    id: "black",
    name: "True Black",
    shortLabel: "Dark",
    primary: "#000000",
    accent: "#FFFFFF",
    secondary: "#3B82F6",
    text: "#F9FAFB",
    textMuted: "#9CA3AF",
    surface: "#0A0A0A",
    navBg: "#050505",
    onAccent: "#000000",
  },
  white: {
    id: "white",
    name: "Clean White",
    shortLabel: "Light",
    primary: "#FFFFFF",
    accent: "#2563EB",
    secondary: "#7C3AED",
    text: "#111827",
    textMuted: "#6B7280",
    surface: "#F9FAFB",
    navBg: "#F3F4F6",
    onAccent: "#FFFFFF",
  },
  modernPurple: {
    id: "modernPurple",
    name: "Modern Purple",
    shortLabel: "Purple",
    primary: "#0F172A",
    accent: "#8B5CF6",
    secondary: "#22D3EE",
    text: "#E5E7EB",
    textMuted: "#94A3B8",
    surface: "#111827",
    navBg: "#020617",
    onAccent: "#FFFFFF",
  },
};

export const THEME_TOGGLE_PAIR = ["black", "white"];

const THEME_IDS = Object.keys(THEMES);

function resolvedTogglePair() {
  const a = THEME_TOGGLE_PAIR[0];
  const b = THEME_TOGGLE_PAIR[1];
  const idA = THEME_IDS.includes(a) ? a : "charcoal";
  let idB = THEME_IDS.includes(b) ? b : "whiteBlue";
  if (idB === idA) {
    idB = THEME_IDS.find((id) => id !== idA) || idA;
  }
  return [idA, idB];
}

export const THEME_KEY = "portfolio-color-mode";

/** Other theme in your active pair (for labels / preview). */
export function getOtherThemeId(currentId) {
  const [x, y] = resolvedTogglePair();
  return currentId === x ? y : x;
}

export function normalizeStoredTheme(saved) {
  const [first, second] = resolvedTogglePair();
  if (saved && THEME_IDS.includes(saved)) {
    if (saved === first || saved === second) return saved;
    return first;
  }
  if (saved === "light") return second;
  if (saved === "dark") return first;
  return first;
}

export function applyThemeToDocument(themeId) {
  const t = THEMES[themeId] || THEMES.black;
  const root = document.documentElement;
  root.dataset.theme = themeId;
  root.style.setProperty("--color-bg", t.primary);
  root.style.setProperty("--color-surface", t.surface);
  root.style.setProperty("--color-accent", t.accent);
  root.style.setProperty("--color-secondary", t.secondary);
  root.style.setProperty("--color-text", t.text);
  root.style.setProperty("--color-text-muted", t.textMuted);
  root.style.setProperty("--color-nav-bg", t.navBg);
  root.style.setProperty("--color-on-accent", t.onAccent);
}
