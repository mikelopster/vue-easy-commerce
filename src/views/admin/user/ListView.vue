<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
</script>

<template>
  <AdminLayout>
    <div class="flex-1  pt-8 px-6 bg-base-100">
      <div class="card w-full p-6 mt-2">
        <div class="text-xl font-semibold inline-block">
          User
        </div>
        <div class="divider mt-2"></div>
        <div class="h-full w-full pb-6 bg-base-100">
          <div class="overflow-x-auto w-full">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
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
                  <td>Admin</td>
                  <td><div class="badge">Active</div></td>
                  <td>12 Aug 23 04:00</td>
                  <td>
                    <button class="btn">
                      Edit
                    </button>
                    <button class="btn mx-2">
                      Disable
                    </button>
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