<script setup lang="ts">
import type { Todo } from '~/types/todo.ts'

const { data: todos, refresh } = await useFetch('/api/todos')

const editingTodo = ref<Todo | null>(null)

const authStore = useAuthStore()
const { loggedIn } = storeToRefs(authStore)

watch(loggedIn, async (newVal) => {
  if (newVal === true) {
    await refresh()
  }
})

async function addTodo(todo: Todo) {
  try {
    await $fetch('/api/todos', {
      method: 'POST',
      body: todo,
    })
    useToastify('Add todo success!', {
      type: 'success',
    })
    await refresh()
  }
  catch (err: any) {
    if (err?.data?.message) {
      useToastify(err?.data?.message, {
        type: 'error',
      })
    }
    else {
      // eslint-disable-next-line no-console
      console.log('Error: ', err)
      useToastify('Something wrong, try again!', {
        type: 'error',
      })
    }
  }
}

async function updateTodo(updatedTodo: Todo) {
  try {
    await $fetch(`/api/todos/${updatedTodo.id}`, {
      method: 'PUT',
      body: updatedTodo,
    })
    await refresh()
    useToastify('Edit todo success!', {
      type: 'success',
    })
    editingTodo.value = null
  }
  catch (err: any) {
    if (err?.data?.message) {
      useToastify(err?.data?.message, {
        type: 'error',
      })
    }
    else {
      // eslint-disable-next-line no-console
      console.log('Error: ', err)
      useToastify('Something wrong, try again!', {
        type: 'error',
      })
    }
  }
}

async function deleteTodo(todoId: number) {
  try {
    await $fetch(`/api/todos/${todoId}`, {
      method: 'DELETE',
    })
    await refresh()
    useToastify('Delete todo success!', {
      type: 'success',
    })
  }
  catch (err: any) {
    if (err?.data?.message) {
      useToastify(err?.data?.message, {
        type: 'error',
      })
    }
    else {
      // eslint-disable-next-line no-console
      console.log('Error: ', err)
      useToastify('Something wrong, try again!', {
        type: 'error',
      })
    }
  }
}

function startEditing(todo: Todo | null) {
  if (todo?.status === 'Unmarked') {
    editingTodo.value = todo
  }
  else {
    useToastify('Only Unmarked todos can be edited!', {
      type: 'error',
    })
  }
}

function cancelEdit() {
  editingTodo.value = null
}
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24 bg-slate-100">
    <section class="bg-white w-full max-w-4xl mx-auto shadow-md rounded-md">
      <div class="p-6 border-b border-slate-200">
        <AppHeader />
      </div>
      <div v-if="loggedIn" class="p-6 border-b border-slate-200">
        <TodoForm
          :todo-to-edit="editingTodo"
          @add-todo="addTodo"
          @update-todo="updateTodo"
          @cancel-edit="cancelEdit"
        />
      </div>
      <div class="p-6">
        <div v-if="!loggedIn" class="min-h-52 flex flex-col items-center justify-center space-y-4">
          <Icon name="mdi:lock-alert" size="40" />
          <p class="text-lg font-bold text-center">
            You must be logged in to access this page!
          </p>
        </div>
        <div v-else>
          <TodoList
            :todos="todos"
            @update-todo="updateTodo"
            @delete-todo="deleteTodo"
            @edit-todo="startEditing"
          />
        </div>
      </div>
    </section>
  </main>
</template>
