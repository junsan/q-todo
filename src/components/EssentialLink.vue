<template>
  <q-item
    clickable
    tag="a"
    :href="link"
    @click.prevent="$emit('showTasks', id)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label style="color: #fff;">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-separator />
</template>

<script setup>
defineEmits(['showTasks'])

defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: '#'
  },
  icon: {
    type: String,
    default: ''
  }
})

</script>
