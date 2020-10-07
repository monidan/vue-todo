<template>
  <div class="todo-list" v-if="isOpen">
    <ul>
      <todo v-for="todo in todos"
            :todo.sync="todo"
            :key="todo.id"
            :is-disabled="isDisabled"
            @todo-deleting="deleteTodo"
            @todo-editing="editTodo"
            @todo-checkbox-toggle="toggleTodoCheckbox">
      </todo>
    </ul>
  </div>

  <div class="todo-list__preview" v-else>
    <ul>
      <todo v-for="todo in todosPreview"
            :todo.sync="todo"
            :key='todo.id'
            :is-disabled="!isDisabled"></todo>
    </ul>
  </div>
</template>

<script>
  import Todo from './ToDo';

  export default {
    props: ['todos', 'isOpen'],
    components: {
      Todo,
    },
    computed: {
      todosPreview: function () {
        return this.todos.slice(0, 2);
      }
    },
    data() {
      return {
        isDisabled: false,
      }
    },
    methods: {
      deleteTodo: function ({id}) {
        this.$store.commit('deleteTodo', id)
      },
      editTodo: function ({title, id, done}) {
        let editedTodo = {
          id: id,
          title: title,
          done: done
        }
        this.$store.commit('editTodo', editedTodo)
      },
      toggleTodoCheckbox: function (id) {
        this.$store.commit('toggleTodo', id)
      }
    }
  }
</script>

<style>
  .todo-list{
    padding: 0 15px 15px;
  }
  .todo-list__preview{
    padding: 0 15px 15px;
  }
</style>
