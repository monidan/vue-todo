<template>
  <div :title="type === 'times' ? 'Close' : type.slice(0, 1).toUpperCase() + type.slice(1, type.length)">
    <font-awesome-icon :icon="type"/>
  </div>
</template>

<script>
  export default {
    props: ['type']
  }
</script>

<style>

</style>
