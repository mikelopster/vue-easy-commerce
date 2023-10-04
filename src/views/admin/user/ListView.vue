<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { useUserStore } from '@/stores/admin/user'
import { useEventStore } from '@/stores/event'

import AdminLayout from '@/layouts/AdminLayout.vue'

const userStore = useUserStore()
const eventStore = useEventStore()

onMounted(async () => {
  await userStore.loadUser()
})

const toggleStatus = (index) => {
  try {
    const updateUser = userStore.list[index]
    updateUser.status = updateUser.status === 'inactive' ? 'active' : 'inactive'
    userStore.updateUser(updateUser.uid, updateUser)
    eventStore.popupMessage('success', 'Update Status successful!')
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <AdminLayout>
    <div class="flex-1 pt-8 px-6 bg-base-100">
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
                <tr v-for="(user, index) in userStore.list" :key="index">
                  <td>
                    <div class="font-bold">{{ user.name }}</div>
                  </td>
                  <td>{{ user.role }}</td>
                  <td>
                    <div class="badge" :class="user.status === 'active' ? 'badge-success' : 'badge-ghost'">
                      {{ user.status }}
                    </div>
                  </td>
                  <td>{{ user.updatedAt }}</td>
                  <td>
                    <RouterLink :to="{ name: 'admin-user-update', params: { id: user.uid } }">
                      <button class="btn">
                        Edit
                      </button>
                    </RouterLink>
                    <button @click="toggleStatus(index)" class="btn mx-2">
                      {{ user.status === 'active' ? 'Enable' : 'Disable' }}
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