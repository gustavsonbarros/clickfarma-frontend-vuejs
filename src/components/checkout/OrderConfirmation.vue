<template>
  <div class="order-confirmation">
    <div class="text-center py-5">
      <div class="confirmation-icon mb-4">
        <i class="fas fa-check-circle fa-5x text-success"></i>
      </div>
      
      <h2 class="text-primary mb-3">Pedido Confirmado!</h2>
      <p class="lead mb-4">Obrigado por comprar na ClickFarma. Seu pedido foi recebido com sucesso.</p>
      
      <div class="order-details card mx-auto" style="max-width: 500px;">
        <div class="card-body text-center">
          <h5 class="card-title">Detalhes do Pedido</h5>
          <p class="card-text">
            <strong>Número do Pedido:</strong> #{{ order.id }}<br>
            <strong>Data:</strong> {{ order.date }}<br>
            <strong>Total:</strong> R$ {{ order.total.toFixed(2) }}<br>
            <strong>Status:</strong> 
            <span class="badge bg-success">{{ order.status }}</span>
          </p>
        </div>
      </div>

      <div class="next-steps mt-5">
        <h5 class="mb-3">Próximos Passos</h5>
        <div class="row justify-content-center">
          <div class="col-md-4 mb-3">
            <div class="card h-100">
              <div class="card-body text-center">
                <i class="fas fa-envelope fa-2x text-primary mb-3"></i>
                <h6>Email de Confirmação</h6>
                <p class="small">Você receberá um email com todos os detalhes do pedido</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card h-100">
              <div class="card-body text-center">
                <i class="fas fa-truck fa-2x text-info mb-3"></i>
                <h6>Acompanhamento</h6>
                <p class="small">Acompanhe seu pedido pela área "Meus Pedidos"</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card h-100">
              <div class="card-body text-center">
                <i class="fas fa-shopping-bag fa-2x text-success mb-3"></i>
                <h6>Continue Comprando</h6>
                <p class="small">Descubra mais produtos em nossa loja</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons mt-5">
        <button class="btn btn-primary me-3" @click="$emit('continue-shopping')">
          <i class="fas fa-shopping-bag me-2"></i>Continuar Comprando
        </button>
        <router-link to="/orders" class="btn btn-outline-primary">
          <i class="fas fa-list me-2"></i>Ver Meus Pedidos
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderConfirmation',
  props: {
    order: {
      type: Object,
      default: () => ({
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toLocaleDateString('pt-BR'),
        total: 0,
        status: 'Processando'
      })
    }
  },
  emits: ['continue-shopping']
}
</script>

<style scoped>
.order-confirmation {
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.confirmation-icon {
  animation: bounce 1s ease-in-out;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.order-details {
  border: 2px solid #198754;
}
</style>