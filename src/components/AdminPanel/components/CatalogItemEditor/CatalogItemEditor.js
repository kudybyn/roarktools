import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCatalogDataById,
  fetchData,
} from '../../../../redux/slices/CatalogSlice'
import { useParams } from 'react-router-dom'
import UploadAndFetchComponent from './components/UploadImageComponent'
import db, { firebaseDb } from '../../../../firebase/config'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import LanguageTabs from './components/LanguageTabs/LanguateTabs'
import AdminProductName from './components/AdminProductName/AdminProductName'

const CatalogItemEditor = () => {
  const [rerenderList, setRerenderList] = useState(false)
  const params = useParams()
  const dispatch = useDispatch()
  const [itemData, setItemData] = useState()
  const { data, loading } = useSelector((store) => store.catalog)

  useEffect(() => {
    dispatch(fetchData({ collectionName: 'en', type: 'calatog' }))
  }, [dispatch, rerenderList])

  useEffect(() => {
    if (data && data.length) {
      const productData = data.find((p) => {
        return p.id.toString() === params.id.toString()
      })
      setItemData(productData)
    }
  }, [data])

  const removeCatalogImage = async (catalogId, imageUrlToRemove) => {
    const docRef = doc(firebaseDb, 'en', 't7rkXlxoXbQZBESujoQr')

    try {
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) {
        const document = docSnapshot.data()
        const documentCatalogs = document.calatog

        const updatedCatalogsList = documentCatalogs.map((catalogData) => {
          if (catalogData.id.toString() === catalogId.toString()) {
            const updatedImages = catalogData.images.filter(
              (image) => image.link !== imageUrlToRemove
            )
            return {
              ...catalogData,
              images: updatedImages,
            }
          }
          return catalogData
        })

        await updateDoc(docRef, { calatog: updatedCatalogsList })
        console.log('Image removed from catalog successfully')
      } else {
        console.log('Document not found')
      }
    } catch (error) {
      console.error('Error removing image from catalog:', error)
    }
  }

  return (
    <div>
      <div>
        <div className='text-2xl py-2 px-5 border-b-[2px] border-redColor'>
          <span className='text-redColor'>Product:</span> {itemData?.title}
        </div>

        <div className='py-2 px-5'>
          <div className='text-xl'>Product Images:</div>
          <LanguageTabs
            setRerenderList={() => setRerenderList((prev) => !prev)}
            subField={'title'}
            tabs={['en', 'ar', 'pt', 'ru', 'tr']}
            catalogId={params.id.toString()}
          >
            <AdminProductName />
          </LanguageTabs>
        </div>
        <div className='py-2 px-5'>
          <div className='text-xl'>Product Images:</div>
          <LanguageTabs
            setRerenderList={() => setRerenderList((prev) => !prev)}
            subField={'title'}
            tabs={['en', 'ar', 'pt', 'ru', 'tr']}
            catalogId={params.id.toString()}
          ></LanguageTabs>
        </div>
        {itemData && !loading && (
          <div className='py-2 px-5'>
            <div className='text-xl'>Product Images:</div>
            <div className='flex gap-5 flex-wrap mt-3'>
              {itemData &&
                itemData.images &&
                [...itemData.images].map((imageData) => {
                  return (
                    <div className='h-[300px] w-[300px] object-cover border border-black relative'>
                      <img
                        className='w-auto h-auto'
                        alt={imageData.link}
                        src={imageData.link}
                      />
                      <div
                        className='absolute top-[10px] right-[10px] cursor-pointer w-[30px] h-[30px] border border-redColor'
                        onClick={() => {
                          removeCatalogImage(params.id, imageData.link)
                          setRerenderList((prev) => !prev)
                        }}
                      >
                        <div className='absolute top-[13px] -left-[1px] inset-0 rotate-45 w-[30px] h-[2px] bg-redColor' />
                        <div className='absolute top-[13px] -left-[1px] inset-0 -rotate-45 w-[30px] h-[2px] bg-redColor' />
                      </div>
                    </div>
                  )
                })}
              <UploadAndFetchComponent
                id={params.id}
                setRerenderList={setRerenderList}
              />
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className='w-full h-[400px] text-3xl flex items-center justify-center'>
          Loading...
        </div>
      )}
    </div>
  )
}

export default CatalogItemEditor
