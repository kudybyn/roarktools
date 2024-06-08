import MenuLayout from '../MenuLayout/MenuLayout'
import Arrow from "../../assets/homepage/arrow.svg";

export default function Home() {

  return (
    <MenuLayout>
      <div className="w-full h-[86vh]">
        <div className="w-full h-full relative flex items-center justify-center">
        <img src={"https://roarktools.com/wp-content/uploads/2016/10/XTR-BW-COLOR-1400.jpg"}
         alt="bgImage" className="absolute w-full h-full object-cover"/>
        <div className="relative z-10"><h1 className="font-bold text-white text-[48px] md:text-[62px] text-center leading-[5rem] uppercase">ROARK TOOLS <br/> your solution to the problem</h1></div>
         <div className="absolute w-full h-full bg-[rgba(0,0,0,0.3)] top-0"></div>
         <div className="z-10 absolute">
          <img src={Arrow} alt="scroll to bottom" loading='lazy'/>
         </div>
         </div>
      <div className='container'></div>
      </div>
    </MenuLayout>
  )
}
