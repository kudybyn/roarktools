import { useTranslation } from 'react-i18next'
import PageHeader from 'components/common/PageHeader'
import Blogs from '../../assets/blogs/blogTitle.svg'
import MenuLayout from '../MenuLayout/MenuLayout'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from '../../redux/slices/BlogsSlice'
import Search from '../../assets/filter/search.svg'
import ArrowDown from '../../assets/resourses/arrowDown.svg'
import ArrowLeft from '../../assets/homepage/arrow-left.svg'
import { RectangularSkeleton, LinesSkeleton } from '../common/skeletons'
import useScrollToTop from '../../utils/useScrollToTop';

export default function Blog() {
  const { t, i18n } = useTranslation()
  useScrollToTop();
  const dispatch = useDispatch()
  let data = useSelector((state) => state.blogs.data)
  const loading = useSelector((state) => state.blogs.loading)
  const [tempSearch, setTempSearch] = useState('')
  const [openFilter, setOpenFilter] = useState(false)
  const [selectFilter, setSelectFilter] = useState('all')
  const filterTypes = ['all', 'new', 'old']

  useEffect(() => {
    if (i18n.language) {
      dispatch(fetchData({ collectionName: i18n.language, type: 'blogs' }))
    }
  }, [dispatch, i18n.language])

  const changeFilterOpen = () => {
    setOpenFilter(!openFilter)
  }

  const onChangeFilter = (filterType) => {
    setOpenFilter(false)
    setSelectFilter(filterType)
  }

  let filteredData =
    data && data.length > 0
      ? Object.values(data[0]).filter((brochure) =>
          brochure.title.toLowerCase().includes(tempSearch.toLowerCase())
        )
      : []

  switch (selectFilter) {
    case 'new':
      filteredData.sort((a, b) => {
        let dateA = new Date(
          a.createdBy.seconds * 1000 + a.createdBy.nanoseconds / 1000000
        )
        let dateB = new Date(
          b.createdBy.seconds * 1000 + b.createdBy.nanoseconds / 1000000
        )
        return dateB - dateA // descending order for newest first
      })
      break
    case 'old':
      filteredData.sort((a, b) => {
        let dateA = new Date(
          a.createdBy.seconds * 1000 + a.createdBy.nanoseconds / 1000000
        )
        let dateB = new Date(
          b.createdBy.seconds * 1000 + b.createdBy.nanoseconds / 1000000
        )
        return dateA - dateB // ascending order for oldest first
      })
      break
  }

  return (
    <MenuLayout>
      <div className='w-full min-h-[100vh] pt-[100px] '>
        <PageHeader
          title={t('blogs.title')}
          srcImage={
            'https://firebasestorage.googleapis.com/v0/b/roarktools-3c762.appspot.com/o/images%2Fblog.jpg?alt=media&token=d52b1882-a970-4f38-93fa-25ea25d85de8'
          }
          srcLogo={Blogs}
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
              <div className='relative'>
                <button
                  onClick={changeFilterOpen}
                  className='flex items-center gap-4 py-2 px-3 border-2 border-black rounded-xl'
                >
                  <div className='text-[21px] font-normal'>
                    <strong>{t('blogs.filterBy')} </strong>
                    <span>{t(`blogs.${selectFilter}`)}</span>
                  </div>
                  <img
                    src={ArrowDown}
                    className={`w-[20px] h-[20px] ${openFilter ? 'rotate-180' : ''} transition duration-300`}
                    alt='open filter'
                  />
                </button>
                {openFilter && (
                  <div className='absolute w-full bg-white shadow-lg rounded-xl flex flex-col'>
                    {filterTypes
                      .filter((item) => item !== selectFilter)
                      .map((type, index) => (
                        <button
                          onClick={() => onChangeFilter(type)}
                          className={`border-2 cursor-pointer transition duration-300 hover:bg-[#e0e0e0] px-2 py-3
                                                        ${index === 1 ? 'rounded-b-xl' : index === 0 ? 'rounded-t-xl' : ''}`}
                        >
                          {t(`blogs.${type}`)}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className='w-full'>
              {filteredData && filteredData.length > 0 && (
                <>
                  <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12 md:gap-12 py-12'>
                    {loading ? (
                      <>
                        {[1, 2, 3, 4].map((loadCount) => (
                          <div key={loadCount} className='flex flex-col'>
                            <RectangularSkeleton width={'100%'} height={250} />
                            <LinesSkeleton width={'100%'} height={40} />
                            <LinesSkeleton width={'100%'} height={40} />
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {filteredData.map((item) => (
                          <div
                            className='flex flex-col gap-6 w-full'
                            key={item.id}
                          >
                            {item.images && item.images[0].link && (
                              <img
                                src={item.images[0].link}
                                alt={item.title}
                                className='w-full h-[250px] object-cover'
                              />
                            )}
                            {item.title && (
                              <span className='text-[24px]'>{item.title}</span>
                            )}
                            {item.description && (
                              <div className='h-[150px]'>
                                <span className='text-[18px]  text-[#bebebe] font-normal h-auto line-clamp-6'>
                                  {item.description}
                                </span>
                              </div>
                            )}
                            <Link
                              to={`/blog/${item.id}`}
                              className='text-[rgb(255,0,0)] font-semibold text-[28px] flex items-center
                                    gap-2 transition duration-500 hover:scale-105'
                            >
                              {t('homepage.readMore')}{' '}
                              <img
                                src={ArrowLeft}
                                alt={`read more ${item.title}`}
                                className='w-[40px] h-[40px]'
                              />
                            </Link>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            {/*Blogs */}
          </div>
        </div>
      </div>
    </MenuLayout>
  )
}
