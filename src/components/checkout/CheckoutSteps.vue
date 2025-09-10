<template>
  <div class="checkout-steps">
    <div class="steps">
      <div 
        v-for="(step, index) in steps" 
        :key="step.name" 
        class="step"
        :class="{
          'active': index === currentStep,
          'completed': index < currentStep
        }"
      >
        <div class="step-icon">
          <span v-if="index < currentStep" class="completed-icon">
            <i class="fas fa-check"></i>
          </span>
          <span v-else class="step-number">{{ index + 1 }}</span>
        </div>
        <div class="step-label">{{ step.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutSteps',
  props: {
    currentStep: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      steps: [
        { name: 'cart', label: 'Carrinho' },
        { name: 'delivery', label: 'Entrega' },
        { name: 'payment', label: 'Pagamento' },
        { name: 'confirmation', label: 'Confirmação' }
      ]
    }
  }
}
</script>

<style scoped>
.checkout-steps {
  padding: 20px 0;
}

.steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.steps::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #dee2e6;
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.step-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.step-number {
  font-weight: 600;
  color: #6c757d;
}

.step-label {
  font-size: 0.875rem;
  color: #6c757d;
  text-align: center;
  font-weight: 500;
}

.step.active .step-icon {
  border-color: #0d6efd;
  background-color: #0d6efd;
}

.step.active .step-number {
  color: #fff;
}

.step.active .step-label {
  color: #0d6efd;
  font-weight: 600;
}

.step.completed .step-icon {
  border-color: #198754;
  background-color: #198754;
}

.step.completed .completed-icon {
  color: #fff;
}

.step.completed .step-label {
  color: #198754;
}

/* Responsividade */
@media (max-width: 576px) {
  .step-label {
    font-size: 0.75rem;
  }
  
  .step-icon {
    width: 32px;
    height: 32px;
  }
}
</style>