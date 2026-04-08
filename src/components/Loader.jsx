import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center text-center p-4">
      <div className="flex flex-col items-center w-full max-w-lg">
        <img
          src="https://res.cloudinary.com/dag0y3zqk/image/upload/v1730894890/Portfolio/man_imvu20.png"
          alt="Mobile Apps"
          className="w-3/4 max-w-xs sm:w-1/2 mb-3 object-cover"
        />
        <div className="relative w-full h-2 bg-gray-300 overflow-hidden rounded-2xl">
          <div
            className="absolute top-0 left-[-20%] h-2 bg-sky-400 rounded-2xl"
            style={{
              width: "20%",
              animation: "bluebar 1.5s infinite ease",
            }}
          ></div>
        </div>
      </div>
      <style>
        {`@keyframes bluebar { 0%, 100% { left: -20%; } 50% { left: 100%; } }`}
      </style>
    </div>
  );
};

export default Loader;
