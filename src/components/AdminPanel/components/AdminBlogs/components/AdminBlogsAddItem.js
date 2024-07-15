import React, { useState } from 'react'
import clsx from 'clsx'
import TextEditor from '../../../../TextEditor/TextEditor'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { firebaseDb, fireBaseStorage } from '../../../../../firebase/config'
import { getAuth } from 'firebase/auth'
import { documentLanguageList } from '../../../../../helper/helper'
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import SpinnerComponent from '../../SpinnerComponent/SpinnerComponent'

const requiredFields = ['content', 'createdBy', 'description', 'id', 'title']

const AdminBlogsAddItem = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [blogData, setBlogData] = React.useState({
    content: '',
    createdBy: new Date(),
    description: '',
    id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
    title: '',
    images: [],
  })
  const [loadingValue, setLoadingValue] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setBlogData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
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

  const onChangeBlogData = (value, key) => {
    setBlogData((prev) => ({ ...prev, [key]: value }))
  }

  const isValidateBlogData = (data) => {
    return (
      requiredFields.every((field) => data[field] !== '') && data.images.length
    )
  }

  const removeBlogsImg = (id) => {
    const blogImg = blogData.images.filter((b) => b.id !== id)
    setBlogData((prev) => ({ ...prev, images: blogImg }))
  }

  const onChangeBlogContent = (value) => {
    onChangeBlogData(value, 'content')
  }

  const handleUpload = async (fileData) => {
    if (!fileData) {
      return null
    }

    try {
      const idToken = await auth.currentUser.getIdToken(true)
      const storageRef = ref(fireBaseStorage, `images/${fileData.name}`)

      try {
        const existingDownloadURL = await getDownloadURL(storageRef)
        return existingDownloadURL
      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          const uploadTask = uploadBytesResumable(storageRef, fileData, {
            customMetadata: { Authorization: 'Bearer ' + idToken },
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
  const saveBlogData = async () => {
    setLoadingValue(true)
    const blogImgList = await Promise.all(
      blogData.images.map((imgData) => {
        return handleUpload(imgData.selectedFile)
      })
    )
    if (!blogImgList.length) return

    for (const language of documentLanguageList) {
      const docRef = doc(firebaseDb, language.lang, language.idDocument)

      try {
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
          const document = docSnapshot.data()
          const documentBlogs = document.blogs

          const newBlog = {
            content: blogData.content,
            createdBy: Timestamp.fromDate(new Date()),
            description: blogData.description,
            id: blogData.id,
            title: blogData.title,
            images: blogImgList.map((i) => ({
              link: i,
              id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            })),
          }

          await updateDoc(docRef, {
            blogs: [...documentBlogs, newBlog],
          })
            .then(() => {
              navigate('/admin/blogs')
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

  return (
    <div>
      {loadingValue ? <SpinnerComponent /> : null}
      <div className='text-2xl py-2 px-5 border-b-[2px] border-redColor'>
        Add New Blog
      </div>
      <section className='px-5 py-3 p-[90%]'>
        <div className='flex flex-col gap-3'>
          <div className='text-xl'>Blog Title:</div>
          <input
            className='w-full'
            value={blogData.title}
            onChange={(e) => onChangeBlogData(e.target.value, 'title')}
            type='text'
          />
        </div>
        <div className='flex flex-col gap-3 mt-3'>
          <div className='text-xl'>Blog Content:</div>
          <div className=''>
            <TextEditor onContentChange={onChangeBlogContent} />
          </div>
        </div>

        <div className='flex flex-col gap-3 mt-3'>
          <div className='text-xl'>Blog Description:</div>
          <textarea
            className='w-full h-[150px]'
            value={blogData.description}
            onChange={(e) => onChangeBlogData(e.target.value, 'description')}
          />
        </div>
        <div className='flex flex-col mt-3 gap-3 flex-wrap'>
          <div className='text-xl'>Blog Images:</div>
          <div className='flex flex-wrap gap-6'>
            {blogData.images.map((image, index) => {
              return (
                <div
                  key={index}
                  className='relative group flex flex-wrap h-[300px] w-[300px] border border-black justify-center items-center transition-all ease-in hover:text-white'
                >
                  <div
                    className='absolute top-[10px] right-[10px] cursor-pointer w-[30px] h-[30px] border border-redColor'
                    onClick={() => {
                      removeBlogsImg(image.id)
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
                onChange={handleFileChange}
              />
              <div className='text-8xl'>+</div>
            </div>
          </div>
        </div>

        <div className='flex justify-end w-full'>
          <div className='flex gap-2'>
            <button
              disabled={!isValidateBlogData(blogData)}
              className={clsx(
                'py-2 px-4 rounded-lg transition-all ease-in my-2',
                !isValidateBlogData(blogData)
                  ? 'opacity-50 border border-red'
                  : ' bg-redColor text-white border border-transparent'
              )}
              onClick={() => saveBlogData()}
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminBlogsAddItem
