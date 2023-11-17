"use client";
import HighlightPointP from "../components/HighlightPointP";
import HighlightPoint from "../components/HighlightPointP";
import HighlightPointQ from "../components/HighlightPointQ";
import Line from "../components/Line";
import Point from "../components/Point";
import { useEffect, useState } from "react";
const GrahamScan=()=>{

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
            {
            x: 390,
            y: 340
          },
        ];
   
 

// A global point needed for sorting points with reference
// to the first point
 let p0:{x:number,y:number}={"x":0,"y":0};

// A utility function to find next to top in a stack
function nextToTop(S:{x:number,y:number}[]) { return S[S.length - 2]; }

// A utility function to return square of distance
// between p1 and p2
function distSq(p1:{x:number,y:number}, p2:{x:number,y:number})
{
	return ((p1.x - p2.x) * (p1.x - p2.x)
			+ (p1.y - p2.y) * (p1.y - p2.y));
}

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(p:{x:number,y:number}, q:{x:number,y:number}, r:{x:number,y:number})
{
	let val = ((q.y - p.y) * (r.x - q.x)
			- (q.x - p.x) * (r.y - q.y));
	if (val == 0)
		return 0; // collinear
	else if (val > 0)
		return 1; // clock wise
	else
		return 2; // counterclock wise
}

// A function used by cmp_to_key function to sort an array
// of points with respect to the first point
function compare(p1:{x:number,y:number}, p2:{x:number,y:number})
{

	// Find orientation
	let o = orientation(p0, p1, p2);
	if (o == 0) {
		if (distSq(p0, p2) >= distSq(p0, p1))
			return -1;
		else
			return 1;
	}
	else {
		if (o == 2)
			return -1;
		else
			return 1;
	}
}

useEffect(()=>{
    async function convexHull(points:{x:number,y:number}[], n:number)
    {
        setIsRunning(true);
        // Find the bottommost point
        let ymin = points[0].y;
        let min = 0;
        for (var i = 1; i < n; i++) {
            let y = points[i].y;
    
            // Pick the bottom-most or choose the left
            // most point in case of tie
            if ((y < ymin)
                || ((ymin == y)
                    && (points[i].x < points[min].x))) {
                ymin = points[i].y;
                min = i;
            }
        }
    
        // Place the bottom-most point at first position
        points[0], points[min] = points[min], points[0];
    
        // Sort n-1 points with respect to the first point.
        // A point p1 comes before p2 in sorted output if p2
        // has larger polar angle (in counterclockwise
        // direction) than p1
        let p0 = points[0];
        setPointP(p0);
        points.sort(compare);
        
    
        // If two or more points make same angle with p0,
        // Remove all but the one that is farthest from p0
        // Remember that, in above sorting, our criteria was
        // to keep the farthest point at the end when more than
        // one points have same angle.
        let m = 1; // Initialize size of modified array
        for (var i = 1; i < n; i++) {
            // Keep removing i while angle of i and i+1 is same
            // with respect to p0
            while ((i < n - 1)&& (orientation(p0, points[i], points[i + 1])== 0)){
                i += 1;
            // setCurrentLine({
            //     x1:p0.x,
            //     y1:p0.y,
            //     x2:points[i].x,
            //     y2:points[i].y,
            //     x3:points[i+1].x,
            //     y3:points[i+1].y
            // });
            
            }
    
            points[m] = points[i];
            m += 1; // Update size of modified array
        }
    
        // If modified array of points has less than 3 points,
        // convex hull is not possible
        if (m < 3)
            return;
    
        // Create an empty stack and push first three points
        // to it.
        let S:{x:number,y:number}[] = [];
        S.push(points[0]);
        S.push(points[1]);
        S.push(points[2]);
    setPointP(points[0]);
    setPointQ(points[1]);
        // Process remaining n-3 points
        for (var i = 3; i < m; i++) {
            // Keep removing top while the angle formed by
            // points next-to-top, top, and points[i] makes
            // a non-left turn
            while (true) {
                if (S.length < 2){
                    break;}
                    setPointP(nextToTop(S));
                    setPointQ(S[S.length - 1]);
                    setCurrentLine({
                        x1:nextToTop(S).x,
                        y1:nextToTop(S).y,
                        x2:S[S.length - 1].x,
                        y2:S[S.length - 1].y,
                        x3:points[i].x,
                        y3:points[i].y
                    });
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                if (orientation(nextToTop(S), S[S.length - 1],points[i])>= 2){
                    break;}
                S.pop();
            }
    
            S.push(points[i]);
            setHull(S);
        }
    
        
        setHull(S);
    }
    let n = pointsArray.length;
convexHull(pointsArray, n);
},[])

 






 



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
   { hull.map((p, index) => {
               return (
                 <Line
                   x1={p.x}
                   y1={p.y}
                   x2={hull[index + 1]?.x}
                   y2={hull[index + 1]?.y}
                 />
               );
             })}
    </>
 
 )}
     { hull.length>1 && hull.map((p, index) => {
               return (
                 <Line
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