import { collection, getDocs } from 'firebase/firestore'
import db from '../../../../../../firebase/config'
import React, { useEffect, useState } from 'react'
import BroshureListItem from './BroshuresListItem'
import { Link } from 'react-router-dom'
import SpinnerComponent from '../../../SpinnerComponent/SpinnerComponent'

const BrochuresList = () => {
  const [rerender, setRerender] = useState(false)
  const [broshuresList, setBrochuresList] = useState([])
  const [loadingValue, setLoadingValue] = useState(false)

  const fetchBrochuresData = async ({ collectionName, type, subType }) => {
    const querySnapshot = await getDocs(collection(db, collectionName))
    const fetchedData = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data()[type][subType],
      }
    })
    return Object.values(Object.values(fetchedData)[0])
  }

  useEffect(() => {
    ;(async () => {
      setLoadingValue(true)
      const data = await fetchBrochuresData({
        collectionName: 'en',
        type: 'resourses',
        subType: 'brochures',
      }).finally(() => {
        setLoadingValue(false)
      })
      setBrochuresList(data)
    })()
  }, [rerender])

  return (
    <div className='flex gap-5 flex-wrap'>
      {loadingValue ? <SpinnerComponent /> : null}
      {broshuresList &&
        broshuresList.map((brochureData) => {
          return (
            <BroshureListItem
              setRerender={setRerender}
              key={brochureData.id}
              {...brochureData}
            />
          )
        })}
      <Link
        to={'brochures/add'}
        className='relative cursor-pointer h-[300px] w-[300px] border border-black flex justify-center items-center hover:bg-redColor transition-all ease-in hover:text-white'
      >
        <div className='text-8xl'>+</div>
      </Link>
    </div>
  )
}

export default BrochuresList
