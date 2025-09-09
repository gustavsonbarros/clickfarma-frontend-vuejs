<template>
  <footer class="bg-dark text-light mt-5 py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5>ClickFarma</h5>
          <p>Sua farmácia online de confiança, sempre ao seu alcance.</p>
        </div>
        <div class="col-md-4">
          <h5>Links Rápidos</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-light">Home</router-link></li>
            <li><router-link to="/products" class="text-light">Produtos</router-link></li>
            <li><router-link to="/cart" class="text-light">Carrinho</router-link></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Contato</h5>
          <p>📞 (81) 99818-9999</p>
          <p>✉️ gustavson.adm@cgmail.com</p>
        </div>
      </div>
      <hr class="my-4">
      <div class="text-center">
        <p>&copy; 2024 ClickFarma. Todos os direitos reservados.</p>
        <p>Desenvolvido por Gustavson Barros </p>
        
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
footer a {
  text-decoration: none;
}
footer a:hover {
  text-decoration: underline;
}
</style>