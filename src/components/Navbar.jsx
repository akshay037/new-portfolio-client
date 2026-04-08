import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../App";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, nextTheme, toggleTheme } = useContext(ThemeContext);

  const routes = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/service", name: "Service" },
    { path: "/projects", name: "Projects" },
    { path: "/blogs", name: "Blogs" },
    { path: "/contact", name: "Contact" },
    // { path: "/admin-login", name: "Login" },
    // { path: "/dashboard", name: "Dashboard" },
  ];

  return (
    <>
      <nav
        className="fixed w-full z-10 top-0 start-0 border-b-2 transition-colors duration-300"
        style={{
          backgroundColor: "var(--color-nav-bg)",
          borderColor: "var(--color-accent)",
        }}
      >
        <div className="w-full p-4 flex justify-between items-center relative">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-10"
              alt="Flowbite Logo"
            />
          </a>
          {/* Desktop menu (always visible on larger screens) */}
          <div className="hidden md:flex space-x-4">
            {routes.map(({ path, name }) => (
              <Link
                key={path}
                to={path}
                className={`py-2 px-3 rounded-md font-medium transition-colors ${
                  location.pathname === path
                    ? "font-semibold"
                    : "opacity-90 hover:opacity-100"
                }`}
                style={
                  location.pathname === path
                    ? {
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-on-accent)",
                      }
                    : {
                        color: "var(--color-text)",
                        backgroundColor: "transparent",
                      }
                }
                aria-current={location.pathname === path ? "page" : undefined}
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden absolute left-0 w-full top-full mt-0 backdrop-blur-md border-b-2 ${
              isOpen ? "block" : "hidden"
            }`}
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-nav-bg) 92%, transparent)",
              borderColor: "var(--color-accent)",
            }}
          >
            <ul className="flex flex-col font-medium space-y-2 p-2">
              {routes.map(({ path, name }, index) => (
                <li key={path} className="relative">
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`block w-full py-2 px-3 rounded-md font-medium ${
                      location.pathname === path ? "font-semibold" : ""
                    }`}
                    style={
                      location.pathname === path
                        ? {
                            backgroundColor: "var(--color-accent)",
                            color: "var(--color-on-accent)",
                          }
                        : { color: "var(--color-text)" }
                    }
                  >
                    {name}
                  </Link>

                  {/* Close button only for the FIRST item */}
                  {index === 0 && (
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded"
                      style={{ color: "var(--color-accent)" }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          d="M6 6l12 12M6 18L18 6"
                        />
                      </svg>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Dark mode button and Hamburger menu */}
          <div className="flex items-center md:order-2 gap-2 md:gap-3 rtl:space-x-reverse">
            <button
              type="button"
              onClick={toggleTheme}
              title={`Current: ${theme.name}. Switch to ${nextTheme.name}`}
              className="font-semibold text-xs sm:text-sm px-3 py-2 rounded-md border-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-on-accent)",
                borderColor: "var(--color-accent)",
                boxShadow: `0 0 16px color-mix(in srgb, var(--color-accent) 45%, transparent)`,
              }}
            >
              {console.log(theme)}
              {/* {theme.id == "black"?"black":"white"} */}
              <span className="hidden sm:inline">{theme.shortLabel}</span>
              <span className="sm:hidden">{theme.shortLabel[0]}</span>
              <span className="opacity-80 mx-0.5">→</span>
              <span className="font-normal">{nextTheme.shortLabel}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-md md:hidden transition-colors"
              style={{
                color: "var(--color-accent)",
                border:
                  "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
              }}
              aria-controls="navbar-sticky"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
