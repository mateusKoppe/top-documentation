<template>
  <div>
    <li v-for="(page, index) in pageList" :key="index">
      <router-link :to="{
        name: 'PageContent',
        params: {
          path: page.title
        }
      }">{{page.title}}</router-link>
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
    this.$store.dispatch('pageLoadList')
  },
}
</script>
