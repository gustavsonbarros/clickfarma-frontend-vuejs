<template>
  <div class="admin-dashboard d-flex">
    <!-- Sidebar -->
    <nav class="admin-sidebar bg-dark text-white p-3" style="width: 250px; height: 100vh; position: fixed;">
      <h4 class="text-center mb-4">Painel Admin</h4>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link text-white">Gerenciar Produtos (US-501)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/inventory" class="nav-link text-white">Gerenciar Estoque (US-502)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/orders" class="nav-link text-white">Visualizar Pedidos (US-503)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/prescriptions" class="nav-link text-white">Validar Receitas (US-504)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/users" class="nav-link text-white">Gerenciar Usuários (US-505)</router-link>
        </li>
      </ul>
      <button @click="logout" class="btn btn-outline-light w-100 mt-4">Sair</button>
    </nav>
    
    <!-- Conteúdo Principal -->
    <main class="flex-grow-1 p-4" style="margin-left: 250px;">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  methods: {
    logout() {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      this.$router.push('/admin/login')
    }
  }
}
</script>

<style scoped>
.admin-dashboard { min-height: 100vh; }
.nav-link { font-size: 1.1em; padding: 10px 0; }
.nav-link:hover { background-color: rgba(255,255,255,0.1); }
</style>