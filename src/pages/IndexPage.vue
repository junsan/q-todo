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
          style="border-bottom:  1px rgb(25 121 215 / 64%) solid;"
          @click.prevent="showCompletedTask"
        >
          <q-item-section
            avatar
          >
            <q-icon name="playlist_add" />
          </q-item-section>

          <q-item-section>
            <q-item-label style="color: #fff;">Completed</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          @click.prevent="prompt = true"
          style="border-bottom:  1px rgb(25 121 215 / 64%) solid;"
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
        <q-item
          clickable
          tag="a"
          @click.prevent="logout"
          style="border-bottom:  1px rgb(25 121 215 / 64%) solid;"
        >
          <q-item-section
            avatar
          >
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label style="color: #fff;">Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  <h4 style="margin: 15px; color: #333">{{ subtitle }}</h4>
  <q-list v-if="subtitle !== 'Completed'">
    <q-item v-for="(todo, index) in todoStore.tasks.value" :key="todo.id" tag="label" v-ripple style="border-bottom: 1px solid #ccc;" @click.prevent>
      <q-item-section avatar>
        <q-btn @click.stop="completeTask(todo.id)" round color="secondary" icon="check" />
      </q-item-section>
      <q-item-section>
        <q-item-label style="font-size: 16px;">{{ todo.name }}</q-item-label>
        <q-item-label style="font-size: 12px; color: #aaa" v-if="todo.due_date">Due Date: {{ todo.due_date }}</q-item-label>
      </q-item-section>
      <div>
        <q-fab @click.prevent @keypress.prevent color="cyan" text-color="black" icon="keyboard_arrow_left" direction="left">
          <q-fab-action color="primary" @click="todoStore.deleteTask(todo.id)" icon="delete" />
          <q-fab-action color="secondary" @click="openEditModal(todo, index)" icon="edit" />
        </q-fab>
      </div>
    </q-item>
  </q-list>
  <q-page-sticky v-if="subtitle !== 'Completed'" position="bottom-right" :offset="[18, 18]" style="z-index: 999;">
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
        <!-- <div style="max-width: 300px">
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
        </div> -->
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
        </q-input>

         <!-- Date -->
         <!-- <div style="max-width: 300px">
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
          </div> -->
          <label>Edit List</label>
          <q-select standout="bg-teal text-white" v-model="editSelectedList" :options="options" />
        </q-card-section>
      <q-card-actions align="right" class="bg-cyan text-white">
        <q-btn flat label="Close" v-close-popup />
        <q-btn flat @click="editTask" label="Save" />
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
  <!-- Completed Task -->
  <q-list v-if="subtitle === 'Completed'">
    <q-item v-for="todo in todoStore.completedTasks.value" :key="todo.id" tag="label" v-ripple style="border-bottom: 1px solid #ccc;" @click.prevent>
      <q-item-section avatar>
        <q-btn @click.prevent="unCompleteTask(todo.id)" round color="white" class="text-black" icon="close" />
      </q-item-section>
      <q-item-section>
        <q-item-label style="font-size: 16px; color: #aaa; text-decoration: line-through;">{{ todo.name }}</q-item-label>
        <q-item-label style="font-size: 12px; color: #aaa" v-if="todo.due_date">Completed Date: {{ todo.due_date }}</q-item-label>
      </q-item-section>
      <div>
        <q-fab @click.prevent @keypress.prevent color="white" text-color="black" icon="keyboard_arrow_left" direction="left">
          <q-fab-action color="primary" @click="todoStore.deleteTask(todo.id)" icon="delete" />
        </q-fab>
      </div>
    </q-item>
  </q-list>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from 'src/stores/todo-store'
import EssentialLink from 'components/EssentialLink.vue'
import { Cookies } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()
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
const subtitle = ref('General')
const editData = ref(null)

const unCompleteTask = async (taskId) => {
  await todoStore.unCompleteTask(taskId)
}

const completeTask = async (taskId) => {
  await todoStore.completeTask(taskId)
}

onMounted(async () => {
  await todoStore.getTasksByList(todoStore.generalId)
})

onMounted(async () => {
  await todoStore.getLists()
  todoStore.lists.value.forEach(list => {
    options.value.push({ label: list.name, value: list.id })
  })
  list.value = todoStore.generalId
})

const showTasks = async (listId, title) => {
  await todoStore.getTasksByList(listId)
  todos.value = todoStore.tasks.value

  todoStore.openDrawer = false
  subtitle.value = title
  list.value = listId
}

const showCompletedTask = async () => {
  await todoStore.getTasksCompleted()
  console.log(todoStore.completedTasks.value)
  subtitle.value = 'Completed'
  todoStore.openDrawer = false
}

const addList = async () => {
  await todoStore.addList(titleList.value)
  options.value = []
  todoStore.lists.value.forEach(list => {
    options.value.push({ label: list.name, value: list.id })
  })
  titleList.value = ''
}

const addTaskModal = () => {
  addModal.value = true
  selectedList.value = { value: list.value, label: subtitle.value }
  console.log(options.value)
}

const addTask = () => {
  let dueDate = date.value
  if (date.value !== null) {
    dueDate = date.value.replaceAll('/', '-')
  }
  todoStore.addTask(task.value, selectedList.value.value, dueDate)
  addModal.value = false
  task.value = ''
  subtitle.value = selectedList.value.label
}

const openEditModal = (todo, i) => {
  index.value = i
  editData.value = todo
  editModal.value = true
  editInputTask.value = todo.name
  editDateTask.value = todo.due_date
  const editList = options.value.filter(option => {
    return option.value === todo.todo_list_id
  })
  editSelectedList.value = editList[0]
}

const editTask = () => {
  todoStore.updateTask(editData.value, editInputTask.value, editDateTask.value, editSelectedList.value.value)
  editModal.value = false
  subtitle.value = editSelectedList.value.label
}

const logout = () => {
  Cookies.remove('user')
  Cookies.remove('email')
  todoStore.status = false
  todoStore.userEmail = ''
  window.localStorage.clear()
  router.push({ path: '/login' })
}
</script>
