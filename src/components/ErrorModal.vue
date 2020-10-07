<template>
  <transition name="modal-error">
    <div class="modal__background" v-if="showError">
      <div class="modal__error">
        <div class="modal__inner">
          <div class="modal__text">
            <h4>Error!</h4>
            <slot></slot>
          </div>
          <div class="modal__close-button"
               @click="closeError">
            Close
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'error',
    methods: {
      closeError: function () {
        this.$store.commit('toggleError')
      }
    },
    computed: {
      showError: function () {
        return this.$store.state.isError;
      }
    }
  }
</script>

<style scoped>
  .modal__background{
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 8;
    background-color: rgba(0, 0, 0, 0.7);

    transition: all .5s;
  }
  .modal__error{
    position: absolute;
    width: 30%;
    top: 2%;
    left: 50%;
    margin-left: -15%;
    z-index: 10;
    background-color: rgb(244, 67, 54);

    border-radius: 5px;

    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.7);
  }
  .modal__inner{
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .modal__text{
    font-family: 'Arial', sans-serif;
    font-size: 20px;
  }
  .modal__text > h4{
    display: inline-block;
  }
  .modal__close-button{
    padding-top: 1em;
    display: inline-block;
    font-size: 18px;
    margin: 0 auto;

    border-bottom: 1px solid black;
    cursor: pointer;
    transition: all .2s;
  }
  .modal__close-button:hover{
    color: white;
    border-color: white;
  }

  .modal-error-enter,
  .modal-error-leave-active {
    opacity: 0;
  }

  .modal-error-enter-active,
  .modal-error-leave-active {
    transition: opacity 0.5s ease;
  }
</style>
