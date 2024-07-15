import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../../../redux/slices/BlogsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ArrowLeft from '../../../../../assets/homepage/arrow-left.svg'
import { documentLanguageList } from '../../../../../helper/helper'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firebaseDb } from '../../../../../firebase/config'
import SpinnerComponent from '../../SpinnerComponent/SpinnerComponent'

const AdminBlogsList = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.blogs)
  const [rerender, setRerender] = useState(false)
  const blogsDataList = data.length ? Object.values(data[0]) : []
  useEffect(() => {
    dispatch(fetchData({ collectionName: 'en', type: 'blogs' }))
  }, [rerender])
  const [loadingValue, setLoadingValue] = useState(false)

  const removeBlogs = async (id) => {
    for (const language of documentLanguageList) {
      const docRef = doc(firebaseDb, language.lang, language.idDocument)

      try {
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
          const document = docSnapshot.data()
          const documentResources = document.blogs
          const updatedManuals = documentResources.filter((b) => b.id !== id)
          setLoadingValue(true)
          await updateDoc(docRef, {
            blogs: updatedManuals,
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
    <div className='px-5 py-3'>
      {loading || loadingValue ? <SpinnerComponent /> : null}
      <div className='flex flex-wrap gap-6'>
        {loading || !blogsDataList.length ? (
          <div>Loading</div>
        ) : (
          <>
            {blogsDataList.map((item) => {
              return (
                <div
                  className='relative flex flex-col h-[300px] w-[300px] min-w-[250px]'
                  key={item.id}
                >
                  <div
                    className='absolute top-[10px] right-[10px] cursor-pointer w-[30px] h-[30px] border border-redColor'
                    onClick={() => {
                      removeBlogs(item.id)
                    }}
                  >
                    <div className='absolute top-[13px] -left-[1px] inset-0 rotate-45 w-[30px] h-[2px] bg-redColor' />
                    <div className='absolute top-[13px] -left-[1px] inset-0 -rotate-45 w-[30px] h-[2px] bg-redColor' />
                  </div>
                  {item.images && item.images[0].link && (
                    <img
                      src={item.images[0].link}
                      alt={item.title}
                      className='w-full h-[150px] object-cover'
                    />
                  )}
                  {item.title && (
                    <span className='text-[20px] h-auto line-clamp-2'>
                      {item.title}
                    </span>
                  )}
                  {item.description && (
                    <div className='h-[50px]'>
                      <span className='text-[18px]  text-[#bebebe] font-normal h-auto line-clamp-2'>
                        {item.description}
                      </span>
                    </div>
                  )}
                  <Link to={`${item.id}`}>
                    <div
                      className='text-[rgb(255,0,0)] font-semibold text-[28px] flex items-center
                                    gap-2 transition duration-500 hover:scale-105'
                    >
                      Change Blog
                      <img
                        src={ArrowLeft}
                        alt={`read more ${item.title}`}
                        className='w-[40px] h-[40px]'
                      />
                    </div>
                  </Link>
                </div>
              )
            })}
          </>
        )}
        <Link
          to={'add'}
          className='relative cursor-pointer h-[300px] w-[300px] border border-black flex justify-center items-center hover:bg-redColor transition-all ease-in hover:text-white'
        >
          <div className='text-8xl'>+</div>
        </Link>
      </div>
    </div>
  )
}

export default AdminBlogsList
