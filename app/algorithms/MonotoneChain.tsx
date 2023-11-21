"use client";
import HighlightPointP from "../components/HighlightPointP";
import HighlightPointQ from "../components/HighlightPointQ";
import Line from "../components/Line";
import Point from "../components/Point";
import PointType from "../types/Point";
import { useState,useEffect, useMemo } from "react";
interface MonotoneChainProps{
    array:PointType[];
    setCode:(x:string)=>void;
setLines:(x:number[])=>void;
}
const MonotoneChain:React.FC<MonotoneChainProps>=({
    array,
    setCode,
    setLines
})=>{
    const [isComplete,setIsComplete]=useState(false);
    const [pointP,setPointP]=useState<PointType>();
    const [pointQ,setPointQ]=useState<PointType>();
  const [isRunning,setIsRunning]=useState(false);
      const [hull, setHull] = useState<PointType[]>();
      const [currentLine, setCurrentLine] = useState<{
        x1: number,
        y1:  number,
        x2: number,
        y2: number,
        x3: number,
        y3: number }>( );
    
        let pointsArray: PointType[]=useMemo(()=>array,[array])
        
        
    function crossProduct(O: PointType, A: PointType, B: PointType): number {
        return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
    }
setCode(`for(let i = 0;i< n;++i)
{while(k>=2&&
crossProduct(ans[k-2]
,ans[k-1],A[i])
<=0){
k--;}
ans[k++]=A[i - 1];}
for(let i=n-1,t=k+1;i>0
;--i)
{while(k>=t && 
crossProduct(ans[k-2],
ans[k-1],A[i-1])<=0){
 k--} 
ans[k++] = A[i - 1];}
Done🚀`)
 useEffect(()=>{
    async function convexHull(A: PointType[]){
        setIsRunning(true);
        setIsComplete(false);
        let n: number = A.length;
        let k: number = 0;
    
        if (n <= 3)
            return A;
    
        let ans: PointType[] = new Array(2 * n);
    
        // Sort points lexicographically
        A.sort((a, b) => a.x - b.x || a.y - b.y);
    
        // Build lower hull

        for (let i = 0; i < n; ++i) {
            
            setLines([2,3,4,5]);
            await new Promise((resolve) => setTimeout(resolve, 500)); 
            while (k >= 2 && crossProduct(ans[k - 2], ans[k - 1], A[i]) <= 0){
                setCurrentLine({
                    x1:A[i].x,
                    y1:A[i].y,
                    x2:ans[k - 1].x,
                    y2:ans[k - 1].y,
                    x3:ans[k - 2].x,
                    y3:ans[k - 2].y
                });

               setPointP(A[i]);
               setPointQ(ans[k - 1]);
               setLines([6]);
await new Promise((resolve)=>setTimeout(resolve,1000));

                k--;}
            setLines([7]);
            ans[k++] = A[i];
            setHull(ans);
            await new Promise((resolve) => setTimeout(resolve, 500)); 
        }
    
        // Build upper hull
        for (let i = n - 1, t = k + 1; i > 0; --i) {
            
            setLines([10,11,12]);
            await new Promise((resolve) => setTimeout(resolve, 500)); 
            while (k >= t && crossProduct(ans[k - 2], ans[k - 1], A[i - 1]) <= 0){
                setCurrentLine({
                    x1:A[i - 1].x,
                    y1:A[i - 1].y,
                    x2:ans[k - 1].x,
                    y2:ans[k - 1].y,
                    x3:ans[k - 2].x,
                    y3:ans[k - 2].y
                   });
    
                   setPointP(A[i - 1]);
                   setPointQ(ans[k - 1]);
                   setLines([13]);
    await new Promise((resolve)=>setTimeout(resolve,1000));
              
                k--;
            
            }
            setLines([14]);
            ans[k++] = A[i - 1];
            setHull(ans);
            await new Promise((resolve) => setTimeout(resolve, 500)); 
        }
    
        // Resize the array to desired size
        ans = ans.slice(0, k - 1);
    // Print the convex hull
    console.log("the answer is: ");
    for (let i = 0; i < ans.length; i++)
        console.log("(" + ans[i].x + ", " + ans[i].y + ")");
    setHull(ans);
    setIsComplete(true);
    setIsRunning(false);
    setLines([15]);
            return  ;
    }



convexHull(pointsArray);
    
    
    

 },[pointsArray])   
    
    
    
    // Driver code
    
    
    
    // Find the convex hull
    


return (

<div>
 
 {isRunning && (
     <>
     {pointP && (
        <HighlightPointP
     x={pointP?.x}
     y={pointP?.y}
     />

     )}
     
     {pointQ && (
        <HighlightPointQ
     x={pointQ?.x}
     y={pointQ?.y}
     />

     )} 


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
     
  
    
    </>
 
 )}
     {(hull && hull.length>1) && hull.map((p, index) => {
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
              <Point number={index}   key={index} x={point.x} y={point.y} />
              
                      ))}
 
 </div>
);


}

export default MonotoneChain;