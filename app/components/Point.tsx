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
      
      style={{
        position: "absolute",
        top: styles.y,
        left: styles.x,
        opacity: styles.opacity,
        width: "15px",
        height: "15px",
        background: "black",
        borderRadius: "50%",
        padding:"0",
        margin:"0"
      }}
    >
       <div>
        {x+","+y}
       </div>
    </animated.div>
    
  );
};

export default Point;
