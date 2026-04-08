import { Button, Dropdown } from "antd";
import { Link } from "react-router-dom";

const Footer = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          style={{ color: "var(--color-text)" }}
        >
          Twitter
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
          style={{ color: "var(--color-text)" }}
        >
          Linkedin logo
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
          style={{ color: "var(--color-text)" }}
        >
          insta logo
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
          style={{ color: "var(--color-text)" }}
        >
          reddit
        </a>
      ),
    },
  ];

  const surfaceStyle = {
    backgroundColor: "var(--color-surface)",
    color: "var(--color-text)",
    border:
      "1px solid color-mix(in srgb, var(--color-accent) 35%, transparent)",
  };

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 w-full z-10 border-t-2 transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-nav-bg)",
        borderColor: "var(--color-accent)",
      }}
    >
      <div
        className="font-medium text-sm sm:text-base py-1 text-center"
        style={{ color: "var(--color-text)" }}
      >
        <Link to="/admin-login" className="underline hover:text-blue-500">
          ©
        </Link>{" "}
        {new Date().getFullYear()} Akshay Teltumbade. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
