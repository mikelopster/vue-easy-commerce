const { initializeApp, applicationDefault } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getDatabase } = require('firebase-admin/database')
const { getAuth } = require('firebase-admin/auth')

let databaseURL  ='https://easy-commerce-workshop-default-rtdb.asia-southeast1.firebasedatabase.app'

initializeApp({
  projectId: 'easy-commerce-workshop',
  credential: applicationDefault(),
  databaseURL
})

const db = getFirestore()
const auth = getAuth()
const realtimeDB = getDatabase()

module.exports = {
  db,
  auth,
  realtimeDB
}