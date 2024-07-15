import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { documentLanguageList } from '../../../../../../helper/helper'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firebaseDb } from '../../../../../../firebase/config'
import SpinnerComponent from '../../../SpinnerComponent/SpinnerComponent'

const CatalogListItem = ({ productData, setRerender }) => {
  const [loadingValue, setLoadingValue] = useState(false)

  const removeProduct = async (id) => {
    setLoadingValue(true)
    for (const language of documentLanguageList) {
      const docRef = doc(firebaseDb, language.lang, language.idDocument)

      try {
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
          const document = docSnapshot.data()
          const documentResources = document.calatog
          const updatedManuals = documentResources.filter((b) => b.id !== id)
          await updateDoc(docRef, {
            calatog: updatedManuals,
          }).finally(() => {
            setLoadingValue(false)
          })
          setRerender((prev) => !prev)
        } else {
          console.log('Document not found')
        }
      } catch (error) {
        console.error('Error updating brochures images:', error)
      }
    }
  }

  return (
    <div className='relative card shadow p-4 rounded-xl border h-[300px] w-[300px] items-center flex flex-col'>
      {loadingValue ? <SpinnerComponent /> : null}
      <div
        className='absolute top-[10px] right-[10px] cursor-pointer w-[30px] h-[30px] border border-redColor'
        onClick={() => {
          removeProduct(productData.id)
        }}
      >
        <div className='absolute top-[13px] -left-[1px] inset-0 rotate-45 w-[30px] h-[2px] bg-redColor' />
        <div className='absolute top-[13px] -left-[1px] inset-0 -rotate-45 w-[30px] h-[2px] bg-redColor' />
      </div>
      <div className='h-[180px] w-[300px] flex items-center justify-center'>
        <img
          alt={productData.title}
          src={productData.images[0].link}
          className='object-cover max-w-[300px] max-h-[180px] h-auto w-auto'
        />
      </div>
      <div className='my-3 '>{productData.title}</div>
      <Link
        to={`${productData.id}`}
        className='w-full flex items-center justify-center rounded-md bg-redColor py-1 text-white hover:text-black hover:bg-white hover:border hover:border-redColor border border-transparent transition-all ease-in'
      >
        Change Product
      </Link>
    </div>
  )
}

export default CatalogListItem
