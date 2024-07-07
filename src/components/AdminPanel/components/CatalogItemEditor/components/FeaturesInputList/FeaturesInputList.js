import React, { useEffect } from 'react'

const FeaturesInputList = ({ activeLanguage, setFeatures, features }) => {
  const [productFeatures, setProductFeatures] = React.useState([])

  const onChangeRestitutional = (id, text) => {
    const updatedList = productFeatures.map((f) => {
      return f.id === id ? { id: f.id, text: text } : f
    })
    setProductFeatures(updatedList)
    setFeatures(activeLanguage, updatedList)
  }

  const onDeleteFeaturesById = (id) => {
    const updatedFeatures = productFeatures.filter((f) => f.id !== id)
    setProductFeatures(updatedFeatures)
    setFeatures(activeLanguage, updatedFeatures)
  }

  useEffect(() => {
    if (features) {
      const title = features.find((b) => b.lang === activeLanguage)
      if (title) {
        setProductFeatures(title.features)
      }
    }
  }, [activeLanguage, features])

  return (
    <div>
      <button
        className='px-3 py-1 h-[42px] text-lg font-normal uppercase cursor-pointer bg-redColor rounded-lg text-white'
        onClick={() => {
          const newItem = {
            text: '',
            id: Math.random().toString(36).substr(2, 9) + '',
          }
          setProductFeatures([...productFeatures, newItem])
          setFeatures(activeLanguage, [...productFeatures, newItem])
        }}
      >
        Add Feature
      </button>
      {productFeatures.map((f) => {
        return (
          <FeaturesInputItem
            key={f.id}
            prevFeature={f.text}
            deleteFeatures={() => onDeleteFeaturesById(f.id)}
            onChangeFeatureList={(text) => onChangeRestitutional(f.id, text)}
          />
        )
      })}
    </div>
  )
}

const FeaturesInputItem = ({
  prevFeature,
  deleteFeatures,
  onChangeFeatureList,
}) => {
  const [feature, setFeature] = React.useState(prevFeature || '')

  const onChangeFeature = (e) => {
    setFeature(e.target.value)
    onChangeFeatureList(e.target.value)
  }
  return (
    <div className='w-full flex gap-3 items-center justify-between my-1'>
      <input
        onChange={onChangeFeature}
        value={feature}
        className='w-[calc(100%-70px)]'
      />
      <button
        onClick={() => deleteFeatures()}
        className='px-3 py-1 h-[42px] text-lg font-normal uppercase cursor-pointer bg-redColor rounded-lg text-white'
      >
        Delete
      </button>
    </div>
  )
}

export default FeaturesInputList
