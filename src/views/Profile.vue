<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-3">
        <profile-sidebar />
      </div>
      
      <div class="col-md-9">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">
              <i class="fas fa-user-circle me-2"></i>Meu Perfil
            </h5>
          </div>
          <div class="card-body">
            <profile-edit />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSidebar from '@/components/auth/ProfileSidebar.vue'
import ProfileEdit from '@/components/auth/ProfileEdit.vue'

export default {
  name: 'Profile',
  components: {
    ProfileSidebar,
    ProfileEdit
  },
  mounted() {
    // Verificar se o usuário está autenticado
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push('/login')
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