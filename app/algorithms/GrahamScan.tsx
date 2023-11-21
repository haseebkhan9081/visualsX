"use client";
import HighlightPointP from "../components/HighlightPointP";
 
import HighlightPointQ from "../components/HighlightPointQ";
import Line from "../components/Line";
import Point from "../components/Point";
import PointType from "@/app/types/Point";
import { useEffect, useState } from "react";
interface GrahamScanProps{
array:PointType[];
setCode:(x:string)=>void;
setLines:(x:number[])=>void;
}

const GrahamScan:React.FC<GrahamScanProps>=({
  array,
  setCode,
  setLines
})=>{

    const [isComplete,setIsComplete]=useState(false);
    const [pointP,setPointP]=useState<{x:number,y:number}>();
    const [pointQ,setPointQ]=useState<{x:number,y:number}>();
  const [isRunning,setIsRunning]=useState(false);
      const [hull, setHull] = useState<{x:number,y:number}[]>([
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
      
  
      let pointsArray = array;
        function nextToTop(S:{x:number,y:number}[]) {
          const p:{x:number,y:number}= S.pop()!;
          const res = S[S.length - 1];
          S.push(p);
          return res;
      }

      function swap(p1:{x:number,y:number}, p2:{x:number,y:number}) {
        const temp = p1;
        p1 = p2;
        p2 = temp;
    }

// A global point needed for sorting points with reference
// to the first point
 let p0:{x:number,y:number}={"x":0,"y":0};

 function distSq(p1:{x:number,y:number}, p2:{x:number,y:number}) {
  return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
}

// A utility function to return square of distance
// between p1 and p2
 

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise

function orientation(p:{x:number,y:number}, q:{x:number,y:number}, r:{x:number,y:number}) {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val === 0) return 0; // collinear
  return val > 0 ? 1 : 2; // clock or counterclockwise
}

// A function used by cmp_to_key function to sort an array
// of points with respect to the first point
function compare(vp1:{x:number,y:number}, vp2:{x:number,y:number}) {
  const p1 = vp1;
  const p2 = vp2;

  // Find orientation
  const o = orientation(p0, p1, p2);
  if (o === 0)
      return distSq(p0, p2) >= distSq(p0, p1) ? -1 : 1;

  return o === 2 ? -1 : 1;
}
setCode(`for(let i = 1; i < n; i++)
{while(i < n - 1 &&
orientation(p0,points[i]
,points[i + 1]) === 0)
{i++;}
points[m] = points[i];
m++;}
if (m < 3){return};
for (let i = 3; i < m; i++)
{while (S.length > 1 &&
orientation(nextToTop(S),
S[S.length - 1], points[i])
!== 2)
{S.pop();}
S.push(points[i]);}
Done🚀`);
 
// 
//   
// 
// 
//   `)

useEffect(()=>{
    async function convexHull(points:{x:number,y:number}[]) {
        const n = points.length;
    setIsRunning(true);
        // Find the bottommost point
        let ymin = points[0].y,
            min = 0;
        for (let i = 1; i < n; i++) {
            const y = points[i].y;
    
            // Pick the bottom-most or choose the left
            // most point in case of tie
            if (y < ymin || (ymin === y && points[i].x < points[min].x))
                ymin = points[i].y, min = i;
        }
    
        // Place the bottom-most point at first position
        swap(points[0], points[min]);
    
        // Sort n-1 points with respect to the first point.
        // A point p1 comes before p2 in sorted output if p2
        // has a larger polar angle (in counterclockwise
        // direction) than p1
        p0 = points[0];
        points.sort(compare);
    
        // If two or more points make the same angle with p0,
        // Remove all but the one that is farthest from p0
        // Remember that, in the above sorting, our criteria was
        // to keep the farthest point at the end when more than
        // one point has the same angle.
        let m = 1; // Initialize size of the modified array
        for (let i = 1; i < n; i++) {
          setLines([1]);
          await new Promise((resolve) => setTimeout(resolve, 500));
          
            // Keep removing i while the angle of i and i+1 is the same
            // with respect to p0
            setLines([2,3,4]);
            await new Promise((resolve) => setTimeout(resolve, 500));
            while (
                i < n - 1 &&
                orientation(p0, points[i], points[i + 1]) === 0
            ){
              setCurrentLine(
                {
                 x1:p0.x,
                 y1:p0.y,
                 x2: points[i].x,
                 y2: points[i].y,
                 x3:points[i + 1].x,
                 y3:points[i + 1].y
   
                } );
                setLines([5]);
                 
                await new Promise((resolve) => setTimeout(resolve, 1000));
                i++;
            }
            setLines([6]);
            await new Promise((resolve) => setTimeout(resolve, 500));
            points[m] = points[i];
            setLines([7]);
            await new Promise((resolve) => setTimeout(resolve, 500));
            m++; // Update the size of the modified array
        }
    
        // If the modified array of points has fewer than 3 points,
        // convex hull is not possible
        setLines([8]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (m < 3) return;
    
        // Create an empty stack and push the first three points to it.
        const S:{x:number,y:number}[] = [points[0], points[1], points[2]];
        setPointP(points[0]);
        setPointQ(points[1]);
    setHull(S);
        // Process the remaining n-3 points
        setLines([9]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        for (let i = 3; i < m; i++) {
            // Keep removing the top while the angle formed by
            // points next-to-top, top, and points[i] makes
            // a non-left turn
            setLines([10,11,12,13]);
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            while (S.length > 1 &&  orientation(nextToTop(S), S[S.length - 1], points[i]) !== 2
            ){
              setPointP(nextToTop(S));
        setPointQ(S[S.length - 1]);
              setCurrentLine(
             {
              x1:nextToTop(S).x,
              y1:nextToTop(S).y,
              x2: S[S.length - 1].x,
              y2: S[S.length - 1].y,
              x3:points[i].x,
              y3:points[i].y

             } 
             
            );
            setLines([14]);
            await new Promise((resolve) => setTimeout(resolve, 1000));
                S.pop();
                setHull(S);
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
              setLines([15]);  
            S.push(points[i]);
            setHull(S);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
             
        }
        setLines([16]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Now the stack has the output points, print the contents of the stack
       setHull(S);
       setIsRunning(false);
       setIsComplete(true);
    }
    let n = pointsArray.length;
convexHull(pointsArray);
},[pointsArray]);


useEffect(() => {
  console.log("Updated length of the hull from useEffect: ", hull.length);
  console.log("the hull: ",hull);
}, [hull]); 
 






 



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


);
}

export default GrahamScan;