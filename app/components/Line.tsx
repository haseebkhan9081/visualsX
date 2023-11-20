import React from "react";
import { useSpring, animated, config } from "@react-spring/web";

interface LineProps{
    x1:number;
    x2:number;
    y1:number;
    y2:number
}


const Line:React.FC<LineProps> = ({ x1, y1, x2, y2 }) => {
  const styles = useSpring({
    from: { x1: x1, y1: y1, x2: x1, y2: y1 },
    to: { x1: x1, y1: y1, x2: x2, y2: y2 },
    config: config.default
  });
console.log(`line between (${x1},${y1}) (${x2},${y2})`);
  return (
    <svg style={{ position: 'absolute',top:"5px",left:"5px",zIndex:-1 }} width="1000" height="700">
    <animated.line
      x1={styles.x1}
      y1={styles.y1}
      x2={styles.x2}
      y2={styles.y2}
      stroke="orange"
      strokeWidth="2"
    />
  </svg>
  );
};

export default Line;
