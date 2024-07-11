
import Bolt from '../../../assets/homepage/boltWhite.svg';
import { useTranslation } from "react-i18next"
import { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MenuLayout from '../../MenuLayout/MenuLayout'
import PageHeader from 'components/common/PageHeader'
import { useLocation } from 'react-router-dom'
import {fetchData} from "../../../redux/slices/CatalogSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  autoplaySpeed: 5000
  };



export default function Product(){
    const { i18n, t } = useTranslation()
    const tabs = ['manuals','technicals data','schemas']

    const { pathname } = useLocation()
    const [activeTab,setActiveTab] = useState('manuals');
    const dispatch = useDispatch()
    let data = useSelector((state) => state.catalog.data)
    const loading = useSelector((state) => state.catalog.loading)
    
  
    useEffect(() => {
      if (i18n.language) {
        dispatch(fetchData({ collectionName: i18n.language, type: 'calatog' }))
      }
    }, [dispatch, i18n.language])

    const numberOfBlog = pathname.slice(pathname.lastIndexOf('/')+1)
    const filteredData =
      data && data.length > 0 ? data.find(item=>{
        return String(item.id) === numberOfBlog}) : []

    

    if(!filteredData){
     return <MenuLayout>
              <div className='w-full min-h-[100vh] pt-[100px] '>
</div>
        </MenuLayout>
    }



    return(
        <MenuLayout>
        <div className='w-full min-h-[100vh] pt-[100px] '>
          <PageHeader
            title={filteredData.title ?? ""}
            srcImage={
              'https://static.wixstatic.com/media/03b30c_20c7afb5bfdd4834b56b7eb4d7a6842c~mv2_d_4032_3024_s_4_2.jpg/v1/fill/w_1080,h_813,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/03b30c_20c7afb5bfdd4834b56b7eb4d7a6842c~mv2_d_4032_3024_s_4_2.jpg'
            }
            srcLogo={Bolt}
          />
                            <div className='w-full h-full flex justify-center'>
                            <div className='container h-full min-h-[100vh] px-6 md:px-12 py-12 flex flex-col gap-8 w-full justify-start'>
                                {filteredData.subtitle && 
                                <div className="mb-4 lg:mb-12 flex justify-center"><span className='text-[27px] text-center text-[#bebebe]'>{filteredData.subtitle}</span></div>}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[1260px] mx-auto">
                                  <div className="w-full h-full max-h-[200px] md:max-h-[400px]">
                                <Slider {...settings}>
                                    {filteredData.images && filteredData.images.length>0 && filteredData.images.map((image,index)=>
                                    <img src={image.link} alt="product image" key={index} className="h-full w-full min-h-[200px]
                                    max-h-[200px] md:min-h-[400px] md:max-h-[400px] object-contain"/>)}
                                    </Slider>
                                    </div><div className="flex flex-col justify-between px-2 lg:px-8">
                                <div className="flex flex-col gap-4 lg:gap-2 ">
                                 {filteredData.title && <span className="text-[27px] uppercase font-bold">{filteredData.title}</span>}
                                 {filteredData.description && <span className="text-[21px] text-[#bebebe] font-normal">{filteredData.description}</span>}
                                 {filteredData.price && <span className="text-[21px]  pt-2 font-bold">{filteredData.price}{t('value')}</span>}
                                </div>
                                <button className="rounded-xl mt-4 lg:mt-0 border-2 border-black bg-black py-4 px-6 text-white w-max font-bold text-[24px] 
                                transition duration-500 hover:bg-white hover:text-black">
                                Add to bucket
                                </button>
                                </div>
                                </div>
                                <div className="w-full max-w-[1260px] flex flex-col items-center mx-auto my-16 gap-4 lg:gap-8">
                                  {filteredData.features && <><h3 className="font-bold text-[27px] uppercase">Features</h3>
                                  <div className="w-full flex items-center flex-col gap-2 lg:gap-6 mb-4">
                                    {filteredData.features && filteredData.features.map((feature)=>
                                    <div className="w-full flex justify-center" key={feature.id}>
                                      <span className="text-[21px] font-bold text-center">• {feature.text}</span>
                                      </div>)}
                                  </div></>}
                                  <div className="flex mb-4 ">
                                    {tabs && tabs.map((tab,index)=>(
                                      <div className={`border-2 border-black ${index===0?'rounded-l-xl':""} ${index===2?'rounded-r-xl':""} cursor-pointer
                                      py-2 px-4 capitalize font-bold text-[16px] md:text-[21px] transition duration-300 hover:bg-black
                                      hover:text-white ${tab===activeTab?"bg-black text-white":""}`} onClick={()=>setActiveTab(tab)} key={index}>{tab}</div>
                                    ))}
                                  </div>

                                  {activeTab==='manuals' && filteredData.manuals &&
                                  <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
                                      {filteredData.manuals.length && filteredData.manuals.map((manual)=>
                                      <img src={manual.link} className="w-full object-contain h-[300px] lg:h-[500px]" key={manual.id}/>)}
                                  </div>}
                                  {activeTab==='technicals data' && filteredData.technicalData &&
                                  <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
                                      {filteredData.technicalData.length && filteredData.technicalData.map((technical)=>
                                      <img src={technical.link} className="w-full object-contain h-[300px] lg:h-[500px]" key={technical.id}/>)}
                                  </div>}
                                  {activeTab==='schemas' && filteredData.schema &&
                                  <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
                                      {filteredData.schema.length && filteredData.schema.map((schema)=>
                                      <img src={schema.link} className="w-full object-contain h-[300px] lg:h-[500px]" key={schema.id}/>)}
                                  </div>}
                                </div>

                                </div>
                                </div>
                                </div>
                                </MenuLayout>

    )
}