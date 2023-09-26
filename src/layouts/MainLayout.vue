<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated  v-if="useStore.userEmail">
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
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useTodoStore } from 'src/stores/todo-store'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const useStore = useTodoStore()
const router = useRouter()

function toogleDrawer () {
  useStore.openDrawer = !useStore.openDrawer
}

onMounted(async () => {
  const value = window.localStorage.getItem('user')
  if (value) {
    await useStore.automaticLogin()
    if (useStore.status === true) {
      router.push({ path: 'index' })
    } else {
      router.push({ path: 'login' })
    }
  } else {
    router.push({ path: 'login' })
  }
})

</script>
