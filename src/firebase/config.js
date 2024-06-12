// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB11q97nuwlg3QfcWUWzmmwLYwZhFvfDnA',
  authDomain: 'roarktools-3c762.firebaseapp.com',
  projectId: 'roarktools-3c762',
  storageBucket: 'roarktools-3c762.appspot.com',
  messagingSenderId: '683175985721',
  appId: '1:683175985721:web:e3b38397da6c2c5fcb83e8',
  measurementId: 'G-8ZHPVM38V0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const fireBaseStorage = getStorage(app)
const firebaseDb = getFirestore(app)

export default getFirestore(app)
export { fireBaseStorage, firebaseDb }
