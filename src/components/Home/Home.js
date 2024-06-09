import MenuLayout from '../MenuLayout/MenuLayout'
import Arrow from '../../assets/homepage/arrow.svg'
import Catalog from './Calatog/Catalog'
import { useTranslation } from 'react-i18next'
import OurServices from './OurServices/OurServices'
import ContactUs from './ContactUs/ContactUs'

export default function Home() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: window.innerHeight - 50,
      behavior: 'smooth',
    })
  }

  const { t } = useTranslation()

  return (
    <MenuLayout>
      <div className='w-full min-h-[100vh]'>
        <div className='w-full h-[100vh] relative flex items-center justify-center'>
          <img
            src={
              'https://roarktools.com/wp-content/uploads/2016/10/XTR-BW-COLOR-1400.jpg'
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
        <ContactUs />
      </div>
    </MenuLayout>
  )
}
