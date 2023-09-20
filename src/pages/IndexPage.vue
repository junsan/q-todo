<template>
    <q-drawer
      v-model="todoStore.openDrawer"
      show-if-above
      bordered
      style="background-color: rgb(25 121 215 / 64%); color: #fff; padding-top: 50px; font-size: 18px;"
    >
      <q-list >
        <EssentialLink
          v-for="link in todoStore.lists.value"
          :key="link.name"
          v-bind="link"
          @showTasks="showTasks"
        />
        <q-item
          clickable
          tag="a"
          @click.prevent="prompt = true"
        >
          <q-item-section
            avatar
          >
            <q-icon name="add" />
          </q-item-section>

          <q-item-section>
            <q-item-label style="color: #fff;">Add List</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  <h4 style="margin: 15px; color: #333">{{ subtitle }}</h4>
  <q-list>
    <q-item v-for="(todo, index) in todos" :key="todo.id" tag="label" v-ripple style="border-bottom: 1px solid #ccc;" @click.prevent="openEditModal(todo, index)">
      <q-item-section avatar>
        <q-btn @click.stop round color="secondary" icon="check" />
      </q-item-section>
      <q-item-section>
        <q-item-label style="font-size: 16px;">{{ todo.name }}</q-item-label>
        <q-item-label style="font-size: 12px; color: #aaa" v-if="todo.due_date">Due Date: {{ todo.due_date }}</q-item-label>
      </q-item-section>
      <div>
        <q-fab @click.stop @keypress.stop color="cyan" text-color="black" icon="keyboard_arrow_left" direction="left">
          <q-fab-action color="primary" @click="todoStore.deleteTodo(index)" icon="delete" />
          <q-fab-action color="secondary" @click="openEditModal(todo, index)" icon="edit" />
        </q-fab>
      </div>
    </q-item>
  </q-list>
  <q-page-sticky position="bottom-right" :offset="[18, 18]" style="z-index: 999;">
    <q-btn fab icon="add" color="blue" @click="addTaskModal" />
  </q-page-sticky>

  <!-- Add Task -->
  <q-dialog
      v-model="addModal"
    >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Add Task</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled bottom-slots v-model="task" placeholder="Add task here" counter maxlength="100" >
        </q-input>

        <!-- Add Date -->
        <div style="max-width: 300px">
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
        <label>Add Lists</label>
        <q-select standout="bg-teal text-white" v-model="selectedList" :options="options" />
        <br>
      </q-card-section>

      <q-card-actions align="right" class="bg-cyan text-white">
        <q-btn flat label="Close" v-close-popup />
        <q-btn flat @click="addTask" label="Save" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Edit Modal -->
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
          <q-select standout="bg-teal text-white" v-model="editSelectedList" :options="options" />
        </q-card-section>
      <q-card-actions align="right" class="bg-cyan text-white">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Add List -->
  <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">ADD LIST</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="titleList" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn @click="addList" flat label="Save" v-close-popup />
        </q-card-actions>
      </q-card>
  </q-dialog>
  <br><br>
  <!-- Completed Task -->
  <h4 style="margin: 15px; color: #aaa">Completed</h4>
  <q-list>
    <q-item v-for="(todo, index) in completedTasks" :key="todo.id" tag="label" v-ripple style="border-bottom: 1px solid #ccc;" @click.prevent="openEditModal(todo, index)">
      <q-item-section avatar>
        <q-btn @click.stop round color="white" class="text-black" icon="close" />
      </q-item-section>
      <q-item-section>
        <q-item-label style="font-size: 16px; color: #aaa; text-decoration: line-through;">{{ todo.name }}</q-item-label>
        <q-item-label style="font-size: 12px; color: #aaa" v-if="todo.due_date">Completed Date: {{ todo.due_date }}</q-item-label>
      </q-item-section>
      <div>
        <q-fab @click.stop @keypress.stop color="white" text-color="black" icon="keyboard_arrow_left" direction="left">
          <q-fab-action color="primary" @click="todoStore.deleteTodo(index)" icon="delete" />
          <q-fab-action color="secondary" @click="openEditModal(todo, index)" icon="edit" />
        </q-fab>
      </div>
    </q-item>
  </q-list>
  <RouterLink :to="'/login'">Login</RouterLink>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from 'src/stores/todo-store'
import EssentialLink from 'components/EssentialLink.vue'

const todoStore = useTodoStore()
const options = ref([])
const addModal = ref(false)
const editModal = ref(false)
const editInputTask = ref('')
const editDateTask = ref('')
const index = ref(null)
const date = ref(null)
const selectedList = ref(0)
const editSelectedList = ref(0)
const list = ref(0)
const titleList = ref('')
const prompt = ref(false)
const task = ref('')
const todos = ref([])
const completedTasks = ref([])
const subtitle = ref('Today')

onMounted(async () => {
  await todoStore.getTasks()
  todos.value = todoStore.tasks.value
  console.log(todos.value)
})

onMounted(async () => {
  await todoStore.getCompletedTasks()
  completedTasks.value = todoStore.completedTasks.value
})

onMounted(async () => {
  await todoStore.getLists()
  todoStore.lists.value.forEach(list => {
    options.value.push({ label: list.name, value: list.id })
  })
})

const showTasks = async (listId, title) => {
  await todoStore.getTasksByList(listId)
  todos.value = todoStore.tasks.value
  await todoStore.getTasksCompletedByList(listId)
  completedTasks.value = todoStore.completedTasks.value

  todoStore.openDrawer = false
  subtitle.value = title
  list.value = listId
}

const addList = () => {
  todoStore.addList(titleList.value)
  titleList.value = ''
}

const addTaskModal = () => {
  addModal.value = true
  selectedList.value.value = list.value
  console.log(options.value)
}

const addTask = () => {
  console.log(date.value)
  todoStore.addTask(task.value, selectedList.value.value, date.value)
  addModal.value = false
  task.value = ''
}

const openEditModal = (todo, i) => {
  index.value = i
  editModal.value = true
  editInputTask.value = todo.name
  editDateTask.value = todo.date
  const x = options.value.filter(option => {
    return option.value === todo.list_id
  })
  editSelectedList.value = x[0].label
}

const editTask = () => {
  todoStore.todos[index.value].name = editInputTask.value
  todoStore.todos[index.value].date = editDateTask.value
  todoStore.todos[index.value].list_id = editSelectedList.value.value
  editModal.value = false
  if (list.value === 0) todos.value = todoStore.todos
  else todos.value = todoStore.todos.filter(todo => todo.list_id === list.value)
}

</script>
