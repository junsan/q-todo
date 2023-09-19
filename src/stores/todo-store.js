import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
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
  },
  actions: {
    deleteTodo (index) {
      this.todos.splice(index, 1)
    },
    async getTasks () {
      api.get('/api/tasks').then((response) => {
        this.todos.value = response.data.data
      })
    }
  }
})
