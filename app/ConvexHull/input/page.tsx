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
  const [brute,setBrute]=useState(false);
  const [jarvis,setJarvis]=useState(false);
  const [graham,setGraham]=useState(false);
  const [quick,setQuick]=useState(false);
  const [andrew,setAndrew]=useState(false);

const [text,setText]=useState(`while(i>n){
}`);
  
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
<div className="flex mb-14 justify-between">
    <Link
    onClick={()=>setClick(true)}
    className="flex flex-row gap-x-3"
    href={"/"}
    >{click?<Loader2 className="animate-spin"/>:<><ChevronLeft/> Home</>}</Link>
    
    </div>
    <div className='flex items-center w-full bt-2 flex-row gap-x-3'>
      

{isDone&&(
  <>
  {brute&&(
    <BruteForce
    array={coordinates}/>
  )} 

{jarvis&&(
    <JarvisMarch
    array={coordinates}/>
  )}
  
  {graham&&(
    <GrahamScan
    array={coordinates}/>
  )}
  
  {quick&&(
    <QuickElimination
    array={coordinates}/>
  )}
  
  {andrew&&(
    <MonotoneChain
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
<div className='w-full mt-10 p-6 flex flex-row justify-between items-center'>
<div className='flex flex-col space-y-2 items-center'>
  <div onClick={
()=>{
 setAndrew(false);
 setGraham(false);
 setJarvis(false);
 setQuick(false);
 setBrute(true); 
}

  } className='border-2 px-12 cursor-pointer border-slate-800 rounded-md hover:shadow-lg cursor-pointer hover:text-white hover:bg-slate-800'>
    Brute Force
  </div >
  <div onClick={()=>{
    
 setAndrew(false);
 setGraham(false);
 setJarvis(true);
 setQuick(false);
 setBrute(false); 
  }} className='border-2 bg-sky-200  px-12 border-sky-500 cursor-pointer rounded-md hover:shadow-lg hover:text-white hover:bg-slate-800'>
    Jarvis March
  </div>
  <div
   onClick={()=>{
    
    setAndrew(false);
    setGraham(true);
    setJarvis(false);
    setQuick(false);
    setBrute(false); 
     }}
  className='border-2 px-12 bg-red-200 cursor-pointer hover:shadow-lg hover:text-white hover:bg-slate-800 border-red-500 rounded-md'>
    Graham Scan
  </div>
  <div 
   onClick={()=>{
    
    setAndrew(false);
    setGraham(false);
    setJarvis(false);
    setQuick(true);
    setBrute(false); 
     }}
  className='border-2 cursor-pointer px-16 bg-green-200 hover:shadow-lg hover:text-white hover:bg-slate-800   border-green-500 rounded-md'>
    Quick Hull
  </div>
  <div 
   onClick={()=>{
    
    setAndrew(true);
    setGraham(false);
    setJarvis(false);
    setQuick(false);
    setBrute(false); 
     }}
  className='border-2 cursor-pointer bg-yellow-200 px-12 border-yellow-500 rounded-md hover:shadow-lg hover:text-white hover:bg-slate-800'>
    Andrew Chains
  </div>
  
</div>
<div className='border-2   bg-slate-200/50 border-red-300 rounded-md'>
  {text}
</div>
</div>

    </div>
  )
} 
export default Input;