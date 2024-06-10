



export default function PageHeader({title,srcImage,srcLogo}){
    return(
        <div className="bg-black w-full flex justify-center relative">
        <div className="max-w-[1100px] h-[350px] md:h-auto px-6 flex w-full md:grid grid-cols-2 items-center w-full justify-center">
        <div className="flex justify-center md:justify-start gap-4 items-center w-full relative z-10">
    <h1 className="uppercase text-5xl text-white">{title}</h1>
    <img src={srcLogo} className='w-[50px] h-[50px]' alt="contact us"/></div>
        <div className="absolute top-0 left-0 w-full md:relative">
        <div className="absolute w-full h-[350px] bg-gradient-to-r from-[rgba(0,0,0,0.2)] to-black"></div>
        <div className="absolute w-full h-[350px] bg-gradient-to-l from-[rgba(0,0,0,0.2)] to-black"></div>
            <img src={srcImage}
        alt="contact us page" className="w-full h-[350px] object-cover"/></div>
        </div>
    </div>
    )
}