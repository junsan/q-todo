import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      {
        id: 1,
        list_id: 1,
        name: 'Todo 1',
        date: '',
        is_completed: false
      },
      {
        id: 2,
        name: 'Todo 2',
        list_id: 1,
        date: '2023/03/01',
        is_completed: true
      },
      {
        id: 3,
        name: 'Todo 3',
        list_id: 2,
        date: '2023/03/21',
        is_completed: false
      }
    ],
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
    }
  }
})
