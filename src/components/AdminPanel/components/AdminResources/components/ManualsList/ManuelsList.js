import { collection, getDocs } from 'firebase/firestore'
import db from '../../../../../../firebase/config'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ManualsListListItem from './ManualsListListItem'

const ManualsList = () => {
  const [rerender, setRerender] = useState(false)
  const [broshuresList, setBrochuresList] = useState([])
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
      const data = await fetchBrochuresData({
        collectionName: 'en',
        type: 'resourses',
        subType: 'manuals',
      })
      setBrochuresList(data)
    })()
  }, [rerender])

  return (
    <div className='flex gap-5 flex-wrap'>
      {broshuresList &&
        broshuresList.map((brochureData) => {
          return (
            <ManualsListListItem
              setRerender={setRerender}
              key={brochureData.id}
              {...brochureData}
            />
          )
        })}
      <Link
        to={'manuals/add'}
        className='relative cursor-pointer h-[300px] w-[300px] border border-black flex justify-center items-center hover:bg-redColor transition-all ease-in hover:text-white'
      >
        <div className='text-8xl'>+</div>
      </Link>
    </div>
  )
}

export default ManualsList
