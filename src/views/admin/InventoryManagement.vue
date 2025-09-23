<template>
  <div class="inventory-management container-fluid">
    <h2 class="mb-4">Gerenciar Estoque (US-502)</h2>
    <div v-if="lowStockProducts.length > 0" class="alert alert-warning mb-4">
      <h4>Alertas de Baixo Estoque</h4>
      <ul class="list-unstyled">
        <li v-for="product in lowStockProducts" :key="product.id">
          {{ product.name }}: {{ product.stock }} unidades restantes
        </li>
      </ul>
    </div>
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">Estoque Atual: {{ product.stock }} unidades</p>
            <input v-model="stockUpdates[product.id]" type="number" class="form-control mb-2" placeholder="Nova Quantidade" />
            <button @click="updateStock(product.id)" class="btn btn-primary btn-sm">Atualizar Estoque</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'InventoryManagement',
  data() {
    return {
      products: [],
      stockUpdates: {},
      lowStockThreshold: 10
    }
  },
  computed: {
    lowStockProducts() {
      return this.products.filter(p => p.stock < this.lowStockThreshold)
    }
  },
  async mounted() {
    await this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('/api/admin/products', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        })
        this.products = response.data
      } catch (err) {
        // Mock data para testes
        this.products = [
          { id: 1, name: 'Paracetamol 500mg', stock: 5 },
          { id: 2, name: 'Amoxicilina 500mg', stock: 15 },
          { id: 3, name: 'Ibuprofeno 400mg', stock: 8 }
        ]
      }
    },
    async updateStock(id) {
      const newStock = parseInt(this.stockUpdates[id])
      if (isNaN(newStock)) {
        alert('Insira uma quantidade válida')
        return
      }
      try {
        await axios.put(`/api/admin/products/${id}/stock`, { stock: newStock }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        })
        const product = this.products.find(p => p.id === id)
        if (product) product.stock = newStock
        this.stockUpdates[id] = ''
        alert('Estoque atualizado com sucesso')
      } catch (err) {
        alert('Erro ao atualizar estoque')
      }
    }
  }
}
</script>

<style scoped>
.card { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
</style>