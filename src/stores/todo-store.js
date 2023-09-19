import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [],
    completedTasks: [],
    openDrawer: false,
    linksList: [
      {
        id: 0,
        title: 'All Tasks',
        icon: 'apps',
        link: '/#/'
      },
      {
        id: 1,
        title: 'Personal',
        icon: 'home',
        link: '/#/'
      },
      {
        id: 2,
        title: 'Work',
        icon: 'description',
        link: '/#/about'
      },
      {
        id: 3,
        title: 'Shopping',
        icon: 'smartphone',
        link: '/#/contact'
      },
      {
        id: 4,
        title: 'Add List',
        icon: 'playlist_add',
        link: '/#/contact'
      }
    ]
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
    // async getUnCompletedTask () {
    //   await api.get('/api/tasks').then((response) => {
    //     return response.data.data
    //   })
    // }
  },
  actions: {
    deleteTodo (index) {
      this.todos.splice(index, 1)
    },
    async getTasks () {
      await api.get('/api/tasks').then((response) => {
        this.tasks.value = response.data.data
      })
    },
    async getCompletedTasks () {
      await api.get('/api/completed').then((response) => {
        this.completedTasks.value = response.data.data
      })
    }
  }
})
