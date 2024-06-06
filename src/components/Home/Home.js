import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDataRequests } from '../../hooks/DataRequests'
import { LinesSkeleton } from '../common/skeletons'
import { RectangularSkeleton, CircularSkeleton } from '../common/skeletons'
import MenuLayout from '../MenuLayout/MenuLayout'

export default function Home() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const { loading, result, error } = useDataRequests('en', 'test')

  return (
    <MenuLayout>
      <div className='h-[1200px]'></div>
      {/*<div className='font-bold text-bold'>*/}
      {/*  <h1>{t('language')}</h1>*/}
      {/*  <button onClick={() => changeLanguage('en')}>English</button>*/}
      {/*  <div className='flex gap-4'>*/}
      {/*    <button onClick={() => changeLanguage('pt')}>Portugese</button>*/}
      {/*    <button onClick={() => changeLanguage('ru')}>Russian</button>*/}
      {/*    <button onClick={() => changeLanguage('ar')}>Arabic</button>*/}
      {/*    <button onClick={() => changeLanguage('tr')}>Turkey</button>*/}
      {/*  </div>*/}
      {/*  <Link to='/contacts'>To Contacts</Link>*/}
      {/*  <LinesSkeleton count={3} styles={{ width: '30px' }} />*/}
      {/*  <RectangularSkeleton count={3} styles={{ width: '30px' }} />*/}
      {/*  <CircularSkeleton count={3} styles={{ width: '30px' }} />*/}
      {/*</div>*/}
    </MenuLayout>
  )
}
