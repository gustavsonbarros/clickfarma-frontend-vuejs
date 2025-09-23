<template>
  <div class="order-confirmation-page">
    <div class="container mt-4">
      <!-- Cabeçalho de Confirmação -->
      <div class="confirmation-header text-center mb-5">
        <div class="confirmation-icon mb-3">
          <i class="fas fa-check-circle fa-5x text-success"></i>
        </div>
        <h1 class="text-primary mb-3">Pedido Confirmado!</h1>
        <p class="lead text-muted">Obrigado por comprar na ClickFarma. Seu pedido foi recebido com sucesso.</p>
        <p class="order-number">
          <strong>Número do Pedido:</strong> 
          <span class="text-primary">#{{ order.id }}</span>
        </p>
      </div>

      <div class="row">
        <!-- Detalhes do Pedido -->
        <div class="col-lg-8">
          <!-- Detalhes do Pedido (simplificado) -->
          <div class="card mb-4">
            <div class="card-header bg-light">
              <h5 class="mb-0">
                <i class="fas fa-list me-2"></i>Detalhes do Pedido
              </h5>
            </div>
            <div class="card-body">
              <div v-for="item in order.items" :key="item.id" class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <div class="d-flex align-items-center">
                  <img :src="item.image" :alt="item.name" class="rounded me-3" width="60" height="60">
                  <div>
                    <h6 class="mb-1">{{ item.name }}</h6>
                    <small class="text-muted">Quantidade: {{ item.quantity }}</small>
                  </div>
                </div>
                <span class="fw-bold">R$ {{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Timeline do Pedido (simplificado) -->
          <div class="card mb-4">
            <div class="card-header bg-light">
              <h5 class="mb-0">
                <i class="fas fa-history me-2"></i>Status do Pedido
              </h5>
            </div>
            <div class="card-body">
              <div class="timeline">
                <div class="timeline-item completed">
                  <div class="timeline-marker bg-success"></div>
                  <div class="timeline-content">
                    <h6 class="mb-1">Pedido Confirmado</h6>
                    <small class="text-muted">Seu pedido foi recebido com sucesso</small>
                  </div>
                </div>
                <div class="timeline-item" :class="order.status !== 'confirmed' ? 'completed' : ''">
                  <div class="timeline-marker" :class="order.status !== 'confirmed' ? 'bg-success' : 'bg-secondary'"></div>
                  <div class="timeline-content">
                    <h6 class="mb-1">Preparando Pedido</h6>
                    <small class="text-muted">Estamos separando seus produtos</small>
                  </div>
                </div>
                <div class="timeline-item" :class="order.status === 'shipped' || order.status === 'delivered' ? 'completed' : ''">
                  <div class="timeline-marker" :class="order.status === 'shipped' || order.status === 'delivered' ? 'bg-success' : 'bg-secondary'"></div>
                  <div class="timeline-content">
                    <h6 class="mb-1">Enviado</h6>
                    <small class="text-muted">Seu pedido está a caminho</small>
                  </div>
                </div>
                <div class="timeline-item" :class="order.status === 'delivered' ? 'completed' : ''">
                  <div class="timeline-marker" :class="order.status === 'delivered' ? 'bg-success' : 'bg-secondary'"></div>
                  <div class="timeline-content">
                    <h6 class="mb-1">Entregue</h6>
                    <small class="text-muted">Pedido entregue com sucesso</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Informações de Entrega -->
          <div class="card mb-4">
            <div class="card-header bg-light">
              <h5 class="mb-0">
                <i class="fas fa-truck me-2"></i>Informações de Entrega
              </h5>
            </div>
            <div class="card-body">
              <div v-if="order.delivery && order.delivery.type === 'delivery'">
                <h6>Entrega em Domicílio</h6>
                <p class="mb-1">
                  <strong>Endereço:</strong><br>
                  {{ order.delivery.address.street }}, {{ order.delivery.address.number }}<br>
                  {{ order.delivery.address.neighborhood }}<br>
                  {{ order.delivery.address.city }} - {{ order.delivery.address.state }}<br>
                  CEP: {{ order.delivery.address.zipcode }}
                  <span v-if="order.delivery.address.complement">
                    <br>Complemento: {{ order.delivery.address.complement }}
                  </span>
                </p>
                <p class="mb-0">
                  <strong>Previsão de Entrega:</strong> 
                  {{ calculateDeliveryDate() }}
                </p>
              </div>
              <div v-else-if="order.delivery && order.delivery.type === 'pickup'">
                <h6>Retirada na Loja</h6>
                <p class="mb-1">
                  <strong>Loja:</strong> {{ order.delivery.store.name }}<br>
                  <strong>Endereço:</strong> {{ order.delivery.store.address }}<br>
                  <strong>Telefone:</strong> {{ order.delivery.store.phone }}
                </p>
                <p class="mb-0">
                  <strong>Horário de Funcionamento:</strong> {{ order.delivery.store.hours }}
                </p>
              </div>
              <div v-else>
                <p class="text-muted">Informações de entrega não disponíveis.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumo e Ações -->
        <div class="col-lg-4">
          <div class="sticky-top" style="top: 20px;">
            <!-- Resumo do Pedido -->
            <div class="card mb-4">
              <div class="card-header bg-light">
                <h5 class="mb-0">
                  <i class="fas fa-receipt me-2"></i>Resumo do Pedido
                </h5>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>R$ {{ order.subtotal.toFixed(2) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Entrega:</span>
                  <span>{{ order.delivery && order.delivery.price > 0 ? 'R$ ' + order.delivery.price.toFixed(2) : 'Grátis' }}</span>
                </div>
                <div v-if="order.discount > 0" class="d-flex justify-content-between mb-2 text-success">
                  <span>Desconto:</span>
                  <span>- R$ {{ order.discount.toFixed(2) }}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span>R$ {{ order.total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Ações -->
            <div class="card">
              <div class="card-body">
                <h6 class="mb-3">Próximos Passos</h6>
                <button class="btn btn-primary w-100 mb-2" @click="continueShopping">
                  <i class="fas fa-shopping-bag me-2"></i>Continuar Comprando
                </button>
                <router-link to="/orders" class="btn btn-outline-primary w-100 mb-2">
                  <i class="fas fa-list me-2"></i>Ver Meus Pedidos
                </router-link>
                <button class="btn btn-outline-secondary w-100" @click="printOrder">
                  <i class="fas fa-print me-2"></i>Imprimir Pedido
                </button>
              </div>
            </div>

            <!-- Suporte -->
            <div class="card mt-4">
              <div class="card-body text-center">
                <i class="fas fa-headset fa-2x text-primary mb-3"></i>
                <h6>Precisa de Ajuda?</h6>
                <p class="small text-muted mb-2">Estamos aqui para ajudar com seu pedido</p>
                <p class="mb-0">
                  <strong>📞 (81) 99818-9999</strong><br>
                  <strong>✉️ gustavson.adm@gmail.com</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderConfirmation',
  data() {
    return {
      order: this.getSampleOrder() // Dados de exemplo
    }
  },
  methods: {
    getSampleOrder() {
      // Dados de exemplo para demonstração
      return {
        id: 'ORD' + Date.now().toString().slice(-6),
        status: 'confirmed',
        subtotal: 158.50,
        discount: 10.00,
        total: 148.50,
        items: [
          {
            id: 1,
            name: 'Paracetamol 500mg 20 comprimidos',
            price: 12.50,
            quantity: 2,
            image: 'https://via.placeholder.com/60'
          },
          {
            id: 2,
            name: 'Dipirona 500mg 10 comprimidos',
            price: 8.75,
            quantity: 1,
            image: 'https://via.placeholder.com/60'
          },
          {
            id: 3,
            name: 'Curativo Band-Aid 10 unidades',
            price: 15.00,
            quantity: 3,
            image: 'https://via.placeholder.com/60'
          }
        ],
        delivery: {
          type: 'delivery',
          price: 15.00,
          address: {
            street: 'Rua das Flores',
            number: '123',
            complement: 'Apto 101',
            neighborhood: 'Centro',
            city: 'Recife',
            state: 'PE',
            zipcode: '50000-000'
          }
        }
      }
    },
    
    calculateDeliveryDate() {
      const today = new Date()
      const deliveryDate = new Date(today)
      deliveryDate.setDate(today.getDate() + 3) // 3 dias úteis
      
      return deliveryDate.toLocaleDateString('pt-BR')
    },
    
    continueShopping() {
      this.$router.push('/products')
    },
    
    printOrder() {
      window.print()
    }
  },
  mounted() {
    // Em uma aplicação real, aqui carregaria os dados do pedido da API ou Vuex
    console.log('OrderConfirmation carregado')
  }
}
</script>

<style scoped>
.order-confirmation-page {
  min-height: 100vh;
  background-color: #f8f9fa;
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

.order-number {
  font-size: 1.2rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  display: inline-block;
}

.sticky-top {
  position: sticky;
  z-index: 100;
}

/* Timeline Styles */
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
}

.timeline-marker {
  position: absolute;
  left: -30px;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid #fff;
}

.timeline-content {
  padding: 10px;
}

.timeline-item.completed .timeline-content {
  opacity: 1;
}

.timeline-item:not(.completed) .timeline-content {
  opacity: 0.6;
}

@media print {
  .order-confirmation-page {
    background-color: white;
  }
  
  .btn, .sticky-top {
    display: none !important;
  }
}
</style>