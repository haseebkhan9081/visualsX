"use client";
import { useState,useEffect } from "react";
import Point from "../components/Point";
import Line from "../components/Line";
export default function BruteForce(){

    const [hull, setHull] = useState([
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 0
        }
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
      let pointsArray = [
        {
          x: 90,
          y: 200
        },
        {
          x: 190,
          y: 67
        },
        {
          x: 100,
          y: 80
        },
        {
          x: 180,
          y: 100
        },
        {
          x: 160,
          y: 110
        },
        {
          x: 230,
          y: 200
        },
        {
          x: 290,
          y: 140
        },
      ];
    
      function orientation(p:{x:number,y:number}, q:{x:number,y:number}, r:{x:number,y:number}) {
        const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    
        if (val === 0) return 0; // Collinear points
        return val  ; // Clockwise or counterclockwise
      }
    
      useEffect(() => {
        async function bruteForceConvexHull(points:{x:number,y:number}[]) {
          const n = points.length;
          if (n < 3) return points; // Convex hull is not possible with less than 3 points
    
          let hull: any = [];
    
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
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
                      const angleA = Math.atan2(a.y - Math.min(...hull.map((p:{x:number,y:number}) => p.y)), a.x - Math.min(...hull.map((p:{x:number,y:number}) => p.x)));
                      const angleB = Math.atan2(b.y - Math.min(...hull.map((p:{x:number,y:number}) => p.y)), b.x - Math.min(...hull.map((p:{x:number,y:number}) => p.x)));
                      return angleA - angleB;
                    });
                    
                    // setHull(hull);
                  }
                  if (!hull.includes(points[j])) {
                    hull.push(points[j]);
                    
                    hull.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
                        const angleA = Math.atan2(a.y - Math.min(...hull.map((p:{x:number,y:number}) => p.y)), a.x - Math.min(...hull.map((p:{x:number,y:number}) => p.x)));
                        const angleB = Math.atan2(b.y - Math.min(...hull.map((p:{x:number,y:number}) => p.y)), b.x - Math.min(...hull.map((p:{x:number,y:number}) => p.x)));
                        return angleA - angleB;
                      });
                                       setHull(hull);
                  }
                }
              }
            }
          }
         
          
          hull.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
            const angleA = Math.atan2(a.y - Math.min(...hull.map((p:{x:number,y:number}) => p.y)), a.x - Math.min(...hull.map((p:{x:number,y:number}) => p.x)));
            const angleB = Math.atan2(b.y - Math.min(...hull.map((p:{x:number,y:number}) => p.y)), b.x - Math.min(...hull.map((p:{x:number,y:number}) => p.x)));
            return angleA - angleB;
          });
          setCurrentLine({
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            x3: 0,
            y3: 0
          });                 

          setHull(hull);
        }
        bruteForceConvexHull(pointsArray);
      }, []);
    
      return (
        <div className="App">
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
           
     
          {hull.length > 2 &&
            hull.map((p, index) => {
              return (
                <Line
                  x1={p.x}
                  y1={p.y}
                  x2={hull[(index + 1)%hull.length]?.x}
                  y2={hull[(index + 1)%hull.length]?.y}
                />
              );
            })}
      
          {pointsArray.map((point, index) => (
            <Point key={index} x={point.x} y={point.y} />
          ))}
        </div>
    
      )
}