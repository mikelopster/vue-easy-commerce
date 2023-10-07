import { defineStore } from 'pinia'

import {
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  limit,
  where,
  limitToLast,
  getCountFromServer,
  orderBy,
  startAfter,
  endBefore
} from 'firebase/firestore'

import { db } from '@/firebase'

export const useProductStore = defineStore('product', {
  state: () => ({
    docList: [],
    total: 0,
    page: {
      activePage: 1
    },
    search: {
      text: '',
      status: '',
      sort: 'asc'
    }
  }),
  getters: {
    list (state) {
      return state.docList.map(doc => {
        let convertedData = doc.data()
        convertedData.updatedAt = convertedData.updatedAt.toDate()
        convertedData.uid = doc.id
        return convertedData
      })
    },
    totalPage (state) {
      return Math.ceil(state.total / 2)
    }
  },
  actions: {
    async loadProduct () {
      try {
        let productsCol = query(
          collection(db, 'products')
        )
        if (this.search.text) {
          productsCol = query(
            productsCol,
            where('name', '==', this.search.text),
          )
        }
        if (this.search.status) {
          productsCol = query(
            productsCol,
            where('status', '==', this.search.status),
          )
        }

        const countProductQuery = query(
          productsCol,
          orderBy('updatedAt', this.search.sort),
        )

        productsCol = query(
          countProductQuery,
          limit(2)
        )

        const productSnapshot = await getDocs(productsCol)
        this.docList = productSnapshot.docs || []
        this.page.activePage = 1

        // calculate total
        const allSnapshot = await getCountFromServer(countProductQuery)
        this.total = allSnapshot.data().count
      } catch (error) {
        console.log('error', error)
      }
    },
    async loadNextProduct (mode) {
      let productQuery = query(
        collection(db, 'products'),
        orderBy('updatedAt', this.search.sort),
      )
      if (this.search.status) {
        productQuery = query(
          productQuery,
          where('status', '==', this.search.status),
        )
      }
      if (mode === 'next') {
        const lastDocument = this.docList[this.docList.length - 1]
        productQuery = query(
          productQuery,
          startAfter(lastDocument),
          limit(2)
        )
      } else {
        const firstDocument = this.docList[0]
        productQuery = query(
          productQuery,
          endBefore(firstDocument),
          limitToLast(2)
        )
      }
      const productSnapshot = await getDocs(productQuery)
      this.docList = productSnapshot.docs
    },
    async getProduct (productUid) {
      try {
        const docRef = doc(db, 'products', productUid)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
      } catch (error) {
        console.log('error', error)
      }
    },
    async addProduct (productData) {
      productData.remainQuantity = productData.quantity
      productData.updatedAt = new Date()
      console.log('productData', productData)
      try {
        await addDoc(collection(db, 'products'), productData)
      } catch (error) {
        console.log('error', error)
      }
    },
    async updateProduct (productUid, productData) {
      try {
        const updatedProduct = {
          name: productData.name,
          imageUrl: productData.imageUrl,
          quantity: productData.quantity,
          price: productData.price,
          remainQuantity: productData.quantity,
          status: productData.status,
          about: productData.about,
          updatedAt: new Date()
        }
        const docRef = doc(db, 'products', productUid)
        await setDoc(docRef, updatedProduct)
      } catch (error) {
        console.log('error', error)
      }
    },
    async removeProduct (productUid) {
      try {
        await deleteDoc(doc(db, 'products', productUid))
      } catch (error) {
        console.log('error', error)
      }
    },
    async changeSortOrder (newSort) {
      try {
        this.search.sort = newSort
        await this.loadProduct()
      } catch (error) {
        console.log('error', error)
      }
    },
    async changeFilterStatus (newStatus) {
      try {
        this.search.status = newStatus
        await this.loadProduct()
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})