<template>
  <li>
    <div class="todo">
      <div class="todo__info">
        <input type="checkbox" class="todo_checkbox"
                :checked="todo.done"
                v-if="!isDisabled"
                @click="checkboxHandler">
        <input type="checkbox" class="todo_checkbox" :checked="todo.done" v-if="isDisabled" disabled>
        <div class="todo_header">
          <h3 class="todo__title"
              v-if="!isTitleChanging">
            {{todoTitleComputed}}
          </h3>
          <input v-else-if="isTitleChanging"
                 type="text"
                 class="todo__title-edit"
                 v-model="todoTitle"
                 @keyup.enter="editHandler">
        </div>
      </div>
      <div class="todo__buttons">
        <div class="todo__button todo__edit-button" v-show="!isDisabled">
          <button @click="isTitleChanging = true"
                  v-show="!isTitleChanging">
            Edit
          </button>
        </div>
        <div class="todo__button todo__delete-button" v-show="!isDisabled">
          <button @click="deleteHandler">Delete</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>

  export default {
    props: {
      todo: Object,
      isDisabled: Boolean
    },
    data() {
      return {
        editedTodoTitle: this.$props.todo.title,
        isTitleChanging: false
      }
    },
    methods: {
      deleteHandler() {
        this.$emit('todo-deleting', {id: this.$props.todo.id});
      },
      editHandler() {
        this.$emit('todo-editing',
          {
            title: this.editedTodoTitle,
            id:this.$props.todo.id,
            done: this.$props.todo.done
        })
        this.isTitleChanging = false;
      },
      checkboxHandler() {
        this.$emit('todo-checkbox-toggle', this.$props.todo.id)
      }
    },
    computed: {
      todoTitleComputed() {
        return this.todoTitle.length < this.$store.state.letterLimit ? this.todoTitle :
          this.todoTitle.slice(0, this.$store.state.letterLimit) + '...';
      },
      todoTitle: {
        get: function () {
          return this.$props.todo.title
        },
        set: function (newTitle) {
          this.editedTodoTitle = newTitle;
        }
      }
    }
  }

</script>

<style scoped>
  .todo{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.4em 0 ;
  }
  .todo__info > div[class^='todo']{
    margin-left: 10px;
  }
  .todo__info{
    display: flex;
    align-items: center;
  }
  .todo__title{
    font-weight: normal;
    font-size: 20px;
  }
  .todo__buttons{
    display: flex;
  }
  .todo__button > button{
    font-size: 15px;
    padding: 0.2em 1em;
    appearance: none;
    border: none;
    border-radius: 4px;

    background-color: rgba(213, 172, 78, 0.8);

    transition: all .2s;
    cursor: pointer;

    margin-right: .4em;
  }

/*Hovers*/
  .todo__button > button:hover {
    background-color: rgba(255, 172, 78, 0.7);
  }
</style>
