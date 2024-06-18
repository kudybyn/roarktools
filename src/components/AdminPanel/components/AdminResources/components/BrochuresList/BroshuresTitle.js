import React, { useEffect } from 'react'

const BroshuresTitle = ({
  activeLanguage,
  setBrochuresTitle,
  brochuresTitle,
}) => {
  const [productName, setProductName] = React.useState('')

  useEffect(() => {
    if (brochuresTitle) {
      const title = brochuresTitle.find((b) => b.lang === activeLanguage)
      if (title) {
        setProductName(title.title)
      }
    }
  }, [activeLanguage])

  const onChcngeBroshuresTitle = (e) => {
    const value = e.target.value
    setBrochuresTitle(activeLanguage, value)
    setProductName(value)
  }

  return (
    <div>
      <input
        className='w-full'
        value={productName}
        onChange={onChcngeBroshuresTitle}
      />
    </div>
  )
}

export default BroshuresTitle
