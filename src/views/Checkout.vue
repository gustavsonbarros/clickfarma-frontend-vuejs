<template>
  <div class="container mt-4">
    <h2>💰 Finalizar Compra</h2>
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5>Informações de Entrega</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Nome completo</label>
                  <input type="text" class="form-control" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">CPF</label>
                  <input type="text" class="form-control" required>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Endereço</label>
                <input type="text" class="form-control" required>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Cidade</label>
                  <input type="text" class="form-control" required>
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label">Estado</label>
                  <input type="text" class="form-control" required>
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label">CEP</label>
                  <input type="text" class="form-control" required>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5>Resumo</h5>
          </div>
          <div class="card-body">
            <p>Itens: {{ cartItemsCount }}</p>
            <p>Subtotal: R$ {{ cartTotal.toFixed(2) }}</p>
            <p>Entrega: R$ 10.00</p>
            <hr>
            <h5>Total: R$ {{ (cartTotal + 10).toFixed(2) }}</h5>
            <button class="btn btn-success w-100 mt-3">Confirmar Pedido</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Checkout',
  computed: {
    ...mapGetters(['cartItemsCount', 'cartTotal'])
  }
}
</script>