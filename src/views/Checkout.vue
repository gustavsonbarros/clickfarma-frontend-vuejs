<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-8">
        <!-- Etapas do Checkout -->
        <checkout-steps :current-step="currentStep" />

        <!-- Etapa 1: Entrega/Retirada -->
        <div v-if="currentStep === 1" class="checkout-section">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">
                <i class="fas fa-truck me-2"></i>Opções de Entrega
              </h5>
            </div>
            <div class="card-body">
              <delivery-options
                :addresses="addresses"
                :selected-delivery-option="deliveryOption"
                :selected-address="selectedAddress"
                :selected-store="selectedStore"
                @update:delivery-option="updateDeliveryOption"
                @update:selected-address="updateSelectedAddress"
                @update:selected-store="updateSelectedStore"
              />
            </div>
          </div>
        </div>

        <!-- Etapa 2: Pagamento -->
        <div v-if="currentStep === 2" class="checkout-section">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">
                <i class="fas fa-credit-card me-2"></i>Pagamento
              </h5>
            </div>
            <div class="card-body">
              <payment-methods
                :selected-method="selectedPaymentMethod"
                @update:payment-method="updatePaymentMethod"
              />
            </div>
          </div>
        </div>

        <!-- Etapa 3: Revisão -->
        <div v-if="currentStep === 3" class="checkout-section">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">
                <i class="fas fa-check-circle me-2"></i>Revisar Pedido
              </h5>
            </div>
            <div class="card-body">
              <checkout-summary
                :cart="cart"
                :delivery-option="deliveryOption"
                :selected-address="selectedAddress"
                :selected-store="selectedStore"
                :selected-payment-method="selectedPaymentMethod"
                :delivery-price="deliveryPrice"
              />
            </div>
          </div>
        </div>

        <!-- Etapa 4: Confirmação -->
        <div v-if="currentStep === 4" class="checkout-section">
          <order-confirmation
            :order="order"
            @continue-shopping="continueShopping"
          />
        </div>

        <!-- Navegação -->
        <div class="checkout-navigation mt-4">
          <div class="d-flex justify-content-between">
            <button 
              v-if="currentStep > 1 && currentStep < 4"
              class="btn btn-outline-secondary"
              @click="previousStep"
            >
              <i class="fas fa-arrow-left me-2"></i>Voltar
            </button>
            <div v-else></div>

            <button 
              v-if="currentStep < 3"
              class="btn btn-primary"
              :disabled="!canContinue"
              @click="nextStep"
            >
              Continuar
              <i class="fas fa-arrow-right ms-2"></i>
            </button>

            <button 
              v-if="currentStep === 3"
              class="btn btn-success"
              :disabled="processingOrder"
              @click="placeOrder"
            >
              <span v-if="processingOrder" class="spinner-border spinner-border-sm me-2"></span>
              {{ processingOrder ? 'Processando...' : 'Finalizar Pedido' }}
            </button>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <!-- Resumo do Pedido -->
        <div class="sticky-top" style="top: 20px;">
          <checkout-summary
            :cart="cart"
            :delivery-option="deliveryOption"
            :selected-address="selectedAddress"
            :selected-store="selectedStore"
            :selected-payment-method="selectedPaymentMethod"
            :delivery-price="deliveryPrice"
            :current-step="currentStep"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import CheckoutSteps from '@/components/checkout/CheckoutSteps.vue'
import DeliveryOptions from '@/components/checkout/DeliveryOptions.vue'
import PaymentMethods from '@/components/checkout/PaymentMethods.vue'
import CheckoutSummary from '@/components/checkout/CheckoutSummary.vue'
import OrderConfirmation from '@/components/checkout/OrderConfirmation.vue'

export default {
  name: 'Checkout',
  components: {
    CheckoutSteps,
    DeliveryOptions,
    PaymentMethods,
    CheckoutSummary,
    OrderConfirmation
  },
  data() {
    return {
      currentStep: 1,
      deliveryOption: '',
      selectedAddress: null,
      selectedStore: null,
      selectedPaymentMethod: '',
      processingOrder: false,
      order: null
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['addresses', 'cartTotal', 'cartItemsCount']),
    
    canContinue() {
      switch (this.currentStep) {
        case 1: // Entrega
          if (this.deliveryOption === 'delivery') {
            return this.selectedAddress !== null
          } else if (this.deliveryOption === 'pickup') {
            return this.selectedStore !== null
          }
          return false
        
        case 2: // Pagamento
          return this.selectedPaymentMethod !== ''
        
        default:
          return true
      }
    },
    
    deliveryPrice() {
      if (this.deliveryOption === 'delivery') {
        return this.cartTotal >= 100 ? 0 : 15.90
      }
      return 0
    },
    
    orderTotal() {
      return this.cartTotal + this.deliveryPrice
    }
  },
  methods: {
    ...mapActions([
      'fetchAddresses', 
      'setDeliveryOption', 
      'clearCart',
      'createOrder'
    ]),
    
    nextStep() {
      if (this.canContinue) {
        this.currentStep++
        
        // Salvar opções no store quando avançar
        if (this.currentStep === 2) {
          this.setDeliveryOption({
            type: this.deliveryOption,
            address: this.selectedAddress,
            store: this.selectedStore,
            price: this.deliveryPrice
          })
        }
      }
    },
    
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    
    updateDeliveryOption(option) {
      this.deliveryOption = option
    },
    
    updateSelectedAddress(address) {
      this.selectedAddress = address
    },
    
    updateSelectedStore(store) {
      this.selectedStore = store
    },
    
    updatePaymentMethod(method) {
      this.selectedPaymentMethod = method
    },
    
    
async placeOrder() {
  if (!this.canContinue) return
  
  this.processingOrder = true
  
  try {
    const orderData = {
      items: this.cart,
      delivery: {
        type: this.deliveryOption,
        address: this.selectedAddress,
        store: this.selectedStore,
        price: this.deliveryPrice
      },
      payment: {
        method: this.selectedPaymentMethod
      },
      total: this.orderTotal
    }
    
    const order = await this.createOrder(orderData)
    
    // Redirecionar para página de confirmação
    this.$router.push({
      name: 'OrderConfirmation',
      params: { orderId: order.id }
    })
    
    this.$toast.success('Pedido realizado com sucesso!')
    
  } catch (error) {
    console.error('Erro ao finalizar pedido:', error)
    this.$toast.error('Erro ao finalizar pedido. Tente novamente.')
  } finally {
    this.processingOrder = false
  }
},
    
    continueShopping() {
      this.$router.push('/products')
    }
  },
  async mounted() {
    // Carregar endereços se necessário
    if (this.addresses.length === 0) {
      await this.fetchAddresses()
    }
    
    // Selecionar endereço principal por padrão
    const defaultAddress = this.addresses.find(addr => addr.isDefault)
    if (defaultAddress) {
      this.selectedAddress = defaultAddress
      this.deliveryOption = 'delivery'
    }
    
    // Redirecionar se carrinho estiver vazio
    if (this.cartItemsCount === 0 && this.currentStep < 4) {
      this.$router.push('/cart')
    }
  },
  
  watch: {
    cartItemsCount(newCount) {
      if (newCount === 0 && this.currentStep < 4) {
        this.$router.push('/cart')
      }
    }
  }
}
</script>

<style scoped>
.checkout-section {
  margin-bottom: 2rem;
}

.sticky-top {
  position: sticky;
  z-index: 100;
}

.checkout-navigation {
  padding: 1rem 0;
  border-top: 1px solid #dee2e6;
}
</style>