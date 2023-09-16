<script setup>
import { onMounted, ref, reactive, computed } from 'vue'
import { useProductStore } from '@/stores/admin/product'
import { useEventStore } from '@/stores/event'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import AdminLayout from '@/layouts/AdminLayout.vue'

const productStore = useProductStore()
const eventStore = useEventStore()

const route = useRoute()
const router = useRouter()

const productId = ref(-1)
let selectedProduct = reactive({
  name: '',
  imageUrl: '',
  quantity: 0,
  about: '',
  status: 'open'
})

const mode = computed(() => {
  return productId.value !== -1 ? 'Edit' : 'Add'
})

onMounted(() => {
  if (route.params.id) {
    productId.value = route.params.id
    selectedProduct = productStore.getProduct(productId.value)
  }
})

const updateProduct = () => {
  if (productId.value !== -1) {
    // Edit mode
    productStore.updateProduct(productId.value, selectedProduct)
    eventStore.popupMessage('success', 'Update Product successful!')
  } else {
    // Create mode
    productStore.addProduct(selectedProduct)
    eventStore.popupMessage('success', 'Create Product successful!')
    router.push({ name: 'admin-products' })
  }
}
</script>

<template>
  <AdminLayout>
    <div class="flex pt-8 px-6">
      <div class="card w-full p-6 bg-base-100 shadow-xl mt-2">
        <div class="text-xl font-semibold">{{ mode }} Product</div>
        <div class="divider mt-2"></div>
        <div class="h-full w-full pb-6 bg-base-100">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-base-content">Name</span></label>
                <input
                type="text"
                placeholder=""
                class="input input-bordered w-full"
                v-model="selectedProduct.name"
              />
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-base-content">
                  Image
                </span>
              </label><input
                type="text"
                placeholder=""
                class="input input-bordered w-full"
                v-model="selectedProduct.imageUrl"
              />
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-base-content">
                  Quantity
                </span>
              </label>
              <input
                type="text"
                placeholder=""
                class="input input-bordered w-full"
                v-model="selectedProduct.quantity"
              />
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-base-content">
                  About
                </span>
              </label>
              <textarea
                class="textarea textarea-bordered w-full"
                v-model="selectedProduct.about"
                placeholder="detail product">
              </textarea>
            </div>
          </div>
          <div class="divider"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text text-base-content">
                  Status
                </span>
              </label>
              <select class="select select-bordered w-full" v-model="selectedProduct.status">
                <option disabled selected>Status</option>
                <option value="open">Open</option>
                <option value="close">Close</option>
              </select>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <RouterLink to="/admin/products" class="btn btn-ghost">
              Back
            </RouterLink>
            <button @click="updateProduct()" class="btn btn-primary ml-4">
              {{ mode }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
