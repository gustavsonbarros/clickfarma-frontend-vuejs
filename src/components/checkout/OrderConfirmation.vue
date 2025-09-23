<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body text-center py-5">
            <div class="mb-4">
              <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
            </div>
            <h2 class="card-title">Pedido Confirmado!</h2>
            <p class="card-text">Obrigado por sua compra na ClickFarma.</p>
            
            <div class="alert alert-info text-start mt-4">
              <h5>📦 Detalhes do Pedido</h5>
              <p><strong>Número do Pedido:</strong> {{ order.id }}</p>
              <p><strong>Data:</strong> {{ formatDate(order.date) }}</p>
              <p><strong>Total:</strong> R$ {{ order.total.toFixed(2) }}</p>
              <p><strong>Método de Pagamento:</strong> {{ getPaymentMethodName(order.paymentMethod) }}</p>
              <p><strong>Status:</strong> <span class="badge bg-success">{{ order.status }}</span></p>
            </div>
            
            <div v-if="order.paymentMethod === 'pix'" class="alert alert-warning text-start mt-3">
              <h5>📱 Pagamento via PIX</h5>
              <p>Para finalizar seu pedido, realize o pagamento PIX usando o código abaixo:</p>
              <div class="text-center my-3">
                <img src="https://via.placeholder.com/200" alt="QR Code PIX" class="img-fluid">
              </div>
              <p class="text-center"><small>Ou copie o código: <code>00020126580014BR.GOV.BCB.PIX0136...</code></small></p>
            </div>
            
            <div class="mt-4">
              <router-link to="/products" class="btn btn-primary me-2">Continuar Comprando</router-link>
              <router-link to="/orders" class="btn btn-outline-secondary">Meus Pedidos</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OrderConfirmation',
  computed: {
    ...mapState(['lastOrder']),
    order() {
      // Se não houver pedido no state, usar dados da URL ou mock
      return this.lastOrder || {
        id: this.$route.query.orderId || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        total: 0,
        date: new Date().toISOString(),
        paymentMethod: 'credit_card',
        status: 'processing'
      };
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('pt-BR');
    },
    getPaymentMethodName(method) {
      const methods = {
        'credit_card': 'Cartão de Crédito',
        'debit_card': 'Cartão de Débito',
        'pix': 'PIX'
      };
      return methods[method] || method;
    }
  }
}
</script>