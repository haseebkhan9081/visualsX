"use client";
import HighlightPointP from "../components/HighlightPointP";
import HighlightPoint from "../components/HighlightPointP";
import HighlightPointQ from "../components/HighlightPointQ";
import Line from "../components/Line";
import Point from "../components/Point";
import { useEffect, useState } from "react";
import PointType from "../types/Point";

interface JarvisMarchProps{
array:PointType[];
setCode:(x:string)=>void;
setLines:(x:number[])=>void;
}
const JarvisMarch:React.FC<JarvisMarchProps>=(
  {array,
    setCode,
  setLines}
)=>{
  let pointsArray=array;
  const [isComplete,setIsComplete]=useState(false);
  const [pointP,setPointP]=useState<{x:number,y:number}>();
  const [pointQ,setPointQ]=useState<{x:number,y:number}>();
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
  
setCode(`do{ 
hull.push(points[p]); 
q = (p + 1) % n; 
for (let i = 0; i < n; i++) 
{if(orientation(points[p], 
points[q], points[i])==2) {
q = i;
}}
p = q; 
} while (p != l);
Done🚀`);
        
      function orientation(p:{x:number,y:number}, q:{x:number,y:number}, r:{x:number,y:number}) 
      { 
          let val = (q.y - p.y) * (r.x - q.x) - 
                        (q.x - p.x) * (r.y - q.y); 
               
              if (val == 0) return 0;  // collinear 
              return (val > 0)? 1: 2; // clock or counterclock wise 
      }
useEffect( ()=>{
    
   async function convexHull(points:PointType[], n:number) 
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
                setLines([2]);
                await new Promise((resolve) => setTimeout(resolve, 500)); 
                hull.push(points[p]); 
   setPointP(points[p]);
                setHull(hull);
                // Search for a point 'q' such that  
                // orientation(p, q, x) is counterclockwise  
                // for all points 'x'. The idea is to keep  
                // track of last visited most counterclock- 
                // wise point in q. If any point 'i' is more  
                // countercock-wise than q, then update q. 
                setLines([3]);
                await new Promise((resolve) => setTimeout(resolve, 500));
                q = (p + 1) % n; 
                setPointQ(points[q]);
                setLines([4]);
                await new Promise((resolve) => setTimeout(resolve, 500));
                for (let i = 0; i < n; i++) 
                { 
                   // If i is more counterclockwise than  
                   // current q, then update q 
                   setCurrentLine({
                    x1: points[p].x,
                    y1: points[p].y,
                    x2: points[q].x,
                    y2: points[q].y,
                    x3: points[i].x,
                    y3: points[i].y,
                  });
   
                  setLines([5,6]);                  
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                   if (orientation(points[p], points[q], points[i])==2) {
                    setLines([7]);
                    await new Promise((resolve) => setTimeout(resolve, 500));       
                    q = i;
                      setPointQ(points[q]);
                      }
                } 
             
                // Now q is the most counterclockwise with 
                // respect to p. Set p as q for next iteration,  
                // so that q is added to result 'hull' 
                
                p = q; 
                setLines([9]);
                await new Promise((resolve) => setTimeout(resolve, 500));
                
                setLines([10]);
                await new Promise((resolve) => setTimeout(resolve, 500));
                        } while (p != l);  // While we don't come to first  
                        setLines([11]);
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        
  setIsRunning(false);
  setIsComplete(true);
  // point 
             
  console.log("Convex Hull",hull);
                
              setHull(hull);
       }  
       convexHull(pointsArray,pointsArray.length);

},[pointsArray]);


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
             <Point number={index}  key={index} x={point.x} y={point.y} />
             
                     ))}

</div>
 );   
}
export default JarvisMarch;