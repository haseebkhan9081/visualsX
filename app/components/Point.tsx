import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
interface PointProps{
    x:number;
    y:number;
}
const Point:React.FC<PointProps> =
 ({ x, y }
    ) => {
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
      className="dot"
      style={{
        position: "absolute",
        top: styles.y,
        left: styles.x,
        opacity: styles.opacity,
        width: "13px",
        height: "13px",
        background: "black",
        borderRadius: "50%"
      }}
    >
      {/* <div style={{ color: "red", textAlign: "center" }}>
        {`(${x}, ${y})`}
      </div> */}
    </animated.div>
  );
};

export default Point;
