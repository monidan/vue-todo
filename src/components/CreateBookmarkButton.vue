<template>
  <div class="new-bookmark-button">
    <a href="" class="new-bookmark-button__inner">
      New bookmark
    </a>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .new-bookmark-button{
    padding: 5px;
    margin-top: 10px;
  }
  .new-bookmark-button__inner{
    display: inline-block;
    background-color: rgba(254, 74, 73, 0.8);
    padding: 10px 15px;

    text-transform: uppercase;
    transition: all .2s;

    border-radius: 4px;

    font-family: 'Arial', sans-serif;
    color: #D7FDF0;
    font-size: 15px;
  }
  .new-bookmark-button__inner:hover{
    opacity: 0.9;
  }
</style>
