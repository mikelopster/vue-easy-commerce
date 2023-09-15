<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
</script>

<template>
  <UserLayout>
    <div class="container mx-auto my-4">
      <h1 class="text-4xl mb-4">Checkout</h1>
      <div class="flex">
        <section class="flex-auto w-64 bg-base-200">
          <div class="px-8 py-2">
            <div
              v-for="item in ['Email address', 'Name', 'Address', 'Note']"
              class="form-control w-full"
            >
              <label class="label">
                <span class="label-text">{{ item }}</span>
              </label>

              <textarea
                v-if="item === 'Address'"
                class="textarea textarea-bordered h-24"
                placeholder="Bio"
              ></textarea>
              <input
                v-else
                type="text"
                placeholder="Type here"
                class="input input-bordered input-sm w-full"
              />
            </div>
            <RouterLink to="/success" class="btn btn-primary w-full mt-4">
              ชำระเงิน 199
            </RouterLink>
          </div>
        </section>
        <section class="flex-auto w-32 bg-slate-200">
          <div class="px-8">
            <ul>
              <li v-for="items in [1, 2, 3]" class="px-2 flex py-6">
                <img
                  class="w-40 object-cover object-center"
                  src="https://fastly.picsum.photos/id/1025/300/300.jpg?hmac=4Y_I-JXDyweKiXCJHr7qYyF8RwfblAka9dd1ooCY1fY"
                />
                <div class="flex flex-col justify-between ml-4">
                  <div>
                    <div>Product name</div>
                    <div>จำนวน: 1</div>
                  </div>
                  <div class="flex mt-2">
                    <button>Edit</button>
                    <div class="ml-2 pl-2 border-l-4 border-indigo-500">
                      <button>Remove</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="divider"></div>
            <div class="mb-4">
              <h2 class="text-2xl">Order summary</h2>
              <div class="mt-4 m-0">
                <div class="flex align-middle justify-between mb-2">
                  <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                  <div>199</div>
                </div>
                <div class="flex align-middle justify-between mb-2">
                  <div class="font-bold">ค่าส่ง</div>
                  <div>0</div>
                </div>
                <div class="divider"></div>
                <div class="flex align-middle justify-between mb-2">
                  <div class="font-bold">ราคาทั้งสิ้น</div>
                  <div>199</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </UserLayout>
</template>
