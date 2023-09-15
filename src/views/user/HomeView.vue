<script setup>
import UserLayout from '@/layouts/UserLayout.vue'

import { RouterLink } from 'vue-router'
</script>

<template>
  <UserLayout>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-6 m-10">
      <div v-for="item in [1,2,3,4,5,6,7,8]"  class="card w-full bg-base-100 shadow-xl">
        <figure>
          <img src="https://fastly.picsum.photos/id/764/700/400.jpg?hmac=GNDoU-q2GCnxTGcnvDdNXrcRnq34KMc6MMVHoqaFpF0" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <RouterLink to="/cart" class="btn btn-primary">Buy Now</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>