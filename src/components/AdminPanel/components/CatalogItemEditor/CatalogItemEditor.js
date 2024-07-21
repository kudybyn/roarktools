import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseDb, fireBaseStorage } from '../../../../firebase/config'
import { documentLanguageList } from '../../../../helper/helper'
import LanguageTabs from './components/LanguageTabs/LanguateTabs'
import CatalogInput from './components/CatalogInput/CatalogInput'
import DescriptionInput from './components/DescriptionInput/DescriptionInput'
import FeaturesInputList from './components/FeaturesInputList/FeaturesInputList'
import PriceInput from './components/PriceInput/PriceInput'
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent'

const CatalogItemEditor = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [itemData, setItemData] = useState()
  const { data, loading } = useSelector((store) => store.catalog)
  const navigate = useNavigate()
  const auth = getAuth()
  const [rerenderList, setRerenderList] = useState(false)
  const [loadingValue, setLoadingValue] = useState(false)

  const [catalogData, setCatalogData] = useState({
    id: params.id,
    images: [],
    manuals: [],
    schema: [],
    title: '',
    technicalData: [],
  })

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

  const fetchBlogData = async (lang, docId) => {
    const docRef = doc(firebaseDb, lang, docId)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()) {
      return docSnapshot.data()
    } else {
      console.error(`Document not found for language: ${lang}`)
      return null
    }
  }

  const fetchAllProductData = async () => {
    try {
      setLoadingValue(true)
      const promises = documentLanguageList.map((language) =>
        fetchBlogData(language.lang, language.idDocument)
      )
      const results = await Promise.all(promises).finally(() => {
        setLoadingValue(false)
      })
      const combinedCatalog = results.map((doc) => {
        return doc.calatog.find((i) => i.id === params.id)
      })

      setCatalogData({
        id: params.id,
        title: combinedCatalog[0].title,
        images: combinedCatalog[0].images.map((i) => ({
          ...i,
          isDownload: true,
        })),
        manuals: combinedCatalog[0].manuals.map((i) => ({
          ...i,
          isDownload: true,
        })),
        schema: combinedCatalog[0].schema.map((i) => ({
          ...i,
          isDownload: true,
        })),
        technicalData: combinedCatalog[0].technicalData.map((i) => ({
          ...i,
          isDownload: true,
        })),
      })
      const updatedCatalogSubTitle = combinedCatalog.map((i, index) => ({
        lang: documentLanguageList[index].lang,
        subtitle: i.subtitle,
      }))
      const updatedCatalogPrice = combinedCatalog.map((i, index) => ({
        lang: documentLanguageList[index].lang,
        price: i.price,
      }))
      const updatedCatalogDescription = combinedCatalog.map((i, index) => ({
        lang: documentLanguageList[index].lang,
        description: i.description,
      }))
      const updatedCatalogFeatures = combinedCatalog.map((i, index) => ({
        lang: documentLanguageList[index].lang,
        features: i.features,
      }))

      setCatalogSubTitle(updatedCatalogSubTitle)
      setCatalogPrice(updatedCatalogPrice)
      setCatalogDescription(updatedCatalogDescription)
      setCatalogFeatures(updatedCatalogFeatures)
    } catch (error) {
      console.error('Error updating manuals images:', error)
    }
  }

  useEffect(() => {
    fetchAllProductData()
  }, [dispatch, rerenderList])

  useEffect(() => {
    if (data && data.length) {
      const productData = data.find((p) => {
        return p.id.toString() === params.id.toString()
      })
      setItemData(productData)
    }
  }, [data])

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
      catalogData.images
        .filter((i) => !i.isDownload)
        .map((imgData) => handleUpload(imgData.selectedFile))
    )
    const currentCatalogImgList = catalogData.images.filter((i) => i.isDownload)
    const catalogManualsList = await Promise.all(
      catalogData.manuals
        .filter((i) => !i.isDownload)
        .map((imgData) => handleUpload(imgData.selectedFile))
    )
    const currentCatalogManualsList = catalogData.manuals.filter(
      (i) => i.isDownload
    )

    const catalogSchemaList = await Promise.all(
      catalogData.schema
        .filter((i) => !i.isDownload)
        .map((imgData) => handleUpload(imgData.selectedFile))
    )
    const currentCatalogSchemaList = catalogData.schema.filter(
      (i) => i.isDownload
    )

    const catalogTechnicalDataList = await Promise.all(
      catalogData.technicalData
        .filter((i) => !i.isDownload)
        .map((imgData) => handleUpload(imgData.selectedFile))
    )
    const currentCatalogTechnicalDataList = catalogData.technicalData.filter(
      (i) => i.isDownload
    )

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
            id: params.id,
            title: catalogData.title,
            description: languageDescription,
            features: languageFeatures,
            price: languagePrice,
            subtitle: languageSubTitle,
            images: [
              ...currentCatalogImgList,
              ...catalogImgList.map((i) => ({
                link: i,
                id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
              })),
            ],
            manuals: [
              ...currentCatalogManualsList,
              ...catalogManualsList.map((i) => ({
                link: i,
                id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
              })),
            ],
            schema: [
              ...currentCatalogSchemaList,
              ...catalogSchemaList.map((i) => ({
                link: i,
                id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
              })),
            ],
            technicalData: [
              ...currentCatalogTechnicalDataList,
              ...catalogTechnicalDataList.map((i) => ({
                link: i,
                id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
              })),
            ],
          }

          const updatedCalatogList = documentBlogs.map((i) => {
            return i.id === params.id ? newProduct : i
          })
          await updateDoc(docRef, {
            calatog: updatedCalatogList,
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
                    src={image.img || image.link}
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
                    src={image.img || image.link}
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
                    src={image.img || image.link}
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
                    src={image.img || image.link}
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

export default CatalogItemEditor
