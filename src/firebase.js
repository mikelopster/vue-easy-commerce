import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'

import firebaseConfig from './firebase.json'

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth()
const realtimeDB = getDatabase()
const storage = getStorage()

// if (import.meta.env.DEV) {
//   connectFirestoreEmulator(db, '127.0.0.1', 8080)
//   connectAuthEmulator(auth, 'http://127.0.0.1:9099')
//   connectStorageEmulator(storage, '127.0.0.1', 9199)
//   connectDatabaseEmulator(realtimeDB, '127.0.0.1', 9000)
// }

export {
  db,
  auth,
  storage,
  realtimeDB
}