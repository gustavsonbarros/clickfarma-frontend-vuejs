<template>
  <div class="home">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Hero Section -->
      <section class="hero bg-primary text-white py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <h1 class="display-4 fw-bold">Sua saúde em primeiro lugar</h1>
              <p class="lead">Encontre os melhores medicamentos e produtos com entrega rápida e preços justos.</p>
              <router-link to="/products" class="btn btn-light btn-lg mt-3">
                Ver Produtos
              </router-link>
            </div>
            <div class="col-md-6 text-center">
              <div class="hero-image">
                <span style="font-size: 8rem;">💊</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-5">
        <div class="container">
          <div class="row text-center">
            <div class="col-md-4 mb-4">
              <div class="feature-icon mb-3">
                <span style="font-size: 3rem;">🚚</span>
              </div>
              <h4>Entrega Rápida</h4>
              <p>Receba seus produtos em até 2 horas na região metropolitana.</p>
            </div>
            <div class="col-md-4 mb-4">
              <div class="feature-icon mb-3">
                <span style="font-size: 3rem;">💳</span>
              </div>
              <h4>Pagamento Seguro</h4>
              <p>Diversas formas de pagamento com total segurança.</p>
            </div>
            <div class="col-md-4 mb-4">
              <div class="feature-icon mb-3">
                <span style="font-size: 3rem;">👨‍⚕️</span>
              </div>
              <h4>Farmácia Confiável</h4>
              <p>Profissionais qualificados para melhor atendê-lo.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="bg-light py-5">
        <div class="container">
          <h2 class="text-center mb-5">Categorias em Destaque</h2>
          <div class="row">
            <div v-for="category in categories" :key="category" class="col-md-2 col-4 mb-3">
              <div class="card text-center h-100">
                <div class="card-body">
                  <div class="category-icon mb-2">
                    <span style="font-size: 2rem;">📦</span>
                  </div>
                  <h6 class="card-title">{{ category }}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      featuredData: null
    }
  },
  computed: {
    ...mapGetters(['categories'])
  },
  async mounted() {
    console.log('🏠 Componente Home montado - inicializando...');
    await this.initializeHome();
  },
  methods: {
    async initializeHome() {
      this.loading = true;
      
      try {
        console.log('📊 Carregando dados da homepage...');
        
        // Simular carregamento de dados adicionais
        await this.loadFeaturedData();
        
        // Analytics
        this.trackHomeView();
        
        // Pré-carregar imagens ou recursos
        await this.preloadResources();
        
      } catch (error) {
        console.error('❌ Erro ao inicializar homepage:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async loadFeaturedData() {
      // Simular chamada API para dados em destaque
      return new Promise(resolve => {
        setTimeout(() => {
          this.featuredData = {
            banners: [],
            promotions: []
          };
          resolve();
        }, 500);
      });
    },
    
    trackHomeView() {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: 'Página Inicial',
          page_location: '/'
        });
      }
    },
    
    async preloadResources() {
      // Pré-carregar imagens importantes
      const images = [
        '/images/hero-bg.jpg',
        '/images/feature-delivery.jpg'
      ];
      
      await Promise.all(
        images.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          });
        })
      );
    }
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
}
.feature-icon {
  color: #0d6efd;
}
.category-icon {
  color: #6c757d;
}
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>