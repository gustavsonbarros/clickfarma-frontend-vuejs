<template>
  <div class="container mt-4">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="mt-3">Carregando produto...</p>
    </div>

    <div v-else-if="product" class="product-detail">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/products">Produtos</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="`/products?category=${product.category}`">
              {{ product.category }}
            </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="row">
        <!-- Galeria de Imagens -->
        <div class="col-md-6">
          <product-gallery :product="product" />
        </div>

        <!-- Informações do Produto -->
        <div class="col-md-6">
          <product-info :product="product" @add-to-cart="addToCart" />
        </div>
      </div>

      <!-- Descrição e Detalhes -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs" id="productTabs" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="description-tab" data-bs-toggle="tab" 
                          data-bs-target="#description" type="button" role="tab">
                    Descrição
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="details-tab" data-bs-toggle="tab" 
                          data-bs-target="#details" type="button" role="tab">
                    Detalhes
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="instructions-tab" data-bs-toggle="tab" 
                          data-bs-target="#instructions" type="button" role="tab">
                    Modo de Usar
                  </button>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <div class="tab-content" id="productTabsContent">
                <div class="tab-pane fade show active" id="description" role="tabpanel">
                  <p>{{ product.description || 'Nenhuma descrição disponível.' }}</p>
                </div>
                <div class="tab-pane fade" id="details" role="tabpanel">
                  <div class="row">
                    <div class="col-md-6">
                      <table class="table table-sm">
                        <tbody>
                          <tr>
                            <th>Categoria:</th>
                            <td>{{ product.category }}</td>
                          </tr>
                          <tr>
                            <th>Fabricante:</th>
                            <td>{{ product.manufacturer || 'Não especificado' }}</td>
                          </tr>
                          <tr>
                            <th>Registro Anvisa:</th>
                            <td>{{ product.anvisaCode || 'Não informado' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-6">
                      <table class="table table-sm">
                        <tbody>
                          <tr>
                            <th>Disponibilidade:</th>
                            <td>
                              <span :class="product.inStock ? 'text-success' : 'text-danger'">
                                {{ product.inStock ? 'Em estoque' : 'Fora de estoque' }}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th>Entrega:</th>
                            <td>2-3 dias úteis</td>
                          </tr>
                          <tr>
                            <th>Retirada:</th>
                            <td>Disponível em loja</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="instructions" role="tabpanel">
                  <p>{{ product.instructions || 'Informações de uso não disponíveis.' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Produtos Relacionados -->
      <div class="row mt-5" v-if="relatedProducts.length > 0">
        <div class="col-12">
          <h4 class="mb-4">Produtos Relacionados</h4>
          <div class="row">
            <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" class="col-md-3 mb-4">
              <product-card :product="relatedProduct" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
      <h4>Produto não encontrado</h4>
      <p>O produto que você está procurando não está disponível.</p>
      <router-link to="/products" class="btn btn-primary">
        Voltar para Produtos
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductGallery from '@/components/products/ProductGallery.vue'
import ProductInfo from '@/components/products/ProductInfo.vue'
import ProductCard from '@/components/products/ProductCard.vue'

export default {
  name: 'ProductDetail',
  components: {
    ProductGallery,
    ProductInfo,
    ProductCard
  },
  data() {
    return {
      loading: true,
      product: null
    }
  },
  computed: {
    ...mapGetters(['products']),
    relatedProducts() {
      if (!this.product) return []
      return this.products
        .filter(p => p.category === this.product.category && p.id !== this.product.id)
        .slice(0, 4)
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'addToCart']),
    async loadProduct() {
      this.loading = true
      const productId = parseInt(this.$route.params.id)
      
      try {
        await this.fetchProducts()
        this.product = this.products.find(p => p.id === productId) || null
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
        this.$toast.error('Erro ao carregar detalhes do produto')
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.loadProduct()
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct()
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.product-detail {
  min-height: 60vh;
}

.breadcrumb {
  background-color: transparent;
  padding: 0;
}

.nav-tabs .nav-link {
  color: #495057;
  font-weight: 500;
}

.nav-tabs .nav-link.active {
  color: #0d6efd;
  font-weight: 600;
}

.table th {
  width: 40%;
}
</style>
