<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="false" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toogleDrawer"
        />

        <q-toolbar-title>
          All Tasks
        </q-toolbar-title>

        <div>Q-Todo v1.1</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useTodoStore } from 'src/stores/todo-store'

const useStore = useTodoStore()

function toogleDrawer () {
  useStore.openDrawer = !useStore.openDrawer
}

</script>
