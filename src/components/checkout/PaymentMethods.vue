<template>
  <div class="payment-methods">
    <h6 class="mb-4">Selecione a forma de pagamento:</h6>
    
    <div class="payment-options">
      <!-- Cartão de Crédito -->
      <div class="payment-option mb-3">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="radio" 
            id="credit-card" 
            value="credit_card" 
            v-model="selectedMethod"
          >
          <label class="form-check-label w-100" for="credit-card">
            <div class="d-flex align-items-center">
              <i class="fas fa-credit-card fa-2x me-3 text-primary"></i>
              <div>
                <h6 class="mb-1">Cartão de Crédito</h6>
                <p class="mb-0 text-muted">Pague em até 12x sem juros</p>
              </div>
            </div>
          </label>
        </div>
        
        <div v-if="selectedMethod === 'credit_card'" class="payment-details mt-3 ps-5">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Número do Cartão</label>
              <input type="text" class="form-control" placeholder="0000 0000 0000 0000">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Nome no Cartão</label>
              <input type="text" class="form-control" placeholder="Nome completo">
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 mb-3">
              <label class="form-label">Validade</label>
              <input type="text" class="form-control" placeholder="MM/AA">
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label">CVV</label>
              <input type="text" class="form-control" placeholder="000">
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label">Parcelas</label>
              <select class="form-select">
                <option>1x de R$ {{ orderTotal.toFixed(2) }}</option>
                <option v-for="n in 12" :key="n" :value="n">
                  {{ n }}x de R$ {{ (orderTotal / n).toFixed(2) }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Débito -->
      <div class="payment-option mb-3">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="radio" 
            id="debit-card" 
            value="debit_card" 
            v-model="selectedMethod"
          >
          <label class="form-check-label w-100" for="debit-card">
            <div class="d-flex align-items-center">
              <i class="fas fa-credit-card fa-2x me-3 text-success"></i>
              <div>
                <h6 class="mb-1">Cartão de Débito</h6>
                <p class="mb-0 text-muted">Pagamento à vista</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- PIX -->
      <div class="payment-option mb-3">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="radio" 
            id="pix" 
            value="pix" 
            v-model="selectedMethod"
          >
          <label class="form-check-label w-100" for="pix">
            <div class="d-flex align-items-center">
              <i class="fas fa-qrcode fa-2x me-3 text-info"></i>
              <div>
                <h6 class="mb-1">PIX</h6>
                <p class="mb-0 text-muted">Pagamento instantâneo com 5% de desconto</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Boleto -->
      <div class="payment-option">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="radio" 
            id="boleto" 
            value="boleto" 
            v-model="selectedMethod"
          >
          <label class="form-check-label w-100" for="boleto">
            <div class="d-flex align-items-center">
              <i class="fas fa-barcode fa-2x me-3 text-warning"></i>
              <div>
                <h6 class="mb-1">Boleto Bancário</h6>
                <p class="mb-0 text-muted">Pagamento em até 3 dias úteis</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Informações de Segurança -->
    <div class="security-info mt-4 p-3 bg-light rounded">
      <div class="d-flex align-items-center">
        <i class="fas fa-lock fa-2x text-success me-3"></i>
        <div>
          <h6 class="mb-1">Pagamento Seguro</h6>
          <p class="mb-0 small">Seus dados estão protegidos com criptografia de última geração.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentMethods',
  props: {
    selectedMethod: {
      type: String,
      default: ''
    },
    orderTotal: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:payment-method'],
  watch: {
    selectedMethod(newMethod) {
      this.$emit('update:payment-method', newMethod)
    }
  }
}
</script>

<style scoped>
.payment-option .form-check-label {
  cursor: pointer;
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.payment-option .form-check-input:checked + .form-check-label {
  border-color: #0d6efd;
  background-color: #f8f9fa;
}

.payment-details {
  border-left: 3px solid #0d6efd;
  padding-left: 20px;
}

.security-info {
  border-left: 4px solid #198754;
}
</style>