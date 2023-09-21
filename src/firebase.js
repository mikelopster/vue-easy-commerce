import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite'

const firebaseConfig = {
  /* your config */
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)

export {
  db
}