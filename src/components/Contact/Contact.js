import MenuLayout from '../MenuLayout/MenuLayout'
import ContactUsMail from '../Home/ContactUs/ContactUs'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import Map from './Map/Map'
import ContactImage from '../../assets/homepage/contact.svg'
import PageHeader from 'components/common/PageHeader'
import useScrollToTop from '../../utils/useScrollToTop'

export default function Contact() {
  useScrollToTop()
  const { t } = useTranslation()
  return (
    <MenuLayout>
      <div className='w-full min-h-[100vh] pt-[100px] '>
        <PageHeader
          title={t('contactUs.contacts')}
          srcImage={
            'https://firebasestorage.googleapis.com/v0/b/roarktools-3c762.appspot.com/o/images%2FcontactsUs.jpg?alt=media&token=49441ae3-93e9-4dd4-9285-7f215659f710'
          }
          srcLogo={ContactImage}
        />
        <div className='w-full px-6 flex justify-center pt-16'>
          <h3
            className='
            font-bold text-[42px]'
          >
            {t('contactUs.questions')}{' '}
            <span className='text-redColor'>{t('contactUs.or')}</span>{' '}
            {t('contactUs.inquiries')}
          </h3>
        </div>
        <ContactUsMail title={false} />
        <div className='w-full flex px-6 md:px-12 pt-6 pb-12 justify-center'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-[1100px] gap-6'>
            <div className='flex flex-col gap-6'>
              <h4 className='uppercase text-[42px] font-bold text-center md:text-start'>
                {t('burger-menu.contactUs')}
              </h4>
              <div className='flex flex-col gap-3'>
                <div className='flex gap-2 font-normal text-[24px]'>
                  <strong>{t('contactUs.email')}:</strong> info@roarktools.com
                </div>
                <div className='flex gap-2 font-normal text-[24px]'>
                  <strong>{t('contactUs.phone')}:</strong> +1 610 424 4300
                </div>
                <div className='flex gap-2 font-normal text-[24px]'>
                  <strong>{t('contactUs.fax')}:</strong> + 1 610 424 4301
                </div>
                <div className='flex gap-2 font-normal text-[24px]'>
                  <strong>{t('contactUs.address')}:</strong>{' '}
                  <a
                    href='https://www.google.com/maps/place/Wescosville,+%D0%9F%D0%B5%D0%BD%D1%81%D1%96%D0%BB%D1%8C%D0%B2%D0%B0%D0%BD%D1%96%D1%8F+18106,+%D0%A1%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D1%96+%D0%A8%D1%82%D0%B0%D1%82%D0%B8+%D0%90%D0%BC%D0%B5%D1%80%D0%B8%D0%BA%D0%B8/@40.5848251,-75.6293366,13z/data=!3m1!4b1!4m6!3m5!1s0x89c4310f8342bec5:0xb4b397fe5c63fd61!8m2!3d40.5825021!4d-75.6149893!16s%2Fm%2F03dx21n?entry=ttu'
                    className='text-[rgb(255,0,0)]'
                    target='_blank'
                  >
                    Allentown, PA 18106
                  </a>
                </div>
                <div className='flex gap-2'>
                  <a
                    href={'https://twitter.com/roark_tools'}
                    className={clsx(
                      'w-[34px] hover:scale-110 transition-all ease-out group cursor-pointer hover:bg-white hover:text-redColor hover:border-redColor h-[34px] flex items-center justify-center border border-black text-black uppercase font-normal'
                    )}
                    target='_blank'
                  >
                    x
                  </a>
                  <a
                    href='https://www.facebook.com/roarktoolsinc/'
                    target='_blank'
                    className={clsx(
                      'w-[34px] hover:scale-110 transition-all ease-out cursor-pointer group  hover:bg-white hover:text-redColor hover:border-redColor h-[34px] flex items-center justify-center border border-black text-black uppercase font-normal'
                    )}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <Map />
            </div>
          </div>
        </div>
      </div>
    </MenuLayout>
  )
}
