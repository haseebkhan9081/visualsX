"use client";
import { useState,useEffect } from "react";
import Pointtype from "../types/Point";
import Point from "../components/Point";
import Line from "../components/Line";
import HighlightPointP from "../components/HighlightPointP";
import HighlightPointQ from "../components/HighlightPointQ";
import GrayLine from "../components/GrayLine";
interface CcWLineIntersectionProps{
  array:Pointtype[],
setCode:(x:string)=>void;
setLines:(x:number[])=>void;
}
const CcWLineIntersection:React.FC<CcWLineIntersectionProps>=(
  {
    array,
    setCode,
    setLines
  }
)=>{
    const [isComplete,setIsComplete]=useState(false);
    const [isRunning,setIsRunning]=useState(false);
    const [pointQ,setPointQ]=useState<{x:number,y:number}>({x:0,y:0});
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

    function onSegment(p: Pointtype, q: Pointtype, r: Pointtype):boolean {
      return (
          q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
          q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)
      );
  }
  setCode(`o1=orientation(p1,q1,p2);
o2=orientation(p1,q1,q2);
o3=orientation(p2,q2,p1);
o4=orientation(p2,q2,q1);
if(o1!==o2&&o3!==o4){
//line intersects
}if(o1 === 0 &&
onSegment(p1, p2, q1)){
//line intersects 
}if(o2===0 &&
onSegment(p1, q2, q1)){
//line intersects  
}if(o3===0 &&
onSegment(p2, p1, q2)){
//line intersects  
}if(o4===0&&
onSegment(p2, q1, q2)){
//line intersects  
}else{
//line Do not intersects
❌  
}Done🚀 
  `)
useEffect(()=>{
 // Function to check if two line segments intersect
 async function doIntersect(p1: Pointtype, q1: Pointtype, p2: Pointtype, q2: Pointtype){
  setIsRunning(true);
  setIsComplete(false);
    // Find the 4 orientations needed for general and special cases
    setLines([1]);
    const o1 = orientation(p1, q1, p2);
    setCurrentLine({
        x1:p1.x,
        y1:p1.y,
        x2:q1.x,
        y2:q1.y,
        x3:p2.x,
        y3:p2.y
    });
     
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLines([2]);
     
    const o2 = orientation(p1, q1, q2);
    setCurrentLine({
        x1:p1.x,
        y1:p1.y,
        x2:q1.x,
        y2:q1.y,
        x3:q2.x,
        y3:q2.y
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLines([3]);
    const o3 = orientation(p2, q2, p1);
    setCurrentLine({
        x1:p2.x,
        y1:p2.y,
        x2:q2.x,
        y2:q2.y,
        x3:p1.x,
        y3:p1.y
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLines([4]);
    const o4 = orientation(p2, q2, q1);
    setCurrentLine({
        x1:p2.x,
        y1:p2.y,
        x2:q2.x,
        y2:q2.y,
        x3:q1.x,
        y3:q1.y
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
 
    setLines([5]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (o1 !== o2 && o3 !== o4) {
      setLines([6]);
          await new Promise((resolve) => setTimeout(resolve, 500));
          
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
console.log("it was a GENERAL CASE");    
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
    setPointQ(p2);

    setCurrentLine(null);
    setLines([7,8]); 
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (o1 === 0 &&  onSegment(p1, p2, q1)){ 
        setIntersection(p2);
        setIsComplete(true);
      setIsRunning(false);
      setLines([9]);
          await new Promise((resolve) => setTimeout(resolve, 500));
           
       return;}


        setSimpleLine({
            x1:p1.x,
            y1:p1.y,
            x2:q1.x,
            y2:q1.y 
        });
         
        setPointQ(q2);
        setLines([10,11]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    // p1, q1, and q2 are collinear and q2 lies on segment p1q1
           
    if (o2 === 0 &&  onSegment(p1, q2, q1)){ setIntersection(q2); 
        setIsComplete(true);
        setLines([12]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        setIsRunning(false); 
      return;}

    setSimpleLine({
        x1:p2.x,
        y1:p2.y,
        x2:q2.x,
        y2:q2.y 
    });
    setPointQ(p1);
    setLines([13,14]); 
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // p2, q2, and p1 are collinear and p1 lies on segment p2q2
    if (o3 === 0 &&  onSegment(p2, p1, q2)) {setIntersection(p1);
        setIsComplete(true);
      setIsRunning(false);
      setLines([15]);
            
    return;}


    setSimpleLine({
        x1:p2.x,
        y1:p2.y,
        x2:q1.x,
        y2:q1.y 
    });
    setPointQ(q1);
    setLines([16,17]);
           
    await new Promise((resolve) => setTimeout(resolve, 1000));
   
    // p2, q2, and q1 are collinear and q1 lies on segment p2q2
    if (o4 === 0 &&  onSegment(p2, q1, q2)){ setIntersection(q1);
      setLines([18]);
          await new Promise((resolve) => setTimeout(resolve, 500));
          
        setIsComplete(true);
      setIsRunning(false); 
    return;};

    setIsComplete(true);
      setIsRunning(false);
      console.log(intersection);
      setLines([20]);
          await new Promise((resolve) => setTimeout(resolve, 500));
          
      return;
      
    // Doesn't fall in any of the above cases
      
}

 
 
doIntersect(points[0], points[1], points[2], points[3]);
 if(!intersection){
  console.log("do not intersect");
 }else{
  console.log("point of inttersection",intersection);
 }
},[])

    
    // Example usage
    const points =array;
    
    


return(
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
  (
<HighlightPointQ
x={pointQ.x}
y={pointQ?.y}
/>)

</>

)}
  </>

)}




{isComplete && (
    <>
 {intersection &&(
    <HighlightPointP
  x={intersection?.x}
  y={intersection?.y}
  />
 )} 
    
    </>
)}    
{points.map((point, index) => (
             <Point number={index}  key={index} x={point.x} y={point.y} />
             
                     ))}
</div>
);
}

export default CcWLineIntersection;