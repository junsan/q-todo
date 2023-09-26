<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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
          Q-Todo
        </q-toolbar-title>

        <div>{{ useStore.userEmail }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view></router-view>
      <router-link :to="'/login'">Login</router-link>
      <br><br>
      <router-link :to="'/index'">Index</router-link>
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
