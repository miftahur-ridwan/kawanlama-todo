<script lang="ts" setup>
const isShowAuthModal = ref(false)
const typeAuthModal = ref('signin')
function toggleAuthModal() {
  isShowAuthModal.value = !isShowAuthModal.value
}
function toggleTypeAuthModal() {
  typeAuthModal.value = typeAuthModal.value === 'signin' ? 'signup' : 'signin'
}

const authInput = ref({
  username: '',
  password: '',
})
const isLoadingAuth = ref(false)
const authStore = useAuthStore()
const { loggedIn } = storeToRefs(authStore)
async function submitAuth() {
  try {
    isLoadingAuth.value = true
    if (typeAuthModal.value === 'signin') {
      await authStore.signIn(authInput.value)
    }
    if (typeAuthModal.value === 'signup') {
      await authStore.signUp(authInput.value)
    }
    useToastify(`${typeAuthModal.value === 'signin' ? 'Login' : 'Register'} success!`, {
      type: 'success',
    })
    authInput.value = {
      username: '',
      password: '',
    }
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
  finally {
    isLoadingAuth.value = false
    toggleAuthModal()
  }
}
</script>

<template>
  <div>
    <header class="flex items-center justify-between gap-4">
      <h1 class="text-xl font-bold">
        KawanLama Todo
      </h1>
      <BaseButton
        v-if="!loggedIn"
        @click="toggleAuthModal"
      >
        Login
      </BaseButton>
      <BaseButton
        v-else
        @click="authStore.clear()"
      >
        Logout
      </BaseButton>
    </header>

    <BaseModal v-if="!loggedIn" :show="isShowAuthModal" @close="toggleAuthModal">
      <template #header>
        <h2 class="text-lg font-bold">
          {{ typeAuthModal === 'signin' ? 'Login User' : 'Register User' }}
        </h2>
      </template>
      <template #body>
        <form
          class="space-y-4"
          action="#"
          @submit.prevent="submitAuth"
        >
          <div>
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              v-model="authInput.username"
              type="text"
              name="username"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Username"
              autocomplete="username"
              required
            >
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              v-model="authInput.password"
              type="password"
              name="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              autocomplete="off"
              required
            >
          </div>
          <BaseButton
            type="submit"
            block
          >
            {{ typeAuthModal === 'signin' ? 'Login' : 'Register' }}
          </BaseButton>
          <div class="text-center text-sm font-medium">
            <a
              class="text-blue-700 cursor-pointer hover:underline"
              @click="toggleTypeAuthModal"
            >
              {{ typeAuthModal === 'signin' ? 'Create account' : 'Have account' }}
            </a>
          </div>
        </form>
      </template>
    </BaseModal>
  </div>
</template>
