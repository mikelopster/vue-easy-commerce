<script setup>
import { onMounted, ref } from 'vue'
import { useUserCartStore } from '@/stores/user/cart'
import UserLayout from '@/layouts/UserLayout.vue'

const userCartStore = useUserCartStore()
const checkoutData = ref({})

onMounted(() => {
  userCartStore.loadCheckout()
  checkoutData.value = userCartStore.checkout
})
</script>

<template>
  <UserLayout>
    <div class="container mx-auto max-w-2xl p-4 bg-base-100 my-4 border border-base-200 shadow-md">
      <h1 class="text-2xl">Your order is successful !</h1>
      <div>
        <div>Hi, Mike</div>
        <div>เตรียมรอรับสินค้าของคุณได้เลย</div>
      </div>
      <div class="divider"></div>
      <!-- order detail -->
      <div class="flex justify-between">
        <div>
          <div class="font-bold">Order date</div>
          <div>{{ checkoutData.createdAt }}</div>
        </div>
        <div>
          <div class="font-bold">Order Number</div>
          <div>{{ checkoutData.orderNumber }}</div>
        </div>
        <div>
          <div class="font-bold">Payment method</div>
          <div>{{ checkoutData.paymentMethod }}</div>
        </div>
        <div>
          <div class="font-bold">Address</div>
          <div>{{ checkoutData.address }}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div v-for="(product, index) in checkoutData.products" class="flex items-center" :key="index">
        <div>
          <img class="w-48" :src="product.imageUrl">
        </div>
        <div class="flex-1 ml-4">
          <div class="font-bold">{{ product.name }}</div>
          <div>{{ product.about }}</div>
        </div>
        <div class="flex-1">จำนวน {{ product.quantity }}</div>
        <div>{{ product.price * product.quantity }} ฿</div>
      </div>
      <div class="divider"></div>
      <!-- order ราคาทั้งหมด -->
      <div class="mt-4 m-0">
        <div class="flex align-middle justify-between mb-2">
          <div class="font-bold">ราคาสินค้าทั้งหมด</div>
          <div>{{ checkoutData.totalPrice }}</div>
        </div>
        <div class="flex align-middle justify-between mb-2">
          <div class="font-bold">ค่าส่ง</div>
          <div>0</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="flex align-middle justify-between mb-2">
        <div class="font-bold">ราคาทั้งสิ้น</div>
        <div>{{ checkoutData.totalPrice }}</div>
      </div>
       <!-- order ราคารวมทั้งสิ้น -->
      <div class="divider"></div>
      <div>
        ขอบคุณที่มาซื้อของเรา
      </div>
    </div>
  </UserLayout>
</template>