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
      <form action="/admin" method="POST">
        <div class="form-group">
          <label for="inputTitulo">Titulo</label>
          <input type="email" class="form-control" id="inputTitulo" aria-describedby="emailHelp" placeholder="Enter email">
        </div>

        <div class="form-group">
          <label for="inputDescription">Descrição</label>
          <textarea class="form-control" id="inputDescription" placeholder="Descrição"></textarea>
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
  }
}
</script>

