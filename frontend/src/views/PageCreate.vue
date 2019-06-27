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
          <VueEditor v-model="form.description" id="inputDescription" />
        </div>

        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { VueEditor } from "vue2-editor";

import PagesMenu from "../components/PagesMenu";

export default {
  components: {
    PagesMenu,
    VueEditor
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

