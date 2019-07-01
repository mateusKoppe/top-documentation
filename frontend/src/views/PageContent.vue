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
import { mapGetters, mapActions } from 'vuex';
import PagesMenu from '../components/PagesMenu';

export default {
  components: {
    PagesMenu,
  },

  computed: {
    ...mapGetters('pages', ['pageActive']),
  },

  created() {
    this.loadItem(this.$route.params.path);
  },

  watch: {
    $route() {
      this.loadItem(this.$route.params.path);
    },
  },

  methods: {
    ...mapActions('pages', [
      'loadItem'
    ])
  }
};
</script>
