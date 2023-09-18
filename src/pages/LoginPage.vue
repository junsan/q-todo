<template>
  <q-page class="flex flex-center">
    <q-icon name="beenhere" color="teal" size="4.4em" />
    <h4 color="teal">Q-Todo</h4>
    <GoogleSignInButton></GoogleSignInButton>
  </q-page>

</template>
<script setup lang="ts">
import { GoogleSignInButton } from 'vue3-google-signin'
</script>
