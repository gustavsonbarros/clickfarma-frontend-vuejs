<template>
  <div class="product-management container-fluid">
    <h2 class="mb-4">Gerenciar Produtos (US-501)</h2>
    <form @submit.prevent="addProduct" class="mb-4">
      <div class="row">
        <div class="col-md-3">
          <input v-model="newProduct.name" class="form-control" placeholder="Nome do Medicamento" required />
        </div>
        <div class="col-md-2">
          <input v-model="newProduct.price" type="number" step="0.01" class="form-control" placeholder="Preço (R$)" required />
        </div>
        <div class="col-md-3">
          <input v-model="newProduct.description" class="form-control" placeholder="Descrição/Princípio Ativo" />
        </div>
        <div class="col-md-2">
          <select v-model="newProduct.requiresPrescription" class="form-control">
            <option value="false">Sem Receita</option>
            <option value="true">Com Receita</option>
          </select>
        </div>
        <div class="col-md-2">
          <button type="submit" class="btn btn-success w-100">Adicionar</button>
        </div>
      </div>
    </form>
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">Preço: R$ {{ product.price.toFixed(2) }}</p>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text">Receita: {{ product.requiresPrescription ? 'Sim' : 'Não' }}</p>
            <button @click="deleteProduct(product.id)" class="btn btn-danger btn-sm">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductManagement',
  data() {
    return {
      products: [],
      newProduct: { name: '', price: 0, description: '', requiresPrescription: false }
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
          { id: 1, name: 'Paracetamol 500mg', price: 10.50, description: 'Analgésico comum', requiresPrescription: false },
          { id: 2, name: 'Amoxicilina 500mg', price: 25.00, description: 'Antibiótico para infecções', requiresPrescription: true }
        ]
      }
    },
    async addProduct() {
      try {
        const response = await axios.post('/api/admin/products', this.newProduct, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        })
        this.products.push(response.data)
        this.newProduct = { name: '', price: 0, description: '', requiresPrescription: false }
      } catch (err) {
        alert('Erro ao adicionar produto')
      }
    },
    async deleteProduct(id) {
      if (confirm('Confirmar exclusão do produto?')) {
        try {
          await axios.delete(`/api/admin/products/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
          })
          this.products = this.products.filter(p => p.id !== id)
        } catch (err) {
          alert('Erro ao excluir produto')
        }
      }
    }
  }
}
</script>

<style scoped>
.card { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
</style>