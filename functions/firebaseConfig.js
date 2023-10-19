const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getAuth } = require('firebase-admin/auth')

initializeApp({
  projectId: 'easy-commerce-workshop'
})

const db = getFirestore()
const auth = getAuth()

module.exports = { db, auth }