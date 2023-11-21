"use client";
import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import InputCanvas from '@/app/components/InputCanvas';
import { Button } from '@/components/ui/button';
import PointType from '@/app/types/Point';
import { ChevronLeft, Loader2, Router } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import JarvisMarch from '@/app/algorithms/JarvisMarch';
import BruteForce from '@/app/algorithms/BruteForce';
import GrahamScan from '@/app/algorithms/GrahamScan';
import MonotoneChain from '@/app/algorithms/MonotoneChain';
import QuickElimination from '@/app/algorithms/QuickElimination';
import Code from '@/app/components/Code';
import InputCanvasLine from './InputCanvasLine';
import CcWLineIntersection from '../algorithms/CcwLineIntersection';
import LineIntersectionAlgebra from '../algorithms/LineIntersectionDenominator';
import LineIntersectionSlope from '../algorithms/LintersectionSlope';


const LineIntersection=()=>{
  const [CodeText,setCodeText]=useState(`//please select an algorithm
//by clicking on the buttons
//to the left side
//if lines overlaps over the
//previous lines,Refresh
//Encountered an issue😒?
//Report to aa9081haseeb@gmail.com
//with details on the problem and
//how to reproduce it. 
//Your feedback is crucial
//for improving our software.
//© All rights reserved`);
    const [lines,setLines]=useState([]);
    const router=useRouter();
    const [click,setClick]=useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isDone,setIsDone]=useState(false);
  const [coordinates,setCoordinates]=useState<PointType[]>([]);
  const [ccw,setCcw]=useState(false);
  const [algebra,setAlgebra]=useState(false);
  const [slop,setSlope]=useState(false);



    return (

<div className='p-6'>
    <Dialog className="relative z-50" open={isOpen} onClose={() => setIsOpen(false)}>
      
     
     <div className="fixed inset-0 bg-blue-50/10 " aria-hidden="true" />

{/* Full-screen container to center the panel */}
<div className="fixed inset-0    flex w-screen items-center justify-center p-4">
 
     <Dialog.Panel className="bg-slate-50 rounded-md border-2 border-sky-200 w-full h-full flex flex-col items-center  ">
        <Dialog.Title className="text-xl mt-2 text-slate-700 font-semibold">Draw the end-Points for both the lines</Dialog.Title>
        <Dialog.Description className="text-slate-500 ">
          note that the number of points must be   4
        </Dialog.Description>
<InputCanvasLine
setIsDone={setIsDone}
onChange={setCoordinates}
data={coordinates!}
setIsOpen={setIsOpen}
/>
        
 
      </Dialog.Panel>
      </div>
    </Dialog>

<div className='w-full flex flex-col space-y-2'>
<div className="flex   justify-between">
    <Link
    onClick={()=>setClick(true)}
    className="flex flex-row gap-x-3"
    href={"/"}
    >{click?<Loader2 className="animate-spin"/>:<><ChevronLeft/> Home</>}</Link>
    
    </div>
    <div className='flex items-center w-full  bg-transparent flex-row gap-x-3'>
      

{isDone&&(
  <>
  {ccw&&(
    <CcWLineIntersection
    // @ts-ignore
    setLines={setLines!}
    setCode={setCodeText}
    array={coordinates}/>
  )} 

{algebra&&(
    <LineIntersectionAlgebra
    setCode={setCodeText}
    // @ts-ignore
    setLines={setLines}
    array={coordinates}/>
  )}
  
{slop&&(
    <LineIntersectionSlope
    setCode={setCodeText}
    // @ts-ignore
    setLines={setLines}
    array={coordinates}/>
  )}
</>
)}

    </div>
</div>
<div className=' flex justify-between items-center'>
<div>
  <Button onClick={
    ()=>{setIsOpen(true);
  }}
  >Edit Points</Button>
</div>
</div>
<div className='w-full mt-6    flex flex-row justify-between items-center'>
<div className='flex flex-col space-y-2 items-center'>
  <div onClick={
()=>{
  setAlgebra(false);
  setSlope(false);
  router.refresh();
 
  setCcw(true); 
}

  } className='border-2 px-12 cursor-pointer border-slate-800 rounded-md hover:shadow-lg cursor-pointer hover:text-white hover:bg-slate-800'>
    CCW Method
  </div >
  <div onClick={()=>{
    setCcw(false); 
    setSlope(false);
    router.refresh();
 setAlgebra(true);
 
  }} className='border-2 bg-sky-200  px-12 border-sky-500 cursor-pointer rounded-md hover:shadow-lg hover:text-white hover:bg-slate-800'>
    Denominator method
  </div>
   
  <div onClick={()=>{
    setCcw(false); 
    setAlgebra(false);
    router.refresh();
    setSlope(true);
 
  }} className='border-2 bg-sky-200  px-12 border-sky-500 cursor-pointer rounded-md hover:shadow-lg hover:text-white hover:bg-slate-800'>
    Slop method
  </div>
   
  
</div>
<div className='border-2    bg-transparent border-red-300 rounded-md'>
 <Code
 code={CodeText}
 highlightedLines={lines}
 />
</div>
</div>

    </div>

    );
}

export default LineIntersection;