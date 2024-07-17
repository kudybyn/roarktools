import React from 'react';
import { useTranslation } from 'react-i18next';
import Trash from "../../assets/trash.svg"
import { useDispatch } from 'react-redux'
import { remove } from '../../redux/slices/BucketSlice'
import Close from "../../assets/close.svg";

export default function BucketModal({ onClose, data }) {
    const {t} = useTranslation();
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

const dispatch = useDispatch()

    const removeElement = (id) => {
        
        dispatch(remove(id))
    }


    const total = data.reduce((sum, item) => {
        return sum + parseFloat(item.price);
    }, 0);
    
    return (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-[1000]" onClick={onClose}>
            <div className="lg:rounded-xl bg-white shadow-lg px-8 py-4 w-[100vw] h-[100vh] lg:w-[60vw] lg:h-[75vh] max-h-[100vh] lg:max-h-[75vh]" onClick={handleModalClick}>
                <div className="w-full flex justify-end">
                    <button className="font-bold" onClick={onClose}><img src={Close} className="w-[30px] h-[30px]" alt="close"/></button>
                </div>
                <div className="w-full flex flex-col gap-8  items-center mt-[15px] h-full max-h-[75vh] lg:max-h-[55vh]">
                    <span className="font-bold text-[27px]">{t('bucket.yourBucket')}</span>
                    <div className="flex flex-col gap-6 overflow-auto w-full h-full scrollNew max-h-[75vh] lg:max-h-[45vh] pr-2">
                        {data && data.length ?
                            data.map((bucketItem,index) => (
                                <div key={bucketItem.id} className="w-full flex items-center justify-between">
                                  <div className="flex gap-4 items-center">
                                    {bucketItem.images && bucketItem.images.length &&<img src={bucketItem.images[0].link} alt={bucketItem.title}
                                    className="w-[60px] h-[60px] object-cover"/>}
                                   <span className="text-[21px]">{bucketItem.title}</span>
                                   </div>
                                   <div className="flex gap-4 items-center text-[18px]"><span>{bucketItem.price}{t('value')}</span>
                                   <button
                                   onClick={()=>removeElement(index)}
                                   className="border-2 border-redColor rounded p-2 bg-white transition duration-500 hover:bg-[rgb(255,99,71,0.3)]"><img src={Trash} alt="remove element"/></button></div>
                                </div>
                            ))
                            : <div>{t("bucket.emptyBucket")}</div>
                        }
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <div className="flex gap-4 items-center  mt-[25px]">
                        <span className="text-[21px] text-black">{total}{t('value')}</span>
                        <button className="text-[21px] text-white rounded-lg border-2 border-customGreen bg-customGreen
                        py-2 px-6 transition duration-500 hover:scale-105">{t("bucket.buy")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
