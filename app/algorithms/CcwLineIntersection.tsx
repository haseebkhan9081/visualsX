"use client";
import { useState,useEffect } from "react";
import Pointtype from "../types/Point";
import Point from "../components/Point";
import Line from "../components/Line";
import HighlightPointP from "../components/HighlightPointP";
const CcWLineIntersection=()=>{
    const [isComplete,setIsComplete]=useState(false);
    const [isRunning,setIsRunning]=useState(false);
    const [simpleLine,setSimpleLine]=useState<{
        x1:number,
        y1:number,
        x2:number,
        y2:number
    }|null>(null);
  const [intersection,setIntersection]=useState<Pointtype|null>(null);
  const [currentLine, setCurrentLine] = useState<{
    x1:number,
    y1:number,
    x2:number,
    y2:number,
    x3:number,
    y3:number
}|null>(
null
  );
    // Function to calculate the orientation of three points (p, q, r)
    function orientation(p: Pointtype, q: Pointtype, r: Pointtype): number {
        const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        
        if (val === 0) return 0;  // Collinear
        return (val > 0) ? 1 : 2; // Clockwise or Counter-Clockwise
    }
    let intersectionPoint:Pointtype;


useEffect(()=>{
 // Function to check if two line segments intersect
 async function doIntersect(p1: Pointtype, q1: Pointtype, p2: Pointtype, q2: Pointtype){
    // Find the 4 orientations needed for general and special cases
    const o1 = orientation(p1, q1, p2);
    setCurrentLine({
        x1:p1.x,
        y1:p1.y,
        x2:q1.x,
        y2:q1.y,
        x3:p2.x,
        y3:p2.y
    });
    await new Promise((resolve)=>setTimeout(resolve,1000));
    const o2 = orientation(p1, q1, q2);
    setCurrentLine({
        x1:p1.x,
        y1:p1.y,
        x2:q1.x,
        y2:q1.y,
        x3:q2.x,
        y3:q2.y
    });
    await new Promise((resolve)=>setTimeout(resolve,1000));
    const o3 = orientation(p2, q2, p1);
    setCurrentLine({
        x1:p2.x,
        y1:p2.y,
        x2:q2.x,
        y2:q2.y,
        x3:p1.x,
        y3:p1.y
    });
    await new Promise((resolve)=>setTimeout(resolve,1000));
    const o4 = orientation(p2, q2, q1);
    setCurrentLine({
        x1:p2.x,
        y1:p2.y,
        x2:q2.x,
        y2:q2.y,
        x3:q1.x,
        y3:q1.y
    });
    await new Promise((resolve)=>setTimeout(resolve,1000));
    // General case
    if (o1 !== o2 && o3 !== o4) {
        const intersectionX =
        ((p1.x * q1.y - p1.y * q1.x) * (p2.x - q2.x) - (p1.x - q1.x) * (p2.x * q2.y - p2.y * q2.x)) /
        ((p1.x - q1.x) * (p2.y - q2.y) - (p1.y - q1.y) * (p2.x - q2.x));

    const intersectionY =
        ((p1.x * q1.y - p1.y * q1.x) * (p2.y - q2.y) - (p1.y - q1.y) * (p2.x * q2.y - p2.y * q2.x)) /
        ((p1.x - q1.x) * (p2.y - q2.y) - (p1.y - q1.y) * (p2.x - q2.x));

     intersectionPoint = { x: intersectionX, y: intersectionY };
setIntersection(intersectionPoint);
setIsComplete(true);
setIsRunning(false);      
return;
    }

    // Special Cases

    // p1, q1, and p2 are collinear and p2 lies on segment p1q1
    setSimpleLine({
        x1:p2.x,
        y1:p2.y,
        x2:q2.x,
        y2:q2.y 
    });
    setIntersection(p2);

    setCurrentLine(null);
    await new Promise((resolve)=>setTimeout(resolve,1000));
    if (o1 === 0 && await onSegment(p1, p2, q1)){ 
        setIntersection(p2);
        setIsComplete(true);
      setIsRunning(false); 
       return;}


        setSimpleLine({
            x1:p1.x,
            y1:p1.y,
            x2:q1.x,
            y2:q1.y 
        });
        setIntersection(q2);
        await new Promise((resolve)=>setTimeout(resolve,1000));
    // p1, q1, and q2 are collinear and q2 lies on segment p1q1
    if (o2 === 0 && await onSegment(p1, q2, q1)){ setIntersection(q2); 
        setIsComplete(true);
      setIsRunning(false); 
      return;}

    setSimpleLine({
        x1:p2.x,
        y1:p2.y,
        x2:q2.x,
        y2:q2.y 
    });
    setIntersection(p1);
    await new Promise((resolve)=>setTimeout(resolve,1000));
    // p2, q2, and p1 are collinear and p1 lies on segment p2q2
    if (o3 === 0 && await onSegment(p2, p1, q2)) {setIntersection(p1);
        setIsComplete(true);
      setIsRunning(false); 
    return;}


    setSimpleLine({
        x1:p2.x,
        y1:p2.y,
        x2:q1.x,
        y2:q1.y 
    });
    setIntersection(q1);
    await new Promise((resolve)=>setTimeout(resolve,1000));
   
    // p2, q2, and q1 are collinear and q1 lies on segment p2q2
    if (o4 === 0 && await onSegment(p2, q1, q2)){ setIntersection(q1);
        setIsComplete(true);
      setIsRunning(false); 
    return;};

      // Doesn't fall in any of the above cases
      
}

// Function to check if point q lies on segment p-r
async function onSegment(p: Pointtype, q: Pointtype, r: Pointtype):Promise<boolean> {
    return (
        q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)
    );
}
doIntersect(points[0], points[1], points[2], points[3]);
if (intersection) {
    console.log("Lines intersect! at point");
} else {
    console.log("Lines do not intersect.");
}

},[])

    
    // Example usage
    const points:Pointtype[]=[
        {
            x: 90,
            y: 200
          },
          {
            x: 190,
            y: 67
          },
          {
            x: 190,
            y: 67
          },
          {
            x: 180,
            y: 100
          },
          
    ]
    
    


return(
<div>
{isRunning && (
    <>
    {currentLine && (
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
    
  {simpleLine && (
<>
<Line
x1={simpleLine.x1}
y1={simpleLine.y1}
x2={simpleLine.x2}
y2={simpleLine.y2}
/>
{intersection && (
<HighlightPointP
x={intersection?.x}
y={intersection?.y}
/>
)}
</>

)}
  </>

)}



{isComplete && (
    <>
<Line
    x1={points[0].x}
    y1={points[0].y}
    x2={points[1].x}
    y2={points[1].y}
  />
  <Line
    x1={points[2].x}
    y1={points[2].y}
    x2={points[3].x}
    y2={points[3].y}
  />
 {intersection &&(
    <HighlightPointP
  x={intersection?.x}
  y={intersection?.y}
  />
 )} 
    
    </>
)}    
{points.map((point, index) => (
             <Point   key={index} x={point.x} y={point.y} />
             
                     ))}
</div>
);
}

export default CcWLineIntersection;