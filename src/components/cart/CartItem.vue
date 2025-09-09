<template>
  <div class="card mb-3 cart-item">
    <div class="card-body">
      <div class="row align-items-center">
        <!-- Ícone -->
        <div class="col-md-2 text-center">
          <span class="item-icon">💊</span>
        </div>
        
        <!-- Informações do produto -->
        <div class="col-md-4">
          <h5 class="item-name">{{ item.name }}</h5>
          <p class="text-muted item-description">{{ truncatedDescription }}</p>
        </div>
        
        <!-- Quantidade -->
        <div class="col-md-2">
          <div class="quantity-control">
            <label for="quantity" class="visually-hidden">Quantidade</label>
            <input 
              type="number" 
              :id="'quantity-' + item.id"
              :value="item.quantity" 
              min="1" 
              class="form-control"
              @input="handleQuantityChange($event)"
              aria-label="Alterar quantidade"
            >
          </div>
        </div>
        
        <!-- Preço -->
        <div class="col-md-2">
          <p class="fw-bold item-total">R$ {{ itemTotal }}</p>
          <p class="text-muted item-unit-price">R$ {{ itemPrice }} cada</p>
        </div>
        
        <!-- Remover -->
        <div class="col-md-2 text-center">
          <button 
            @click="$emit('remove-item', item.id)" 
            class="btn btn-outline-danger btn-sm"
            aria-label="Remover item do carrinho"
          >
            ❌ Remover
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true,
      validator: (item) => {
        return (
          item.id &&
          item.name &&
          item.description &&
          typeof item.price === 'number' &&
          typeof item.quantity === 'number'
        )
      }
    }
  },
  computed: {
    truncatedDescription() {
      const maxLength = 60
      return this.item.description.length > maxLength 
        ? this.item.description.substring(0, maxLength) + '...' 
        : this.item.description
    },
    itemTotal() {
      return (this.item.price * this.item.quantity).toFixed(2)
    },
    itemPrice() {
      return this.item.price.toFixed(2)
    }
  },
  methods: {
    handleQuantityChange(event) {
      const quantity = parseInt(event.target.value) || 1
      this.$emit('update-quantity', this.item.id, quantity)
    }
  }
}
</script>

<style scoped>
.cart-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.item-icon {
  font-size: 3rem;
}

.item-name {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.item-description {
  font-size: 0.9rem;
  margin-bottom: 0;
}

.quantity-control input {
  text-align: center;
}

.item-total {
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}

.item-unit-price {
  font-size: 0.8rem;
  margin-bottom: 0;
}
</style>