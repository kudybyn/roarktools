import React, { useEffect } from 'react'

const BroshuresTitle = ({ setBrochuresTitle, brochuresTitle }) => {
  const [productName, setProductName] = React.useState('')

  useEffect(() => {
    if (brochuresTitle) {
      setProductName(brochuresTitle)
    }
  }, [brochuresTitle])

  const onChangeBrochuresTitle = (e) => {
    const value = e.target.value
    setBrochuresTitle(value)
    setProductName(value)
  }

  return (
    <div>
      <input
        className='w-full'
        value={productName}
        onChange={onChangeBrochuresTitle}
      />
    </div>
  )
}

export default BroshuresTitle
