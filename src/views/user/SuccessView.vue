<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
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
          <div>18 Aug 2023</div>
        </div>
        <div>
          <div class="font-bold">Order Number</div>
          <div>ABC00222</div>
        </div>
        <div>
          <div class="font-bold">Payment method</div>
          <div>Credit card</div>
        </div>
        <div>
          <div class="font-bold">Address</div>
          <div>11/22 นนทบุรี ...</div>
        </div>
      </div>
      <div class="divider"></div>
      <!-- order สินค้าทั้งหมด -->
      <div class="flex items-center">
        <div>
          <img class="w-48" src="https://fastly.picsum.photos/id/1025/300/300.jpg?hmac=4Y_I-JXDyweKiXCJHr7qYyF8RwfblAka9dd1ooCY1fY">
        </div>
        <div class="flex-1 ml-4">
          <div class="font-bold">Product name</div>
          <div>Product description</div>
        </div>
        <div class="flex-1">จำนวน 1</div>
        <div>199 B</div>
      </div>
      <div class="divider"></div>
      <!-- order ราคาทั้งหมด -->
      <div class="mt-4 m-0">
        <div class="flex align-middle justify-between mb-2">
          <div class="font-bold">ราคาสินค้าทั้งหมด</div>
          <div>199</div>
        </div>
        <div class="flex align-middle justify-between mb-2">
          <div class="font-bold">ค่าส่ง</div>
          <div>0</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="flex align-middle justify-between mb-2">
        <div class="font-bold">ราคาทั้งสิ้น</div>
        <div>199</div>
      </div>
       <!-- order ราคารวมทั้งสิ้น -->
      <div class="divider"></div>
      <div>
        ขอบคุณที่มาซื้อของเรา
      </div>
    </div>
  </UserLayout>
</template>