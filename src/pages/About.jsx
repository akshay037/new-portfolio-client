import React, { useContext, useEffect } from "react";
import { useGetAboutQuery } from "../redux/adminApi";
import Loader from "../components/Loader";

const About = () => {
  const { data: dataAbout, isLoading: isLoadingAbout } = useGetAboutQuery();

  useEffect(() => {
    document.title = "Portfolio - About";
    return () => {
      document.title;
    };
  }, []);

  if (isLoadingAbout) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section className="px-4 sm:px-6 lg:px-10 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-16">
          {/* Image and bio */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 flex flex-col justify-center">
            <div className="flex justify-center mt-6 lg:mt-0 mb-6 lg:mb-10">
              <img
                src={dataAbout[0].image}
                alt="Profile Photo"
                className="w-full max-w-xs h-56 sm:h-64 lg:w-64 lg:h-64 object-cover rounded-xl shadow-md"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
              MERN Stack Developer
            </h1>

            <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base px-2">
              {dataAbout[0].about}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="p-2 min-w-[100px] text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
                  {dataAbout[0].experience}+
                </h3>
                <p className="text-sm text-gray-700">Years of Experience</p>
              </div>

              <div className="p-2 min-w-[100px] text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
                  {dataAbout[0].projects}+
                </h3>
                <p className="text-sm text-gray-700">Completed Projects</p>
              </div>

              <div className="p-2 min-w-[100px] text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
                  {dataAbout[0].companies}+
                </h3>
                <p className="text-sm text-gray-700">Companies Worked</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="lg:w-1/2 flex flex-col mt-6 lg:mt-0">
            <div>
              {dataAbout &&
                dataAbout[0]?.companyList.map((item) => (
                  <div
                    key={item.companyName}
                    className="border-b my-3 flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3"
                  >
                    <img
                      src={item.logo}
                      alt="Company Logo"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-xl transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                    />

                    <div className="flex-1 text-center sm:text-left">
                      <div className="mb-2 font-semibold text-base sm:text-lg">
                        {item.companyName}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mb-2 text-sm">
                        <div>{item.role}</div>
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline text-gray-500 break-all"
                        >
                          {item.website}
                        </a>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mb-2 text-sm">
                        <div>{item.experience} of experience</div>
                        <div>{item.workingDate}</div>
                      </div>

                      <div className="text-sm text-gray-600">
                        {item.detailsOfCompany}
                      </div>
                    </div>
                  </div>
                ))}

              <div className="text-right text-xs cursor-pointer hover:underline mt-2">
                More ...
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
