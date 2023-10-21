const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getDatabase } = require('firebase-admin/database')
const { getAuth } = require('firebase-admin/auth')

initializeApp({
  projectId: 'easy-commerce-workshop',
  databaseURL: 'http://127.0.0.1:9000/?ns=easy-commerce-workshop-default-rtdb' // need to add in realtime database
})

const db = getFirestore()
const auth = getAuth()
const realtimeDB = getDatabase()

module.exports = {
  db,
  auth,
  realtimeDB
}