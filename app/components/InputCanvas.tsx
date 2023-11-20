"use client";
import React, { useEffect,useState } from "react";
import PointType from "../types/Point";
import Point from "./Point";
import { Button } from "@/components/ui/button";
import { AlertOctagonIcon, AlertTriangleIcon } from "lucide-react";
import { error } from "console";
interface InputCanvasProps{
    onChange:( coordinates: PointType[])=>void;
    data:PointType[];
    setIsOpen:(x:boolean)=>void;
    setIsDone:(x:boolean)=>void;
}
const InputCanvas:React.FC<InputCanvasProps>=({
onChange,
data,
setIsOpen,
setIsDone
})=>{
    const [Error,setError]=useState(false);
    const [coordinates, setCoordinates] = useState<PointType[]>([]);
    const handleClick = (event:React.MouseEvent) => {
        const { clientX, clientY } = event;
        const newCoordinate = { x: clientX, y: clientY };
        
        setCoordinates((prevCoordinates) => [...prevCoordinates!, newCoordinate]);
        
    
      };
useEffect(()=>{
    if(coordinates.length>3){
        setError(false);
     }
},[coordinates]);


    return <div
    className="bg-white rounded-md mt-4  border-2 border-red-300 p-6 w-[600px] h-[400px] border" >
<div className="flex w-full gap-x-3 flex-row justify-center items-center">
{Error&&(
<>    <AlertTriangleIcon className="text-red-700"/> <p className="
text-slate-500 font-medium ">number 
of Points must be greater than 3</p>
</>)}

</div>
<div className="w-full h-full " onClick={handleClick}>

{coordinates && coordinates.map((point, index) => (
             <Point   key={index} x={point.x} y={point.y} />
             
                     ))}
</div>

<div className='flex p-6 gap-x-3 w-full mt-4 flex-row justify-center items-center '>
<Button onClick={()=>{
    if(coordinates.length<4){
        setError(true);
    }else{
        onChange(coordinates!);
        setIsDone(true);
    setIsOpen(false)}
    }}>Done</Button>
<Button
onClick={()=>setIsOpen(false)}
>Cancel</Button>
<Button onClick={()=>{
    setError(false);
    setCoordinates([]);
    
}}>Reset</Button>
 </div>
    </div>
}

export default InputCanvas;