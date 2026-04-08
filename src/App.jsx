import { useState, createContext, useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Service from "./pages/Service";
import Home from "./pages/Home";
import Contact from "./components/Contact";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Message from "./pages/Message";
import BlogsList from "./pages/BlogsList";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  THEMES,
  THEME_KEY,
  normalizeStoredTheme,
  applyThemeToDocument,
  getOtherThemeId,
} from "./theme";

export const ThemeContext = createContext();

const App = () => {
  const [colorMode, setColorMode] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return normalizeStoredTheme(saved);
    const legacy = localStorage.getItem("portfolio-theme");
    return legacy ? normalizeStoredTheme(legacy) : normalizeStoredTheme(null);
  });

  const theme = useMemo(() => THEMES[colorMode] || THEMES.hacker, [colorMode]);
  const nextThemeId = useMemo(() => getOtherThemeId(colorMode), [colorMode]);
  const nextTheme = useMemo(
    () => THEMES[nextThemeId] || theme,
    [nextThemeId, theme]
  );

  useEffect(() => {
    applyThemeToDocument(colorMode);
    localStorage.setItem(THEME_KEY, colorMode);
  }, [colorMode]);

  const toggleTheme = () => {
    setColorMode((prev) => getOtherThemeId(prev));
  };

  return (
    <>
      <ThemeContext.Provider
        value={{
          colorMode,
          theme,
          nextTheme,
          nextThemeId,
          /** Kept for pages still branching on isDark */
          mode: { isDark: true, themeId: colorMode },
          toggleTheme,
        }}
      >
        <BrowserRouter>
          <Navbar />

          <main
            className="flex-1 flex flex-col transition-colors duration-300"
            style={{
              paddingTop: "var(--navbar-height)",
              paddingBottom: "var(--footer-height)",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
            }}
          >
            <div className="content-between-nav-footer flex-1 w-full flex flex-col min-h-0">
              <div className="flex-1 flex flex-col items-center justify-center min-h-0 w-full">
                <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/service" element={<Service />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/admin-login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/message"
                element={
                  <ProtectedRoute>
                    <Message />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blogsList"
                element={
                  <ProtectedRoute>
                    <BlogsList />
                  </ProtectedRoute>
                }
              />
                </Routes>
              </div>
            </div>
          </main>
          <Footer />
        </BrowserRouter>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
