<script lang="ts" setup>
import type { StatusTodo, Todo } from '~/types/todo.ts'

defineProps({
  todos: {
    type: Array as PropType<Todo[]>,
    default: () => [],
  },
})

const emit = defineEmits(['updateTodo', 'deleteTodo', 'editTodo'])

function updateStatus(todo: Todo, newStatus: StatusTodo) {
  emit('updateTodo', { ...todo, status: newStatus })
}

function editTodo(todo: Todo) {
  emit('editTodo', todo)
}

function deleteTodo(todoId: number | undefined) {
  emit('deleteTodo', todoId)
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-2">
      Todo List
    </h2>
    <ul class="space-y-2">
      <li v-for="todo in todos" :key="todo.id" class="p-4 border rounded">
        <div class="flex flex-col sm:flex-row justify-between sm:items-center">
          <div class="font-bold">
            <p class="space-x-1">
              {{ todo.activitiesNo }}
              <span v-if="['Done', 'Canceled'].includes(todo.status)">-</span>
              <span
                v-if="['Done', 'Canceled'].includes(todo.status)"
                :class="{
                  'text-green-600': todo.status === 'Done',
                  'text-yellow-600': todo.status === 'Canceled',
                }"
              >
                {{ todo.status }}
              </span>
            </p>
            <p>
              {{ todo.subject }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <BaseButton
              v-if="todo.status === 'Unmarked'"
              variant="success"
              size="small"
              @click="updateStatus(todo, 'Done')"
            >
              <p class="flex items-center space-x-1">
                <Icon name="mdi:done" />
                <span>Done</span>
              </p>
            </BaseButton>
            <BaseButton
              v-if="todo.status === 'Unmarked'"
              variant="warning"
              size="small"
              @click="updateStatus(todo, 'Canceled')"
            >
              <p class="flex items-center space-x-1">
                <Icon name="mdi:cancel" />
                <span>Cancel</span>
              </p>
            </BaseButton>
            <BaseButton
              v-if="['Done', 'Canceled'].includes(todo.status)"
              variant="info"
              size="small"
              @click="updateStatus(todo, 'Unmarked')"
            >
              <p class="flex items-center space-x-1">
                <Icon name="mdi:undo-variant" />
                <span>Unmarked</span>
              </p>
            </BaseButton>
            <BaseButton
              v-if="todo.status === 'Unmarked'"
              variant="primary"
              size="small"
              @click="editTodo(todo)"
            >
              <p class="flex items-center space-x-1">
                <Icon name="mdi:edit" />
                <span>Edit</span>
              </p>
            </BaseButton>
            <BaseButton
              v-if="todo.status === 'Unmarked'"
              variant="danger"
              size="small"
              @click="deleteTodo(todo.id)"
            >
              <p class="flex items-center space-x-1">
                <Icon name="mdi:cancel-bold" />
                <span>Delete</span>
              </p>
            </BaseButton>
          </div>
        </div>
        <p class="whitespace-pre-line">
          {{ todo.description || '-' }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style>

</style>
