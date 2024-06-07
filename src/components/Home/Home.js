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
    </MenuLayout>
  )
}
