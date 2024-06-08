import MenuLayout from '../MenuLayout/MenuLayout'
import Arrow from "../../assets/homepage/arrow.svg";
import Catalog from "./Calatog/Catalog";

export default function Home() {

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <MenuLayout>
      <div className="w-full h-[100vh]">
        <div className="w-full h-full relative flex items-center justify-center">
        <img src={"https://roarktools.com/wp-content/uploads/2016/10/XTR-BW-COLOR-1400.jpg"}
         alt="bgImage" className="absolute w-full h-full object-cover"/>
        <div className="relative z-10"><h1 className="font-bold text-white text-[42px] md:text-[62px] text-center leading-[5rem] uppercase">ROARK TOOLS <br/> your solution to the problem</h1></div>
         <div className="absolute w-full h-full bg-[rgba(0,0,0,0.3)] top-0"></div>
         <button className="z-10 absolute bottom-6 cursor-pointer scrollTоBottom" onClick={scrollToBottom}>
          <img src={Arrow} alt="scroll to bottom" loading='lazy'className="w-[50px] h-full rotate-180"/>
         </button>
         </div>
      <div className='container'>
        <Catalog/>
      </div>
      </div>
    </MenuLayout>
  )
}
