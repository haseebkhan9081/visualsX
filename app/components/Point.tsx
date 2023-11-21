import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

interface PointProps {
  x: number;
  y: number;
  number: number;
}

const Point: React.FC<PointProps> = ({ x, y, number }) => {
  const [styles, set] = useSpring(() => ({
    opacity: 0,
    x: 0,
    y: 0
  }));

  useEffect(() => {
    // Trigger the fade-in animation after the component mounts
    set({ opacity: 1, x, y });
  }, [set, x, y]);

  return (
    <animated.div
      style={{
        position: "absolute",
        top: styles.y,
        left: styles.x,
        opacity: styles.opacity,
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        fontSize: "10px",
        fontWeight: "bold",
        border: "2px solid black",
        padding: "0",
        margin: "0",
        backgroundColor: "lightyellow"
      }}
    >
      {number}
    </animated.div>
  );
};

export default Point;
