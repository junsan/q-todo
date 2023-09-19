<template>
  <q-item
    clickable
    tag="a"
    @click.prevent="$emit('showTasks', id, title)"
  >
    <q-item-section
      avatar
    >
      <q-icon name="playlist_add" />
    </q-item-section>

    <q-item-section>
      <q-item-label style="color: #fff;">{{ name }}</q-item-label>
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
  name: {
    type: String,
    required: true
  }
})

</script>
