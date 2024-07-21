import React, { useState } from 'react'
import LanguageTabs from '../LanguageTabs/LanguateTabs'
import CatalogInput from '../CatalogInput/CatalogInput'
import PriceInput from '../PriceInput/PriceInput'
import DescriptionInput from '../DescriptionInput/DescriptionInput'
import FeaturesInputList from '../FeaturesInputList/FeaturesInputList'
import clsx from 'clsx'
import { documentLanguageList } from '../../../../../../helper/helper'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firebaseDb, fireBaseStorage } from '../../../../../../firebase/config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import SpinnerComponent from '../../../SpinnerComponent/SpinnerComponent'

const CatalogAddItem = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [catalogData, setCatalogData] = useState({
    id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
    description: '',
    features: [],
    images: [],
    manuals: [],
    schema: [],
    title: '',
    technicalData: [],
  })
  const [loadingValue, setLoadingValue] = useState(false)

  const [rerenderList, setRerenderList] = useState(false)

  const [catalogSubTitle, setCatalogSubTitle] = useState([
    { lang: 'en', subtitle: '' },
    { lang: 'ar', subtitle: '' },
    { lang: 'pt', subtitle: '' },
    { lang: 'ru', subtitle: '' },
    { lang: 'tr', subtitle: '' },
  ])
  const [catalogPrice, setCatalogPrice] = useState([
    { lang: 'en', price: '' },
    { lang: 'ar', price: '' },
    { lang: 'pt', price: '' },
    { lang: 'ru', price: '' },
    { lang: 'tr', price: '' },
  ])

  const [catalogDescription, setCatalogDescription] = useState([
    { lang: 'en', description: '' },
    { lang: 'ar', description: '' },
    { lang: 'pt', description: '' },
    { lang: 'ru', description: '' },
    { lang: 'tr', description: '' },
  ])

  const [catalogFeatures, setCatalogFeatures] = useState([
    { lang: 'en', features: [] },
    { lang: 'ar', features: [] },
    { lang: 'pt', features: [] },
    { lang: 'ru', features: [] },
    { lang: 'tr', features: [] },
  ])

  const onChangeBrochuresTitle = (lang, title) => {
    setCatalogSubTitle((prevTitles) =>
      prevTitles.map((item) =>
        item.lang === lang ? { ...item, subtitle: title } : item
      )
    )
  }
  const onChangeBrochuresPrice = (lang, price) => {
    setCatalogPrice((prevTitles) =>
      prevTitles.map((item) =>
        item.lang === lang ? { ...item, price: price } : item
      )
    )
  }
  const onChangeBrochuresDescription = (lang, description) => {
    setCatalogDescription((prevTitles) =>
      prevTitles.map((item) =>
        item.lang === lang ? { ...item, description: description } : item
      )
    )
  }

  const onChangeBrochuresFeature = (lang, features) => {
    setCatalogFeatures((prevTitles) =>
      prevTitles.map((item) =>
        item.lang === lang ? { ...item, features: features } : item
      )
    )
  }

  const onChangeCatalogData = (value, key) => {
    setCatalogData((prev) => ({ ...prev, [key]: value }))
  }

  const removeBlogsImg = (id, key) => {
    const blogImg = catalogData[key].filter((b) => b.id !== id)
    setCatalogData((prev) => ({ ...prev, [key]: blogImg }))
  }

  const handleFileChange = (e, key) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setCatalogData((prev) => ({
          ...prev,
          [key]: [
            ...prev[key],
            {
              id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
              img: reader.result,
              selectedFile: selectedFile,
            },
          ],
        }))
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async (fileData) => {
    if (!fileData) {
      return null
    }

    try {
      const idToken = await auth.currentUser.getIdToken(true)
      const storageRef = ref(fireBaseStorage, `images/${fileData.name}`)

      try {
        return await getDownloadURL(storageRef)
      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          const uploadTask = uploadBytesResumable(storageRef, fileData, {
            Authorization: 'Bearer ' + idToken,
          })

          return new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {},
              (error) => {
                reject(error)
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  )
                  resolve(downloadURL)
                } catch (error) {
                  reject(error)
                }
              }
            )
          })
        } else {
          throw error
        }
      }
    } catch (error) {
      throw error
    }
  }

  function areRequiredFieldsNotEmpty(fields) {
    const requiredFields = {
      images: fields.images,
      schema: fields.schema,
      title: fields.title,
      technicalData: fields.technicalData,
    }

    for (const key in requiredFields) {
      if (requiredFields.hasOwnProperty(key)) {
        const value = requiredFields[key]
        if (Array.isArray(value) && value.length === 0) {
          return false
        } else if (typeof value === 'string' && value.trim() === '') {
          return false
        }
      }
    }

    const areAllFieldsFilled = (array, field) => {
      if (!Array.isArray(array)) return false
      const isAnyFieldNotEmpty = array.some(
        (item) => typeof item[field] === 'string' && item[field].trim() !== ''
      )
      if (isAnyFieldNotEmpty) {
        return array.every(
          (item) => typeof item[field] === 'string' && item[field].trim() !== ''
        )
      }
      return true
    }

    const isCatalogSubTitleValid = areAllFieldsFilled(
      catalogSubTitle,
      'subtitle'
    )
    const isCatalogPriceValid = areAllFieldsFilled(catalogPrice, 'price')
    const isCatalogDescriptionValid = areAllFieldsFilled(
      catalogDescription,
      'description'
    )
    const isCatalogFeaturesValid = catalogFeatures.every(
      (item) => Array.isArray(item.features) && item.features.length > 0
    )

    if (
      !isCatalogSubTitleValid ||
      !isCatalogPriceValid ||
      !isCatalogDescriptionValid ||
      !isCatalogFeaturesValid
    ) {
      return false
    }

    return true
  }

  const saveProductData = async () => {
    setLoadingValue(true)
    const catalogImgList = await Promise.all(
      catalogData.images.map((imgData) => {
        return handleUpload(imgData.selectedFile)
      })
    )
    const catalogManualsList = await Promise.all(
      catalogData.manuals.map((imgData) => {
        return handleUpload(imgData.selectedFile)
      })
    )
    const catalogSchemaList = await Promise.all(
      catalogData.schema.map((imgData) => {
        return handleUpload(imgData.selectedFile)
      })
    )

    const catalogTechnicalDataList = await Promise.all(
      catalogData.technicalData.map((imgData) => {
        return handleUpload(imgData.selectedFile)
      })
    )
    if (
      catalogImgList.length !== catalogData.images.length ||
      catalogManualsList.length !== catalogData.manuals.length ||
      catalogSchemaList.length !== catalogData.schema.length ||
      catalogTechnicalDataList.length !== catalogData.technicalData.length
    ) {
      return
    }

    for (const language of documentLanguageList) {
      const docRef = doc(firebaseDb, language.lang, language.idDocument)

      try {
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
          const document = docSnapshot.data()
          const documentBlogs = document.calatog
          const languageSubTitle = catalogSubTitle.find((t) => {
            return t.lang === language.lang
          }).subtitle
          const languagePrice = catalogPrice.find(
            (t) => t.lang === language.lang
          ).price
          const languageDescription = catalogDescription.find(
            (t) => t.lang === language.lang
          ).description
          const languageFeatures = catalogFeatures.find(
            (t) => t.lang === language.lang
          ).features

          const newProduct = {
            id: catalogData.id,
            title: catalogData.title,
            description: languageDescription,
            features: languageFeatures,
            price: languagePrice,
            subtitle: languageSubTitle,
            images: catalogImgList.map((i) => ({
              link: i,
              id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            })),
            manuals: catalogManualsList.map((i) => ({
              link: i,
              id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            })),
            schema: catalogSchemaList.map((i) => ({
              link: i,
              id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            })),
            technicalData: catalogTechnicalDataList.map((i) => ({
              link: i,
              id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            })),
          }

          await updateDoc(docRef, {
            calatog: [...documentBlogs, newProduct],
          })
            .then(() => {
              navigate('/admin/catalog')
            })
            .finally(() => {
              setLoadingValue(false)
            })
        } else {
          console.log('Document not found')
        }
      } catch (error) {
        console.error('Error updating:', error)
      }
    }
  }

  return (
    <div>
      {loadingValue ? <SpinnerComponent /> : null}
      <div className='py-2 px-5  text-2xl border-b-[2px] border-redColor'>
        <span className='text-redColor'>Add New Product:</span>
      </div>
      <section className='px-5 py-3 h-[94vh] overflow-auto'>
        <div className='flex flex-col gap-3'>
          <div className='text-xl'>Product Title:</div>
          <input
            className='w-full'
            value={catalogData.title}
            onChange={(e) => onChangeCatalogData(e.target.value, 'title')}
            type='text'
          />
        </div>
        <div className='flex flex-col'>
          <div className='text-xl'>Product Subtitle:</div>
          <LanguageTabs
            isAddItem={true}
            setRerenderList={() => setRerenderList((prev) => !prev)}
            subField={'subtitle'}
            tabs={['en', 'ar', 'pt', 'ru', 'tr']}
          >
            <CatalogInput
              brochuresTitle={catalogSubTitle}
              setBrochuresTitle={onChangeBrochuresTitle}
            />
          </LanguageTabs>
        </div>

        <div className='flex flex-col'>
          <div className='text-xl'>Product Price:</div>
          <LanguageTabs
            isAddItem={true}
            setRerenderList={() => setRerenderList((prev) => !prev)}
            subField={'price'}
            tabs={['en', 'ar', 'pt', 'ru', 'tr']}
          >
            <PriceInput
              brochuresTitle={catalogPrice}
              setBrochuresTitle={onChangeBrochuresPrice}
            />
          </LanguageTabs>
        </div>
        <div className='flex flex-col'>
          <div className='text-xl'>Product Description:</div>
          <LanguageTabs
            isAddItem={true}
            setRerenderList={() => setRerenderList((prev) => !prev)}
            subField={'description'}
            tabs={['en', 'ar', 'pt', 'ru', 'tr']}
          >
            <DescriptionInput
              brochuresTitle={catalogDescription}
              setBrochuresTitle={onChangeBrochuresDescription}
            />
          </LanguageTabs>
        </div>
        <div className='flex flex-col'>
          <div className='text-xl'>Product Features:</div>
          <LanguageTabs
            isAddItem={true}
            setRerenderList={() => setRerenderList((prev) => !prev)}
            subField={'price'}
            tabs={['en', 'ar', 'pt', 'ru', 'tr']}
          >
            <FeaturesInputList
              features={catalogFeatures}
              setFeatures={onChangeBrochuresFeature}
            />
          </LanguageTabs>
        </div>
        <div className='flex flex-col mt-3 gap-3 flex-wrap'>
          <div className='text-xl'>Product Images:</div>
          <div className='flex flex-wrap gap-6'>
            {catalogData.images.map((image, index) => {
              return (
                <div
                  key={index}
                  className='relative group flex flex-wrap h-[300px] w-[300px] border border-black justify-center items-center transition-all ease-in hover:text-white'
                >
                  <div
                    className='absolute top-[10px] right-[10px] cursor-pointer w-[30px] h-[30px] border border-redColor'
                    onClick={() => {
                      removeBlogsImg(image.id, 'images')
                    }}
                  >
                    <div className='absolute top-[13px] -left-[1px] inset-0 rotate-45 w-[30px] h-[2px] bg-redColor' />
                    <div className='absolute top-[13px] -left-[1px] inset-0 -rotate-45 w-[30px] h-[2px] bg-redColor' />
                  </div>
                  <img
                    src={image.img}
                    alt='save-img'
                    className='h-auto w-auto'
                  />
                </div>
              )
            })}
            <div className='relative cursor-pointer h-[300px] w-[300px] border border-black flex justify-center items-center hover:bg-redColor transition-all ease-in hover:text-white'>
              <input
                type='file'
                className='cursor-pointer absolute top-0 left-0 w-[300px] h-[300px] opacity-0'
                onChange={(e) => handleFileChange(e, 'images')}
              />
              <div className='text-8xl'>+</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-3 gap-3 flex-wrap'>
          <div className='text-xl'>Product Manuals Images:</div>
          <div className='flex flex-wrap gap-6'>
            {catalogData.manuals.map((image, index) => {
              return (
                <div
                  key={index}
                  className='relative group flex flex-wrap h-[300px] w-[300px] border border-black justify-center items-center transition-all ease-in hover:text-white'
                >
                  <div
                    className='absolute top-[10px] right-[10px] cursor-pointer w-[30px] h-[30px] border border-redColor'
                    onClick={() => {
                      removeBlogsImg(image.id, 'manuals')
                    }}
                  >
                    <div className='absolute top-[13px] -left-[1px] inset-0 rotate-45 w-[30px] h-[2px] bg-redColor' />
                    <div className='absolute top-[13px] -left-[1px] inset-0 -rotate-45 w-[30px] h-[2px] bg-redColor' />
                  </div>
                  <img
                    src={image.img}
                    alt='save-img'
                    className='h-auto w-auto'
                  />
                </div>
              )
            })}
            <div className='relative cursor-pointer h-[300px] w-[300px] border border-black flex justify-center items-center hover:bg-redColor transition-all ease-in hover:text-white'>
              <input
                type='file'
                className='cursor-pointer absolute top-0 left-0 w-[300px] h-[300px] opacity-0'
                onChange={(e) => handleFileChange(e, 'manuals')}
              />
              <div className='text-8xl'>+</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-3 gap-3 flex-wrap'>
          <div className='text-xl'>Product Schema Images:</div>
          <div className='flex flex-wrap gap-6'>
            {catalogData.schema.map((image, index) => {
              return (
                <div
                  key={index}
                  className='relative group flex flex-wrap h-[300px] w-[300px] border border-black justify-center items-center transition-all ease-in hover:text-white'
                >
                  <div
                    className='absolute top-[10px] right-[10px] cursor-pointer w-[30px] h-[30px] border border-redColor'
                    onClick={() => {
                      removeBlogsImg(image.id, 'schema')
                    }}
                  >
                    <div className='absolute top-[13px] -left-[1px] inset-0 rotate-45 w-[30px] h-[2px] bg-redColor' />
                    <div className='absolute top-[13px] -left-[1px] inset-0 -rotate-45 w-[30px] h-[2px] bg-redColor' />
                  </div>
                  <img
                    src={image.img}
                    alt='save-img'
                    className='h-auto w-auto'
                  />
                </div>
              )
            })}
            <div className='relative cursor-pointer h-[300px] w-[300px] border border-black flex justify-center items-center hover:bg-redColor transition-all ease-in hover:text-white'>
              <input
                type='file'
                className='cursor-pointer absolute top-0 left-0 w-[300px] h-[300px] opacity-0'
                onChange={(e) => handleFileChange(e, 'schema')}
              />
              <div className='text-8xl'>+</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-3 gap-3 flex-wrap'>
          <div className='text-xl'>Product Technical Data Images:</div>
          <div className='flex flex-wrap gap-6'>
            {catalogData.technicalData.map((image, index) => {
              return (
                <div
                  key={index}
                  className='relative group flex flex-wrap h-[300px] w-[300px] border border-black justify-center items-center transition-all ease-in hover:text-white'
                >
                  <div
                    className='absolute top-[10px] right-[10px] cursor-pointer w-[30px] h-[30px] border border-redColor'
                    onClick={() => {
                      removeBlogsImg(image.id, 'technicalData')
                    }}
                  >
                    <div className='absolute top-[13px] -left-[1px] inset-0 rotate-45 w-[30px] h-[2px] bg-redColor' />
                    <div className='absolute top-[13px] -left-[1px] inset-0 -rotate-45 w-[30px] h-[2px] bg-redColor' />
                  </div>
                  <img
                    src={image.img}
                    alt='save-img'
                    className='h-auto w-auto'
                  />
                </div>
              )
            })}
            <div className='relative cursor-pointer h-[300px] w-[300px] border border-black flex justify-center items-center hover:bg-redColor transition-all ease-in hover:text-white'>
              <input
                type='file'
                className='cursor-pointer absolute top-0 left-0 w-[300px] h-[300px] opacity-0'
                onChange={(e) => handleFileChange(e, 'technicalData')}
              />
              <div className='text-8xl'>+</div>
            </div>
          </div>
        </div>
        <div className='flex justify-end w-full'>
          <div className='flex gap-2'>
            <button
              disabled={!areRequiredFieldsNotEmpty(catalogData)}
              className={clsx(
                'py-2 px-4 rounded-lg transition-all ease-in my-2',
                !areRequiredFieldsNotEmpty(catalogData)
                  ? 'opacity-50 border border-red'
                  : ' bg-redColor text-white border border-transparent'
              )}
              onClick={() => saveProductData()}
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CatalogAddItem
