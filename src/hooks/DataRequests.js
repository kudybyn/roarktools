import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/config';

export function useDataRequests(lang, fieldName) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const testRef = collection(db, lang);

    useEffect(() => {
        setLoading(true);
        getDocs(testRef)
            .then((querySnapshot) => {
                const results = [];
                querySnapshot.forEach((doc) => {
                    if(doc.data()[fieldName]){
                    results.push(doc.data()[fieldName]);
                    }
                    else{
                        setError(`Error getting documents`);
                    }
                });
                if(results.length<1){
                    setError(`Error getting documents`);
                }
                setResult(results);
            })
            .catch((error) => {
                setError(`Error getting documents: ${error}`);
                setResult(null)
            })
            .finally(() => {
                setLoading(false);
            });
    }, [lang, fieldName]);

    return { loading, result, error };
}
