import { useEffect } from "react";
import Type from "../components/Type";
import SpaceBackground from "../components/SpaceBackground";
import akshay_resume from "../assets/Akshay_Teltumbade_Fullstack.pdf";

import {
  GithubOutlined,
  LinkedinOutlined,
  XOutlined,
  InstagramOutlined,
  RedditOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const Home = () => {
  const TITLE = "Hi, I'm Akshay Teltumbade";

  const icons = [
    <a
      key="github"
      href="https://github.com/akshay037"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GithubOutlined style={{ fontSize: "20px" }} />
    </a>,
    <a
      key="linkedin"
      href="https://www.linkedin.com/in/akshay037"
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkedinOutlined style={{ fontSize: "20px" }} />
    </a>,
    <a
      href="https://x.com/akshay__037"
      target="_blank"
      rel="noopener noreferrer"
    >
      <XOutlined style={{ fontSize: "20px" }} />
    </a>,
    <a
      key="instagram"
      href="https://www.instagram.com/akshay__037/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <InstagramOutlined style={{ fontSize: "20px" }} />
    </a>,
    <a
      key="reddit"
      href="https://www.reddit.com/user/akshay037"
      target="_blank"
      rel="noopener noreferrer"
    >
      <RedditOutlined style={{ fontSize: "20px" }} />
    </a>,
  ];

  useEffect(() => {
    document.title = "Portfolio";
  }, []);

  return (
    <section className="relative flex min-h-0 w-full min-w-full max-w-none flex-1 flex-col items-center justify-center self-stretch overflow-hidden px-4 py-8">
      <SpaceBackground />
      <div className="relative z-10 w-full max-w-4xl text-center rounded-2xl px-4 py-6 sm:px-8 sm:py-8 backdrop-blur-[2px]">
        {/* Title */}
        <h1
          className="text-3xl sm:text-5xl xl:text-6xl font-bold tracking-tighter"
          style={{
            color: "var(--color-text)",
            textShadow:
              "0 1px 2px color-mix(in srgb, var(--color-bg) 45%, transparent)",
          }}
        >
          {TITLE}
        </h1>

        {/* Type Animation */}
        <div
          className="text-xl sm:text-3xl xl:text-4xl tracking-tighter my-4"
          style={{
            color: "var(--color-text)",
            textShadow:
              "0 1px 2px color-mix(in srgb, var(--color-bg) 40%, transparent)",
          }}
        >
          <Type />
        </div>

        {/* Description */}
        <p
          className="text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-6"
          style={{ color: "var(--color-text-muted)" }}
        >
          Full-stack developer passionate about building modern solutions and
          driving growth. Let’s create something impactful together.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          {/* GitHub */}
          <a
            href="https://github.com/akshay037"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-on-accent)",
            }}
            className="w-full sm:w-[45%] md:w-[30%] [background:linear-gradient(270deg,var(--color-accent),var(--color-secondary))] text-center py-2 px-6 rounded-lg"
          >
            Get in Touch
          </a>

          {/* Resume */}
          <a
            href={akshay_resume}
            download
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-on-accent)",
            }}
            className="w-full sm:w-[45%]  md:w-[30%] [background:linear-gradient(90deg,var(--color-accent),var(--color-secondary))] text-center py-2 px-6 rounded-lg"
          >
            <DownloadOutlined style={{ fontSize: "20px" }} /> Download CV
          </a>
        </div>
        <div className="flex items-center justify-center gap-3 py-3">
          {icons.map((icon) => (
            <div
              key={icon.key}
              className={`flex items-center justify-center w-12 h-12 bg-(--color-accent)  text-[var(--color-on-accent)]  rounded-full cursor-pointer transition-all`}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
