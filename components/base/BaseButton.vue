<script lang="ts" setup>
type ButtonTypes = 'reset' | 'submit' | 'button'

const props = defineProps({
  type: {
    type: String as PropType<ButtonTypes>,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'normal',
  },
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const btnClass = computed(() => {
  return {
    'inline-flex align-middle align-items-center justify-center font-medium rounded-md focus:outline-none': true,
    'w-full': props.block === true,
    'cursor-not-allowed opacity-80': props.disabled === true,
    'px-4 py-2': props.size === 'normal',
    'px-2 py-1 text-sm': props.size === 'small',
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white'
    case 'success':
      return 'border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700 text-white'
    case 'warning':
      return 'border-yellow-600 bg-yellow-600 hover:bg-yellow-700 hover:border-yellow-700 text-white'
    case 'danger':
      return 'border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 text-white'
    case 'info':
      return 'border-cyan-600 bg-cyan-600 hover:bg-cyan-700 hover:border-cyan-700 text-white'
    case 'light':
      return 'border-gray-400 bg-gray-400 hover:bg-gray-500 hover:border-gray-500 text-white'
    default:
      return 'border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white'
  }
})
</script>

<template>
  <button
    :type="type"
    :class="[btnClass, variantClass]"
  >
    <slot />
  </button>
</template>
