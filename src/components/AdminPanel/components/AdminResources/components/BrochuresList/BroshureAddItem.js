import React, { useEffect, useRef, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { firebaseDb, fireBaseStorage } from '../../../../../../firebase/config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import LanguageTabs from '../../../CatalogItemEditor/components/LanguageTabs/LanguateTabs'
import BroshuresTitle from './BroshuresTitle'
import clsx from 'clsx'
import { documentLanguageList } from '../../../../../../helper/helper'
import BrochuresLinks from './BrochuresLinks'

const BrochureAddItem = () => {
  const [brochureData, setBrochureData] = useState({
    id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
    imageSrc: '',
    link: '',
  })
  const [brochuresTitle, setBrochuresTitle] = useState([
    { lang: 'en', title: '' },
    { lang: 'ar', title: '' },
    { lang: 'pt', title: '' },
    { lang: 'ru', title: '' },
    { lang: 'tr', title: '' },
  ])
  const [file, setFiles] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const brochureId = useRef()

  const auth = getAuth()

  useEffect(() => {
    brochureId.current =
      'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }, [])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFiles((files) => selectedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setImageUrl(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = () => {
    if (!file) {
      return
    }

    setUploading(true)

    auth.currentUser
      .getIdToken(true)
      .then((idToken) => {
        const storageRef = ref(fireBaseStorage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file, {
          Authorization: 'Bearer ' + idToken,
        })

        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            setUploading(false)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL)
              setUploading(false)
            })
          }
        )
      })
      .catch((error) => {
        setUploading(false)
      })
  }

  const saveBrochuresData = async (newImageUrl) => {
    for (const language of documentLanguageList) {
      const docRef = doc(firebaseDb, language.lang, language.idDocument)

      try {
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
          const document = docSnapshot.data()
          const documentResources = document.resourses
          const documentBrochures = documentResources.brochures

          const titleLanguage = brochuresTitle.find(
            (t) => t.lang === language.lang
          )

          documentBrochures.push({
            id: brochureData.id,
            imageSrc: newImageUrl,
            link: brochureData.link,
            title: titleLanguage.title,
          })
          await updateDoc(docRef, {
            resourses: {
              ...documentResources,
              brochures: documentBrochures,
            },
          })
        } else {
          console.log('Document not found')
        }
      } catch (error) {
        console.error('Error updating brochures images:', error)
      }
    }
  }

  const onChangeBrochuresTitle = (lang, title) => {
    setBrochuresTitle((prevTitles) =>
      prevTitles.map((item) =>
        item.lang === lang ? { ...item, title: title } : item
      )
    )
  }

  const isAllFieldsValid = () => {
    const invalidTitle = brochuresTitle.find((i) => i.title === '')
    if (invalidTitle) {
      return false
    } else if (!brochureData.link || !imageUrl) {
      return false
    }
    return true
  }

  return (
    <div>
      <div className='text-2xl py-2 px-5 border-b-[2px] border-redColor'>
        <span className='text-redColor'>Add Brochure:</span>
      </div>
      <div className='py-2 px-5'>
        <div className='text-xl'>Brochure Images:</div>
        <div>
          {!file ? (
            <div className='relative cursor-pointer h-[300px] w-[300px] border border-black flex justify-center items-center hover:bg-redColor transition-all ease-in hover:text-white'>
              <input
                type='file'
                className='cursor-pointer absolute top-0 left-0 w-[300px] h-[300px] opacity-0'
                onChange={handleFileChange}
              />
              <div className='text-8xl'>+</div>
            </div>
          ) : (
            <div className='group flex flex-wrap relative h-[300px] w-[300px] border border-black justify-center items-center transition-all ease-in hover:text-white'>
              <div className='h-[250px] flex items-center justify-center'>
                <img src={imageUrl} alt='save-img' className='h-auto w-auto' />
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className='cursor-pointer h-[50px] w-[300px] flex justify-center items-center bg-redColor transition-all ease-in text-white'
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
          )}
        </div>
        <div className='text-xl'>Brochure Titles:</div>
        <LanguageTabs
          subField={'title'}
          tabs={['en', 'ar', 'pt', 'ru', 'tr']}
          catalogId={brochureId}
          isAddItem
        >
          <BroshuresTitle
            brochuresTitle={brochuresTitle}
            id={brochureId.current}
            setBrochuresTitle={onChangeBrochuresTitle}
          />
        </LanguageTabs>

        <div className='text-xl'>Brochure Link:</div>
        <BrochuresLinks
          setBrochuresLinks={(link) =>
            setBrochureData((prev) => ({ ...prev, link: link }))
          }
        />

        <div className='flex justify-end w-full'>
          <div className='flex gap-2'>
            <button
              disabled={!isAllFieldsValid()}
              className={clsx(
                'py-2 px-4 rounded-lg transition-all ease-in my-2',
                !isAllFieldsValid()
                  ? 'opacity-50 border border-red'
                  : ' bg-redColor text-white border border-transparent'
              )}
              onClick={() => saveBrochuresData(imageUrl)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrochureAddItem
