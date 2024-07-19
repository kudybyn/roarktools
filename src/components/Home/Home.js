import MenuLayout from '../MenuLayout/MenuLayout'
import Arrow from '../../assets/homepage/arrow.svg'
import Catalog from './Calatog/Catalog'
import { useTranslation } from 'react-i18next'
import OurServices from './OurServices/OurServices'
import ContactUs from './ContactUs/ContactUs'
import { Element } from 'react-scroll'
import HomepageInfo from './HomepageInfo/HomepageInfo'
import HomepageBlogs from './HomepageBlogs/HomepageBlogs'
import useScrollToTop from '../../utils/useScrollToTop'

export default function Home() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: window.innerHeight - 50,
      behavior: 'smooth',
    })
  }

  useScrollToTop()

  const { t } = useTranslation()

  return (
    <MenuLayout>
      <div className='w-full min-h-[100vh]'>
        <div className='w-full h-[100vh] relative flex items-center justify-center'>
          <img
            src={
              'https://firebasestorage.googleapis.com/v0/b/roarktools-3c762.appspot.com/o/images%2FhomeImage.jpg?alt=media&token=eb05e64e-489c-464e-9797-5b96ef4a2064'
            }
            alt='bgImage'
            className='absolute w-full h-full object-cover'
          />
          <div className='relative z-10'>
            <h1 className='font-bold text-white text-[42px] md:text-[62px] text-center leading-[5rem] uppercase'>
              ROARK TOOLS <br /> {t('homepage.title')}
            </h1>
          </div>
          <div className='absolute w-full h-full bg-[rgba(0,0,0,0.3)] top-0'></div>
          <button
            className='z-10 absolute bottom-6 cursor-pointer scrollTоBottom'
            onClick={scrollToBottom}
          >
            <img
              src={Arrow}
              alt='scroll to bottom'
              loading='lazy'
              className='w-[50px] h-full rotate-180'
            />
          </button>
        </div>
        <div className='container mx-auto' id='catalog'>
          <Catalog />
        </div>
        <div className='bg-black'>
          <OurServices />
        </div>
        <Element name='contacts'>
          <div className='bg-white' id='contacts'>
            <ContactUs />
          </div>
        </Element>
        <div className='bg-white'>
          <HomepageInfo />
        </div>
        <div className='bg-white container mx-auto'>
          <HomepageBlogs />
        </div>
      </div>
    </MenuLayout>
  )
}
