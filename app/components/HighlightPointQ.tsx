import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

interface PointProps {
  x: number;
  y: number;
}

const HighlightPointQ: React.FC<PointProps> = ({ x, y }) => {
  const [styles, set] = useSpring(() => ({
    opacity: 0,
    x: 0,
    y: 0,
  }));

  useEffect(() => {
    // Trigger the fade-in animation after the component mounts
    set({ opacity: 1, x, y });
  }, [set, x, y]);

  return (
    <animated.div
      className="circle"
      style={{
        position: "absolute",
        top: y-5,
        left: x-4,
        opacity: styles.opacity,
        width: "25px",
        height: "25px",
        border: "2px solid green",
        borderRadius: "50%",
        boxSizing: "border-box", 
        padding:"0",
        margin:"0"
        // Ensures the border is included in the size
      }}
    >
      {/* <div style={{ color: "red", textAlign: "center" }}>
        {`(${x}, ${y})`}
      </div> */}
    </animated.div>
  );
};

export default HighlightPointQ;
