import React from "react";

const Service = () => {
  const skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Git & GitHub",
    "Cloudinary",
    "Socket.io",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Express.js",
    "TypeScript",
    "Next.js",
    "Redux",
    "RTK Query",
    "Redux Toolkit",
    "JWT",
    "OAuth2.0",
    "Vercel",
    "Tailwind CSS",
    "Material UI",
    "React Native",
    "REST API",
    "Redis",
    "Python",
    "Bootstrap",
    "Ant Design",
    "Mongoose",
    "Drizzle ORM",
    "Postman",
    "Razorpay",
    "AWS SES",
    "Google Maps API",
    "HubSpot API",
    "AWS EC2",
    "Nginx",
    "Linux/Ubuntu",
    "Microservices",
    "Ngrok",
    "SSH",
    "RBAC",
    "OTP",
    "Email and Google Login",
    "API Rate Limiting",
    "Prompt Engineering",
    "LLMs",
    "Agentic Workflows",
    "OpenAI",
    "Claude",
  ];

  return (
    <div className="">
      <h2 className="text-2xl sm:text-3xl font-bold text-center pt-9">
        Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-7 mt-8">
        {/* Card 1 */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-md rounded-2xl p-3 sm:p-4 flex items-start gap-3 sm:gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <img
            src="https://res.cloudinary.com/dag0y3zqk/image/upload/v1730894890/Portfolio/man_imvu20.png"
            alt="Full-Stack Web App Development"
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
          />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900">
              Full-Stack Web App Development
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              High-quality development of websites at a professional level.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-md rounded-2xl p-3 sm:p-4 flex items-start gap-3 sm:gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <img
            src="https://res.cloudinary.com/dag0y3zqk/image/upload/v1730894890/Portfolio/man_imvu20.png"
            alt="Mobile Apps"
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
          />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900">
              Mobile App Development (React Native)
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Professional development of applications for Android and iOS.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-md rounded-2xl p-3 sm:p-4 flex items-start gap-3 sm:gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <img
            src="https://res.cloudinary.com/dag0y3zqk/image/upload/v1730894890/Portfolio/man_imvu20.png"
            alt="Backend Development"
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
          />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900">
              Backend Development
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Scalable backend systems engineered for performance and
              reliability.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="w-full max-w-7xl mx-auto px-8 py-10"> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6  py-10">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="px-7 py-6 text-center  text-[var(--color-on-accent)] [background:linear-gradient(90deg,var(--color-accent),var(--color-secondary))] rounded-xl shadow-lg hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 animate-fadeIn whitespace-nowrap"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            {skill}
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Service;
