<template>
  <form
    class="card"
    @submit.prevent="createTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input
        type="text"
        id="title"
        v-model="title">
    </div>
    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input
        type="date"
        id="date"
        v-model="date">
    </div>
    <div class="form-control">
      <label for="description">Описание</label> <textarea
      id="description"
      v-model="description"></textarea>
    </div>
    <button
      :disabled="!submitAllow"
      class="btn primary">Создать
    </button>
  </form>
</template>
<script>
  import {ref, computed} from 'vue'
  import {useStore} from 'vuex'
  import {useRouter} from 'vue-router'
  import {v4 as uuidv4} from 'uuid'

  export default {
    setup() {
      const title = ref('')
      const date = ref('')
      const description = ref('')

      const store = useStore()
      const router = useRouter()

      function createTask() {
        if (submitAllow) {
          store.dispatch('createTask', {
            id: uuidv4(),
            title: title.value,
            date: date.value,
            status: new Date(date.value) > new Date() ? 'active' : 'canceled',
            description: description.value
          })

          title.value = ''
          date.value = ''
          description.value = ''

          router.push('/')

        } else {
          alert('Заполните форму')
        }
      }

      const submitAllow = computed(() => {
        return title.value && date.value && description.value
      })

      return {
        title,
        date,
        description,
        submitAllow,
        createTask
      }
    }
  }
</script>
