import { useTranslation } from "react-i18next";
import RequestForm from "../../RequestForm/RequestForm";
import Contact from '../../../assets/homepage/contact-black.svg'


export default function ContactUs({title=true}){
    const {t} = useTranslation();
    return(
        <> <div className="bg-white w-full py-16 px-6 flex flex-col justify-center gap-12 items-center">
            {title && <div className="flex gap-4 items-center">
            <h3 className="uppercase text-5xl">{t('burger-menu.contactUs')}</h3>
            <img src={Contact} className='w-[50px] h-[50px]' alt="contact us"/></div>}
            <RequestForm/>
        </div>
        </>
    )
}