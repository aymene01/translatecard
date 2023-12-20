import { Meta, StoryObj } from '@storybook/vue3'

import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'outline', 'inherit'] },
    },
    size: {
      control: { type: 'select', options: ['sm', 'base', 'lg'] },
    },
    text: {
      control: 'text',
    },
    loading: {
      control: 'boolean',
    },
    iconLeft: {
      control: 'text',
    },
    iconRight: {
      control: 'text',
    },
  },
  args: {
    variant: 'primary',
    size: 'base',
    text: 'Button',
    loading: false,
    iconLeft: '',
    iconRight: '',
  },
}

export default meta

type ButtonStory = StoryObj<typeof meta>

export const Primary: ButtonStory = {
  args: {
    ...meta.args,
    variant: 'primary',
  },
}

export const Secondary: ButtonStory = {
  args: {
    ...meta.args,
    variant: 'secondary',
  },
}

export const Large: ButtonStory = {
  args: {
    ...meta.args,
    size: 'lg',
  },
}

export const Small: ButtonStory = {
  args: {
    ...meta.args,
    size: 'sm',
  },
}

