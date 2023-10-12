import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'

import firebaseConfig from './firebase.json'

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)

const auth = getAuth()
connectAuthEmulator(auth, 'http://127.0.0.1:9099')

const storage = getStorage()
connectStorageEmulator(storage, '127.0.0.1', 9199)

const realtimeDB = getDatabase()
connectDatabaseEmulator(realtimeDB, '127.0.0.1', 9000)

export {
  db,
  auth,
  storage,
  realtimeDB
}