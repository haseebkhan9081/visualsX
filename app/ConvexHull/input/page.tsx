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

function Input() {
    const router=useRouter();
    const [click,setClick]=useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isDone,setIsDone]=useState(false);
  const [coordinates,setCoordinates]=useState<PointType[]>([]);
 useEffect(()=>{
    if(coordinates?.length<4){
        setIsOpen(true)
     }else{
        setIsOpen(false);
     }
 },[]);
 
  
  return (
    <div className='p-6'>
    <Dialog className="relative z-50" open={isOpen} onClose={() => setIsOpen(false)}>
      
     
     <div className="fixed inset-0 bg-blue-50/10 " aria-hidden="true" />

{/* Full-screen container to center the panel */}
<div className="fixed inset-0    flex w-screen items-center justify-center p-4">
 
     <Dialog.Panel className="bg-slate-50 rounded-md border-2 border-sky-200 w-full h-full flex flex-col items-center  ">
        <Dialog.Title className="text-xl mt-2 text-slate-700 font-semibold">Draw the input Points</Dialog.Title>
        <Dialog.Description className="text-slate-500 ">
          note that the number of points must be gtreater than 3
        </Dialog.Description>
<InputCanvas
setIsDone={setIsDone}
onChange={setCoordinates}
data={coordinates!}
setIsOpen={setIsOpen}
/>
        
 
      </Dialog.Panel>
      </div>
    </Dialog>

<div className='w-full flex flex-col space-y-2'>
<div className="flex justify-between">
    <Link
    onClick={()=>setClick(true)}
    className="flex flex-row gap-x-3"
    href={"/"}
    >{click?<Loader2 className="animate-spin"/>:<><ChevronLeft/> Home</>}</Link>
    
    </div>
    <div className='flex items-center w-full bt-2 flex-row gap-x-3'>
       {/* <JarvisMarch
       array={coordinates}
       /> */}
{/* <BruteForce
array={coordinates}
/> */}

{isDone&&(
 <QuickElimination
 array={coordinates}
 />
)}
    </div>
</div>


    </div>
  )
} 
export default Input;