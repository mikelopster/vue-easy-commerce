import { createRouter, createWebHistory } from 'vue-router'

import AdminLogin from '@/views/admin/LoginView.vue'
import AdminDashboard from '@/views/admin/DashboardView.vue'

import AdminProductList from '@/views/admin/product/ListView.vue'
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'

import AdminOrderList from '@/views/admin/order/ListView.vue'
import AdminOrderDetail from '@/views/admin/order/DetailView.vue'

import AdminUserList from '@/views/admin/user/ListView.vue'
import AdminUserUpdate from '@/views/admin/user/UpdateView.vue'

import Home from '@/views/user/HomeView.vue'
import Search from '@/views/user/SearchView.vue'
import Profile from '@/views/user/ProfileView.vue'
import Success from '@/views/user/SuccessView.vue'
import Checkout from '@/views/user/CheckoutView.vue'
import Cart from '@/views/user/CartView.vue'

import { useAccountStore } from '@/stores/account'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
    {
      path: '/admin/login',
      name: 'login',
      component: AdminLogin
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: AdminProductList
    },
    {
      path: '/admin/products/create',
      name: 'admin-products-create',
      component: AdminProductUpdate
    },
    {
      path: '/admin/products/edit/:id',
      name: 'admin-products-update',
      component: AdminProductUpdate
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: AdminOrderList
    },
    {
      path: '/admin/orders/:id',
      name: 'admin-order-detail',
      component: AdminOrderDetail
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: AdminUserList
    },
    {
      path: '/admin/users/:id',
      name: 'admin-user-update',
      component: AdminUserUpdate
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userAccountStore = useAccountStore()
  await userAccountStore.checkAuthState()
  console.log(to)
  // console.log(from)
  console.log('userAccountStore', userAccountStore.isLoggedIn)
  if ((!userAccountStore.isLoggedIn ||
      !userAccountStore.isAdmin) &&
      to.name.includes('admin')) {
    next({ name: 'home' })
  } else if (userAccountStore.isAdmin && to.name.includes('login')) {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router
