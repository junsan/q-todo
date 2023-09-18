<template>
  <div class="flex flex-center" style="padding-top: 150px;" >
    <q-icon name="beenhere" color="teal" size="4.4em" />
    <h4 color="teal">Q-Todo</h4>
  <div style="width: 100%; margin: 0px 100px;">
    <q-input bg-color="teal" label-color="white" rounded standout="bg-teal text-white" bottom-slots v-model="text" label="Email">
      <template v-slot:prepend>
        <q-icon name="email" color="white" />
      </template>
      <template v-slot:append>
        <q-icon name="close" color="white" @click="text = ''" class="cursor-pointer" />
      </template>
    </q-input>
    <q-input type="password" rounded standout="bg-teal text-white" bg-color="teal" label-color="white" bottom-slots v-model="text" label="Password">
      <template v-slot:prepend>
        <q-icon name="lock" color="white" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="text = ''" class="cursor-pointer" color="white" />
      </template>
    </q-input>
    <q-btn size="md" class="full-width" rounded label="Sign up or Log in" @click="onDelayedClick" outline color="teal" no-caps />
    </div>
  </div>
</template>
<script setup>
</script>
