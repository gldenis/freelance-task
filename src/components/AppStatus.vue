<template>
  <span :class="['badge', type.style]">{{type.text}}</span>
</template>
<script>
  import {computed} from 'vue'

  export default {
    props: {
      type: {
        type: String,
        required: true,
        default: 'canceled'
      }
    },
    setup(props) {
      const type = computed(() => {
        switch (props.type) {
          case 'active':
            return {style: 'primary', text: 'Активен'}
          case 'pending':
            return {style: 'warning', text: 'Выполняеться'}
          case 'canceled':
            return {style: 'danger', text: 'Отменен'}
          case 'done':
            return {style: 'primary', text: 'Завершен'}
        }
      })

      return {
        type
      }
    }
  }
</script>
