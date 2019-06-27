<template>
<div class="container pt-5">
  <div class="row">
    <div class="col-12 col-md-4">
      <h2> Páginas </h2>
      <ul>
        <PagesMenu/>
      </ul>
    </div>
    <div class="col">
      <h1> Criar Post </h1>
      <form @submit="handleSubmit">
        <div class="form-group">
          <label for="inputTitulo">Titulo</label>
          <input v-model="form.title" class="form-control" id="inputTitulo" placeholder="Titulo">
        </div>

        <div class="form-group">
          <label for="inputDescription">Descrição</label>
          <textarea v-model="form.description" class="form-control" id="inputDescription" placeholder="Descrição"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import PagesMenu from "../components/PagesMenu";

export default {
  components: {
    PagesMenu
  },
  data () {
    return {
      form: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    async handleSubmit (event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('pageCreate', { ...this.form });
      } catch (error) {
        alert('Erro para cadastrar')
      }
    }
  }
}
</script>

