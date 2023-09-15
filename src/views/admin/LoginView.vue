<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center">
    <div class="card mx-auto w-full max-w-2xl shadow-xl">
      <div class="py-24 px-10">
        <h2 class="text-2xl font-semibold mb-2 text-center">Login</h2>
        <div class="mb-4">
          <div class="form-control w-full mt-4">
            <label class="label"
              ><span class="label-text text-base-content undefined"
                >Email Id</span
              ></label
            ><input
              type="emailId"
              placeholder=""
              class="input input-bordered w-full"
              value=""
            />
          </div>
          <div class="form-control w-full mt-4">
            <label class="label"
              ><span class="label-text text-base-content undefined"
                >Password</span
              ></label
            ><input
              type="password"
              placeholder=""
              class="input input-bordered w-full"
              value=""
            />
          </div>
        </div>
        <p class="text-center text-error mt-8"></p>
        <RouterLink to="/admin/dashboard" class="btn mt-2 w-full btn-primary"
          >Login</RouterLink
        >
      </div>
    </div>
  </div>
</template>
