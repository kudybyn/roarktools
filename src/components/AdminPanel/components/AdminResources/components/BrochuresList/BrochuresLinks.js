import React, { useEffect } from 'react'

const BrochuresLinks = ({ setBrochuresLinks, link: prevLink }) => {
  const [link, setLink] = React.useState('')

  useEffect(() => {
    if (prevLink) {
      setLink(prevLink)
    }
  }, [prevLink])

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
