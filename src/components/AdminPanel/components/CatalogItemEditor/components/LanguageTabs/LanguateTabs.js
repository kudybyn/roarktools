import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { doc, getDoc } from 'firebase/firestore'
import db from '../../../../../../firebase/config'

const LanguageTabs = ({
  tabs,
  children,
  catalogId,
  subField,
  setRerenderList,
  isAddItem,
}) => {
  const [activeTab, setActiveTab] = React.useState(tabs[0])
  const [products, setProducts] = React.useState([])
  const [isSaveChanges, setIsSaveChanges] = React.useState(false)
  const [rerender, setRerender] = useState(false)
  const documentIdList = [
    {
      id: 't7rkXlxoXbQZBESujoQr',
      name: 'en',
    },
    {
      id: '7ZtKhX4RSbhhpK16CXIU',
      name: 'ar',
    },
    {
      id: 'hHtEUu8S7Z9gRVKYXj0L',
      name: 'pt',
    },
    {
      id: 'KBxe2QAnpuGOczd05TU5',
      name: 'ru',
    },
    {
      id: 'TAZJbjDDfHQhopeJ0ZCJ',
      name: 'tr',
    },
  ]
  useEffect(() => {
    if (!isAddItem) {
      const fetchData = async () => {
        const data = await getListOnItems()
        setProducts(data)
      }

      fetchData()
    }
  }, [rerender])

  const getListOnItems = async () => {
    const promises = tabs.map((tab) => {
      const documentId = documentIdList.find((d) => d.name === tab)
      return getItems(tab, documentId.id, catalogId)
    })
    return await Promise.all(promises)
  }

  async function getItems(collectionName, documentId, catalogId) {
    const docRef = doc(db, collectionName, documentId)
    try {
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) {
        const data = docSnapshot.data()
        const catalogs = data.calatog
        const catalogItem = catalogs.find(
          (item) => item.id.toString() === catalogId
        )

        if (catalogItem) {
          return {
            data: catalogItem[subField],
            collectionName: collectionName,
            documentId: documentId,
            catalogId: catalogId,
          }
        } else {
          console.log('Catalog item not found with id:', catalogId)
          return null
        }
      } else {
        console.log('Document not found')
        return null
      }
    } catch (error) {
      console.error('Error accessing the document:', error)
      return null
    }
  }

  return (
    <div className='w-full'>
      <div className='flex gap-1 my-2'>
        {tabs.map((tab, index) => {
          return (
            <div
              className={clsx(
                'px-3 py-1 text-lg font-normal uppercase cursor-pointer bg-redColor rounded-t-xl transition-all ease-in',
                activeTab === tab
                  ? 'bg-white text-redColor border border-redColor'
                  : 'text-white border border-transparent'
              )}
              onClick={() => {
                if (!isSaveChanges) {
                  setActiveTab(tab)
                }
              }}
            >
              {tab}
            </div>
          )
        })}
      </div>
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            activeLanguage: activeTab,
            data: products.find((p) => {
              return p.collectionName === activeTab
            }),
            setIsSaveChanges: setIsSaveChanges,
            isSaveChanges: isSaveChanges,
            setRerender: () => setRerenderList(),
          })
        })}
      </div>
    </div>
  )
}

export default LanguageTabs
