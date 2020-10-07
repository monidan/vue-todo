<template>
  <div class="edit-modal-window">
    <div class="edit-modal__inner">
      <div class="edit-modal__bookmark">
        <div class="edit-modal__header">
          <h2>{{bookmark.title}}</h2>
          <Button type="times"/>
        </div>
        <div class="edit-modal__todos">

        </div>
      </div>
      <div class="edit-modal__buttons">
        <Button type="save" @click="$emit('close')"/>
        <Button type="undo"/>
        <Button type="trash"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from "./Button";

  export default {
    props: ['bookmark'],
    components: {
      Button,
    },
    methods: {

    }
  }
</script>

<style>
  .edit-modal-window{
    width: 50%;
    margin: 0 auto;

    background-color: white;
    border: 1px solid black;
    z-index: 10;
  }
</style>
