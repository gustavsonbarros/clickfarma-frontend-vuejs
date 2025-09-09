import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    products: [],
    cart: [],
    categories: ['Medicamentos', 'Cosméticos', 'Higiene', 'Vitaminas', 'Maternidade'],
    authToken: localStorage.getItem('authToken') || null
  },
  
  getters: {
    isAuthenticated: state => !!state.authToken,
    cartItemsCount: state => state.cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    products: state => state.products,
    categories: state => state.categories
  },
  
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_AUTH_TOKEN(state, token) {
      state.authToken = token
      localStorage.setItem('authToken', token)
    },
    CLEAR_AUTH(state) {
      state.authToken = null
      state.user = null
      localStorage.removeItem('authToken')
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_TO_CART(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    UPDATE_CART_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    CLEAR_CART(state) {
      state.cart = []
    }
  },
  
  actions: {
    async login({ commit }, credentials) {
      try {
        // Simulação de API
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({ 
            data: { 
              user: { id: 1, name: credentials.email, email: credentials.email },
              token: 'mock-token-' + Math.random().toString(36).substr(2)
            }
          })
        }, 1000))
        
        commit('SET_USER', response.data.user)
        commit('SET_AUTH_TOKEN', response.data.token)
        return response.data
      } catch (error) {
        throw error.response ? error.response.data : { message: 'Erro de conexão' }
      }
    },
    
    async register({ commit }, userData) {
      try {
        // Simulação de API
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({ 
            data: { 
              user: { id: 2, name: userData.name, email: userData.email },
              token: 'mock-token-' + Math.random().toString(36).substr(2)
            }
          })
        }, 1000))
        
        commit('SET_USER', response.data.user)
        commit('SET_AUTH_TOKEN', response.data.token)
        return response.data
      } catch (error) {
        throw error.response ? error.response.data : { message: 'Erro de conexão' }
      }
    },
    
    logout({ commit }) {
      commit('CLEAR_AUTH')
    },
    
    async fetchProducts({ commit }) {
      try {
        // Dados mockados
        const mockProducts = [
          { id: 1, name: 'Paracetamol 500mg', price: 12.90, category: 'Medicamentos', description: 'Analgésico e antitérmico', inStock: true },
          { id: 2, name: 'Dipirona 500mg', price: 8.50, category: 'Medicamentos', description: 'Analgésico e antitérmico', inStock: true },
          { id: 3, name: 'Shampoo Anti-Caspa', price: 24.90, category: 'Higiene', description: 'Shampoo para controle de caspa', inStock: true },
          { id: 4, name: 'Vitamina C 1000mg', price: 45.00, category: 'Vitaminas', description: 'Suplemento de vitamina C', inStock: true },
          { id: 5, name: 'Protetor Solar FPS 50', price: 32.90, category: 'Cosméticos', description: 'Protetor solar facial', inStock: false },
          { id: 6, name: 'Fralda P - 30 unidades', price: 28.90, category: 'Maternidade', description: 'Fraldas para bebê', inStock: true }
        ]
        
        commit('SET_PRODUCTS', mockProducts)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    },
    
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    
    updateCartQuantity({ commit }, payload) {
      commit('UPDATE_CART_QUANTITY', payload)
    },
    
    clearCart({ commit }) {
      commit('CLEAR_CART')
    }
  }
})