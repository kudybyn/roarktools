import { useTranslation } from 'react-i18next'
import Key from '../../../assets/homepage/key.svg'
import { Link } from 'react-router-dom'
import Contact from '../../../assets/homepage/contact.svg'
import Service from '../../../assets/homepage/service.svg'
import { Link as LinkReact } from 'react-scroll';

export default function OurServices() {
  const { t } = useTranslation()
  return (
    <div className='container mx-auto w-full py-16 px-6 flex justify-center'>
      <div className='w-full max-w-[1250px] flex flex-col items-center justify-center gap-16'>
        <h3 className='uppercase text-white text-5xl'>
          {t('homepage.services')}<span className="text-[rgba(255,0,0)]">{t('homepage.servicesSecondary')}</span>
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
          <Link
            to='/products'
            className='flex flex-col gap-2 items-center justify-center max-w-[250px] text-center transition duration-500 hover:scale-105'
          >
            <div className='w-[70px] h-[70px] rounded-[100%] border-2 border-white flex items-center justify-center'>
              <img
                src={Key}
                alt='our products'
                className='
                    w-[40px] h-[40px]'
              />
            </div>
            <div className='text-white text-[21px]'>
              {t('homepage.ourProducts')}
            </div>
            <div className='text-[#dddddd] text-[16px]'>
              {t('homepage.ourProductsDesc')}
            </div>
          </Link>
          <Link
            to='/contacts'
            className='flex flex-col gap-2 items-center justify-center max-w-[250px] text-center transition duration-500 hover:scale-105'
          >
            <div className='w-[70px] h-[70px] rounded-[100%] border-2 border-white flex items-center justify-center'>
              <img
                src={Service}
                alt='contacts'
                className='
                    w-[40px] h-[40px]'
              />
            </div>
            <div className='text-white text-[21px]'>
              {t('burger-menu.contactUs')}
            </div>
            <div className='text-[#dddddd] text-[16px]'>
              {t('homepage.contactUsDesc')}
            </div>
          </Link>
          <LinkReact
            to='contacts'
            spy={true}
            smooth={true}
            offset={-60}
            className='cursor-pointer flex flex-col gap-2 items-center justify-center max-w-[250px] text-center transition duration-500 hover:scale-105'
          >
            <div className='w-[70px] h-[70px] rounded-[100%] border-2 border-white flex items-center justify-center'>
              <img
                src={Contact}
                alt='Rental/Bolting Services'
                className='
                    w-[40px] h-[40px]'
              />
            </div>
            <div className='text-white text-[21px]'>
              {t('homepage.servicesOur')}
            </div>
            <div className='text-[#dddddd] text-[16px]'>
              {t('homepage.servicesOurDesc')}
            </div>
          </LinkReact>
        </div>
      </div>
    </div>
  )
}
