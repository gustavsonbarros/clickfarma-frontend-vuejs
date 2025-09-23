<template>
  <div class="container mt-4">
    <h2>📄 Minhas Receitas</h2>
    
    <div class="row">
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-header">
            <h5>📤 Enviar Nova Receita</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="uploadPrescription">
              <div class="mb-3">
                <label class="form-label">Arquivo da Receita</label>
                <input 
                  @change="handleFileSelect" 
                  type="file" 
                  class="form-control" 
                  accept="image/*,.pdf"
                  required
                >
                <div class="form-text">Formatos aceitos: JPG, PNG, PDF (máx. 5MB)</div>
              </div>
              <div class="mb-3">
                <label class="form-label">Observações (opcional)</label>
                <textarea 
                  v-model="uploadForm.notes" 
                  class="form-control" 
                  rows="3"
                  placeholder="Adicione observações sobre a receita..."
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="!selectedFile">
                Enviar Receita
              </button>
            </form>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h5>📋 Histórico de Receitas</h5>
          </div>
          <div class="card-body">
            <div v-if="prescriptions.length === 0" class="text-center py-4">
              <p class="text-muted">Nenhuma receita enviada ainda.</p>
            </div>
            <div v-else>
              <div v-for="prescription in prescriptions" :key="prescription.id" class="border-bottom pb-3 mb-3">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6>{{ prescription.fileName }}</h6>
                    <p class="text-muted small mb-1">
                      Enviado em: {{ formatDate(prescription.uploadDate) }}
                    </p>
                    <p v-if="prescription.notes" class="small mb-2">
                      <strong>Observações:</strong> {{ prescription.notes }}
                    </p>
                    <span :class="getStatusClass(prescription.status)" class="badge">
                      {{ getStatusText(prescription.status) }}
                    </span>
                  </div>
                  <div>
                    <button @click="viewPrescription(prescription)" class="btn btn-sm btn-outline-primary">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5>ℹ️ Informações</h5>
          </div>
          <div class="card-body">
            <h6>Como funciona?</h6>
            <ol class="small">
              <li>Envie a foto ou PDF da sua receita</li>
              <li>Nossa equipe irá validar a receita</li>
              <li>Você será notificado sobre o status</li>
              <li>Após aprovada, os medicamentos estarão disponíveis para compra</li>
            </ol>
            
            <h6 class="mt-3">Status das Receitas:</h6>
            <ul class="small">
              <li><span class="badge bg-warning">Pendente</span> - Aguardando análise</li>
              <li><span class="badge bg-primary">Em Análise</span> - Sendo validada</li>
              <li><span class="badge bg-success">Aprovada</span> - Receita válida</li>
              <li><span class="badge bg-danger">Rejeitada</span> - Receita inválida</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Prescriptions',
  data() {
    return {
      selectedFile: null,
      uploadForm: {
        notes: ''
      },
      prescriptions: [
        {
          id: 1,
          fileName: 'receita_antibiotico.jpg',
          uploadDate: new Date('2024-01-15'),
          status: 'approved',
          notes: 'Receita para tratamento de infecção'
        },
        {
          id: 2,
          fileName: 'receita_vitaminas.pdf',
          uploadDate: new Date('2024-01-10'),
          status: 'pending',
          notes: ''
        }
      ]
    }
  },
  methods: {
    handleFileSelect(event) {
      this.selectedFile = event.target.files[0];
    },
    
    uploadPrescription() {
      if (!this.selectedFile) {
        alert('Por favor, selecione um arquivo.');
        return;
      }
      
      // Simular upload
      const newPrescription = {
        id: Date.now(),
        fileName: this.selectedFile.name,
        uploadDate: new Date(),
        status: 'pending',
        notes: this.uploadForm.notes
      };
      
      this.prescriptions.unshift(newPrescription);
      
      // Reset form
      this.selectedFile = null;
      this.uploadForm.notes = '';
      document.querySelector('input[type="file"]').value = '';
      
      alert('Receita enviada com sucesso! Você será notificado sobre o status da análise.');
    },
    
    viewPrescription(prescription) {
      alert(`Detalhes da Receita:\n\nArquivo: ${prescription.fileName}\nStatus: ${this.getStatusText(prescription.status)}\nData: ${this.formatDate(prescription.uploadDate)}\nObservações: ${prescription.notes || 'Nenhuma'}`);
    },
    
    formatDate(date) {
      return date.toLocaleDateString('pt-BR');
    },
    
    getStatusText(status) {
      const statusMap = {
        'pending': 'Pendente',
        'analyzing': 'Em Análise',
        'approved': 'Aprovada',
        'rejected': 'Rejeitada'
      };
      return statusMap[status] || status;
    },
    
    getStatusClass(status) {
      const classMap = {
        'pending': 'bg-warning',
        'analyzing': 'bg-primary',
        'approved': 'bg-success',
        'rejected': 'bg-danger'
      };
      return classMap[status] || 'bg-secondary';
    }
  }
}
</script>
