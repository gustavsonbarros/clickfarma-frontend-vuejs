import api from './api'

export const authService = {
  async login(credentials) {
    return api.post('/auth/login', credentials)
  },
  
  async register(userData) {
    return api.post('/auth/register', userData)
  },
  
  async logout() {
    return api.post('/auth/logout')
  },
  
  // Novo método para atualizar perfil
  async updateProfile(userData) {
    return api.put('/profile', userData)
  },

  async requestPasswordReset(email) {
  return api.post('/auth/forgot-password', { email })
 },

 async resetPassword(data) {
  return api.post('/auth/reset-password', data)
 },
  
  // Novo método para alterar senha
  async changePassword(passwordData) {
    return api.put('/profile/password', passwordData)
  },
  
  async getProfile() {
    return api.get('/profile')
  }
}

export default authService