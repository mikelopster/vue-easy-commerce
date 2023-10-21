import { defineStore } from 'pinia'

import {
  realtimeDB
} from '@/firebase'

import {
  ref,
  get
} from 'firebase/database'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: {
      order: 0,
      product: 0,
      user: 0
    }
  }),
  actions: {
    async loadDashboard () {
      try {
        const dashboardRef = ref(realtimeDB, 'stats')
        const dashboardData = await get(dashboardRef)
        this.stats = dashboardData.val()
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})