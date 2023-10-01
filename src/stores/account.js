import { defineStore } from 'pinia'

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { auth } from '@/firebase'

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
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user = user
            this.isLoggedIn = true
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
        console.log('error', error)
      }
    },
    async signInAdmin (email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        this.isAdmin = true
        this.isLoggedIn = true
      } catch (error) {
        console.log('error', error)
      }
    },
    async logout () {
      this.isLoggedIn = false
      this.isAdmin = false
      await signOut(auth)
    }
  }
})