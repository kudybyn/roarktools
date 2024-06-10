import MainLayout from "../MenuLayout/MenuLayout";
import ResoursesImage from "../../assets/homepage/resourses.svg";
import { useTranslation } from "react-i18next";
import PageHeader from "../common/PageHeader";


export default function Resourses(){

    const {t}=useTranslation();

    return(
        <MainLayout>
                    <div className='w-full min-h-[100vh] pt-[100px] '>
            <PageHeader title={"Resourses"} 
            srcLogo={ResoursesImage}
            srcImage={"https://firebasestorage.googleapis.com/v0/b/roarktools-3c762.appspot.com/o/images%2Fresourses.png?alt=media&token=0c6b65b8-6c83-4920-a13e-2d8daca3c272"}/>

            </div>
            </MainLayout>
    )
}