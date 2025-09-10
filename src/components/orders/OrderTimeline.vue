<template>
  <div class="order-timeline">
    <div class="timeline">
      <div 
        v-for="(step, index) in timelineSteps" 
        :key="step.status" 
        class="timeline-step"
        :class="{
          'completed': isCompleted(step.status),
          'current': isCurrent(step.status),
          'pending': isPending(step.status)
        }"
      >
        <div class="timeline-icon">
          <i :class="step.icon"></i>
        </div>
        <div class="timeline-content">
          <h6 class="mb-1">{{ step.title }}</h6>
          <p class="mb-0 text-muted small">{{ step.description }}</p>
          <small v-if="step.status === status" class="text-primary">
            {{ getStatusTime(step.status) }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderTimeline',
  props: {
    status: {
      type: String,
      default: 'confirmed'
    }
  },
  data() {
    return {
      timelineSteps: [
        {
          status: 'confirmed',
          title: 'Pedido Confirmado',
          description: 'Seu pedido foi recebido e confirmado',
          icon: 'fas fa-check-circle'
        },
        {
          status: 'processing',
          title: 'Processando',
          description: 'Estamos preparando seu pedido',
          icon: 'fas fa-cog'
        },
        {
          status: 'shipped',
          title: 'Enviado',
          description: 'Seu pedido saiu para entrega',
          icon: 'fas fa-shipping-fast'
        },
        {
          status: 'delivered',
          title: 'Entregue',
          description: 'Pedido entregue com sucesso',
          icon: 'fas fa-home'
        }
      ]
    }
  },
  computed: {
    statusIndex() {
      const statusOrder = ['confirmed', 'processing', 'shipped', 'delivered']
      return statusOrder.indexOf(this.status)
    }
  },
  methods: {
    isCompleted(stepStatus) {
      const statusOrder = ['confirmed', 'processing', 'shipped', 'delivered']
      return statusOrder.indexOf(stepStatus) < this.statusIndex
    },
    
    isCurrent(stepStatus) {
      return stepStatus === this.status
    },
    
    isPending(stepStatus) {
      const statusOrder = ['confirmed', 'processing', 'shipped', 'delivered']
      return statusOrder.indexOf(stepStatus) > this.statusIndex
    },
    
    getStatusTime(stepStatus) {
      if (stepStatus !== this.status) return ''
      
      const now = new Date()
      const times = {
        'confirmed': 'Agora mesmo',
        'processing': 'Há alguns minutos',
        'shipped': 'Hoje às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        'delivered': 'Entregue hoje'
      }
      
      return times[stepStatus] || ''
    }
  }
}
</script>

<style scoped>
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #dee2e6;
}

.timeline-step {
  position: relative;
  padding: 1rem 0;
  display: flex;
  align-items: flex-start;
}

.timeline-step:last-child {
  padding-bottom: 0;
}

.timeline-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.timeline-content {
  flex: 1;
}

.timeline-step.completed .timeline-icon {
  border-color: #198754;
  background-color: #198754;
  color: white;
}

.timeline-step.current .timeline-icon {
  border-color: #0d6efd;
  background-color: #0d6efd;
  color: white;
  animation: pulse 2s infinite;
}

.timeline-step.pending .timeline-icon {
  border-color: #dee2e6;
  background-color: #f8f9fa;
  color: #6c757d;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
  }
}
</style>