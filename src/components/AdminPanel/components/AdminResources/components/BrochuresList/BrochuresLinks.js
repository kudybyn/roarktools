import React from 'react'

const BrochuresLinks = ({ setBrochuresLinks }) => {
  const [link, setLink] = React.useState('')

  const onChangeBrochuresTitle = (e) => {
    const value = e.target.value
    setBrochuresLinks(value)
    setLink(value)
  }

  return (
    <div>
      <input
        className='w-full'
        value={link}
        onChange={onChangeBrochuresTitle}
      />
    </div>
  )
}

export default BrochuresLinks
