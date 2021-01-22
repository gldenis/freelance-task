<template>
  <div
    v-if="task"
    class="card">
    <h2>{{task.title}}</h2>
    <p><strong>Статус</strong>:
      <AppStatus :type="task.status"/>
    </p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString()}}
    </p>
    <p><strong>Описание</strong>: {{task.description}}</p>
    <div>
      <button
        class="btn"
        @click="changeStatus('pending')">Взять в работу
      </button>
      <button
        class="btn primary"
        @click="changeStatus('done')">Завершить
      </button>
      <button
        class="btn danger"
        @click="changeStatus('canceled')">Отменить
      </button>
    </div>
  </div>
  <h3
    v-else
    class="text-white center">
    Задачи с id = <strong>{{$route.params.id}}</strong> нет. </h3>
</template>
<script>
  import {computed} from 'vue'
  import {useStore} from 'vuex'
  import {useRoute} from 'vue-router'
  import AppStatus from '../components/AppStatus'

  export default {
    components: {AppStatus},
    setup() {
      const store = useStore()
      const route = useRoute()

      const id = route.params.id

      const task = computed(
        () => store.getters.tasks.find(item => item.id === id)
      )

      function changeStatus(status) {
        if (new Date(task.value.date) < new Date() && status === 'pending') {
          alert('Сроки прошли')
          return false
        }
        store.dispatch('editTask', {id, status})
      }

      return {
        task,
        changeStatus
      }
    }
  }
</script>
<style scoped></style>
