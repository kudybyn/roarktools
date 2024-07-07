import React, { useEffect } from 'react'

const DescriptionInput = ({
  activeLanguage,
  setBrochuresTitle,
  brochuresTitle,
}) => {
  const [productName, setProductName] = React.useState('')

  useEffect(() => {
    if (brochuresTitle) {
      const title = brochuresTitle.find((b) => b.lang === activeLanguage)
      if (title) {
        setProductName(title.description)
      }
    }
  }, [activeLanguage, brochuresTitle])

  const onChangeRestitutional = (e) => {
    const value = e.target.value
    setBrochuresTitle(activeLanguage, value)
    setProductName(value)
  }

  return (
    <div>
      <textarea
        className='w-full h-[150px]'
        value={productName}
        onChange={onChangeRestitutional}
      />
    </div>
  )
}

export default DescriptionInput
