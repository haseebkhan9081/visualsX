import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

interface PointProps {
  x: number;
  y: number;
}

const HighlightPointP: React.FC<PointProps> = ({ x, y }) => {
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
        top: y-2,
        left: x-2,
        opacity: styles.opacity,
        width: "35px",
        height: "35px",
        border: "2px solid red",
        borderRadius: "50%",
        boxSizing: "border-box", 
        padding:"0",
        margin:"0",
        right:"0",
        bottom:"0"
        
        // Ensures the border is included in the size
      }}
    >
      {/* <div style={{ color: "red", textAlign: "center" }}>
        {`(${x}, ${y})`}
      </div> */}
    </animated.div>
  );
};

export default HighlightPointP;
