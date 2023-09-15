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
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="blue" @click="medium = true" />
  </q-page-sticky>

  <q-dialog
      v-model="medium"
    >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Add Task</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled bottom-slots v-model="text" placeholder="Add task here" counter maxlength="100" :dense="dense">
          <template v-slot:before>
            <q-icon name="event" />
          </template>

          <template v-slot:append>
            <q-btn round dense flat icon="add" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right" class="bg-cyan text-white">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from 'src/stores/todo-store'

const todoStore = useTodoStore()

const medium = ref(false)

</script>
