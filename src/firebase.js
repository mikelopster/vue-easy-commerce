import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

const firebaseConfig = {
  /* your config */
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)

const auth = getAuth()
connectAuthEmulator(auth, 'http://127.0.0.1:9099')

export {
  db,
  auth
}