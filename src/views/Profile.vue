<template>
  <div class="container mt-4">
    <h2>👤 Meu Perfil</h2>
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5>Informações Pessoais</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProfile">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Nome completo</label>
                  <input v-model="profile.name" type="text" class="form-control" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Email</label>
                  <input v-model="profile.email" type="email" class="form-control" required>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Telefone</label>
                  <input v-model="profile.phone" type="tel" class="form-control">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Data de Nascimento</label>
                  <input v-model="profile.birthDate" type="date" class="form-control">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">CPF</label>
                <input v-model="profile.cpf" type="text" class="form-control">
              </div>
              <button type="submit" class="btn btn-primary">Salvar Alterações</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5>Ações</h5>
          </div>
          <div class="card-body">
            <router-link to="/addresses" class="btn btn-outline-primary w-100 mb-2">
              📍 Gerenciar Endereços
            </router-link>
            <router-link to="/reset-password" class="btn btn-outline-secondary w-100">
              🔒 Alterar Senha
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      profile: {
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        cpf: ''
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    if (this.user) {
      this.profile.name = this.user.name || '';
      this.profile.email = this.user.email || '';
    }
  },
  methods: {
    updateProfile() {
      // Lógica para atualizar o perfil (simulada)
      alert('Perfil atualizado com sucesso!');
    }
  }
}
</script>
