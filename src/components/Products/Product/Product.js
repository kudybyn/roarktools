
import Bolt from '../../../assets/homepage/boltWhite.svg';
import { useTranslation } from "react-i18next"
import { useEffect } from 'react'
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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  autoplaySpeed: 5000
  };



export default function Product(){
    const { i18n, t } = useTranslation()

    const { pathname } = useLocation()
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


        console.log(filteredData)
    return(
        <MenuLayout>
        <div className='w-full min-h-[100vh] pt-[100px] '>
          <PageHeader
            title={filteredData.title}
            srcImage={
              'https://static.wixstatic.com/media/03b30c_20c7afb5bfdd4834b56b7eb4d7a6842c~mv2_d_4032_3024_s_4_2.jpg/v1/fill/w_1080,h_813,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/03b30c_20c7afb5bfdd4834b56b7eb4d7a6842c~mv2_d_4032_3024_s_4_2.jpg'
            }
            srcLogo={Bolt}
          />
                            <div className='w-full h-full flex justify-center'>
                            <div className='container h-full min-h-[100vh] px-6 md:px-12 py-12 flex flex-col gap-8 w-full justify-center'>
                                {filteredData.subtitle && 
                                <div className="mb-12 flex justify-center"><span className='text-[27px] text-center text-[#bebebe]'>{filteredData.subtitle}</span></div>}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[1260px] mx-auto">
                                <Slider {...settings} className="flex w-full max-h-[500px]">
                                    {filteredData.images && filteredData.images.length>0 && filteredData.images.map((image,index)=>
                                    <img src={image.link} alt="product image" key={index} className="max-h-[500px] object-contain"/>)}
                                    </Slider><div className="flex flex-col justify-between px-8">
                                <div className="flex flex-col gap-2">
                                 {filteredData.title && <span className="text-[27px] uppercase font-bold">{filteredData.title}</span>}
                                 {filteredData.title && <span className="text-[21px] text-[#bebebe] font-normal">{filteredData.title}</span>}
                                 {filteredData.price && <span className="text-[21px]  pt-2 font-bold">{filteredData.price}{t('value')}</span>}
                                </div>
                                <button className="rounded-xl border-2 border-black bg-black py-4 px-6 text-white w-max font-bold text-[24px] 
                                transition duration-500 hover:bg-white hover:text-black">
                                Add to cart
                                </button>
                                </div>
                                </div>
                                <div>fff</div>
                                </div>
                                </div>
                                </div>
                                </MenuLayout>

    )
}