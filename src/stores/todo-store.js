import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [],
    lists: [],
    username: '',
    status: false,
    completedTasks: [],
    openDrawer: false,
    errors: [],
    loginError: '',
    userEmail: '',
    userId: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async getTasks () {
      await api.get('/api/tasks').then((response) => {
        this.tasks.value = response.data.data
      })
    },
    async getCompletedTasks () {
      await api.get('/api/completed').then((response) => {
        this.completedTasks.value = response.data.data
      })
    },
    async getLists () {
      await api.get('/api/list_id/' + this.userId).then((response) => {
        this.lists.value = response.data.data
      })
    },
    async getTasksByList (listId) {
      await api.get('/api/list_tasks/' + listId).then((response) => {
        this.tasks.value = response.data.data
        this.errors.value = response
        console.log(response)
      })
    },
    async getTasksCompletedByList (listId) {
      await api.get('/api/list_tasks_completed/' + listId).then((response) => {
        this.completedTasks.value = response.data.data
      })
    },
    addList (name) {
      const bodyFormData = new FormData()
      bodyFormData.append('user_id', 1)
      bodyFormData.append('name', name)

      api.post('/api/lists', bodyFormData)
        .then(response => {
          if (response.statusText === 'Created') {
            this.lists.value.push(response.data.data)
          }
        })
    },
    addTask (name, todoListId, dueDate) {
      const bodyFormData = new FormData()
      bodyFormData.append('user_id', 1)
      bodyFormData.append('todo_list_id', Number(todoListId))
      bodyFormData.append('name', name)
      bodyFormData.append('due_date', dueDate)
      console.log(dueDate)
      api.post('/api/tasks', bodyFormData)
        .then(response => {
          if (response.statusText === 'Created') {
            this.getTasksByList(response.data.data.todo_list_id)
            console.log(response.data.data)
          }
        })
    },
    deleteTask (taskId) {
      api.delete('/api/tasks/' + taskId).then((response) => {
        console.log(response.data.data)
        this.getTasksByList(response.data.data.todo_list_id)
      })
    },
    updateTask (task, name, dueDate, listId) {
      console.log(task)
      const date = dueDate.split(' ')
      api.put('/api/tasks/' + task.id + '?user_id=1&due_date=' + date[0] + '&todo_list_id=' + listId + '&name=' + name).then((response) => {
        this.getTasksByList(response.data.data.todo_list_id)
      })
    },
    async login (email, password) {
      const bodyFormData = new FormData()
      bodyFormData.append('email', email)
      bodyFormData.append('password', password)
      await api.post('/api/login', bodyFormData)
        .then(response => {
          console.log(response.data.login)
          if (response.data.login === true) {
            this.status = true
            this.userEmail = response.data.email
            this.userId = response.data.id
          } else if (response.data.login === false) {
            this.loginError = response.data.error
          }
          console.log(response)
        })
    }
  }
})
