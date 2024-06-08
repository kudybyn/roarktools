import {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchData } from '../../Catalog/CatalogSlice';

export default function Catalog(){

    const {i18n} = useTranslation();

    const dispatch = useDispatch();
    const data = useSelector((state) => state.catalog.data);
    const loading = useSelector((state) => state.catalog.loading);
    const error = useSelector((state) => state.catalog.error);
  
    useEffect(() => {
      if (i18n.language) {
        dispatch(fetchData({ collectionName: i18n.language, type: 'calatog' }));
      }
    }, [dispatch, i18n.language]);


    console.log(data,loading,error)


    return(
        <div></div>
    )
}