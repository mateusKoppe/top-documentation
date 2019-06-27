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
      <h1> {{pageActive.title}} </h1>
      <div v-html="pageActive.content"></div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import PagesMenu from "../components/PagesMenu";

export default {
  components: {
    PagesMenu
  },

  computed: {
    ...mapGetters(['pageActive'])
  },

  created () {
    this.$store.dispatch('pageLoadItem', this.$route.params.path)
  },

  watch: {
    '$route' () {
      this.$store.dispatch('pageLoadItem', this.$route.params.path)
    }
  }
}
</script>
