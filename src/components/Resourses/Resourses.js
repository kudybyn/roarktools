import MainLayout from "../MenuLayout/MenuLayout";
import ResoursesImage from "../../assets/homepage/resourses.svg";
import { useTranslation } from "react-i18next";
import PageHeader from "../common/PageHeader";
import Search from "../../assets/filter/search.svg";
import { useState,useEffect } from "react";
import ArrowDown from "../../assets/resourses/arrowDown.svg";
import Close from "../../assets/homepage/close-black.svg";
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from '../../redux/slices/ResoursesSlice';
import { RectangularSkeleton, LinesSkeleton } from '../common/skeletons'
import useScrollToTop from '../../utils/useScrollToTop';

export default function Resourses() {
    const { t,i18n } = useTranslation();
    useScrollToTop();
    const dispatch = useDispatch()
    let data = useSelector((state) => state.resourses.data[0])
    const loading = useSelector((state) => state.resourses.loading)
  
    useEffect(() => {
      if (i18n.language) {
        dispatch(fetchData({ collectionName: i18n.language, type: 'resourses' }))
      }
    }, [dispatch, i18n.language])
    const [openFilterCategory, setOpenFilterCategory] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(['brochures', 'manuals']);
    const [tempSearch,setTempSearch] = useState("");


    const onOpenFilterCategory = (open) => {
        setOpenFilterCategory(open);
    };

    const onChangeCategories = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(item => item !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };


    let brochuresLocal = []
    let manualsLocal = []
    if(data && data.brochures && data.manuals){
        const {brochures,manuals} = data;
        brochuresLocal=brochures.filter((brochure)=>brochure.title.toLowerCase().includes(tempSearch.toLowerCase()))
        manualsLocal=manuals.filter((manual)=>manual.title.toLowerCase().includes(tempSearch.toLowerCase()))
    }


    return (
        <MainLayout>
            <div className='w-full min-h-[100vh] pt-[100px]'>
                <PageHeader title={t('resourses.resourses')} 
                    srcLogo={ResoursesImage}
                    srcImage={"https://firebasestorage.googleapis.com/v0/b/roarktools-3c762.appspot.com/o/images%2Fresourses.png?alt=media&token=0c6b65b8-6c83-4920-a13e-2d8daca3c272"}
                />

                <div className="w-full h-full flex justify-center">
                    <div className="container h-full min-h-[100vh] px-6 md:px-12 py-12 lg:flex flex-col gap-8 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-1fr2fr1fr gap-8  items-start w-full">
                            <div className="flex gap-4 items-center">
                                <span className="text-[27px]">{t('resourses.search')}</span>
                                <div className="flex gap-2 items-center border-2 border-black rounded-xl px-2 py-1 w-full justify-between">
                                    <input placeholder={t('resourses.searchPlaceholder')}
                                    onChange={(e)=>setTempSearch(e.currentTarget.value)}
                                    value={tempSearch} style={{border:'none'}} className="rounded-xl"/>
                                    <div className="w-[20px] h-[20px]"><img src={Search} alt="search resourse" className="w-[20px] h-[20px]"/></div>
                                </div>
                            </div>
                            <div className="flex gap-4 flex-wrap">
                                <div className="relative">
                                    <button className="flex gap-2 items-center px-3 py-2 border-2 border-black rounded-xl" onClick={() => onOpenFilterCategory(!openFilterCategory)}>
                                        <span className="text-[21px]">{t('resourses.select')}</span>
                                        <img src={ArrowDown} className={`w-[20px] h-[20px] ${openFilterCategory ? "rotate-180" : ""} transition duration-300`} alt="open filter category"/>
                                    </button>
                                    {openFilterCategory && (
                                        <div className="absolute w-full bg-white shadow-lg rounded-xl">
                                            <div className="px-4 py-4 font-semibold flex justify-between items-center">
                                                <span>{t('resourses.brochures')}</span>
                                                <input type='checkbox' onChange={() => onChangeCategories('brochures')} checked={selectedCategories.includes('brochures')} className={`border-2 cursor-pointer`}/>
                                            </div>
                                            <div className="px-4 py-4 font-semibold flex justify-between items-center">
                                                <span>{t('resourses.manuals')}</span>
                                                <input type='checkbox' onChange={() => onChangeCategories('manuals')} checked={selectedCategories.includes('manuals')} className={`border-2 cursor-pointer `}/>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {selectedCategories.map((category)=>(
                                                <div key={category} className="capitalize flex gap-1 text-redColor items-center px-3
                                                h-max
                                                 py-2 border-2 border-redColor rounded-xl">
                                                    <span className="text-[21px]">{category==="brochures"?t('resourses.brochures'):t('resourses.manuals')}</span>
                                                    <button
                                                    onClick={() => onChangeCategories(category)}><img src={Close} alt="delete category"  className="w-[30px] h-[30px]"/></button></div>
                                            ))}
                            </div>
                        </div>
                        <div className="w-full">
                            {brochuresLocal && selectedCategories.includes('brochures') && brochuresLocal.length>0 && 
                            <>
                            <div className='w-full flex justify-center'><h4 className="uppercase text-5xl text-black py-8">
                                {t('resourses.brochures')}
                                </h4></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12 py-12">
                              {loading? 
                                <>
                                  {[1, 2, 3, 4].map((loadCount) => (
                                    <div key={loadCount} className='flex flex-col'>
                                      <RectangularSkeleton width={'100%'} height={250} />
                                      <LinesSkeleton width={'100%'} height={40} />
                                      <LinesSkeleton width={'100%'} height={40} />
                                    </div>
                                  ))}
                                  </>
                              :brochuresLocal.map((brochure)=>(
                                <a target="_blank" href={brochure.link} className="flex flex-col items-center gap-4 transition duration-300 hover:scale-105" key={brochure.title}>
                                    {brochure.imageSrc && <img src={brochure.imageSrc} alt={brochure.title} className="w-full object-contain h-[250px]"/>}
                                    <span className="text-redColor text-[24px] text-center
                                    ">{brochure.title}</span>
                                    </a>
                              ))}
                            </div>
                                </>}

</div>
<div className="w-full">
                            {manualsLocal && selectedCategories.includes('manuals') && manualsLocal.length>0 && 
                            <>
                            <div className='w-full flex justify-center'><h4 className="uppercase text-5xl text-black pb-8">
                               {t('resourses.manuals')}
                                </h4></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12 py-12">
                              {loading? 
                                <>
                                  {[1, 2, 3, 4].map((loadCount) => (
                                    <div key={loadCount} className='flex flex-col'>
                                      <RectangularSkeleton width={'100%'} height={250} />
                                      <LinesSkeleton width={'100%'} height={40} />
                                      <LinesSkeleton width={'100%'} height={40} />
                                    </div>
                                  ))}
                                  </>
                              :manualsLocal.map((brochure)=>(
                                <a target="_blank" href={brochure.link} className="flex flex-col items-center gap-4 transition duration-300 hover:scale-105" key={brochure.title}>
                                     {brochure.imageSrc && <img src={brochure.imageSrc} alt={brochure.title} className="w-full object-contain h-[250px]"/>}
                                    <span className="text-redColor text-[24px] text-center
                                    ">{brochure.title}</span>
                                    </a>
                              ))}
                            </div>
                                </>}

</div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
