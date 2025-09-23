<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">🔐 Entrar</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin" ref="loginForm">
              <div class="mb-3">
                <label class="form-label">Email:</label>
                <input 
                  ref="emailInput"
                  type="email" 
                  class="form-control" 
                  v-model="credentials.email"
                  required
                  @input="clearFieldError('email')"
                  :class="{ 'is-invalid': fieldErrors.email }"
                >
                <div v-if="fieldErrors.email" class="invalid-feedback">
                  {{ fieldErrors.email }}
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Senha:</label>
                <input 
                  ref="passwordInput"
                  type="password" 
                  class="form-control" 
                  v-model="credentials.password"
                  required
                  @input="clearFieldError('password')"
                  :class="{ 'is-invalid': fieldErrors.password }"
                >
                <div v-if="fieldErrors.password" class="invalid-feedback">
                  {{ fieldErrors.password }}
                </div>
              </div>
              <button 
                ref="submitButton"
                type="submit" 
                class="btn btn-primary w-100"
                :disabled="loading"
              >
                {{ loading ? 'Entrando...' : 'Entrar' }}
              </button>
            </form>
            <div class="text-center mt-3">
              <p>Não tem conta? <router-link to="/register">Cadastre-se</router-link></p>
              <p>
                <router-link to="/forgot-password">Esqueci minha senha</router-link>
              </p>
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
      loading: false,
      fieldErrors: {}
    }
  },
  mounted() {
    console.log('🔑 Componente Login montado - configurando refs...');
    this.focusEmailField();
    this.setupFormAccessibility();
  },
  methods: {
    ...mapActions(['login']),
    
    
    focusEmailField() {
      if (this.$refs.emailInput) {
        this.$refs.emailInput.focus();
        console.log('✅ Foco automático no campo email');
      }
    },
    
    // Configurações de acessibilidade
    setupFormAccessibility() {
      
      if (this.$refs.emailInput) {
        this.$refs.emailInput.setAttribute('aria-describedby', 'email-help');
      }
      if (this.$refs.passwordInput) {
        this.$refs.passwordInput.setAttribute('aria-describedby', 'password-help');
      }
    },
    
    
    validateForm() {
      this.fieldErrors = {};
      
      if (!this.credentials.email) {
        this.fieldErrors.email = 'Email é obrigatório';
        this.focusOnError('emailInput');
        return false;
      }
      
      if (!this.credentials.email.includes('@')) {
        this.fieldErrors.email = 'Email inválido';
        this.focusOnError('emailInput');
        return false;
      }
      
      if (!this.credentials.password) {
        this.fieldErrors.password = 'Senha é obrigatória';
        this.focusOnError('passwordInput');
        return false;
      }
      
      if (this.credentials.password.length < 6) {
        this.fieldErrors.password = 'Senha deve ter pelo menos 6 caracteres';
        this.focusOnError('passwordInput');
        return false;
      }
      
      return true;
    },
    
    // Focar no campo com erro
    focusOnError(fieldRef) {
      if (this.$refs[fieldRef]) {
        this.$refs[fieldRef].focus();
        
        this.$refs[fieldRef].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    },
    
    // Limpar erro do campo
    clearFieldError(fieldName) {
      if (this.fieldErrors[fieldName]) {
        this.fieldErrors[fieldName] = null;
      }
    },
    
    // Shake animation no formulário em caso de erro
    shakeForm() {
      if (this.$refs.loginForm) {
        this.$refs.loginForm.classList.add('shake');
        setTimeout(() => {
          this.$refs.loginForm.classList.remove('shake');
        }, 500);
      }
    },
    
    async handleLogin() {
      if (!this.validateForm()) {
        this.shakeForm();
        return;
      }
      
      this.loading = true;
      
      // Desabilitar botão visualmente
      if (this.$refs.submitButton) {
        this.$refs.submitButton.style.opacity = '0.7';
      }
      
      try {
        await this.login(this.credentials);
        console.log('✅ Login realizado com sucesso');
        this.$router.push('/');
      } catch (error) {
        console.error('Erro no login:', error);
        
        // Focar no campo apropriado baseado no erro
        if (error.message?.includes('email')) {
          this.fieldErrors.email = error.message;
          this.focusOnError('emailInput');
        } else if (error.message?.includes('senha') || error.message?.includes('password')) {
          this.fieldErrors.password = error.message;
          this.focusOnError('passwordInput');
        } else {
          alert(error.message || 'Erro ao fazer login');
        }
        
        this.shakeForm();
      } finally {
        this.loading = false;
        
        // Reabilitar botão
        if (this.$refs.submitButton) {
          this.$refs.submitButton.style.opacity = '1';
        }
      }
    }
  }
}
</script>

<style scoped>
.shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.invalid-feedback {
  display: block;
}

.form-control.is-invalid {
  border-color: #dc3545;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath d='m5.8 3.6.4.4.4-.4'/%3e%3cpath d='M6 7v2'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
</style>