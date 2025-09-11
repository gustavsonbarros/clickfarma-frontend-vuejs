import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Profile from '../views/Profile.vue'
import Addresses from '../views/Addresses.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ProductDetail from '../views/ProductDetail.vue'
import OrderConfirmation from '../views/OrderConfirmation.vue'
import Prescriptions from '../views/Prescriptions.vue'



const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: Home 
  },
  { 
    path: '/products', 
    name: 'Products',
    component: Products 
  },
  { 
    path: '/login', 
    name: 'Login',
    component: Login 
  },
  { 
    path: '/register', 
    name: 'Register',
    component: Register 
  },
  { 
    path: '/cart', 
    name: 'Cart',
    component: Cart 
  },
  { 
    path: '/checkout', 
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true }
  },

   { 
    path: '/profile', 
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },

  { 
  path: '/addresses', 
  name: 'Addresses',
  component: Addresses,
  meta: { requiresAuth: true }
},
{ 
  path: '/forgot-password', 
  name: 'ForgotPassword',
  component: ForgotPassword 
},
{ 
  path: '/reset-password', 
  name: 'ResetPassword',
  component: ResetPassword 
},

{ 
  path: '/product/:id', 
  name: 'ProductDetail',
  component: ProductDetail,
  props: true
},
{ 
  path: '/order-confirmation/:orderId', 
  name: 'OrderConfirmation',
  component: OrderConfirmation,
  props: true,
  meta: { requiresAuth: true }
},
{
  path: '/prescriptions',
  name: 'Prescriptions',
  component: Prescriptions,
  meta: { requiresAuth: true }
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware de autenticação
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router