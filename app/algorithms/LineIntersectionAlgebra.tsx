"use client";

import { useEffect, useMemo, useState } from "react";
import Pointtype from "../types/Point";
import GrayLine from "../components/GrayLine";
import HighlightPointP from "../components/HighlightPointP";
import Point from "../components/Point";
const LineIntersectionAlgebra=()=>{

    const points: Pointtype[] = useMemo(() => [
        { x: 90, y: 200 },
        { x: 290, y: 40 },
        { x: 190, y: 67 },
        { x: 390, y: 340 },
      ], []);
    
const [isComplete,setIsComplete]=useState(false);
const [intersection,setIntersection]=useState<Pointtype|null>(null);
const [doPointIntersect,setDoPointIntersect]=useState(false);
    function isPointWithinBounds(point:Pointtype, start:Pointtype, end:Pointtype) {
        return (
            (point.x >= Math.min(start.x, end.x)) &&
            (point.x <= Math.max(start.x, end.x)) &&
            (point.y >= Math.min(start.y, end.y)) &&
            (point.y <= Math.max(start.y, end.y))
        );
    }
useEffect(()=>{
    function doIntersect(p1:Pointtype, q1:Pointtype, p2:Pointtype, q2:Pointtype) {
        const denominator =((p1.x - q1.x) * (p2.y - q2.y) - (p1.y - q1.y) * (p2.x - q2.x));
    
        // Check if the lines are parallel (denominator is zero)
        if (denominator === 0) {
            setDoPointIntersect(false);
        }
     
        // Check if the intersection point is within the bounds of both line segments
        const intersectionX =
        ((p1.x * q1.y - p1.y * q1.x) * (p2.x - q2.x) - (p1.x - q1.x) * (p2.x * q2.y - p2.y * q2.x)) /denominator;
        const intersectionY =
        ((p1.x * q1.y - p1.y * q1.x) * (p2.y - q2.y) - (p1.y - q1.y) * (p2.x * q2.y - p2.y * q2.x)) /denominator;
        const object:Pointtype={
            x:intersectionX,
            y:intersectionY
        }
    setIntersection(object);
    console.log(object);
        const isWithinBounds1 = isPointWithinBounds({ x: intersectionX, y: intersectionY }, p1, q1);
        const isWithinBounds2 = isPointWithinBounds({ x: intersectionX, y: intersectionY }, p2, q2);
    
        setDoPointIntersect(isWithinBounds1 && isWithinBounds2);
        console.log(isWithinBounds1 && isWithinBounds2);
       setIsComplete(true);
        return;
        
    }
    


      doIntersect(points[0],points[1],points[2],points[3]);
    
},[points]);
      

  return (

<div>
<GrayLine
    x1={points[0].x}
    y1={points[0].y}
    x2={points[1].x}
    y2={points[1].y}
  />
  <GrayLine
    x1={points[2].x}
    y1={points[2].y}
    x2={points[3].x}
    y2={points[3].y}
  />


{isComplete && (
    <>
 {(intersection) &&(
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

export default LineIntersectionAlgebra;