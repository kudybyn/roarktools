import React, { useState } from 'react'
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import db, { firebaseDb, fireBaseStorage } from '../../../../firebase/config'
import { getAuth } from 'firebase/auth'

const UploadAndFetchComponent = ({ id: catalogId, setRerenderList }) => {
  const [file, setFiles] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [catalogItem, setCatalogItem] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  const auth = getAuth()

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
    setUploadError(null)

    auth.currentUser
      .getIdToken(true)
      .then((idToken) => {
        const storageRef = ref(fireBaseStorage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file, {
          Authorization: 'Bearer ' + idToken,
        })

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Progress ' + progress)
          },
          (error) => {
            setUploadError(error.message)
            setUploading(false)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL)
              updateCatalogImages(downloadURL)
              setUploading(false)
            })
          }
        )
      })
      .catch((error) => {
        setUploadError('Authorisation Error: ' + error.message)
        setUploading(false)
      })
  }

  const updateCatalogImages = async (newImageUrl) => {
    const docRef = doc(firebaseDb, 'en', 't7rkXlxoXbQZBESujoQr')

    try {
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) {
        const document = docSnapshot.data()
        const documentCatalogs = document.calatog // Check for the correct spelling of 'calatog'

        const updatedCatalogsList = documentCatalogs.map((catalogData) => {
          if (catalogData.id.toString() === catalogId.toString()) {
            return {
              ...catalogData,
              images: catalogData.images
                ? [...catalogData.images, { link: newImageUrl }]
                : [{ link: newImageUrl }],
            }
          }
          console.log(
            '---',
            catalogData.id.toString() === catalogId.toString(),
            catalogData.id.toString(),
            catalogId.toString()
          )
          return catalogData
        })

        await updateDoc(docRef, { calatog: updatedCatalogsList })
        setRerenderList((prev) => !prev)
      } else {
        console.log('Document not found')
      }
    } catch (error) {
      console.error('Error updating catalog images:', error)
    }
  }

  return (
    <>
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
    </>
  )
}

// const

export default UploadAndFetchComponent
