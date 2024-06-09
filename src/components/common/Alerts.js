import { useState,useEffect } from "react";
import Close from "../../assets/homepage/close.svg";



export default function Alert({duration=5000,open,color="#008000",textColor="white",setOpen,text}){
    const [openAlert,setOpenAlert] = useState(open);

    useEffect(()=>{
       setOpenAlert(open)
    },[open])

 return(
    <>
    {openAlert && <div className={`fixed bottom-[30px] right-[30px]`}>
        <div className={`rounded px-4 py-2 text-[18px] flex `} style={{background:color,color:textColor}}>
            <span>
    {text}</span>
    <button onClick={()=>setOpen(false)}>
    <img src={Close} alt="close alert" className="w-[30px] h-[30px]"/>
    </button>
    </div>
    </div>}
    </>
 )
}