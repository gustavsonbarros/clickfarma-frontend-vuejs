<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-3">
        <profile-sidebar />
      </div>
      
      <div class="col-md-9">
        <div class="card">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="fas fa-map-marker-alt me-2"></i>Meus Endereços
            </h5>
            <button class="btn btn-light btn-sm" @click="showAddressForm(null)">
              <i class="fas fa-plus me-1"></i>Novo Endereço
            </button>
          </div>
          <div class="card-body">
            <address-list 
              :addresses="addresses" 
              @edit-address="showAddressForm"
              @delete-address="deleteAddress"
              @set-default="setDefaultAddress"
            />
            
            <address-form 
              v-if="showForm"
              :address="editingAddress"
              @save-address="saveAddress"
              @cancel="hideAddressForm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProfileSidebar from '@/components/auth/ProfileSidebar.vue'
import AddressList from '@/components/auth/AddressList.vue'
import AddressForm from '@/components/auth/AddressForm.vue'

export default {
  name: 'Addresses',
  components: {
    ProfileSidebar,
    AddressList,
    AddressForm
  },
  data() {
    return {
      showForm: false,
      editingAddress: null
    }
  },
  computed: {
    ...mapState(['addresses'])
  },
  mounted() {
    this.loadAddresses()
  },
  methods: {
    ...mapActions(['fetchAddresses', 'addAddress', 'updateAddress', 'deleteAddress', 'setDefaultAddress']),
    
    async loadAddresses() {
      try {
        await this.fetchAddresses()
      } catch (error) {
        console.error('Erro ao carregar endereços:', error)
        this.$toast.error('Erro ao carregar endereços')
      }
    },
    
    showAddressForm(address) {
      this.editingAddress = address ? { ...address } : null
      this.showForm = true
    },
    
    hideAddressForm() {
      this.showForm = false
      this.editingAddress = null
    },
    
    async saveAddress(addressData) {
      try {
        if (addressData.id) {
          await this.updateAddress(addressData)
          this.$toast.success('Endereço atualizado com sucesso!')
        } else {
          await this.addAddress(addressData)
          this.$toast.success('Endereço adicionado com sucesso!')
        }
        this.hideAddressForm()
      } catch (error) {
        this.$toast.error(error.message || 'Erro ao salvar endereço')
      }
    }
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-radius: 10px 10px 0 0 !important;
}
</style>