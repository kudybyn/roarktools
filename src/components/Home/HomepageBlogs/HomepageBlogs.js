import Blogs from "../../../assets/homepage/blogs.svg";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchData } from '../../../redux/slices/BlogsSlice'
import { useTranslation } from 'react-i18next'
import { RectangularSkeleton, LinesSkeleton } from '../../common/skeletons'
import {Link} from "react-router-dom";
import ArrowLeft from "../../../assets/homepage/arrow-left.svg";



export default function HomepageBlogs(){

    const { i18n, t } = useTranslation();
    const dispatch = useDispatch()
    let data = useSelector((state) => state.blogs.data)
    const loading = useSelector((state) => state.blogs.loading)
  
    useEffect(() => {
      if (i18n.language) {
        dispatch(fetchData({ collectionName: i18n.language, type: 'blogs' }))
      }
    }, [dispatch, i18n.language])

    

    return(
        <>
          <div className='w-full py-20 flex flex-col px-6 md:px-12 gap-12'>
            <div className='flex gap-4 items-center'>
              <h2 className='text-5xl uppercase'>{t('homepage.blogs')}</h2>{' '}
              <img src={Blogs} alt='bolt' className='w-[50px] h-[50px]' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {data && data.length > 0 && !loading ? (
              <>
                {data.slice(0, 4).map((item) => (
                  <div className="flex flex-col gap-6 w-full" key={item.id}>
                    {item.images && item.images[0].link &&
                    <img src={item.images[0].link} alt={item.title} className="w-full h-[250px] object-cover"/>}
                    {item.title && <span className='text-[24px]'>
                      {item.title}
                    </span>}
                    {item.description && (
                      <span className='text-[18px]  text-[#bebebe] font-normal line-clamp-6'>
                        {item.description}
                      </span>
                    )}
                    <Link to={`/blog/${item.id}`} className="text-[rgb(255,0,0)] font-semibold text-[28px] flex items-center
                    gap-2 transition duration-500 hover:scale-105">{t('homepage.readMore')} <img src={ArrowLeft}
                    alt={`read more ${item.title}`} className="w-[40px] h-[40px]"/></Link>
                  </div>
                ))}
              </>
            ) : (
              <>
                {[1, 2, 3, 4].map((loadCount) => (
                  <div key={loadCount} className='flex flex-col'>
                    <RectangularSkeleton width={'100%'} height={250} />
                    <LinesSkeleton width={'100%'} height={40} />
                    <LinesSkeleton width={'100%'} height={40} />
                  </div>
                ))}
              </>
            )}
            </div>
            </div>
            </>
    )
}