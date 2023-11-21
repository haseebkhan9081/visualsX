"use client";
 
import HighlightPointP from "../components/HighlightPointP";
import HighlightPoint from "../components/HighlightPointP";
import HighlightPointQ from "../components/HighlightPointQ";
import Line from "../components/Line";
import Point from "../components/Point";
import { useEffect, useState } from "react";
import PointType from "../types/Point";

interface QuickEliminationProps{
  array:PointType[],
setCode:(x:string)=>void;
setLines:(x:number[])=>void;
}
const QuickElimination:React.FC<QuickEliminationProps>=({
  array,
  setCode,
  setLines
})=>{

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

        let vara=[];
        let pointsArray =  array;
       
// JavaScript program to implement Quick Hull algorithm
// to find convex hull.

// Stores the result (points of convex hull)
let Qhull: Set<{ x: number; y: number }> = new Set();


// Returns the side of point p with respect to line
// joining points p1 and p2.
function findSide(p1:{x:number,y:number}, p2:{x:number,y:number}, p:{x:number,y:number})
{
	let val = (p.y - p1.y) * (p2.x - p1.x) -
			(p2.y - p1.y) * (p.x - p1.x);

	if (val > 0)
		return 1;
	if (val < 0)
		return -1;
	return 0;
}

// returns a value proportional to the distance
// between the point p and the line joining the
// points p1 and p2
function lineDist(p1:{x:number,y:number}, p2:{x:number,y:number}, p:{x:number,y:number})
{
	return Math.abs ((p.y - p1.y) * (p2.x - p1.x) -
			(p2.y - p1.y) * (p.x - p1.x));
}
setCode(`for (let i=0; i<n; i++)
{temp = lineDist(p1, p2, a[i])
`)
useEffect(()=>{
// End points of line L are p1 and p2. side can have value
// 1 or -1 specifying each of the parts made by the line L
async function quickHull(a:{x:number,y:number}[], n:number, p1:{x:number,y:number}, p2:{x:number,y:number}, side:number)
{
	let ind = -1;
	let max_dist = 0;

	// finding the point with maximum distance
	// from L and also on the specified side of L.
	for (let i=0; i<n; i++)
	{
		let temp = lineDist(p1, p2, a[i]);
        setPointP(p1);
        setPointQ(p2);
        setCurrentLine({
            x1:p1.x,
            y1:p1.y,
            x2:p2.x,
            y2:p2.y,
            x3:a[i].x,
            y3:a[i].y
        })
        await new Promise((resolve)=>setTimeout(resolve,1000));
		if ((findSide(p1, p2, a[i]) == side) && (temp > max_dist))
		{
			ind = i;
			max_dist = temp;
		}
	}

	// If no point is found, add the end points
	// of L to the convex hull.
	if (ind == -1)
	{
		Qhull.add(p1);
        vara=Array.from(Qhull);
        vara.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
            if (a.x !== b.x) {
                return a.x - b.x;
            } else {
                return a.y - b.y;
            }
          })
        setHull(vara);
        await new Promise((resolve)=>setTimeout(resolve,1000));
		Qhull.add(p2);
        vara=Array.from(Qhull);
        vara.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
            if (a.x !== b.x) {
                return a.x - b.x;
            } else {
                return a.y - b.y;
            }
          })
        setHull(vara);
        await new Promise((resolve)=>setTimeout(resolve,1000));
		return;
	}

	// Recur for the two parts divided by a[ind]
await 	quickHull(a, n, a[ind], p1, -findSide(a[ind], p1, p2));
await 	quickHull(a, n, a[ind], p2, -findSide(a[ind], p2, p1));
}

async function printHull(a:{x:number,y:number}[], n:number)
{
    setIsRunning(true);
	// a[i].second -> y-coordinate of the ith point
	if (n < 3)
	{
		console.log("Convex hull not possible");
		return;
	}

	// Finding the point with minimum and
	// maximum x-coordinate
	let min_x = 0, max_x = 0;
    setPointP(a[min_x]);
    setPointQ(a[max_x]);
	for (let i=1; i<n; i++)
	{
		if (a[i].x < a[min_x].x){
			
            min_x = i;
            setPointP(a[min_x]);
            await new Promise((resolve) => setTimeout(resolve, 1000));

        }
		if (a[i].x > a[max_x].x){
            max_x = i;
            setPointQ(a[max_x]);
            await new Promise((resolve) => setTimeout(resolve, 1000));

        
        }
	}

	// Recursively find convex hull points on
	// one side of line joining a[min_x] and
	// a[max_x]
	await quickHull(a, n, a[min_x], a[max_x], 1);

	// Recursively find convex hull points on
	// other side of line joining a[min_x] and
	// a[max_x]
	await quickHull(a, n, a[min_x], a[max_x], -1);

	console.log("The points in Convex Hull are:");
     vara=Array.from(Qhull);
   vara.sort((a:{x:number,y:number}, b:{x:number,y:number}) => {
        if (a.x !== b.x) {
            return a.x - b.x;
        } else {
            return a.y - b.y;
        }
      })
	setHull(vara);
    await new Promise((resolve)=>setTimeout( resolve, 1000));
 setIsRunning(false);
 setIsComplete(true);
	Qhull.forEach((element:{x:number,y:number}) =>{
		console.log("(", element.x, ", ", element.y, ") ");
	})
}

let n = pointsArray.length;
printHull(pointsArray, n);
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
              <Point   key={index} x={point.x} y={point.y} />
              
                      ))}
 
 </div>
  );  
}


export default QuickElimination;