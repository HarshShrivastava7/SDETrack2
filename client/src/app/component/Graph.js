import React, { useState, useEffect, useContext, useRef } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import { Progress } from "rsuite";
import CornerImg from "../../media/Corner.png";
import "./styles.css";

const Graph = () => {
  const boxRefs = useRef([]);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [progressValues, setProgressValues] = useState([
    { percent: 20, status: "2014" },
    { percent: 40, status: "2015" },
    { percent: 60, status: "2016" },
    { percent: 80, status: "2017" },
    { percent: 100, status: "2018" },
    { percent: 90, status: "2019" },
    { percent: 70, status: "2020" },
    { percent: 50, status: "2021" },
    { percent: 20, status: "2022" },
    { percent: 10, status: "2023" },
  ]);

  useEffect(() => {
    // Define a cleanup function to add and remove event listeners
    const addMouseEvents = (index) => {
      const ref = boxRefs.current[index];
      if (ref) {
        const innerPart = ref.querySelector(".rs-progress-line-bg");
        console.log(innerPart)

        // Check if the ref is valid
        if (innerPart) {
          // Define event handlers
          const handleMouseEnter = () => setHoveredElement(index);
          const handleMouseLeave = () => setHoveredElement(null);

          // Add event listeners
          innerPart.addEventListener("mouseenter", handleMouseEnter);
          innerPart.addEventListener("mouseleave", handleMouseLeave);

          // Return a cleanup function
          return () => {
            innerPart.removeEventListener("mouseenter", handleMouseEnter);
            innerPart.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      }
    };

    // Add event listeners for each box and store cleanup functions
    const cleanupFns = progressValues.map((_, index) => addMouseEvents(index));

    // Cleanup all event listeners when component unmounts
    return () => cleanupFns.forEach((fn) => fn && fn());
  }, [progressValues]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e7e7e7",
        margin: "20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              margin: "20px 0 20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                cursor: "pointer",
                borderRadius: "25px",
                padding: "5px",
                boxShadow: "inset 1px -1px 20px 0px #a0a0a0",
              }}
            >
              {" "}
              Stock Price
            </div>
            <div
              style={{
                display: "inline-block",
                cursor: "pointer",
                borderRadius: "25px",
                padding: "5px",
                boxShadow: "inset 1px -1px 20px 0px #a0a0a0",
              }}
            >
              {" "}
              Market Share
            </div>
            <div
              style={{
                display: "inline-block",
                cursor: "pointer",
                borderRadius: "25px",
                padding: "5px",
                boxShadow: "inset 1px -1px 20px 0px #a0a0a0",
              }}
            >
              {" "}
              Revenue
            </div>
            <div
              style={{
                display: "inline-block",
                cursor: "pointer",
                borderRadius: "25px",
                padding: "5px",
                boxShadow: "inset 1px -1px 20px 0px #a0a0a0",
              }}
            >
              {" "}
              Expense
            </div>
          </div>
        </div>
        <div
          style={{
            width: "400px",
            height: "230px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {progressValues.map((item, index) => (
            <>
              <div key={index} style={{ position: "relative" }}>
                <Progress.Line
                  ref={(el) => (boxRefs.current[index] = el)}
                  vertical
                  style={{
                    width: "40px",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                  percent={item.percent}
                  status="active"
                />
                <div
                  style={{ width: "40px", textAlign: "center" }}
                  className="rs-progress-info-status"
                >
                  {index + 2014}
                </div>
                <div
                  className="percentage-viewer"
                  style={{
                    left: "-20px",
                    bottom: `${
                      2 * item.percent +
                      (item.percent < 60 ? 25 : item.percent < 90 ? 18 : 15)
                    }px`,
                    zIndex: "5",
                    position: "absolute",
                    display: hoveredElement === index ? "flex" : "none",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "20px",
                      borderRadius: "10px",
                      backgroundColor: "#EA8E8C",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: "10px",
                        display: "flex",
                        alignItems: "center",
                        color: "#292929",
                        fontSize: "13px",
                        fontFamily: "cursive",
                      }}
                    >
                      {item.percent}%
                    </div>
                  </div>
                  <div style={{ width: "5px", height: "5px", display: "flex" }}>
                    <img
                      src={CornerImg}
                      alt="corner"
                      height="100%"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Graph;
