const { onRequest } = require('firebase-functions/v2/https')
const { onDocumentWritten } = require('firebase-functions/v2/firestore')

const express = require('express')
const omise = require('omise')({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: '2019-05-29'
})

const app = express()

const { db, auth, realtimeDB } = require('./firebaseConfig.js')

const createCharge = (source, amount, orderId) => {
  return new Promise((resolve, reject) => {
    omise.charges.create({
      amount: (amount * 100),
      currency: 'THB',
      return_uri: `http://localhost:5173/success?order_id=${orderId}`,
      metadata: {
        orderId
      },
      source,
    }, (err, resp) => {
      if (err) {
        return reject(err)
      }
      resolve(resp)
    })
  })
}

app.post('/placeorder', async (req, res) => {
  try {
    const idToken = req.headers.authorization
    const checkoutData = req.body.checkout
    const decodedToken = await auth.verifyIdToken(idToken)
    console.log('decodedToken', decodedToken.uid)

    // summary data
    let summaryPrice = 0
    let checkoutProducts = []
    let omiseResponse = {}

    // check stock, valid = decrease stock
    await db.runTransaction(async (transaction) => {
      for (const product of checkoutData.products) {
        const productRef = db.collection('products').doc(product.productId)
        const snapshot = await transaction.get(productRef)
        const productData = snapshot.data()
        const remainQuantity = productData.remainQuantity - product.quantity
        if (remainQuantity < 0) {
          throw new Error(`Product: ${productData.name} out of stock`)
        }
        summaryPrice += (productData.price * product.quantity)
        transaction.update(productRef, { remainQuantity })

        let checkoutProduct = product
        checkoutProduct.price = productData.price
        checkoutProduct.totalPrice = productData.price * product.quantity
        checkoutProduct.name = productData.name
        checkoutProduct.about = productData.about
        checkoutProduct.imageUrl = productData.imageUrl
        checkoutProducts.push(checkoutProduct)
      }

      const orderRef = db.collection('orders')

      // create order id
      const orderId = orderRef.doc().id

      // make payment
      omiseResponse = await createCharge(
        req.body.source,
        summaryPrice,
        orderId
      )

      // create order
      const orderData = {
        chargeId: omiseResponse.id,
        email: checkoutData.email,
        name: checkoutData.name,
        address: checkoutData.address,
        note: checkoutData.note || '',
        totalPrice: summaryPrice,
        paymentMethod: 'rabbit_linepay',
        createdAt: new Date(),
        products: checkoutProducts,
        status: 'pending',
        orderId
      }

      transaction.set(orderRef.doc(orderId), orderData)
    })

    res.json({
      message: 'Order successful!',
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
  try {
    if (req.body.key === 'charge.complete') {
      const paymentData = req.body.data
      console.log(paymentData.status)
      const chargeId = paymentData.id
      const orderId = paymentData.metadata.orderId

      const orderRef = db.collection('orders').doc(orderId)
      const orderSnapshot = await orderRef.get()
      const orderData = orderSnapshot.data()

      // check correct order
      if (
        orderData.chargeId === chargeId &&
        orderData.status === 'pending'
      ) {
        await orderRef.update({
          status: paymentData.status
        })
      }

      console.log('success data', {
        chargeId,
        orderId
      })
    }
  } catch (error) {
    console.log('error', error)
  }
})

exports.api = onRequest(app)

// เมื่อ order ถูกสร้าง = update ข้อมูลใน collection stat ของ realtime DB
exports.orderCreated = onDocumentWritten('orders/{docId}', async (event) => {
  try {
    const oldData = event.data.before.data()
    const newData = event.data.after.data()
    const orderStateRef = realtimeDB.ref('stats/order')

    // Delete order case and success case
    if (newData && newData.status === 'successful' && (newData.status !== oldData.status)){
      await orderStateRef.transaction((currentValue) => {
        return currentValue + newData.totalPrice
      })
    }
  } catch (error) {
    console.log('error', error)
  }
})