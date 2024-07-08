import { useTranslation } from 'react-i18next'
import MenuLayout from '../../MenuLayout/MenuLayout'
import PageHeader from 'components/common/PageHeader'
import Blogs from '../../../assets/blogs/blogTitle.svg'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from '../../../redux/slices/BlogsSlice'
import { useLocation, Link } from 'react-router-dom'
import ArrowLeft from '../../../assets/homepage/arrow-left.svg'
import { RectangularSkeleton, LinesSkeleton } from '../../common/skeletons'
import useScrollToTop from "../../../utils/useScrollToTop";

export default function SimpleBlog() {
  const { t, i18n } = useTranslation()
  useScrollToTop();
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  let data = useSelector((state) => state.blogs.data)
  const loading = useSelector((state) => state.blogs.loading)

  useEffect(() => {
    if (i18n.language) {
      dispatch(fetchData({ collectionName: i18n.language, type: 'blogs' }))
    }
  }, [dispatch, i18n.language])

  const numberOfBlog = pathname.slice(pathname.lastIndexOf('/') + 1)
  let filteredDataAll = data && data.length > 0 ? Object.values(data[0]) : []
  const filteredData =
    data && data.length > 0 ? filteredDataAll.find(item=>{
      return String(item.id) === numberOfBlog}) : []
  const { title, description, content } = filteredData

  return (
    <MenuLayout>
      <div className='w-full min-h-[100vh] pt-[100px] '>
        <PageHeader
          title={t('blogs.title').slice(0, -1)}
          srcImage={
            'https://firebasestorage.googleapis.com/v0/b/roarktools-3c762.appspot.com/o/images%2Fblog.jpg?alt=media&token=d52b1882-a970-4f38-93fa-25ea25d85de8'
          }
          srcLogo={Blogs}
        />
        <div className='w-full h-full flex justify-center'>
          <div className='container h-full min-h-[100vh] px-6 md:px-12 py-12 lg:flex flex-col gap-8 w-full'>
            <div className='flex w-full items-center flex-col gap-6 mb-[30px]'>
              <h1 className='font-bold text-[36px] uppercase'>{title}</h1>
              <h2 className='font-normal text-[24px] text-[#bebebe]'>
                {description}
              </h2>
            </div>
            {/* <TextEditor onContentChange={setContent}/> */}
            <div className='flex max-w-[1360px] w-full py-4 px-2'>
              <div
                className='w-full flex flex-col max-w-full'
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
            <div className='mt-[30px] flex flex-col gap-6'>
              <div className='w-full flex justify-center text-[36px] font-bold  uppercase'>
                {t('blogs.moreBlogs')}
              </div>
              <div className='w-full'>
                {filteredDataAll && filteredDataAll.length > 0 && (
                  <>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12 md:gap-12 py-12'>
                      {loading ? (
                        <>
                          {[1, 2, 3, 4].map((loadCount) => (
                            <div key={loadCount} className='flex flex-col'>
                              <RectangularSkeleton
                                width={'100%'}
                                height={250}
                              />
                              <LinesSkeleton width={'100%'} height={40} />
                              <LinesSkeleton width={'100%'} height={40} />
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {filteredDataAll
                            .filter((item) => item.title !== filteredData.title)
                            .map((item) => (
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
                                  <span className='text-[24px]'>
                                    {item.title}
                                  </span>
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
            </div>
          </div>
        </div>
      </div>
    </MenuLayout>
  )
}
