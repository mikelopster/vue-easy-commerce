<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <AdminLayout>
    <div class="flex-1  pt-8 px-6 bg-base-100">
      <div class="card w-full p-6 mt-2">
        <div class="text-xl font-semibold inline-block">
          Order
        </div>
        <div class="divider mt-2"></div>
        <div class="h-full w-full pb-6 bg-base-100">
          <div class="overflow-x-auto w-full">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Updated At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="font-bold">Michael</div>
                  </td>
                  <td>25000 ฿</td>
                  <td><div class="badge">Payment Complete</div></td>
                  <td>12 Aug 23 04:00</td>
                  <td>
                    <RouterLink :to="{ name: 'admin-order-detail', params: { id: 1 }}">
                      <button class="btn">
                        See detail
                      </button>
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>