<script setup>
import UserLayout from '@/layouts/UserLayout.vue'

import { computed, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserCartStore } from '@/stores/user/cart'

const checkoutForm = [
  {
    name: 'Email Address',
    field: 'email'
  },
  {
    name: 'Name',
    field: 'name'
  },
  {
    name: 'Address',
    field: 'address'
  },
  {
    name: 'Note',
    field: 'note'
  }
]

const userCartStore = useUserCartStore()
const userCheckoutData = reactive({})
const router = useRouter()

const checkout = () => {
  // submit checkout data
  userCartStore.checkout(userCheckoutData)
  router.push({ name: 'success' })
}
</script>

<template>
  <UserLayout>
    <div class="container mx-auto my-4">
      <h1 class="text-4xl mb-4">Checkout</h1>
      <div class="flex">
        <section class="flex-auto w-64 bg-base-200">
          <div class="px-8 py-2">
            <div
              v-for="form in checkoutForm"
              class="form-control w-full"
            >
              <label class="label">
                <span class="label-text">{{ form.name }}</span>
              </label>

              <textarea
                v-if="form.field === 'address'"
                class="textarea textarea-bordered h-24"
                placeholder="Address"
                v-model="userCheckoutData[form.field]"
              ></textarea>
              <input
                v-else
                type="text"
                placeholder="Type here"
                class="input input-bordered input-sm w-full"
                v-model="userCheckoutData[form.field]"
              />
            </div>
            <button class="btn btn-primary w-full mt-4" @click="checkout()">
              ชำระเงิน
            </button>
          </div>
        </section>
        <section class="flex-auto w-32 bg-slate-200">
          <div class="px-8">
            <ul>
              <li v-for="(item, index) in userCartStore.items" class="px-2 flex py-6" :key="index">
                <img
                  class="w-40 object-cover object-center"
                  :src="item.imageUrl"
                />
                <div class="flex flex-col justify-between ml-4">
                  <div>
                    <div>{{ item.name }}</div>
                    <div>จำนวน: {{ item.quantity }}</div>
                  </div>
                  <div class="flex mt-2">
                    <RouterLink :to="{ name: 'cart' }">
                      <button>Edit</button>
                    </RouterLink>
                  </div>
                </div>
              </li>
            </ul>
            <div class="divider"></div>
            <div class="mb-4">
              <h2 class="text-2xl">Order summary</h2>
              <div class="mt-4 m-0">
                <div class="flex align-middle justify-between mb-2">
                  <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                  <div>{{ userCartStore.summaryPrice }}</div>
                </div>
                <div class="flex align-middle justify-between mb-2">
                  <div class="font-bold">ค่าส่ง</div>
                  <div>0</div>
                </div>
                <div class="divider"></div>
                <div class="flex align-middle justify-between mb-2">
                  <div class="font-bold">ราคาทั้งสิ้น</div>
                  <div>{{ userCartStore.summaryPrice }}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </UserLayout>
</template>
