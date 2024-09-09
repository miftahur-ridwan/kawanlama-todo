<script lang="ts" setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="show"
        id="modal-backdrop"
        class="fixed inset-0 bg-opacity-40 bg-slate-900 flex justify-center items-center z-50"
        @click.self="$emit('close')"
      >
        <div
          id="modal"
          class="bg-slate-50 rounded-3xl overflow-x-auto w-2/6 h-auto"
        >
          <header
            id="modal-header"
            class="px-4 py-6 flex justify-between items-center border-b border-slate-200"
          >
            <slot name="header">
              <h2 class="text-lg font-bold">
                Header Modal
              </h2>
            </slot>
            <button
              type="button"
              class="p-2 bg-gray-300 rounded-full flex items-center hover:bg-gray-400"
              @click="$emit('close')"
            >
              <Icon name="mdi:remove-bold" />
            </button>
          </header>

          <section id="modal-body" class="px-4 py-6">
            <slot name="body" />
          </section>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
