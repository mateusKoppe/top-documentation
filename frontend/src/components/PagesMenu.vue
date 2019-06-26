<template>
  <div>
    <li v-for="(page, index) in pageList.pages" :key="index">
      <a href="">
        {{page.title}}
      </a>
    </li>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(['pageList'])
  },
  created() {
    this.$store.dispatch('loadPageList')
  },
}
</script>
