import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    products: [],
    cart: [],
    categories: ['Medicamentos', 'Cosméticos', 'Higiene', 'Vitaminas', 'Maternidade'],
    authToken: localStorage.getItem('authToken') || null,
    addresses: [],
    selectedProduct: null,

    // Checkout centralizado
    checkout: {
      deliveryOption: null,
      selectedAddress: null,
      selectedStore: null,
      paymentMethod: null,
      deliveryPrice: 0
    },

    // Pedidos do usuário
    orders: []
  },
  
  getters: {
    isAuthenticated: state => !!state.authToken,
    cartItemsCount: state => state.cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    products: state => state.products,
    categories: state => state.categories,
    user: state => state.user,
    addresses: state => state.addresses,
    defaultAddress: state => state.addresses.find(addr => addr.isDefault) || null,
    selectedProduct: state => state.selectedProduct,

    // Novos getters
    checkout: state => state.checkout,
    orders: state => state.orders,

    // Buscar pedido por ID
    getOrderById: (state) => (orderId) => {
      return state.orders.find(order => order.id === orderId)
    }
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
    },
    UPDATE_USER_PROFILE(state, userData) {
      if (state.user) {
        state.user = { ...state.user, ...userData }
      }
    },
    SET_ADDRESSES(state, addresses) {
      state.addresses = addresses
    },
    ADD_ADDRESS(state, address) {
      state.addresses.push(address)
    },
    UPDATE_ADDRESS(state, updatedAddress) {
      const index = state.addresses.findIndex(a => a.id === updatedAddress.id)
      if (index !== -1) {
        state.addresses.splice(index, 1, updatedAddress)
      }
    },
    DELETE_ADDRESS(state, addressId) {
      state.addresses = state.addresses.filter(a => a.id !== addressId)
    },
    SET_DEFAULT_ADDRESS(state, addressId) {
      state.addresses = state.addresses.map(address => ({
        ...address,
        isDefault: address.id === addressId
      }))
    },
    SET_SELECTED_PRODUCT(state, product) {
      state.selectedProduct = product
    },

    // Mutations do checkout
    SET_CHECKOUT_INFO(state, checkoutInfo) {
      state.checkout = { ...state.checkout, ...checkoutInfo }
    },
    ADD_ORDER(state, order) {
      state.orders.push(order)
    },
    CLEAR_CHECKOUT(state) {
      state.checkout = {
        deliveryOption: null,
        selectedAddress: null,
        selectedStore: null,
        paymentMethod: null,
        deliveryPrice: 0
      }
    }
  },
  
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({ 
            data: { 
              user: { 
                id: 1, 
                name: credentials.email, 
                email: credentials.email,
                phone: '(81) 99999-9999',
                birthdate: '1990-01-01',
                cpf: '123.456.789-00'
              },
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
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({ 
            data: { 
              user: { 
                id: 2, 
                name: userData.name, 
                email: userData.email,
                phone: '',
                birthdate: '',
                cpf: ''
              },
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

    async fetchProductById({ commit, state }, productId) {
      const product = state.products.find(p => p.id === productId)
      commit('SET_SELECTED_PRODUCT', product)
      return product
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
    },
    
    async updateUserProfile({ commit, state }, userData) {
      try {
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({ 
            data: { 
              user: { 
                ...state.user, 
                ...userData 
              },
              message: 'Perfil atualizado com sucesso!'
            }
          })
        }, 1000))
        
        commit('UPDATE_USER_PROFILE', userData)
        return response.data
      } catch (error) {
        throw error.response ? error.response.data : { message: 'Erro ao atualizar perfil' }
      }
    },
    
    async changeUserPassword({ commit }, passwordData) {
      try {
        const response = await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (passwordData.newPassword !== passwordData.confirmPassword) {
              reject({ response: { data: { message: 'As senhas não coincidem' } } })
            } else if (passwordData.newPassword.length < 6) {
              reject({ response: { data: { message: 'A senha deve ter pelo menos 6 caracteres' } } })
            } else {
              resolve({ data: { message: 'Senha alterada com sucesso!' } })
            }
          }, 1000)
        })
        
        return response.data
      } catch (error) {
        throw error.response ? error.response.data : { message: 'Erro ao alterar senha' }
      }
    },
    
    async fetchAddresses({ commit }) {
      try {
        const mockAddresses = [
          {
            id: 1,
            nickname: 'Casa',
            zipcode: '50720-001',
            street: 'Rua Professor José Brandão',
            number: '123',
            neighborhood: 'Cidade Universitária',
            complement: 'Apartmento 101',
            city: 'Recife',
            state: 'PE',
            isDefault: true
          },
          {
            id: 2,
            nickname: 'Trabalho',
            zipcode: '50030-230',
            street: 'Av. Conde da Boa Vista',
            number: '456',
            neighborhood: 'Boa Vista',
            complement: 'Sala 302',
            city: 'Recife',
            state: 'PE',
            isDefault: false
          }
        ]
        
        commit('SET_ADDRESSES', mockAddresses)
      } catch (error) {
        throw error
      }
    },

    async addAddress({ commit }, addressData) {
      try {
        const newAddress = {
          id: Date.now(),
          ...addressData
        }
        
        commit('ADD_ADDRESS', newAddress)
        return newAddress
      } catch (error) {
        throw error
      }
    },

    async updateAddress({ commit }, addressData) {
      try {
        commit('UPDATE_ADDRESS', addressData)
        return addressData
      } catch (error) {
        throw error
      }
    },

    async deleteAddress({ commit }, addressId) {
      try {
        commit('DELETE_ADDRESS', addressId)
      } catch (error) {
        throw error
      }
    },

    async setDefaultAddress({ commit }, addressId) {
      try {
        commit('SET_DEFAULT_ADDRESS', addressId)
      } catch (error) {
        throw error
      }
    },

    // Checkout Actions
    setCheckoutInfo({ commit }, checkoutInfo) {
      commit('SET_CHECKOUT_INFO', checkoutInfo)
    },
    async createOrder({ commit }, orderData) {
      try {
        const subtotal = orderData.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        const discount = orderData.payment.method === 'pix' ? subtotal * 0.05 : 0

        const order = {
          id: Math.random().toString(36).substr(2, 9).toUpperCase(),
          date: new Date().toISOString(),
          items: orderData.items,
          delivery: orderData.delivery,
          payment: orderData.payment,
          subtotal,
          discount,
          total: orderData.total,
          status: 'confirmed'
        }
        
        commit('ADD_ORDER', order)
        commit('CLEAR_CART')
        commit('CLEAR_CHECKOUT')
        
        return order
      } catch (error) {
        throw error
      }
    },

    async requestPasswordReset({ commit }, email) {
      try {
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({ data: { message: 'Email de redefinição enviado com sucesso!' } })
        }, 1000))
        
        return response.data
      } catch (error) {
        throw error.response ? error.response.data : { message: 'Erro ao solicitar redefinição de senha' }
      }
    },

    async resetPassword({ commit }, resetData) {
      try {
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({ data: { message: 'Senha redefinida com sucesso!' } })
        }, 1000))
        
        return response.data
      } catch (error) {
        throw error.response ? error.response.data : { message: 'Erro ao redefinir senha' }
      }
    }
  }
})
