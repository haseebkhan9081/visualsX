 
"use client";
import { useState,useEffect } from "react";
import Pointtype from "../types/Point";
import Point from "../components/Point";
import Line from "../components/Line";
import HighlightPointP from "../components/HighlightPointP";
import HighlightPointQ from "../components/HighlightPointQ";
import GrayLine from "../components/GrayLine";
interface SlopProps{
  array:Pointtype[],
setCode:(x:string)=>void;
setLines:(x:number[])=>void;
}
 

const LineIntersectionSlope: React.FC<SlopProps> = (
    {array,
    setCode,
setLines}

) => {

    const points=array;
    const [isComplete,setIsComplete]=useState(false);
    const [intersection,setIntersection]=useState<Pointtype|null>(null);
    const [doPointIntersect,setDoPointIntersect]=useState(false);
 
    setCode(`m1=(point2.y-point1.y)/
    (point2.x - point1.x);
    m2=(point4.y-point3.y)
    /(point4.x - point3.x);
    b1=point1.y-m1*point1.x;
    b2=point3.y-m2*point3.x;
    if(m1===m2){
    //Points Do No intersect}
    intersectX=(b2-b1)/(m1-m2)
    intersectY=m1*intersectX+b1
    if(isWithinLine1 
    && isWithinLine2){ ✔
    //Line Intersects    
    }else{❌
    //Lines do not intersects}
    Done🚀🎉;
    `);
 

   useEffect(()=>{
    const doLinesIntersect =async (points: Pointtype[]) =>{
        const [point1, point2, point3, point4] = points;
        setLines([1,2]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const m1: number = (point2.y - point1.y) / (point2.x - point1.x);
        setLines([3,4]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
        const m2: number = (point4.y - point3.y) / (point4.x - point3.x);
        setLines([5]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const b1: number = point1.y - m1 * point1.x;
        setLines([6]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
        const b2: number = point3.y - m2 * point3.x;
      
        setLines([7]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
        if (m1 === m2) {
            setLines([8]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
            setDoPointIntersect(false);
          return   ;
        }
        setLines([9]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const intersectX: number = (b2 - b1) / (m1 - m2);
        setLines([10]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
        const intersectY: number = m1 * intersectX + b1;
      
        const isWithinLine1: boolean =
          intersectX >= Math.min(point1.x, point2.x) &&
          intersectX <= Math.max(point1.x, point2.x) &&
          intersectY >= Math.min(point1.y, point2.y) &&
          intersectY <= Math.max(point1.y, point2.y);
      
        const isWithinLine2: boolean =
          intersectX >= Math.min(point3.x, point4.x) &&
          intersectX <= Math.max(point3.x, point4.x) &&
          intersectY >= Math.min(point3.y, point4.y) &&
          intersectY <= Math.max(point3.y, point4.y);
          setIsComplete(true);
          setLines([11,12]);
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          if(isWithinLine1 && isWithinLine2){
            setLines([13]);
            
            setIntersection({
                x:intersectX,
                y:intersectY
            })
            await new Promise((resolve) => setTimeout(resolve, 500));
         
        return;}
        setLines([15]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
        return  ;
      };
      doLinesIntersect(points);
      setLines([16]);
     },[])
   
   
      


 
  return <div>
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
               <Point number={index}  key={index} x={point.x} y={point.y} />
               
                       ))}
  
  </div>
};

export default LineIntersectionSlope;
