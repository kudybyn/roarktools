import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { firebaseDb, fireBaseStorage } from '../../../../../../firebase/config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import clsx from 'clsx'
import { documentLanguageList } from '../../../../../../helper/helper'
import { useNavigate, useParams } from 'react-router-dom'
import BrochuresLinks from '../BrochuresList/BrochuresLinks'
import BroshuresTitle from '../BrochuresList/BroshuresTitle'
import SpinnerComponent from '../../../SpinnerComponent/SpinnerComponent'

const ManualsListEditItem = () => {
  const params = useParams()
  const [brochureData, setBrochureData] = useState({
    id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
    imageSrc: '',
    link: '',
    title: '',
  })
  const navigate = useNavigate()
  const [loadingValue, setLoadingValue] = useState(false)

  const [file, setFiles] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const brochureId = params.id
  const [changeImg, setChangeImg] = useState(false)

  const auth = getAuth()

  useEffect(() => {
    ;(async () => {
      for (const language of documentLanguageList) {
        const docRef = doc(firebaseDb, language.lang, language.idDocument)
        try {
          setLoadingValue(true)
          const docSnapshot = await getDoc(docRef).finally(() => {
            setLoadingValue(false)
          })
          if (docSnapshot.exists()) {
            const document = docSnapshot.data()
            const documentResources = document.resourses
            const documentBrochures = documentResources.manuals

            const currentBrochures = documentBrochures.find(
              (b) => b.id === brochureId
            )
            if (!imageUrl) setImageUrl(currentBrochures.imageSrc)
            if (!brochureData.link)
              setBrochureData((prev) => ({
                ...prev,
                link: currentBrochures.link,
                title: currentBrochures.title,
              }))
          } else {
            console.log('Document not found')
          }
        } catch (error) {
          console.error('Error updating manuals images:', error)
        }
      }
    })()
  }, [brochureId])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFiles((files) => selectedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setImageUrl(reader.result)
      }
      reader.readAsDataURL(selectedFile)
      setChangeImg(true)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      return false
    }

    setUploading(true)

    try {
      const idToken = await auth.currentUser.getIdToken(true)
      const storageRef = ref(fireBaseStorage, `images/${file.name}`)

      try {
        const existingDownloadURL = await getDownloadURL(storageRef)
        setImageUrl(existingDownloadURL)
        setUploading(false)
        return existingDownloadURL
      } catch (error) {
        if (error.code !== 'storage/object-not-found') {
          setUploading(false)
          throw error
        }
      }

      const uploadTask = uploadBytesResumable(storageRef, file, {
        customMetadata: { Authorization: 'Bearer ' + idToken },
      })

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            setUploading(false)
            reject(error)
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              setImageUrl(downloadURL)
              setUploading(false)
              resolve(downloadURL)
            } catch (error) {
              setUploading(false)
              reject(error)
            }
          }
        )
      })
    } catch (error) {
      setUploading(false)
      console.error('Error uploading file:', error)
      return false
    }
  }

  const saveBrochuresData = async (newImageUrl) => {
    setLoadingValue(true)
    const isUpload = await handleUpload()
    console.log('Image', isUpload)

    if (!isUpload || !changeImg) return
    setChangeImg(false)
    for (const language of documentLanguageList) {
      const docRef = doc(firebaseDb, language.lang, language.idDocument)

      try {
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
          const document = docSnapshot.data()
          const documentResources = document.resourses
          const documentBrochures = documentResources.manuals

          const updatedList = documentBrochures.map((b) => {
            if (b.id === brochureId) {
              return {
                id: brochureData.id,
                imageSrc: isUpload,
                link: brochureData.link,
                title: brochureData.title,
              }
            } else {
              return b
            }
          })
          await updateDoc(docRef, {
            resourses: {
              ...documentResources,
              manuals: updatedList,
            },
          })
            .then(() => {
              navigate('/admin/resources')
            })
            .finally(() => {
              setLoadingValue(false)
            })
        } else {
          console.log('Document not found')
        }
      } catch (error) {
        console.error('Error updating manuals images:', error)
      }
    }
  }

  const isAllFieldsValid = () => {
    if (!brochureData.link || !imageUrl || !brochureData.title) {
      return false
    }
    return true
  }

  return (
    <div className=''>
      {loadingValue ? <SpinnerComponent /> : null}
      <div className='text-2xl py-2 px-5 border-b-[2px] border-redColor'>
        <span className='text-redColor'>Edit Manuals:</span>
      </div>
      <div className='py-2 px-5 h-full overflow-auto flex flex-col gap-4'>
        <div className='text-xl'>Manuals Images:</div>
        <div>
          <div className='group flex flex-wrap relative h-[300px] w-[300px] border border-black justify-center items-center transition-all ease-in hover:text-white'>
            {imageUrl && (
              <>
                <div className='h-[250px] flex items-center justify-center'>
                  <img
                    src={imageUrl}
                    alt='save-img'
                    className='h-auto w-auto'
                  />
                </div>
                <div className='cursor-pointer w-[300px] h-[50px] relative flex items-center justify-center bg-redColor transition-all ease-in'>
                  <input
                    type='file'
                    className='absolute top-0 left-0 cursor-pointer w-[300px] h-[50px] opacity-0'
                    onChange={handleFileChange}
                  />
                  <div className='text-center text-white'>Change Image</div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className='text-xl'>Manuals Titles:</div>

        <BroshuresTitle
          brochuresTitle={brochureData.title}
          setBrochuresTitle={(title) =>
            setBrochureData((prev) => ({ ...prev, title: title }))
          }
        />

        <div className='text-xl'>Manuals Link:</div>
        <BrochuresLinks
          link={brochureData.link}
          setBrochuresLinks={(link) =>
            setBrochureData((prev) => ({ ...prev, link: link }))
          }
        />

        <div className='flex justify-end w-full'>
          <div className='flex gap-2'>
            <button
              disabled={!isAllFieldsValid() || uploading}
              className={clsx(
                'py-2 px-4 rounded-lg transition-all ease-in my-2',
                !isAllFieldsValid() || uploading
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

export default ManualsListEditItem
