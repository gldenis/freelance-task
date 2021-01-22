import {createStore} from 'vuex'
import {api} from './api/api'

export const store = createStore({
  state() {
    return {
      tasks: api.getAllTasks() || []
    }
  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    activeTasksLength(state) {
      if (state.tasks.length) {
        return state.tasks.filter(task => task.status === 'active').length
      }
    }
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    createTask(state, taskData) {
      state.tasks.push(taskData)
    },
    editTask(state, newData) {
      const idx = state.tasks.findIndex((task => task.id === newData.id))
      state.tasks[idx] = {
        ...state.tasks[idx],
        ...newData
      }
    }
  },
  actions: {
    getAllTasks({commit}) {
      const tasks = api.getAllTasks()
      commit('setTasks', tasks)
    },
    createTask({commit}, taskData) {
      api.createTask(taskData)
      commit('createTask', taskData)
    },
    editTask({commit}, newData) {
      api.editTask(newData)
      commit('editTask', newData)
    }
  }
})
