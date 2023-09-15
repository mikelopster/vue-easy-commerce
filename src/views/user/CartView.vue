<script setup>
import UserLayout from '@/layouts/UserLayout.vue'

import RightIcon from '@/components/icons/Right.vue'
import CloseIcon from '@/components/icons/Close.vue'

import { RouterLink } from 'vue-router'
</script>

<template>
  <UserLayout>
    <div class="container mx-auto my-4">
      <h1 class="text-4xl mb-4">Shopping cart</h1>
      <div class="flex">
        <section class="flex-auto w-64">
          <ul class="px-8 bg-base-200">
            <li v-for="item in [1,2,3]" class="flex w-full py-10">
              <div class="shrink-0">
                <img class="w-48" src="https://fastly.picsum.photos/id/1025/300/300.jpg?hmac=4Y_I-JXDyweKiXCJHr7qYyF8RwfblAka9dd1ooCY1fY">
              </div>
              <div class="flex flex-1 flex-col justify-between pl-4">
                <div class="grid grid-cols-2 gap-6 relative">
                  <div>
                    <div>Product name</div>
                    <div>Description</div>
                  </div>
                  <div>
                    <select class="p-1.5">
                      <option disabled selected>Quantity</option>
                      <option v-for="quantity in [1,2,3,4,5]">{{ quantity }}</option>
                    </select>
                    <div class="absolute top-0 right-0">
                      <CloseIcon class="w-5"></CloseIcon>
                    </div>
                  </div>
                </div>
                <p class="flex">
                  <RightIcon class="w-5 shrink-0"></RightIcon>
                  <span>In stock</span>
                </p>
              </div>
            </li>
          </ul>
        </section>
        <section class="flex-auto w-32 bg-slate-200 p-8">
          <h2 class="text-2xl">Order summary</h2>
          <div class="mt-4 m-0 divide-y divide-base-200">
            <div class="flex align-middle justify-between mb-2">
              <div class="font-bold">ราคาสินค้าทั้งหมด</div>
              <div>199</div>
            </div>
            <div class="flex align-middle justify-between mb-2">
              <div class="font-bold">ค่าส่ง</div>
              <div>0</div>
            </div>
            <div class="flex align-middle justify-between mb-2">
              <div class="font-bold">ราคาทั้งสิ้น</div>
              <div>0</div>
            </div>
            <RouterLink to="/checkout" class="btn btn-primary w-full">
              ชำระเงิน
            </RouterLink>
          </div>
        </section>
      </div>
    </div>
  </UserLayout>
</template>