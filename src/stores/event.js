import { defineStore } from 'pinia'

import {
  ref,
  onValue
} from 'firebase/database'

import { realtimeDB } from '@/firebase'

export const useEventStore = defineStore('event', {
  state: () => ({
    alert: false,
    data: {},
    banner: {}
  }),
  actions: {
    loadBanner () {
      const bannerRef = ref(realtimeDB, 'banner')
      onValue(bannerRef, (snapshot) => {
        this.banner = snapshot.val()
      })
    },
    popupMessage (status, message) {
      this.data = {
        status,
        message
      }
      this.alert = true
      setTimeout(() => {
        this.clearPopup()
      }, 3000)
    },
    clearPopup () {
      this.alert = false
      this.data = {}
    }
  }
})