import {createRouter, createWebHistory} from 'vue-router'
import Tasks from './views/Tasks'
import New from './views/New'
import Task from './views/Task'

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    {path: '/', component: Tasks},
    {path: '/new', component: New},
    {
      path: '/task/:id',
      component: Task
    }
  ]
})
