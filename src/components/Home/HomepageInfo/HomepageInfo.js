import { useTranslation } from "react-i18next"





export default function HomepageInfo(){
    const {t} = useTranslation();
    return(
        <div className='container mx-auto w-full  flex justify-center'>
        <div className='bg-black w-full max-w-[1360px] flex flex-col items-center justify-center gap-4 md:gap-16 grid grid-cols-1 md:grid-cols-2'>
            <div className="flex flex-col gap-8 py-16 px-8 md:px-12 text-center md:text-start">
        <h3 className='uppercase text-white text-5xl'>
          {t('homepage.aboutUs')} <span className="text-[rgba(255,0,0)]">{t('homepage.aboutUsSecondary')}</span>
        </h3>
        <span className="text-white text-[21px] font-normal">
        {t('homepage.aboutUsDesc')}
        </span>
        </div>
         <div className="w-full h-full relative">
            <div className="absolute bg-[rgba(0,0,0,0.4)] top-0 left-0 w-full h-full"></div>
          <img className="w-full object-cover h-full" src={'https://static.wixstatic.com/media/03b30c_20c7afb5bfdd4834b56b7eb4d7a6842c~mv2_d_4032_3024_s_4_2.jpg/v1/fill/w_1080,h_813,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/03b30c_20c7afb5bfdd4834b56b7eb4d7a6842c~mv2_d_4032_3024_s_4_2.jpg'} alt="design photo"/>
         </div>
            </div>
            </div>
    )
}