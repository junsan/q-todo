<template>
    <q-drawer
      v-model="todoStore.openDrawer"
      show-if-above
      bordered
      style="background-color:  #1976d261; color: #333; padding-top: 50px;"
    >
      <q-list >
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

  <q-list>
    <q-item v-for="(todo, index) in todoStore.todos" :key="todo.id" tag="label" v-ripple style="border-bottom: 1px solid #ccc;" @click.prevent="openEditModal(todo, index)">
      <q-item-section avatar>
        <q-btn @click.stop round color="secondary" icon="check" />
      </q-item-section>
      <q-item-section>
        <q-item-label style="font-size: 16px;">{{ todo.name }}</q-item-label>
        <q-item-label style="font-size: 12px; color: #aaa" v-if="todo.date">{{ todo.date }}</q-item-label>
      </q-item-section>
      <div>
        <q-fab @click.stop @keypress.stop color="cyan" text-color="black" icon="keyboard_arrow_left" direction="left">
          <q-fab-action color="primary" @click="todoStore.deleteTodo(index)" icon="delete" />
          <q-fab-action color="secondary" @click="openEditModal(todo, index)" icon="edit" />
        </q-fab>
      </div>
    </q-item>
  </q-list>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="blue" @click="addModal = true" />
  </q-page-sticky>

  <q-dialog
      v-model="addModal"
    >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Add Task</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled bottom-slots v-model="task" placeholder="Add task here" counter maxlength="100" >
          <template v-slot:before>
            <q-icon name="event" />
          </template>

          <template v-slot:append>
            <q-btn @click="addTask" round dense flat icon="add" style="background-color: #1976D2; color: white"  />
          </template>
        </q-input>

        <!-- Date -->
        <div class="q-pa-md" style="max-width: 300px">
          <label>Due Date</label>
          <q-input filled v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

      </q-card-section>

      <q-card-actions align="right" class="bg-cyan text-white">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog
      v-model="editModal"
    >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Edit Task</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled bottom-slots v-model="editInputTask" counter maxlength="100" >
          <template v-slot:before>
            <q-icon name="event" />
          </template>

          <template v-slot:append>
            <q-btn @click="editTask" round dense flat icon="save" style="background-color: #1976D2; color: white; padding: 2px;" />
          </template>
        </q-input>

         <!-- Date -->
         <div class="q-pa-md" style="max-width: 300px">
            <label>Due Date</label>
            <q-input filled v-model="editDateTask" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="editDateTask">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
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
import EssentialLink from 'components/EssentialLink.vue'

console.log(useTodoStore.openDrawer)

const linksList = [
  {
    title: 'Home',
    caption: 'quasar.dev',
    icon: 'home',
    link: '/#/'
  },
  {
    title: 'About',
    caption: 'github.com/quasarframework',
    icon: 'description',
    link: '/#/about'
  },
  {
    title: 'Contact',
    caption: 'chat.quasar.dev',
    icon: 'smartphone',
    link: '/#/contact'
  }
]

const todoStore = useTodoStore()

const addModal = ref(false)
const editModal = ref(false)
const editInputTask = ref('')
const editDateTask = ref('')
const index = ref(null)
const date = ref('2023/09/01')

const task = ref('')

const addTask = () => {
  let tasks = {
    id: Math.floor(Math.random() * 100),
    name: task.value,
    date: date.value,
    is_completed: false
  }

  todoStore.todos.push(tasks)
  addModal.value = false
  task.value = ''
  tasks = {}
}

const openEditModal = (todo, i) => {
  index.value = i
  editModal.value = true
  editInputTask.value = todo.name
  editDateTask.value = todo.date
}

const editTask = () => {
  todoStore.todos[index.value].name = editInputTask.value
  todoStore.todos[index.value].date = editDateTask.value
  editModal.value = false
}

</script>
