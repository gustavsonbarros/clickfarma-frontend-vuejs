<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold">
        💊 ClickFarma
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">Produtos</router-link>
          </li>
        </ul>
        
        <div class="d-flex gap-2">
          <router-link to="/cart" class="btn btn-outline-light position-relative">
            🛒 Carrinho
            <span v-if="cartItemsCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ cartItemsCount }}
            </span>
          </router-link>
          
          <div v-if="!isAuthenticated" class="d-flex gap-2">
            <router-link to="/login" class="btn btn-outline-light">
              Entrar
            </router-link>
            <router-link to="/register" class="btn btn-light">
              Cadastrar
            </router-link>
          </div>
          
          <div v-else class="dropdown">
            <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
              👤 {{ user?.name || 'Usuário' }}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Meu Perfil</a></li>
              <li><a class="dropdown-item" href="#">Meus Pedidos</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item" @click="logout">Sair</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['isAuthenticated', 'cartItemsCount', 'user'])
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
}
</style>