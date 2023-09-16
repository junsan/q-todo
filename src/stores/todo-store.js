import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      {
        id: 1,
        name: 'Todo 1',
        date: '',
        is_completed: false
      },
      {
        id: 2,
        name: 'Todo 2',
        date: '2023/03/01',
        is_completed: true
      }
    ],
    openDrawer: false
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
