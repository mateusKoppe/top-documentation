<template>
  <div>
    <PagesMenuList
      :list="pageList"
      @onOpenFolder="loadFolder"
      @onCloseFolder="closeFolder"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import PagesMenuList from "./PagesMenuList";

export default {
  components: {
    PagesMenuList
  },

  computed: {
    ...mapGetters(['pageList'])
  },

  created() {
    this.$store.dispatch('pageLoadList')
  },

  methods: {
    loadFolder(folder) {
      this.$store.dispatch('pageLoadFolder', folder)
    },
    closeFolder(folder) {
      this.$store.dispatch('pageCloseFolder', folder)
    }
  }
}
</script>
