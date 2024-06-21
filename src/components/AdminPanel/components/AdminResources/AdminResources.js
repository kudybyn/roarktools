import React from 'react'
import ManualsList from './components/ManualsList/ManuelsList'
import BrochuresList from './components/BrochuresList/BroshuresList'

const AdminResources = () => {
  return (
    <div>
      <div className='text-2xl py-2 px-5 border-b-[2px] border-redColor'>
        <span className='text-redColor'>Resources:</span>
      </div>
      <div className='h-[calc(94vh)]'>
        <div className='overflow-auto h-full'>
          <div className='py-2 px-5 '>
            <div className='text-xl'>Brochures:</div>
            <BrochuresList />
          </div>
          <div className='py-2 px-5'>
            <div className='text-xl'>Manuals:</div>
            <ManualsList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminResources
