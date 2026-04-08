import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import { useEffect } from "react";
import { Collapse } from "antd";
import { useGetAllBlogsQuery } from "../redux/adminApi";
import Loader from "../components/Loader";

const Blogs = () => {
  const {
    data: dataBlog,
    isLoading: isLoadingBlog,
  } = useGetAllBlogsQuery();

  useEffect(() => {
    document.title = "Portfolio - Blogs";
    return () => {
      document.title;
    };
  }, []);

  if (isLoadingBlog) {
    return (
      <div className="flex justify-center items-center min-h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1
        className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8"
        style={{ color: "var(--color-text)" }}
      >
        Blogs
      </h1>
      <div className="w-full px-2 sm:px-4 py-4 sm:py-6">
        <Swiper
          loop={dataBlog && dataBlog.length > 1}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          freeMode
          modules={[FreeMode, Autoplay]}
          className="mySwiper w-full"
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 12 },
            640: { slidesPerView: 1.2, spaceBetween: 14 },
            768: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {dataBlog &&
            dataBlog.map((item) => (
              <SwiperSlide
                key={item.id}
                className="flex items-stretch justify-center"
              >
                <div className="w-full max-w-[450px] theme-surface rounded-lg overflow-hidden flex flex-col h-full">
                  <img
                    className="w-full h-44 sm:h-48 object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="flex flex-col flex-1">
                    <Collapse
                      ghost
                      bordered={false}
                      expandIconPosition="end"
                      items={[
                        {
                          key: "1",
                          label: (
                            <div
                              className="text-base sm:text-lg font-bold"
                              style={{ color: "var(--color-text)" }}
                            >
                              {item.title}
                            </div>
                          ),
                          children: (
                            <div className="flex flex-col gap-3">
                              <p className="text-sm sm:text-base leading-relaxed p-2 sm:p-3 theme-text-muted">
                                {item.desc}
                              </p>
                              {(item.gitLink || item.hostLink) && (
                                <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:justify-between">
                                  {item.gitLink && (
                                    <a
                                      href={item.gitLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-2 rounded-md font-medium transition-opacity hover:opacity-90 text-center text-sm sm:text-base"
                                      style={{
                                        backgroundColor: "var(--color-surface)",
                                        color: "var(--color-accent)",
                                        border:
                                          "1px solid color-mix(in srgb, var(--color-accent) 50%, transparent)",
                                      }}
                                    >
                                      Git Link
                                    </a>
                                  )}
                                  {item.hostLink && (
                                    <a
                                      href={item.hostLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-2 rounded-md font-medium transition-opacity hover:opacity-90 text-center text-sm sm:text-base"
                                      style={{
                                        backgroundColor: "var(--color-accent)",
                                        color: "var(--color-on-accent)",
                                      }}
                                    >
                                      Read More
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          ),
                        },
                      ]}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Blogs;
