<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-3">
        <profile-sidebar />
      </div>
      
      <div class="col-md-9">
        <div class="card">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="fas fa-file-medical me-2"></i>Minhas Receitas
            </h5>
            <button class="btn btn-light btn-sm" @click="showUploadForm">
              <i class="fas fa-upload me-1"></i>Nova Receita
            </button>
          </div>
          <div class="card-body">
            <!-- Formulário de Upload -->
            <upload-prescription 
              v-if="showUpload"
              @upload-complete="handleUploadComplete"
              @cancel="hideUploadForm"
            />
            
            <!-- Listagem de Receitas -->
            <div v-else>
              <div v-if="loading" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Carregando...</span>
                </div>
              </div>
              
              <prescription-list 
                v-else
                :prescriptions="prescriptions"
                @edit-prescription="editPrescription"
                @delete-prescription="deletePrescription"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ProfileSidebar from '@/components/auth/ProfileSidebar.vue'
import UploadPrescription from '@/components/prescriptions/UploadPrescription.vue'
import PrescriptionList from '@/components/prescriptions/PrescriptionList.vue'

export default {
  name: 'Prescriptions',
  components: {
    ProfileSidebar,
    UploadPrescription,
    PrescriptionList
  },
  data() {
    return {
      showUpload: false,
      loading: false,
      editingPrescription: null
    }
  },
  computed: {
    ...mapState(['prescriptions'])
  },
  methods: {
    ...mapActions(['fetchPrescriptions', 'deletePrescription']),
    
    async loadPrescriptions() {
      this.loading = true
      try {
        await this.fetchPrescriptions()
      } catch (error) {
        console.error('Erro ao carregar receitas:', error)
        this.$toast.error('Erro ao carregar receitas')
      } finally {
        this.loading = false
      }
    },
    
    showUploadForm() {
      this.showUpload = true
      this.editingPrescription = null
    },
    
    hideUploadForm() {
      this.showUpload = false
    },
    
    handleUploadComplete() {
      this.hideUploadForm()
      this.loadPrescriptions()
      this.$toast.success('Receita enviada com sucesso!')
    },
    
    editPrescription(prescription) {
      this.editingPrescription = prescription
      this.showUpload = true
    },
    
    async deletePrescriptionHandler(prescriptionId) {
      if (confirm('Tem certeza que deseja excluir esta receita?')) {
        try {
          await this.deletePrescription(prescriptionId)
          this.$toast.success('Receita excluída com sucesso!')
          this.loadPrescriptions()
        } catch (error) {
          this.$toast.error('Erro ao excluir receita')
        }
      }
    }
  },
  mounted() {
    this.loadPrescriptions()
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