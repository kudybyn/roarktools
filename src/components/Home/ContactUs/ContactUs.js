import { useTranslation } from "react-i18next";


export default function OurServices(){
    const {t} = useTranslation();
    return(
        <div className="bg-white w-full py-16 px-6 flex flex-cols justify-center">
            <h3 className="uppercase">{t('homepage.services')}</h3>
        </div>
    )
}