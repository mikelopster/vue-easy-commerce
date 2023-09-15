<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
</script>

<template>
  <UserLayout>
    <div
      class="container mx-auto max-w-2xl p-4 bg-base-100 my-4 border border-base-200 shadow-md"
    >
      <h1 class="text-2xl">Your profile</h1>
      <div class="flex flex-col items-center">
        <div class="avatar">
          <div class="w-24 rounded-full">
            <img src="https://mikelopster.dev/mikelopster.da6b9a03.webp" />
          </div>
        </div>

        <div v-for="item in [
          'Email',
          'Name'
        ]" class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ item }}</span>
            <span class="label-text-alt"></span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
          />
        </div>

        <button class="btn btn-primary w-full mt-4">Update profile</button>
      </div>
    </div>
  </UserLayout>
</template>
