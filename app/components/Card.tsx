"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";  
interface AlgoCardProps{
    src?:string;
    title:string;
    des:string;
    destination:string;

}
const AlgoCard:React.FC<AlgoCardProps>=({
    src,
    title,
    des,
    destination
})=>{
const router=useRouter()
    const [click,setClick]=useState(false);

    const onClick=()=>{
setClick(true);
router.push(`/${destination}`);

}


  return (

    <div>
      <Card className="w-[300px]">
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{des}</CardDescription>
  </CardHeader>
  <CardContent>
   {src&&(
    <Image
    alt="alt"
    src={src!}
    width={300}
    height={300}
    />
   )} 
  </CardContent>
  <CardFooter className="flex items-center justify-center">
      <Button
      type="button"
      onClick={onClick}>
     {click?<Loader2 className="animate-spin"/>:"Start Exploring"}   
      </Button>
  </CardFooter>
</Card>

    </div>
  );  
}


export default AlgoCard;