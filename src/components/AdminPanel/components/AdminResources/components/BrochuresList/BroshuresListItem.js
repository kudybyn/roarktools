import React from 'react'
import { Link } from 'react-router-dom'

const BroshureListItem = ({ id, imageSrc, link, title }) => {
  const removeBroshureItem = () => {}
  return (
    <div className='h-[300px] w-[300px] object-cover border border-black relative'>
      <div
        className='absolute top-[10px] right-[10px] cursor-pointer w-[30px] h-[30px] border border-redColor'
        onClick={() => {
          removeBroshureItem(id)
        }}
      >
        <div className='absolute top-[13px] -left-[1px] inset-0 rotate-45 w-[30px] h-[2px] bg-redColor' />
        <div className='absolute top-[13px] -left-[1px] inset-0 -rotate-45 w-[30px] h-[2px] bg-redColor' />
      </div>
      <div></div>
      <a
        className='h-[230px] w-[300px] flex items-center justify-center'
        href={link}
        target='_blank'
      >
        <img
          src={imageSrc}
          alt={title}
          className='w-auto h-auto max-h-[230px] max-w-[230px]'
        />
      </a>
      <div className='text-center text-lg my-0.5'>{title}</div>

      <Link
        to={`${id}`}
        className='w-full flex items-center justify-center bg-redColor py-1.5 text-white hover:text-black hover:bg-white hover:border hover:border-redColor border border-transparent transition-all ease-in'
      >
        Change Brochure
      </Link>
    </div>
  )
}

export default BroshureListItem
