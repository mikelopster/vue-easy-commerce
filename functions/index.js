const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')

const express = require('express')
const omise = require('omise')({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: '2019-05-29'
})

const app = express()

const { db, auth } = require('./firebaseConfig.js')

const createCharge = (source) => {
  return new Promise((resolve, reject) => {
    omise.charges.create({
      amount: 400000,
      currency: 'THB',
      return_uri: 'https://example.com/orders/345678/complete',
      source: source,
    }, (err, resp) => {
      if (err) {
        return reject(err)
      }
      resolve(resp)
    })
  })
}

app.post('/placeorder', async (req, res) => {
  // logger.info('Hello logs!', { structuredData: true })
  // console.log(process.env.OMISE_SECRET_KEY)

  try {
    const idToken = req.headers.authorization
    const decodedToken = await auth.verifyIdToken(idToken)
    console.log('decodedToken', decodedToken.uid)

    const omiseResponse = await createCharge(req.body.source)

    // console.log(req.body)
    // const users = await db.collection('users').get()
    // const userData = users.docs.map(user => user.data())
    
    console.log('omiseResponse', omiseResponse)

    res.json({
      message: 'Hello from Firebase!',
      redirectUrl: omiseResponse.authorize_uri
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      message: error.message
    })
  }
})

app.post('/webhook', async (req, res) => {
  // console.log('body', req.body)
  // console.log('key', req.body.key)
  res.json({
    message: 'Hello from Firebase!'
  })
})

exports.api = onRequest(app)