import { useTranslation } from 'react-i18next'
import Bolt from '../../assets/homepage/boltWhite.svg'
import MenuLayout from '../MenuLayout/MenuLayout'
import PageHeader from 'components/common/PageHeader'
import useScrollToTop from '../../utils/useScrollToTop'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchData } from '../../redux/slices/CatalogSlice'
import { RectangularSkeleton, LinesSkeleton } from 'components/common/skeletons'
import { useState } from 'react'
import Search from '../../assets/filter/search.svg'
import ArrowDown from '../../assets/resourses/arrowDown.svg'

export default function Products() {
  useScrollToTop()
  const { i18n, t } = useTranslation()


    const dispatch = useDispatch()
    let data = useSelector((state) => state.catalog.data)
    const loading = useSelector((state) => state.catalog.loading)
  
    useEffect(() => {
      if (i18n.language) {
        dispatch(fetchData({ collectionName: i18n.language, type: 'calatog' }))
      }
    }, [dispatch, i18n.language])
    const [tempSearch, setTempSearch] = useState('')
    const [selectFilter, setSelectFilter] = useState('all')
    const [openFilter, setOpenFilter] = useState(false);
    const filterTypes = ['all', 'less expensive', 'more expensive']


    const changeFilterOpen = () => {
      setOpenFilter(!openFilter)
    }
  
    const onChangeFilter = (filterType) => {
      setOpenFilter(false)
      setSelectFilter(filterType)
    }
  
    let filteredData =
      data && data.length > 0
        ? data.filter((product) =>
          product.title.toLowerCase().includes(tempSearch.toLowerCase())
        )
      : []

  switch (selectFilter) {
    case 'more expensive':
      filteredData.sort((a, b) => b.price - a.price)
      break
    case 'less expensive':
      filteredData.sort((a, b) => a.price - b.price)
      break
  }

  return (
    <MenuLayout>
      <div className='w-full min-h-[100vh] pt-[100px] '>
        <PageHeader
          title={t('routes.products')}
          srcImage={
            'https://static.wixstatic.com/media/03b30c_20c7afb5bfdd4834b56b7eb4d7a6842c~mv2_d_4032_3024_s_4_2.jpg/v1/fill/w_1080,h_813,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/03b30c_20c7afb5bfdd4834b56b7eb4d7a6842c~mv2_d_4032_3024_s_4_2.jpg'
          }
          srcLogo={Bolt}
        />
        <div className='w-full h-full flex justify-center'>
          <div className='container h-full min-h-[100vh] px-6 md:px-12 py-12 lg:flex flex-col gap-8 w-full'>
            <div className='flex items-start flex-col md:flex-row justify-between md:items-center gap-8  w-full'>
              <div className='flex gap-4 items-center'>
                <span className='text-[27px]'>{t('resourses.search')}</span>
                <div className='flex gap-2 items-center border-2 border-black rounded-xl px-2 py-1 w-full justify-between'>
                  <input
                    placeholder={t('resourses.searchPlaceholder')}
                    onChange={(e) => setTempSearch(e.currentTarget.value)}
                    value={tempSearch}
                    style={{ border: 'none' }}
                    className='rounded-xl'
                  />
                  <div className='w-[20px] h-[20px]'>
                    <img
                      src={Search}
                      alt='search resourse'
                      className='w-[20px] h-[20px]'
                    />
                  </div>
                </div>
              </div>
              <div className='relative z-100 mb-8'>
                <button
                  onClick={changeFilterOpen}
                  className='flex items-center gap-4 py-2 px-3 border-2 border-black rounded-xl'
                >
                  <div className='text-[21px] font-normal'>
                    <strong>{t('blogs.filterBy')} </strong>
                    <span>{t(`products.${selectFilter}`)}</span>
                  </div>
                  <img
                    src={ArrowDown}
                    className={`w-[20px] h-[20px] ${openFilter ? 'rotate-180' : ''} transition duration-300`}
                    alt='open filter'
                  />
                </button>
                {openFilter && (
                  <div className='absolute w-full bg-white shadow-lg rounded-xl flex flex-col z-10'>
                    {filterTypes
                      .filter((item) => item !== selectFilter)
                      .map((type, index) => (
                        <button
                          onClick={() => onChangeFilter(type)}
                          className={`border-2 cursor-pointer transition duration-300 hover:bg-[#e0e0e0] px-2 py-3
                                                        ${index === 1 ? 'rounded-b-xl' : index === 0 ? 'rounded-t-xl' : ''}`}
                        >
                          {t(`products.${type}`)}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
            {data && data.length > 0 && !loading ? (
              <>
                {filteredData.map((item, index) => (
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
                      {item.price && (
                        <div className='w-full px-4 flex justify-end'>
                          <span className='text-[21px] font-bold text-start'>
                            {item.price}
                            {t('value')}
                          </span>
                        </div>
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
          </div>
        </div>
      </div>
    </MenuLayout>
  )
}
