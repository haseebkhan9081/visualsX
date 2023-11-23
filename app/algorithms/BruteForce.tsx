"use client";
import { useState,useEffect } from "react";
import Point from "../components/Point";
import Line from "../components/Line";
import HighlightPointP from "../components/HighlightPointP";
import HighlightPointQ from "../components/HighlightPointQ";
import PointType from "@/app/types/Point";
interface BruteForceProps{
  array:PointType[];
  setCode:(x:string)=>void;
  setLines:(x:number[])=>void;
  }

 const BruteForce:React.FC<BruteForceProps>=(
{
  array,
  setCode,
  setLines

}
 )=>{

  const [isComplete,setIsComplete]=useState(false);
  const [pointP,setPointP]=useState<{x:number,y:number}>();
  const [pointQ,setPointQ]=useState<{x:number,y:number}>();
const [isRunning,setIsRunning]=useState(false);
const [exec,setExec]=useState<number>(0);
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
    const code=`for(let i=0;i<n;i++)
{for(let j=0;j<n;j++){
if (i !== j) {
let valid = true;
if(k!==i&&k!==j){
const orient = 
orientation(points[i], 
points[j], points[k]);
if (orient <= 0  ) {
valid = false;
break;
  }} 
if(valid) {
if(!hull.includes(points[i])) {
hull.push(points[i]);}
if (!hull.includes(points[j])) {
hull.push(points[j]);}} }}}
Done🚀
Execution time: ${(exec/1000).toFixed(2)}s
    `
    setCode(code);
      const generatePoints = () => {
        const points = [];
        for (let i = 0; i < 3; i++) {
          points.push({ x: Math.random() * 400, y: Math.random() * 200 });
        }
        return points;
      };
      let pointsArray = array;
    // pointsArray.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
    //   if (a.x !== b.x) {
    //       return a.x - b.x;
    //   } else {
    //       return a.y - b.y;
    //   }
    // })
      function orientation(p:{x:number,y:number}, q:{x:number,y:number}, r:{x:number,y:number}) {
        const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    
        if (val === 0) return 0; // Collinear points
        return val  ; // Clockwise or counterclockwise
      }
      var whichSideOfLine = function(lineEndptA:PointType, lineEndptB:PointType, ptSubject:PointType) {
        return (ptSubject.x - lineEndptA.x) * (lineEndptB.y - lineEndptA.y) - (ptSubject.y - lineEndptA.y) * (lineEndptB.x - lineEndptA.x);
    };
      useEffect(() => {
        async function bruteForceConvexHull(points:{x:number,y:number}[]) {
        const start=performance.now();
        let offset=0;
          setIsRunning(true);
          const n = points.length;
          if (n < 3) return points; // Convex hull is not possible with less than 3 points
    
          let hull: any = [];
    
          for (let i = 0; i < n; i++) {
            setLines([1]);
            await new Promise((resolve) => setTimeout(resolve, 500));
            offset=offset+500;
            setPointP(points[i]);
            for (let j = 0; j < n; j++) {
              setLines([3]);offset=offset+500;
              await new Promise((resolve) => setTimeout(resolve, 500));
              
              setPointQ(points[j]);
              if (i === j) {
                continue;
              }
                setLines([4]);offset=offset+500;
                await new Promise((resolve) => setTimeout(resolve, 500));
                var ptI = points[i];
                var ptJ = points[j];
                var allPointsOnTheRight = true;
                for (let k = 0; k < n; k++) {
                  setLines([5]);offset=offset+500;
                  await new Promise((resolve) => setTimeout(resolve, 500));  
                  if(k === i || k === j) {
                    continue;
                }
                    const orient = whichSideOfLine(ptI, ptJ, points[k]);
                    setLines([6,7,8]);offset=offset+500;
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    setCurrentLine({
                      x1: points[i].x,
                      y1: points[i].y,
                      x2: points[j].x,
                      y2: points[j].y,
                      x3: points[k].x,
                      y3: points[k].y
                    });
                    setLines([9]);offset=offset+1000;
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                   
                    if (orient < 0  ) {
                      setLines([10]);offset=offset+500;
                await new Promise((resolve) => setTimeout(resolve, 500));
                
allPointsOnTheRight = false;
                      break;
                    }
                  }
                
                setLines([13]);offset=offset+500;
                await new Promise((resolve) => setTimeout(resolve, 500));
                if (allPointsOnTheRight) {
                  setLines([14]);offset=offset+500;
                await new Promise((resolve) => setTimeout(resolve, 500));
                
                  if (!hull.includes(points[i])) {
                    hull.push(points[i]);
                    setLines([15]);offset=offset+500;
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    
                    // hull.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
                    //   if (a.x !== b.x) {
                    //       return a.x - b.x;
                    //   } else {
                    //       return a.y - b.y;
                    //   }
                    // })
                     setHull(hull);
                  }
                  setLines([16]);offset=offset+500;
                await new Promise((resolve) => setTimeout(resolve, 500));
                
                  if (!hull.includes(points[j])) {
                    setLines([17]);offset=offset+500;
                await new Promise((resolve) => setTimeout(resolve, 500));
                
                    hull.push(points[j]);
                    // hull.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
                    //   if (a.x !== b.x) {
                    //       return a.x - b.x;
                    //   } else {
                    //       return a.y - b.y;
                    //   }
                    // });
                                       setHull(hull);
                  }
                }
              }
            }

            setIsRunning(false);
            setIsComplete(true);     
            console.log(hull);   
            // hull.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
            //   if (a.x !== b.x) {
            //       return a.x - b.x;
            //   } else {
            //       return a.y - b.y;
            //   }
            // })
            setHull(hull);
          const end=performance.now();
          setLines([18])
          setExec(end-start-offset);
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
                     <Point number={index}  key={index} x={point.x} y={point.y} />
                     
                             ))}
        
        </div>  
      )
}

export default BruteForce;