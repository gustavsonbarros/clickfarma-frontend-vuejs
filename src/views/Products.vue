<template>
  <div class="container mt-4">
    <h2 class="page-title">📦 Nossos Produtos</h2>
    
    
    <div class="row mb-4 filters-section">
      <div class="col-md-6">
        <input 
          v-model.lazy="searchTerm" 
          type="text" 
          class="form-control" 
          placeholder="Buscar produtos..."
          aria-label="Buscar produtos"
          @input="handleSearch"
        >
      </div>


      <div class="col-md-3">
        <select v-model="filters.category" class="form-select" aria-label="Filtrar por categoria">
          <option value="">Todas categorias</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <div class="col-md-3">
        <select v-model="filters.sortBy" class="form-select" aria-label="Ordenar produtos">
          <option value="name">Ordenar por nome</option>
          <option value="price">Ordenar por preço</option>
        </select>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="mt-2">Carregando produtos...</p>
    </div>

    
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    
    <div v-else-if="filteredProducts.length" class="row products-grid">
      <div 
        v-for="product in sortedProducts" 
        :key="product.id" 
        class="col-md-4 mb-4"
      >
        <ProductCard 
          :product="product" 
          @add-to-cart="addToCart"
        />
      </div>
    </div>

    
    <div v-else class="text-center py-5 empty-state">
      <p>Nenhum produto encontrado.</p>
      <button 
        v-if="hasActiveFilters" 
        class="btn btn-outline-primary"
        @click="clearFilters"
      >
        Limpar filtros
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductsPage',
  components: {
    ProductCard
  },
  data() {
    return {
      searchTerm: '',
      filters: {
        category: '',
        sortBy: 'name'
      },
      loading: false,
      error: null,
      searchTimeout: null
    }
  },
  computed: {
    ...mapState(['products', 'categories']),
    
    // Filtra produtos por termo de busca e categoria
    filteredProducts() {
      if (!this.products.length) return []
      
      return this.products.filter(product => {
        const matchesSearch = this.searchTerm 
          ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
          : true
        
        const matchesCategory = this.filters.category 
          ? product.category === this.filters.category 
          : true
        
        return matchesSearch && matchesCategory
      })
    },
    
    
    sortedProducts() {
      if (!this.filteredProducts.length) return []
      
      
      const products = [...this.filteredProducts]
      
      return products.sort((a, b) => {
        if (this.filters.sortBy === 'price') {
          return a.price - b.price
        } else {
          return a.name.localeCompare(b.name)
        }
      })
    },
    
    
    hasActiveFilters() {
      return this.searchTerm || this.filters.category
    }
  },
  async mounted() {
    await this.loadProducts()
  },
  methods: {
    ...mapActions(['fetchProducts', 'addToCart']),
    
    
    async loadProducts() {
      this.loading = true
      this.error = null
      
      try {
        await this.fetchProducts()
      } catch (err) {
        console.error('Erro ao carregar produtos:', err)
        this.error = 'Não foi possível carregar os produtos. Tente novamente mais tarde.'
      } finally {
        this.loading = false
      }
    },
    
    
    handleSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        
        this.$forceUpdate()
      }, 300)
    },
    
    
    addToCart(product) {
      this.addToCart(product)
      
      
      this.$notify({
        title: 'Adicionado ao carrinho',
        message: `${product.name} adicionado com sucesso!`,
        type: 'success'
      })
    },
    
    // Limpa todos os filtros
    clearFilters() {
      this.searchTerm = ''
      this.filters = {
        category: '',
        sortBy: 'name'
      }
    }
  }
}
</script>

<style scoped>
.page-title {
  margin-bottom: 1.5rem;
}

.filters-section {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
}

.products-grid {
  transition: opacity 0.3s ease;
}

.empty-state {
  color: #6c757d;
}
</style>