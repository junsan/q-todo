<template>
  <div class="flex flex-center" style="padding-top: 150px;" >
    <q-icon name="beenhere" color="teal" size="4.4em" />
    <h4 color="teal">Q-Todo</h4>
  <div style="width: 100%; margin: 0px 40px;">
    <q-input bg-color="teal" label-color="white" rounded standout="bg-teal text-white" bottom-slots label="Email" v-model="email">
      <template v-slot:prepend>
        <q-icon name="email" color="white" />
      </template>
      <template v-slot:append>
        <q-icon name="close" color="white" @click="email = ''" class="cursor-pointer" />
      </template>
    </q-input>
    <q-input type="password" v-model="password" rounded standout="bg-teal text-white" bg-color="teal" label-color="white" bottom-slots label="Password">
      <template v-slot:prepend>
        <q-icon name="lock" color="white" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="password = ''" class="cursor-pointer" color="white" />
      </template>
    </q-input>
    <q-btn @click="login" size="md" class="full-width" rounded label="Sign up or Log in" outline color="teal" no-caps />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useTodoStore } from 'src/stores/todo-store'
import { useRouter } from 'vue-router'

const todoStore = useTodoStore()
const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  await todoStore.login(email.value, password.value)
  console.log(todoStore.status)
  if (todoStore.status === true) {
    router.push({ path: 'index' })
  }
}
</script>
