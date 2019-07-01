<template>
  <div>
    <PagesMenuList
      :list="list"
      @onOpenFolder="folderLoad"
      @onCloseFolder="folderClose"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import PagesMenuList from './PagesMenuList';

export default {
  components: {
    PagesMenuList,
  },

  computed: {
    ...mapGetters('pages', ['list']),
  },

  created() {
    this.listLoad()
      .then(response => {
        console.log(response)
      });
  },

  methods: {
    ...mapActions('pages', [
      'folderLoad',
      'folderClose',
      'listLoad'
    ])
  },
};
</script>
