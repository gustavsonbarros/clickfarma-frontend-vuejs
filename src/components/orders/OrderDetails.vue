<template>
  <div class="order-details">
    <div class="card mb-4">
      <div class="card-header bg-light">
        <h5 class="mb-0">
          <i class="fas fa-box-open me-2"></i>Detalhes do Pedido
        </h5>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-4">
            <strong>Número do Pedido:</strong><br>
            <span class="text-primary">#{{ order.id }}</span>
          </div>
          <div class="col-md-4">
            <strong>Data do Pedido:</strong><br>
            {{ formatDate(order.date) }}
          </div>
          <div class="col-md-4">
            <strong>Status:</strong><br>
            <span :class="statusClass(order.status)" class="badge">
              {{ statusText(order.status) }}
            </span>
          </div>
        </div>

        <h6 class="mb-3">Itens do Pedido</h6>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.items" :key="item.id">
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="getProductImage(item)" :alt="item.name" class="product-image me-3">
                    <div>
                      <strong>{{ item.name }}</strong><br>
                      <small class="text-muted">{{ item.category }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ item.quantity }}</td>
                <td>R$ {{ item.price.toFixed(2) }}</td>
                <td>R$ {{ (item.price * item.quantity).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetails',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    statusClass(status) {
      const statusClasses = {
        'confirmed': 'bg-primary',
        'processing': 'bg-info',
        'shipped': 'bg-warning',
        'delivered': 'bg-success',
        'cancelled': 'bg-danger'
      }
      return statusClasses[status] || 'bg-secondary'
    },
    
    statusText(status) {
      const statusTexts = {
        'confirmed': 'Confirmado',
        'processing': 'Processando',
        'shipped': 'Enviado',
        'delivered': 'Entregue',
        'cancelled': 'Cancelado'
      }
      return statusTexts[status] || status
    },
    
    getProductImage(product) {
      // Imagem padrão baseada na categoria
      const categoryImages = {
        'Medicamentos': 'https://via.placeholder.com/50x50/007bff/ffffff?text=M',
        'Cosméticos': 'https://via.placeholder.com/50x50/28a745/ffffff?text=C',
        'Higiene': 'https://via.placeholder.com/50x50/17a2b8/ffffff?text=H',
        'Vitaminas': 'https://via.placeholder.com/50x50/ffc107/000000?text=V',
        'Maternidade': 'https://via.placeholder.com/50x50/e83e8c/ffffff?text=MAT'
      }
      return categoryImages[product.category] || 'https://via.placeholder.com/50x50/6c757d/ffffff?text=P'
    }
  }
}
</script>

<style scoped>
.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.table th {
  border-top: none;
  font-weight: 600;
  color: #495057;
}

.badge {
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
}
</style>