<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">👤 Criar Conta</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label">Nome completo</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="userData.name"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  v-model="userData.email"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Senha</label>
                <input 
                  type="password" 
                  class="form-control" 
                  v-model="userData.password"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Confirmar senha</label>
                <input 
                  type="password" 
                  class="form-control" 
                  v-model="userData.confirmPassword"
                  required
                >
              </div>
              <button 
                type="submit" 
                class="btn btn-primary w-100"
                :disabled="loading"
              >
                {{ loading ? 'Criando conta...' : 'Criar Conta' }}
              </button>
            </form>
            <div class="text-center mt-3">
              <p>Já tem conta? <router-link to="/login">Faça login</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      userData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['register']),
    async handleRegister() {
      if (this.userData.password !== this.userData.confirmPassword) {
        alert('As senhas não coincidem!')
        return
      }

      this.loading = true
      try {
        await this.register(this.userData)
        this.$router.push('/')
      } catch (error) {
        alert(error.message || 'Erro ao criar conta')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>