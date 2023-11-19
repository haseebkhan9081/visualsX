"use client";
import { ChevronLeft, Loader2 } from "lucide-react";
import AlgoCard from "../components/Card";
import Link from "next/link";
import { useState } from "react";

const ConvexHull=()=>{
const [click,setClick]=useState(false);

 

    return (

<div className="p-6 w-full flex flex-col space-y-2 bg-slate-50">
 <div className="flex justify-between">
    <Link
    onClick={()=>setClick(true)}
    className="flex flex-row gap-x-3"
    href={"/"}
    >{click?<Loader2 className="animate-spin"/>:<><ChevronLeft/> Home</>}</Link>
    
    </div>   
<div className=" mt-6 w-full flex items-center justify-center">
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex flex-row items-center justify-center">
  <AlgoCard
  title="Brute Force"
  destination="ConvexHull"
  des="The convex hull brute force approach systematically examines all point combinations to find the smallest convex polygon enclosing them. While conceptually straightforward, this method can be computationally demanding, making it less efficient for larger datasets compared to optimized algorithms like Graham's scan or QuickHull."
    />
  <AlgoCard
  title="Graham Scan"
  destination="LineIntersection"
  des="Graham's scan is an efficient convex hull algorithm that sorts points based on their polar angles relative to the lowest point. By iteratively selecting points in a counterclockwise fashion, it constructs the convex hull in linearithmic time complexity, making it more suitable for practical applications compared to brute force methods"
  />
  <AlgoCard
  title="Jarvis March"
  destination="LineIntersection"
  des="convex hull algorithm that iteratively selects the point with the smallest polar angle relative to the current point. This process continues until the convex hull is formed. While simple to understand and implement, Jarvis March has a time complexity of O(nh), where n is the number of points and h is the number of vertices on the convex hull"
  />
   <AlgoCard
  title="Quick Hull"
  destination="LineIntersection"
  des="QuickHull is a divide-and-conquer algorithm for finding the convex hull of a set of points. It works by recursively dividing the set into two parts, finding the convex hulls of each part, and then merging them to form the final convex hull. QuickHull has an average-case time complexity of O(n log n) and can outperform other algorithms"
  />
  <AlgoCard
  title="Andrew Chains"
  destination="LineIntersection"
  des="The Andrew's Monotone Chain algorithm, also known as Andrew's Algorithm, efficiently computes the convex hull by sorting the points lexicographically and then constructing upper and lower hulls. By iteratively adding points while maintaining convexity, this linear-time algorithm produces the convex hull with reduced time complexity"
  />
</div>

</div>

</div>

    );
}

export default ConvexHull;