<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">🔐 Entrar</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  v-model="credentials.email"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Senha</label>
                <input 
                  type="password" 
                  class="form-control" 
                  v-model="credentials.password"
                  required
                >
              </div>
              <button 
                type="submit" 
                class="btn btn-primary w-100"
                :disabled="loading"
              >
                {{ loading ? 'Entrando...' : 'Entrar' }}
              </button>
            </form>
            <div class="text-center mt-3">
              <p>Não tem conta? <router-link to="/register">Cadastre-se</router-link></p>
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
  name: 'Login',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      this.loading = true
      try {
        await this.login(this.credentials)
        this.$router.push('/')
      } catch (error) {
        alert(error.message || 'Erro ao fazer login')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>