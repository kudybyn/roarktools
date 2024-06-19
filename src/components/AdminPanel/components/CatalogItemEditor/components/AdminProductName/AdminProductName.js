import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firebaseDb } from '../../../../../../firebase/config'

const AdminProductName = ({
  activeLanguage,
  data,
  saveFields,
  setIsSaveChanges,
  isSaveChanges,
  setRerender,
}) => {
  const prevValue = useRef()
  const [productName, setProductName] = React.useState('')

  useEffect(() => {
    if (data && data.data) {
      prevValue.current = data?.data
      setProductName(data.data)
    }
  }, [data])

  const isDisabled = productName === prevValue.current

  useEffect(() => {
    if (!isDisabled) {
      setIsSaveChanges(true)
    } else {
      setIsSaveChanges(false)
    }
  }, [isDisabled])

  const canselHandler = () => {
    setProductName(prevValue.current)
  }

  const saveData = async () => {
    const docRef = doc(firebaseDb, data.collectionName, data.documentId)
    try {
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) {
        const document = docSnapshot.data()
        const documentCatalogs = document.calatog
        const updatedCatalogsList = documentCatalogs.map((catalogData) => {
          if (catalogData.id.toString() === data.catalogId.toString()) {
            return {
              ...catalogData,
              title: productName,
            }
          }
          return catalogData
        })
        await updateDoc(docRef, { calatog: updatedCatalogsList })
        setRerender()
        prevValue.current = productName
      } else {
        console.log('Document not found')
      }
    } catch (error) {
      console.error('Error updating catalog title:', error)
    }
  }

  return (
    <div>
      <input
        className='w-full'
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <div className='flex justify-end w-full'>
        <div className='flex gap-2'>
          <button
            disabled={isDisabled}
            className={clsx(
              'py-2 px-4 rounded-lg transition-all ease-in my-2',
              isDisabled
                ? 'opacity-50 border border-red'
                : ' bg-redColor text-white border border-transparent'
            )}
            onClick={() => saveData()}
          >
            Save Changes
          </button>
          <button
            disabled={isDisabled}
            className={clsx(
              'py-2 px-4 rounded-lg transition-all ease-in my-2',
              isDisabled
                ? 'opacity-50 border border-red'
                : ' bg-redColor text-white border border-transparent'
            )}
            onClick={() => canselHandler()}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className='text-redColor text-right'>
        {isSaveChanges && 'Save data to continue'}
      </div>
    </div>
  )
}

export default AdminProductName
