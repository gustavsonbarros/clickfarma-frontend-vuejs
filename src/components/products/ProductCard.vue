<template>
  <div class="card h-100 product-card">
    <router-link 
      :to="`/product/${product.id}`" 
      class="text-decoration-none text-dark"
    >
      <div class="card-body text-center">
        <div class="product-icon">💊</div>
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text product-description">{{ product.description }}</p>
        <p class="text-success fw-bold product-price">R$ {{ formattedPrice }}</p>
        <p :class="stockStatusClass">
          {{ product.inStock ? 'Em estoque' : 'Fora de estoque' }}
        </p>
      </div>
    </router-link>
    
    <div class="card-footer">
      <button 
        @click="handleAddToCart" 
        class="btn btn-primary w-100"
        :disabled="!product.inStock"
        :aria-label="`Adicionar ${product.name} ao carrinho`"
      >
        {{ product.inStock ? 'Adicionar ao carrinho' : 'Indisponível' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
      validator: (product) => {
        return (
          product.id &&
          product.name &&
          product.description &&
          typeof product.price === 'number' &&
          typeof product.inStock === 'boolean'
        )
      }
    }
  },
  computed: {
    formattedPrice() {
      return this.product.price.toFixed(2).replace('.', ',')
    },
    stockStatusClass() {
      return {
        'text-success': this.product.inStock, 
        'text-danger': !this.product.inStock
      }
    }
  },
  methods: {
    handleAddToCart(event) {
      event.stopPropagation() // Impede a propagação do evento
      this.$emit('add-to-cart', this.product)
    }
  }
}
</script>

<style scoped>
.product-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.product-icon {
  font-size: 4rem;
  line-height: 1;
}

.product-description {
  min-height: 48px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  font-size: 1.25rem;
}
</style>