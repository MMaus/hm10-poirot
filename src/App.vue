<script setup lang="ts">
import { ref } from 'vue'
import MainView from '@/views/MainView.vue'
import { useTokenStore } from '@/stores/token'

const tokenStore = useTokenStore()
const selectedCharacter = ref('Poirot')
const characters = ['Poirot', 'Sherlock Holmes', 'Miss Marple']

const connect = () => {
  console.log('connect')
}
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title
        >Learn English with
        <v-select
          v-model="selectedCharacter"
          :items="characters"
          density="compact"
          variant="plain"
          hide-details
          style="max-width: 160px; display: inline-block"
          class="ml-2 character-select"
          menu-icon="mdi-menu-down"
        >
        </v-select>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="tokenStore.token"
        label="Token"
        type="password"
        variant="outlined"
        density="compact"
        hide-details
      />

      <v-btn color="success" variant="text" @click="tokenStore.saveToken">Save</v-btn>

      <v-btn color="primary" variant="text" @click="connect">Connect</v-btn>
    </v-app-bar>

    <v-main>
      <MainView />
    </v-main>
  </v-app>
</template>

<style scoped>
.character-select {
  margin-top: -4px;
}
.character-select :deep(.v-field__input) {
  padding-top: 0 !important;
}
</style>
