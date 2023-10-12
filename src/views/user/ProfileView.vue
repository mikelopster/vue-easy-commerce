<script setup>
import { reactive, onMounted } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'

import { useEventStore } from '@/stores/event'
import { useAccountStore } from '@/stores/account'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase'

const eventStore = useEventStore()
const accountStore = useAccountStore()

const userForm = [
  { name: 'Email', field: 'email', disabled: true },
  { name: 'Name', field: 'name', disabled: false }
]

const userData = reactive({
  imageUrl: 'https://mikelopster.dev/mikelopster.da6b9a03.webp',
  email: '',
  name: ''
})

onMounted(() => {
  const userProfile = accountStore.profile
  userData.imageUrl = userProfile.imageUrl
  userData.email = userProfile.email
  userData.name = userProfile.name
})

const handleFileChange = async (event) => {
  const file = event.target.files[0]

  console.log(file)

  if (file) {
    const storageRef = ref(
      storage,
      `users/${accountStore.user.uid}/${file.name}`
    )
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    userData.imageUrl = downloadURL
  }
}

const updateProfile = async () => {
  await accountStore.updateProfile(userData)
  eventStore.popupMessage('success', 'Update Profile successful!')
}
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
            <img :src="userData.imageUrl" />
          </div>
        </div>

        <input type="file" @change="handleFileChange">

        <div v-for="item in userForm" class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ item.name }}</span>
            <span class="label-text-alt"></span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="userData[item.field]"
            :disabled="item.disabled"
          />
        </div>

        <button class="btn btn-primary w-full mt-4" @click="updateProfile">Update profile</button>
      </div>
    </div>
  </UserLayout>
</template>
