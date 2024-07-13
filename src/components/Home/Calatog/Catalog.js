import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { fetchData } from '../../../redux/slices/CatalogSlice'
import { RectangularSkeleton, LinesSkeleton } from '../../common/skeletons'
import { Link } from 'react-router-dom'
import Bolt from '../../../assets/homepage/bolt.svg'

export default function Catalog() {
  const { i18n, t } = useTranslation()

  const dispatch = useDispatch()
  let data = useSelector((state) => state.catalog.data)
  const loading = useSelector((state) => state.catalog.loading)

  useEffect(() => {
    if (i18n.language) {
      dispatch(fetchData({ collectionName: i18n.language, type: 'calatog' }))
    }
  }, [dispatch, i18n.language])


  return (
    <>
        <div className='w-full py-16 flex flex-col px-6 md:px-12 gap-12'>
          <div className='flex gap-4 items-center'>
            <h2 className='text-5xl uppercase'>{t('homepage.products')}</h2>{' '}
            <img src={Bolt} alt='bolt' className='w-[50px] h-[50px]' />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {data && data.length > 0 && !loading ? (
              <>
                {data.slice(0, 4).map((item, index) => (
                  <Link
                    to={`/products/${item.id}`}
                    key={index}
                    className=' shadow-xl flex flex-col gap-4 w-full items-center border-2 border-black py-6 px-2 rounded-[25px] 
                    transition duration-500 hover:scale-105'
                  >
                    <img
                      src={item.images[0].link}
                      className='h-[250px] w-auto object-cover rounded-[25px]'
                      alt={item.title}
                    />
                    <div className='h-[2px] w-full bg-black'></div>
                    <span className='text-[21px] text-center'>
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className='text-[16px] text-center text-[#bebebe]'>
                        {item.subtitle}
                      </span>
                    )}
                  </Link>
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
          <div className='flex w-full justify-center'>
            <Link
              to='/products'
              className='rounded-xl px-6 py-4 bg-black text-white
                text-[21px] transition duration-500 hover:scale-105'
            >
              {t('homepage.viewProjects')}
            </Link>
          </div>
        </div>
    </>
  )
}
