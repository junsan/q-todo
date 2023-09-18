<template>
  <q-page class="flex flex-center">
    <q-icon name="beenhere" color="teal" size="4.4em" />
    <h4 color="teal">Q-Todo</h4>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'

onMounted(() => {
  GoogleAuth.initialize()
})

</script>
