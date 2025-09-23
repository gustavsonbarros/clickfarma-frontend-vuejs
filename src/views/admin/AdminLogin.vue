<template>
  <div class="admin-login container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center">Login Administrativo - ClickFarma</h2>
            <form @submit.prevent="login">
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input id="email" v-model="email" type="email" class="form-control" placeholder="admin@clickfarma.com" required />
              </div>
              <div class="form-group mb-3">
                <label for="password">Senha</label>
                <input id="password" v-model="password" type="password" class="form-control" placeholder="senha123" required />
              </div>
              <button type="submit" class="btn btn-primary w-100">Entrar no Painel</button>
            </form>
            <p v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</p>
            <p class="text-center mt-3"><router-link to="/login">Login como Usuário Comum</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminLogin',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/auth/login', { email: this.email, password: this.password })
        const { token, user } = response.data
        if (user.role !== 'admin') {
          throw new Error('Acesso negado: apenas admins')
        }
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(user))
        this.$router.push('/admin')
      } catch (err) {
        this.error = err.response?.data?.message || 'Credenciais inválidas. Use: admin@clickfarma.com / senha123'
      }
    }
  }
}
</script>

<style scoped>
.card { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
</style>