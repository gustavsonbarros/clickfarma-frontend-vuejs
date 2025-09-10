<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">🔐 Criar Nova Senha</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="form-label">Nova Senha:</label>
                <input 
                  type="password" 
                  class="form-control" 
                  v-model="password"
                  required
                  minlength="6"
                  placeholder="Mínimo 6 caracteres"
                >
                <div class="form-text">A senha deve ter pelo menos 6 caracteres</div>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Confirmar Nova Senha:</label>
                <input 
                  type="password" 
                  class="form-control" 
                  v-model="confirmPassword"
                  required
                  placeholder="Digite novamente a senha"
                >
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary w-100"
                :disabled="loading"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
                {{ loading ? 'Redefinindo...' : 'Redefinir Senha' }}
              </button>
            </form>
            
            <div class="text-center mt-3">
              <p>Lembrou sua senha? <router-link to="/login">Fazer login</router-link></p>
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
  name: 'ResetPassword',
  data() {
    return {
      password: '',
      confirmPassword: '',
      loading: false,
      token: this.$route.query.token || ''
    }
  },
  methods: {
    ...mapActions(['resetPassword']),
    
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        this.$toast.error('As senhas não coincidem!')
        return
      }
      
      if (this.password.length < 6) {
        this.$toast.error('A senha deve ter pelo menos 6 caracteres!')
        return
      }
      
      this.loading = true
      try {
        await this.resetPassword({
          token: this.token,
          password: this.password
        })
        this.$toast.success('Senha redefinida com sucesso!')
        this.$router.push('/login')
      } catch (error) {
        this.$toast.error(error.message || 'Erro ao redefinir senha')
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    if (!this.token) {
      this.$toast.error('Token de redefinição inválido ou expirado')
      this.$router.push('/forgot-password')
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
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  border-radius: 10px 10px 0 0 !important;
}
</style>