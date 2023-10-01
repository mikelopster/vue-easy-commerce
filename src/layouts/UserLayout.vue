<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useUserCartStore } from '@/stores/user/cart'
import { useAccountStore } from '@/stores/account'
import { useEventStore } from '@/stores/event'

const searchText = ref('')

const router = useRouter()

const userCartStore = useUserCartStore()
const userAccountStore = useAccountStore()
const eventStore = useEventStore()

const handleEnter = (event) => {
  if (event.key === 'Enter') {
    router.push({
      name: 'search',
      query: {
        q: searchText.value
      }
    })
  }
}

const login = async () => {
  try {
    await userAccountStore.signInWithGoogle()
  } catch (error) {
    console.log('error', error)
    eventStore.popupMessage('error', 'Login failed')
  }
}

const logout = async () => {
  try {
    await userAccountStore.logout()
    localStorage.removeItem('login')
    localStorage.removeItem('cart-item')
    localStorage.removeItem('checkout-data')
    window.location.reload()
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost normal-case text-xl">Mikelopster Shop</RouterLink>
      </div>
      <div class="flex-none">
        <div class="form-control">
          <input
            type="text"
            v-model="searchText"
            placeholder="Search"
            class="input input-bordered w-24 md:w-auto"
            @keyup="handleEnter"
          />
        </div>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span class="badge badge-sm indicator-item">{{ userCartStore.quantity }}</span>
            </div>
          </label>
          <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div class="card-body">
              <span class="font-bold text-lg">{{ userCartStore.quantity }} Items</span>
              <span class="text-info">Subtotal: {{ userCartStore.summaryPrice }} ฿</span>
              <div class="card-actions">
                <RouterLink to="/cart" class="btn btn-primary btn-block">
                  View cart
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!userAccountStore.isLoggedIn" class="btn btn-ghost" @click="login">
          Login
        </div>
        <div v-else class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="https://mikelopster.dev/mikelopster.da6b9a03.webp" />
            </div>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <RouterLink to="/profile" class="justify-between">
                Profile
              </RouterLink>
            </li>
            <li>
              <a @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <slot></slot>
    <footer class="footer p-10 bg-neutral text-neutral-content">
      <div>
        <span class="footer-title">Services</span> 
        <a class="link link-hover">Branding</a>
        <a class="link link-hover">Design</a>
        <a class="link link-hover">Marketing</a>
        <a class="link link-hover">Advertisement</a>
      </div> 
      <div>
        <span class="footer-title">Company</span> 
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </div> 
      <div>
        <span class="footer-title">Legal</span> 
        <a class="link link-hover">Terms of use</a>
        <a class="link link-hover">Privacy policy</a>
        <a class="link link-hover">Cookie policy</a>
      </div>
    </footer>
  </div>
</template>