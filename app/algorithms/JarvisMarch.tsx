"use client";
import Line from "../components/Line";
import Point from "../components/Point";
import { useEffect, useState } from "react";
const JarvisMarch=()=>{
const [isRunning,setIsRunning]=useState(false);
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
        {
            x: 390,
            y: 240
          },
          {
            x: 290,
            y: 40
          },
      ];
      function orientation(p:{x:number,y:number}, q:{x:number,y:number}, r:{x:number,y:number}) 
      { 
          let val = (q.y - p.y) * (r.x - q.x) - 
                        (q.x - p.x) * (r.y - q.y); 
               
              if (val == 0) return 0;  // collinear 
              return (val > 0)? 1: 2; // clock or counterclock wise 
      }
useEffect( ()=>{
    
   async function convexHull(points:{x:number,y:number}[], n:number) 
    { setIsRunning(true);
        // There must be at least 3 points 
            if (n < 3) return; 
             
            // Initialize Result 
            let hull = []; 
             
            // Find the leftmost point 
            let l = 0; 
            for (let i = 1; i < n; i++) 
                if (points[i].x < points[l].x) 
                    l = i; 
             
            // Start from leftmost point, keep moving  
            // counterclockwise until reach the start point 
            // again. This loop runs O(h) times where h is 
            // number of points in result or output. 
            let p = l, q; 
            do
            { 
              
                // Add current point to result 
                hull.push(points[p]); 
                setHull(hull);
                // Search for a point 'q' such that  
                // orientation(p, q, x) is counterclockwise  
                // for all points 'x'. The idea is to keep  
                // track of last visited most counterclock- 
                // wise point in q. If any point 'i' is more  
                // counterclock-wise than q, then update q. 
                q = (p + 1) % n; 
                    
                for (let i = 0; i < n; i++) 
                { 
                   // If i is more counterclockwise than  
                   // current q, then update q 
                   setCurrentLine({
                    x1: points[p].x,
                    y1: points[p].y,
                    x2: points[i].x,
                    y2: points[i].y,
                    x3: points[q].x,
                    y3: points[q].y
                  });
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                   if (orientation(points[p], points[i], points[q])==2) 
                       q = i; 
                } 
             
                // Now q is the most counterclockwise with 
                // respect to p. Set p as q for next iteration,  
                // so that q is added to result 'hull' 
                p = q; 
             
            } while (p != l);  // While we don't come to first  
                               // point 
             
  console.log("Convex Hull",hull);
  setIsRunning(false);
                
              setHull(hull);
       }  
       convexHull(pointsArray,pointsArray.length);

},[])


 return (
    <div>
 
{isRunning && (
    <>
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
 );   
}
export default JarvisMarch;