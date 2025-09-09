<template>
  <div class="container mt-4">
    <h2>🛒 Meu Carrinho</h2>
    <div v-if="cart.length === 0" class="text-center py-5">
      <p class="text-muted">Seu carrinho está vazio</p>
      <router-link to="/products" class="btn btn-primary">
        Ver Produtos
      </router-link>
    </div>
    
    <div v-else>
      <div class="row">
        <div class="col-md-8">
          <div v-for="item in cart" :key="item.id" class="card mb-3">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-2">
                  <span style="font-size: 3rem;">💊</span>
                </div>
                <div class="col-md-4">
                  <h5>{{ item.name }}</h5>
                  <p class="text-muted">{{ item.description }}</p>
                </div>
                <div class="col-md-2">
                  <input 
                    type="number" 
                    v-model.number="item.quantity" 
                    min="1" 
                    class="form-control"
                    @change="updateQuantity(item.id, item.quantity)"
                  >
                </div>
                <div class="col-md-2">
                  <p class="fw-bold">R$ {{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
                <div class="col-md-2">
                  <button @click="removeFromCart(item.id)" class="btn btn-danger">
                    ❌
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h5>Resumo do Pedido</h5>
            </div>
            <div class="card-body">
              <p>Itens: {{ cartItemsCount }}</p>
              <p>Total: R$ {{ cartTotal.toFixed(2) }}</p>
              <router-link to="/checkout" class="btn btn-primary w-100">
                Finalizar Compra
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartItemsCount', 'cartTotal'])
  },
  methods: {
    ...mapActions(['removeFromCart', 'updateCartQuantity']),
    updateQuantity(productId, quantity) {
      if (quantity < 1) quantity = 1
      this.updateCartQuantity({ productId, quantity })
    }
  }
}
</script>
