"use client";
import { useState,useEffect } from "react";
import Point from "../components/Point";
import Line from "../components/Line";
import HighlightPointP from "../components/HighlightPointP";
import HighlightPointQ from "../components/HighlightPointQ";
import PointType from "@/app/types/Point";
interface BruteForceProps{
  array:PointType[];
  }

 const BruteForce:React.FC<BruteForceProps>=(
{
  array
}
 )=>{

  const [isComplete,setIsComplete]=useState(false);
  const [pointP,setPointP]=useState<{x:number,y:number}>();
  const [pointQ,setPointQ]=useState<{x:number,y:number}>();
const [isRunning,setIsRunning]=useState(false);
    const [hull, setHull] = useState<{x:number,y:number}[]>([
         
      ]);
      const [currentLine, setCurrentLine] = useState({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        x3: 0,
        y3: 0
      });
    
      const generatePoints = () => {
        const points = [];
        for (let i = 0; i < 3; i++) {
          points.push({ x: Math.random() * 400, y: Math.random() * 200 });
        }
        return points;
      };
      let pointsArray = array;
    pointsArray.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
      if (a.x !== b.x) {
          return a.x - b.x;
      } else {
          return a.y - b.y;
      }
    })
      function orientation(p:{x:number,y:number}, q:{x:number,y:number}, r:{x:number,y:number}) {
        const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    
        if (val === 0) return 0; // Collinear points
        return val  ; // Clockwise or counterclockwise
      }
    
      useEffect(() => {
        async function bruteForceConvexHull(points:{x:number,y:number}[]) {
          setIsRunning(true);
          const n = points.length;
          if (n < 3) return points; // Convex hull is not possible with less than 3 points
    
          let hull: any = [];
    
          for (let i = 0; i < n; i++) {
            setPointP(points[i]);
            for (let j = 0; j < n; j++) {
              setPointQ(points[j]);
              if (i !== j) {
                let valid = true;
                for (let k = 0; k < n; k++) {
                  if (k !== i && k !== j) {
                    const orient = orientation(points[i], points[j], points[k]);
                    setCurrentLine({
                      x1: points[i].x,
                      y1: points[i].y,
                      x2: points[j].x,
                      y2: points[j].y,
                      x3: points[k].x,
                      y3: points[k].y
                    });
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    if (orient <= 0  ) {
                      valid = false;
                      break;
                    }
                  }
                }
                if (valid) {
                  if (!hull.includes(points[i])) {
                    hull.push(points[i]);
                     
                    hull.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
                      if (a.x !== b.x) {
                          return a.x - b.x;
                      } else {
                          return a.y - b.y;
                      }
                    })
                     setHull(hull);
                  }
                  if (!hull.includes(points[j])) {
                    hull.push(points[j]);
                    hull.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
                      if (a.x !== b.x) {
                          return a.x - b.x;
                      } else {
                          return a.y - b.y;
                      }
                    })
                                       setHull(hull);
                  }
                }
              }
            }
          }
         
           setIsRunning(false);
           setIsComplete(true);     
           console.log(hull);            
hull.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
  if (a.x !== b.x) {
      return a.x - b.x;
  } else {
      return a.y - b.y;
  }
})
          setHull(hull);
        }
        bruteForceConvexHull(pointsArray);
      }, [pointsArray]);
    
      return (
        <div>
 
        {isRunning && (
            <>
            
            <HighlightPointP
            x={pointP?.x||0}
            y={pointP?.y||0}
            />
            <HighlightPointQ
            x={pointQ?.x||0}
            y={pointQ?.y||0}
            />
            <Line
            x1={currentLine.x1}
            y1={currentLine.y1}
            x2={currentLine.x2}
            y2={currentLine.y2}
          />
        
          <Line
            x1={currentLine.x2}
            y1={currentLine.y2}
            x2={currentLine.x3}
            y2={currentLine.y3}
          />
          
           </>
        
        )}
            { hull.length>1 && hull.map((p, index) => {
                      return (
                        <Line
                        key={index}
                          x1={p.x}
                          y1={p.y}
                          x2={hull[isComplete?(index + 1)%hull.length:index+1]?.x}
                          y2={hull[isComplete?(index + 1)%hull.length:index+1]?.y}
                        />
                      );
                    })}
            
         
        {pointsArray.map((point, index) => (
                     <Point   key={index} x={point.x} y={point.y} />
                     
                             ))}
        
        </div>  
      )
}

export default BruteForce;