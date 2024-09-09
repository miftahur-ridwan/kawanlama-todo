<script lang="ts" setup>
import type { Todo } from '~/types/todo.ts'

const props = defineProps({
  todoToEdit: {
    type: Object as PropType<Todo | null>,
    default: () => null,
  },
})
const emit = defineEmits(['addTodo', 'updateTodo', 'cancelEdit'])
const subject = ref('')
const description = ref('')

const isEditing = computed(() => !!props.todoToEdit)

watch(() => props.todoToEdit, (newTodo) => {
  if (newTodo) {
    subject.value = newTodo.subject
    description.value = newTodo.description
  }
  else {
    subject.value = ''
    description.value = ''
  }
}, { immediate: true })

function submitForm() {
  const todoData = {
    subject: subject.value,
    description: description.value,
  }

  if (isEditing.value) {
    emit('updateTodo', { ...props.todoToEdit, ...todoData })
  }
  else {
    emit('addTodo', todoData)
  }

  subject.value = ''
  description.value = ''
}

function cancelEdit() {
  emit('cancelEdit')
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-2">
      {{ isEditing ? 'Edit' : 'Add' }} Todo
    </h2>
    <form class="space-y-2" @submit.prevent="submitForm">
      <input
        v-model="subject"
        type="text"
        placeholder="Subject"
        required
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
      <textarea
        v-model="description"
        placeholder="Description"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      <div>
        <BaseButton
          type="submit"
        >
          {{ isEditing ? 'Update' : 'Add' }} Todo
        </BaseButton>
        <BaseButton
          v-if="isEditing"
          type="button"
          variant="light"
          class="ml-2"
          @click="cancelEdit"
        >
          Cancel
        </BaseButton>
      </div>
    </form>
  </div>
</template>
