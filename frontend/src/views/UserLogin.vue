<template>
<div class="container">
  <div class="row justify-content-center mt-5">
    <div class="col-12 col-md-6">
      <form class="card" @submit="handleSubmit">
        <div class="card-header">
          <h2>Login</h2>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label for="usernameInput">Usuário</label>
            <input type="email" v-model="form.email" required class="form-control" id="usernameInput" placeholder="nome@exemplo.com">
          </div>
          <div class="form-group">
            <label for="passwordInput">Senha</label>
            <input type="password" v-model="form.password" required class="form-control" id="passwordInput" placeholder="Senha">
          </div>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-primary">Enviar</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions('user', ['login']),

    async handleSubmit(event) {
      event.preventDefault()
      const response = await this.login(this.form)
      switch(response.status) {
        case 202:
          this.$router.push({name: 'PageCreate'})
          break;

        case 401:
          alert('Erro invalido')
          break;
      }
    }
  }
}
</script>
