<template>
  <q-list>
    <q-item v-for="(todo, index) in todoStore.todos" :key="todo.id" tag="label" v-ripple style="border-bottom: 1px solid #ccc;">
      <q-item-section avatar>
        <q-checkbox v-model="todo.is_completed" val="teal" color="cyan" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ todo.name }}</q-item-label>
      </q-item-section>
      <div>
      <q-fab color="cyan" text-color="black" icon="keyboard_arrow_left" direction="left">
        <template v-slot:label="{ opened }">
          <div :class="{ 'example-fab-animate--hover': opened !== true }">
            {{ opened !== true ? 'Open' : 'Close' }}
          </div>
        </template>

        <q-fab-action color="primary" @click="todoStore.deleteTodo(index)" icon="delete" />
        <q-fab-action color="secondary" icon="edit" />
      </q-fab>
    </div>
    </q-item>
  </q-list>
</template>

<script setup>
import { useTodoStore } from 'src/stores/todo-store'

const todoStore = useTodoStore()

</script>
