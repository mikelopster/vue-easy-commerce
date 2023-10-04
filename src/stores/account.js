import { defineStore } from 'pinia'

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { doc, getDoc, setDoc } from 'firebase/firestore/lite'

import { db, auth } from '@/firebase'

const provider = new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

export const useAccountStore = defineStore('user-account', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    user: {}
  }),
  actions: {
    async checkAuthState () {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.user = user
            this.isLoggedIn = true
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
              console.log('user not found')
              console.log('user', user)
              const userData = {
                name: user.displayName,
                role: 'member',
                status: 'active',
                updatedAt: new Date()
              }
              setDoc(docRef, userData)
            }

            if (this.user.email === 'admin@test.com') {
              this.isAdmin = true
            }
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },
    async signInWithGoogle () {
      try {
        const result = await signInWithPopup(auth, provider)
        this.user = result.user
        this.isLoggedIn = true
      } catch (error) {
        console.log('error', error.code)
        throw new Error('Login invalid')
      }
    },
    async signInAdmin (email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        this.isAdmin = true
        this.isLoggedIn = true
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new Error('Invalid email')
          case 'auth/wrong-password':
            throw new Error('Wrong password')
          default:
            throw new Error('Login invalid')
        }
      }
    },
    async logout () {
      this.isLoggedIn = false
      this.isAdmin = false
      await signOut(auth)
    }
  }
})