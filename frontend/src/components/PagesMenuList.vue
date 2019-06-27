<template>
  <div>
    <li v-for="(page, index) in list" :key="index">
      <router-link
        v-if="!page.isDirectory"
        :to="{
          name: 'PageContent',
          params: {
            path: page.title
          }
        }"
      >{{page.title}}</router-link>
      <template v-else>
        <a @click="$emit(folderNextAction(page), page)">{{page.title}}</a>
        <ul v-if="page.isOpened">
          <PagesMenuList
            :list="page.childreen"
            @onOpenFolder="$emit('onOpenFolder', page)"
            @onCloseFolder="$emit('onCloseFolder', page)"
          />
        </ul>
      </template>
    </li>
  </div>
</template>

<script>
export default {
  name: 'PagesMenuList',

  props: ['list'],

  methods: {
    folderNextAction(page) {
      return page.isOpened ? 'onCloseFolder' : 'onOpenFolder'
    }
  }
}
</script>
