<template>
  <h1
    v-if="tasks.length === 0"
    class="text-white center">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{activeTasksLength}}</h3>
    <div class="card flex">
      <div
        v-for="filter in filters"
        :class="['btn', {primary: currentFilter === filter.type}]"
        @click="currentFilter = filter.type">{{filter.text}}
      </div>
    </div>
    <div
      class="card"
      v-for="task in filteredTasks"
      :key="task.id">
      <h2 class="card-title">
        {{task.title}}
        <AppStatus :type="task.status"/>
      </h2>
      <p>
        <strong> <small> {{new Date(task.date).toLocaleDateString()}} </small>
        </strong>
      </p>
      <button
        class="btn primary"
        @click="$router.push(`/task/${task.id}`)">Посмотреть
      </button>
    </div>
  </template>
</template>
<script>
  import {computed, ref, onMounted} from 'vue'
  import {useStore} from 'vuex'
  import AppStatus from '../components/AppStatus'

  export default {
    components: {AppStatus},
    setup() {
      const store = useStore()
      const currentFilter = ref('all')

      const filters = [
        {type: 'all', text: 'Все'},
        {type: 'active', text: 'Активные'},
        {type: 'pending', text: 'Выполняються'},
        {type: 'canceled', text: 'Отмененные'},
        {type: 'done', text: 'Завершенные'}
      ]

      const tasks = computed(() => {
        return store.getters.tasks
      })

      const activeTasksLength = computed(() => {
        return store.getters.activeTasksLength
      })

      onMounted(() => {
        store.dispatch('getAllTasks')
      })

      const filteredTasks = computed(() => {
        if (currentFilter.value === 'all') {
          return tasks.value
        } else {
          return tasks.value.filter(task => task.status === currentFilter.value)
        }
      })

      return {
        tasks,
        activeTasksLength,
        filters,
        currentFilter,
        filteredTasks
      }
    }
  }
</script>
<style
  lang="scss"
  scoped>
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
