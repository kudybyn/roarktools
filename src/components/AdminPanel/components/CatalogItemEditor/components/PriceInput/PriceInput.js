import React, { useEffect } from 'react'

const PriceInput = ({ activeLanguage, setBrochuresTitle, brochuresTitle }) => {
  const [productName, setProductName] = React.useState('')

  useEffect(() => {
    if (brochuresTitle) {
      const title = brochuresTitle.find((b) => b.lang === activeLanguage)
      if (title) {
        setProductName(title.price)
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
      <input
        className='w-full'
        value={productName}
        onChange={onChangeRestitutional}
      />
    </div>
  )
}

export default PriceInput
