<script setup lang="ts">
import { withDefaults } from 'vue';

// Define the props with types
type Variant = 'primary' | 'secondary' | 'outline' | 'inherit';
type Size = 'sm' | 'base' | 'lg';

const props = withDefaults(defineProps<{
  text?: string;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  iconLeft?: string | string[];
  iconRight?: string | string[];
}>(), {
  variant: 'primary',
  size: 'base'
});

// Style mappings
const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white border border-solid border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:ring-blue-300",
  secondary: "bg-zinc-900 text-white border border-solid border-zinc-900 hover:bg-zinc-800 hover:border-zinc-800 focus:ring-zinc-300",
  outline: "bg-white text-zinc-900 border border-solid border-zinc-300 hover:bg-zinc-100 focus:ring-zinc-300",
  inherit: "bg-white text-zinc-700 border border-solid border-white hover:bg-zinc-100 focus:ring-zinc-300",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-[8px] text-sm leading-[19px]",
  base: "px-5 py-[9.5px] text-sm leading-[19px]",
  lg: "px-5 py-[11.5px] text-base leading-[23px]",
};

// Accessing the values using props, which have types now
const variantClass = variants[props.variant];
const sizeClass = sizes[props.size];
</script>

<template>
  <button
    type="button"
    class="flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium focus:ring-4"
    :class="[variantClass, sizeClass]"
  >
    <span v-if="text">{{ text }}</span>
  </button>
</template>