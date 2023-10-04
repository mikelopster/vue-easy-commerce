import { defineStore } from 'pinia'

import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore/lite'

import { db } from '@/firebase'

export const useUserStore = defineStore('user', {
  state: () => ({
    loaded: false,
    list: []
  }),
  actions: {
    async loadUser () {
      const usersCol = collection(db, 'users')
      const userSnapshot = await getDocs(usersCol)
      const userList = userSnapshot.docs.map(doc => {
        let convertedData = doc.data()
        convertedData.updatedAt = convertedData.updatedAt.toDate()
        convertedData.uid = doc.id
        return convertedData
      })
      if (userList && userList.length > 0) {
        this.list = userList
      }
      this.loaded = true
    },
    async getUser (userUid) {
      try {
        const docRef = doc(db, 'users', userUid)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
      } catch (error) {
        console.log('error', error)
      }
    },
    async updateUser (userUid, userData) {
      try {
        let updatedUser = {
          name: userData.name,
          status: userData.status,
          role: userData.role,
          updatedAt: new Date()
        }
        const docRef = doc(db, 'users', userUid)
        await setDoc(docRef, updatedUser)
      } catch (error) {
        console.log('error', error)
      }
    },
    removeUser (index) {
      this.list.splice(index, 1)
    }
  }
})