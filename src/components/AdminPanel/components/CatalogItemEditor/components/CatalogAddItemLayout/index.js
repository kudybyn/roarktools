import React, { useState } from 'react'
import CatalogAddItem from '../CatalogAddItem/CatalogAddItem'
import clsx from 'clsx'

const CatalogAddItemLayout = () => {
  const [language, setLanguage] = React.useState('en')
  const tabs = ['en', 'ar', 'pt', 'ru', 'tr']
  const [sameCatalogData, setSameCatalogData] = useState({
    id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
    images: [],
    manuals: {
      link: '',
    },
    schema: [],
    title: '',
    technicalData: [],
  })
  return (
    <div className=''>
      <div className='py-2 px-5  text-2xl border-b-[2px] border-redColor'>
        <span className='text-redColor'>Add New Product:</span>
      </div>
      <div className='flex gap-1 my-2 py-2 px-5 '>
        {tabs.map((tab, index) => {
          return (
            <div
              className={clsx(
                'px-3 py-1 text-lg font-normal uppercase cursor-pointer bg-redColor rounded-t-xl transition-all ease-in',
                language === tab
                  ? 'bg-white text-redColor border border-redColor'
                  : 'text-white border border-transparent'
              )}
              onClick={() => {
                setLanguage(tab)
              }}
            >
              {tab}
            </div>
          )
        })}
      </div>
      <CatalogAddItem language={language} />
    </div>
  )
}

export default CatalogAddItemLayout
