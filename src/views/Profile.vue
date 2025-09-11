<template>
  <div class="profile-container">
    <div class="profile-header">
      <h2>👤 Meu Perfil</h2>
      <p>Gerencie suas informações pessoais</p>
    </div>

    <div class="profile-content">
      <!-- Informações Pessoais -->
      <div class="profile-section">
        <h3>📋 Informações Pessoais</h3>
        <form @submit.prevent="updateProfile" class="profile-form">
          <div class="form-group">
            <label for="name">Nome Completo:</label>
            <input 
              type="text" 
              id="name" 
              v-model="userProfile.name" 
              :disabled="!isEditing"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              v-model="userProfile.email" 
              :disabled="!isEditing"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="phone">Telefone:</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="userProfile.phone" 
              :disabled="!isEditing"
              class="form-input"
              placeholder="(11) 99999-9999"
            />
          </div>

          <div class="form-group">
            <label for="birthDate">Data de Nascimento:</label>
            <input 
              type="date" 
              id="birthDate" 
              v-model="userProfile.birthDate" 
              :disabled="!isEditing"
              class="form-input"
            />
          </div>

          <div class="form-actions">
            <button 
              type="button" 
              @click="toggleEdit" 
              class="btn btn-secondary"
            >
              {{ isEditing ? 'Cancelar' : 'Editar' }}
            </button>
            <button 
              type="submit" 
              v-if="isEditing" 
              class="btn btn-primary"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>

      <!-- Endereços -->
      <div class="profile-section">
        <h3>📍 Meus Endereços</h3>
        <div class="addresses-container">
          <div 
            v-for="(address, index) in userProfile.addresses" 
            :key="index"
            class="address-card"
          >
            <div class="address-info">
              <h4>{{ address.label }}</h4>
              <p>{{ address.street }}, {{ address.number }}</p>
              <p>{{ address.neighborhood }} - {{ address.city }}/{{ address.state }}</p>
              <p>CEP: {{ address.zipCode }}</p>
            </div>
            <div class="address-actions">
              <button @click="editAddress(index)" class="btn btn-sm btn-outline">
                Editar
              </button>
              <button @click="removeAddress(index)" class="btn btn-sm btn-danger">
                Remover
              </button>
            </div>
          </div>
          
          <button @click="showAddressModal = true" class="btn btn-outline add-address-btn">
            + Adicionar Novo Endereço
          </button>
        </div>
      </div>

      <!-- Alterar Senha -->
      <div class="profile-section">
        <h3>🔒 Alterar Senha</h3>
        <form @submit.prevent="changePassword" class="password-form">
          <div class="form-group">
            <label for="currentPassword">Senha Atual:</label>
            <input 
              type="password" 
              id="currentPassword" 
              v-model="passwordForm.currentPassword" 
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="newPassword">Nova Senha:</label>
            <input 
              type="password" 
              id="newPassword" 
              v-model="passwordForm.newPassword" 
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar Nova Senha:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="passwordForm.confirmPassword" 
              class="form-input"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Alterar Senha
          </button>
        </form>
      </div>
    </div>

    <!-- Modal para Adicionar/Editar Endereço -->
    <div v-if="showAddressModal" class="modal-overlay" @click="closeAddressModal">
      <div class="modal-content" @click.stop>
        <h3>{{ editingAddressIndex !== null ? 'Editar' : 'Adicionar' }} Endereço</h3>
        <form @submit.prevent="saveAddress" class="address-form">
          <div class="form-group">
            <label for="addressLabel">Nome do Endereço:</label>
            <input 
              type="text" 
              id="addressLabel" 
              v-model="addressForm.label" 
              class="form-input"
              placeholder="Ex: Casa, Trabalho"
            />
          </div>

          <div class="form-group">
            <label for="zipCode">CEP:</label>
            <input 
              type="text" 
              id="zipCode" 
              v-model="addressForm.zipCode" 
              @blur="fetchAddressByZipCode"
              class="form-input"
              placeholder="00000-000"
            />
          </div>

          <div class="form-group">
            <label for="street">Rua:</label>
            <input 
              type="text" 
              id="street" 
              v-model="addressForm.street" 
              class="form-input"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="number">Número:</label>
              <input 
                type="text" 
                id="number" 
                v-model="addressForm.number" 
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="complement">Complemento:</label>
              <input 
                type="text" 
                id="complement" 
                v-model="addressForm.complement" 
                class="form-input"
                placeholder="Opcional"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="neighborhood">Bairro:</label>
            <input 
              type="text" 
              id="neighborhood" 
              v-model="addressForm.neighborhood" 
              class="form-input"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">Cidade:</label>
              <input 
                type="text" 
                id="city" 
                v-model="addressForm.city" 
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="state">Estado:</label>
              <input 
                type="text" 
                id="state" 
                v-model="addressForm.state" 
                class="form-input"
                maxlength="2"
              />
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeAddressModal" class="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Profile',
  data() {
    return {
      isEditing: false,
      showAddressModal: false,
      editingAddressIndex: null,
      userProfile: {
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        addresses: []
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      addressForm: {
        label: '',
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      }
    }
  },
  mounted() {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile() {
      // DEBUG: Verificar dados no localStorage
      const savedProfile = localStorage.getItem('userProfile')
      console.log('Dados carregados do localStorage:', savedProfile)
      
      if (savedProfile) {
        this.userProfile = JSON.parse(savedProfile)
      } else {
        // Dados padrão baseados no cadastro
        this.userProfile = {
          name: 'João Silva',
          email: 'joao@teste.com',
          phone: '',
          birthDate: '',
          addresses: []
        }
      }
      console.log('Perfil carregado:', this.userProfile)
    },

    toggleEdit() {
      this.isEditing = !this.isEditing
      if (!this.isEditing) {
        // Cancelar edição - recarregar dados
        this.loadUserProfile()
      }
    },

    updateProfile() {
      try {
        // Validações básicas
        if (!this.userProfile.name || !this.userProfile.email) {
          alert('Nome e email são obrigatórios!')
          return
        }

        // Salvar no localStorage (em um projeto real seria uma API)
        localStorage.setItem('userProfile', JSON.stringify(this.userProfile))
        
        this.isEditing = false
        alert('Perfil atualizado com sucesso!')
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error)
        alert('Erro ao atualizar perfil. Tente novamente.')
      }
    },

    changePassword() {
      try {
        // Validações
        if (!this.passwordForm.currentPassword || !this.passwordForm.newPassword || !this.passwordForm.confirmPassword) {
          alert('Todos os campos de senha são obrigatórios!')
          return
        }

        if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
          alert('A nova senha e a confirmação não coincidem!')
          return
        }

        if (this.passwordForm.newPassword.length < 6) {
          alert('A nova senha deve ter pelo menos 6 caracteres!')
          return
        }

        // Em um projeto real, isso seria uma chamada para API
        alert('Senha alterada com sucesso!')
        
        // Limpar formulário
        this.passwordForm = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      } catch (error) {
        console.error('Erro ao alterar senha:', error)
        alert('Erro ao alterar senha. Tente novamente.')
      }
    },

    editAddress(index) {
      this.editingAddressIndex = index
      this.addressForm = { ...this.userProfile.addresses[index] }
      this.showAddressModal = true
    },

    removeAddress(index) {
      if (confirm('Tem certeza que deseja remover este endereço?')) {
        this.userProfile.addresses.splice(index, 1)
        this.updateProfile()
      }
    },

    saveAddress() {
      try {
        // Validações básicas
        if (!this.addressForm.label || !this.addressForm.zipCode || !this.addressForm.street || !this.addressForm.number) {
          alert('Preencha todos os campos obrigatórios!')
          return
        }

        if (this.editingAddressIndex !== null) {
          // Editando endereço existente
          this.userProfile.addresses[this.editingAddressIndex] = { ...this.addressForm }
        } else {
          // Adicionando novo endereço
          this.userProfile.addresses.push({ ...this.addressForm })
        }

        this.updateProfile()
        this.closeAddressModal()
      } catch (error) {
        console.error('Erro ao salvar endereço:', error)
        alert('Erro ao salvar endereço. Tente novamente.')
      }
    },

    closeAddressModal() {
      this.showAddressModal = false
      this.editingAddressIndex = null
      this.addressForm = {
        label: '',
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      }
    },

    async fetchAddressByZipCode() {
      if (this.addressForm.zipCode && this.addressForm.zipCode.length === 8) {
        try {
          // Simular busca de CEP (em um projeto real usaria ViaCEP ou similar)
          // const response = await fetch(`https://viacep.com.br/ws/${this.addressForm.zipCode}/json/`)
          // const data = await response.json()
          
          // Simulação de dados
          if (this.addressForm.zipCode === '01310100') {
            this.addressForm.street = 'Avenida Paulista'
            this.addressForm.neighborhood = 'Bela Vista'
            this.addressForm.city = 'São Paulo'
            this.addressForm.state = 'SP'
          }
        } catch (error) {
          console.error('Erro ao buscar CEP:', error)
        }
      }
    }
  }
}
</script>       


<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.profile-header h2 {
  color: #2c5aa0;
  margin-bottom: 10px;
}

.profile-section {
  background: white;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.profile-section h3 {
  color: #2c5aa0;
  margin-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
}

.profile-form, .password-form, .address-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #495057;
}

.form-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #2c5aa0;
  box-shadow: 0 0 0 2px rgba(44, 90, 160, 0.1);
}

.form-input:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #2c5aa0;
  color: white;
}

.btn-primary:hover {
  background-color: #1e3d6f;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-outline {
  background-color: transparent;
  color: #2c5aa0;
  border: 1px solid #2c5aa0;
}

.btn-outline:hover {
  background-color: #2c5aa0;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}

.addresses-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.address-card {
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.address-info h4 {
  margin: 0 0 10px 0;
  color: #2c5aa0;
}

.address-info p {
  margin: 5px 0;
  color: #6c757d;
}

.address-actions {
  display: flex;
  gap: 10px;
}

.add-address-btn {
  align-self: flex-start;
  margin-top: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 25px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin-top: 0;
  color: #2c5aa0;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 10px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .address-card {
    flex-direction: column;
    gap: 15px;
  }
  
  .address-actions {
    align-self: stretch;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>