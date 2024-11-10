import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";
import Slider from "react-slick";
import Card from "../../components/Card/Card";
import FetchAllCourses from "../../services/FetchAllCourses";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EmployerHome: React.FC = () => {
  const [courseChunks, setCourseChunks] = useState<any[][]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const fetchedCourses = await FetchAllCourses(accessToken);

        // Split courses into chunks of 5
        const chunkSize = 5;
        const chunks = [];
        for (
          let i = 0;
          i < fetchedCourses.length && i < chunkSize * 3;
          i += chunkSize
        ) {
          chunks.push(fetchedCourses.slice(i, i + chunkSize));
        }
        setCourseChunks(chunks);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <ChakraProvider>
      <NavbarEmployer />
      <div style={{ padding: "20px" }}>
        <Slider {...sliderSettings}>
          {courseChunks.map((chunk, index) => (
            <div key={index} className="course-slide">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {chunk.map((course, courseIndex) => (
                  <Card
                    key={courseIndex}
                    title={course.title}
                    description={course.objective}
                    link={course.url}
                  />
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </ChakraProvider>
  );
};

export default EmployerHome;
