import BruteForce from "./algorithms/BruteForce";
import JarvisMarch from "./algorithms/JarvisMarch";
import GrahamScan from "./algorithms/GrahamScan";
import QuickElimination from "./algorithms/QuickElimination";
import CcWLineIntersection from "./algorithms/CcwLineIntersection";
import LineIntersectionAlgebra from "./algorithms/LineIntersectionDenominator";
import MonotoneChain from "./algorithms/MonotoneChain";
import AlgoCard from "./components/Card";
 export default function Home() {
  return (
    <div
    className=" bg-slate-50 p-6 w-full h-screen flex flex-col gap-y-2">
 <div className="flex flex-col space-y-3 w-full items-center justify-center">
  <p className="text-slate-600">Welcome to </p>
  <h1 className="text-4xl font-bold">VisualsX🚀</h1>
  <p className="text-slate-600">Please Choose which algorithms do you want to Visualize! </p>
 </div>
<div className=" mt-6 w-full flex items-center justify-center">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex flex-row items-center justify-center">
  <AlgoCard
  title="Convex Hull"
  destination="ConvexHull"
  des="Explore different algorithms for finding Convex Hull"
  src={"https://raw.githubusercontent.com/haseebkhan9081/visualsX/4599ed6a9d602cbeb6770b1a31e407975be0dca0/public/The-definition-of-convex-hull-In-the-figure-the-polygon-is-the-convex-hull-of-the-point.png"}
  />
  <AlgoCard
  title="Line Intersection"
  destination="LineIntersection"
  des="Explore different algorithms for finding Line Intersection"
 src="https://raw.githubusercontent.com/haseebkhan9081/visualsX/main/public/original_Picture7.png"
 />
</div>

</div>
    </div>
  )
}
