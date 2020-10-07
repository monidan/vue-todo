<template>
  <div class="bookmark bookmark__adding">
    <div class="bookmark__container">
      <div class="bookmark__header">
        <div class="bookmark__title_form">
          <h2 v-if="!isTitleChanging && BookmarkTitle.length < this.$store.state.letterLimit"
              @dblclick="isTitleChanging = true">
            {{BookmarkTitle}}
          </h2>
          <h2 v-else-if="!isTitleChanging && BookmarkTitle.length > this.$store.state.letterLimit"
              @dblclick="isTitleChanging = true">
            {{BookmarkTitle.slice(0,this.$store.state.letterLimit) + '...'}}
          </h2>
          <form v-else>
            <input type="text"
                   placeholder="Bookmark title"
                   v-model="BookmarkTitle">
            <button type="submit"
                    @click="createBookmarkTitle"
                    class="button bookmark__title__save-button">
              OK
            </button>
          </form>
        </div>
        <div class="bookmark__save-button"
             @click="addBookmark">
          <font-awesome-icon icon="save"/>
        </div>
      </div>
    <div class="bookmark__todo-input">
      <p>What <vue-typer :text='["have to be done?", "do you want?", "are you doing tonight?"]'
                 :repeat='Infinity'
                 :shuffle='false'
                 initial-action='typing'
                 :pre-type-delay='70'
                 :type-delay='70'
                 :pre-erase-delay='2000'
                 :erase-delay='250'
                 erase-style='select-all'
                 :erase-on-complete='false'
                 caret-animation='blink'></vue-typer>
      </p>
      <form @submit.prevent class="todo-input__form">
        <input type="text"
               class="todo__title"
               placeholder="Input your todo here.."
               v-model="TodoTitle"
               @keyup.enter.prevent="addTodo">
        <button class="button add-todo__button"
                @click="addTodo"
                type="submit">Add</button>
      </form>
    </div>
    <div class="bookmark__todos" v-if="Todos.length > 0">
      <Todo :todo="todo"
            v-for="todo in Todos"
            :key="Todos.id"
            @todo-deleting="deleteTodo"
            @todo-editing="editTodo"
            @todo-checkbox-toggle="toggleTodoCheckbox"/>
    </div>
    <div class="bookmark__hint"
         v-if="!isTitleChanging">
      <p><i>
        Double click on the title to change it.
      </i></p>
    </div>
  </div>
  </div>
</template>

<script>
  import Todo from './ToDo'
  import {myData} from '../data'

  export default{
    components: {
      Todo
    },
    data () {
      return {
        Todos: [],
        TodoTitle: '',
        NextTodoId: 0,
        BookmarkTitle: '',
        isTitleChanging: true,
      }
    },
    methods: {
      addTodo: function () {
        if(this.TodoTitle === null || this.TodoTitle.length === 0) return;
        this.NextTodoId++;
        this.Todos.push({
          id: `todo-${this.NextTodoId}`,
          title: this.TodoTitle,
          done: false
        })
        this.TodoTitle = '';
      },
      createBookmarkTitle: function () {
        this.isTitleChanging = false;
        if(this.BookmarkTitle.length === 0) this.BookmarkTitle = 'Empty title.';
      },
      addBookmark: function () {
        let newBookmark = {};
        if(this.BookmarkTitle.title !== null && this.BookmarkTitle.length !== 0){
          if(this.getBookmarks !== undefined && this.getBookmarks.length !== 0){
            newBookmark.id = this.getBookmarks[this.getBookmarks.length - 1].id + 1;
          } else{
            newBookmark.id = 0;
          }
          newBookmark.title = this.BookmarkTitle;
          newBookmark.todos = this.Todos;
          this.$store.commit('addBookmark', newBookmark);
          this.$store.commit('isBookmarkShowing');
        } else {
        //modal
        }
      },
      deleteTodo({id}) {
        this.Todos = this.Todos.filter(todo =>
          todo.id !== id
        )
      },
      editTodo({title, id, done}){
        let replacingTodo = this.Todos.find(todo =>
          todo.id === id
        )
        replacingTodo.title = title;
        replacingTodo.id = id;
        replacingTodo.done = done;
      },
      toggleTodoCheckbox: function (id) {
        let todo = this.Todos.find(todo =>
          todo.id === id
        );
        todo.done = !todo.done;
      }
    },
    computed: {
      getBookmarks: function () {
        return this.$store.state.bookmarks
      }
    }
  }
</script>

<style scoped>
  .button{
    display: inline-block;
    border: none;
    border-radius: 5px;
    appearance: none;
    cursor: pointer;

    padding: 0.2em 1em;
    font-size: 14px;

    background-color: rgba(213, 172, 78, 0.8);
    transition: all .2s;
  }

  .bookmark__adding{
    width: 100%;
    background-color: rgba(85, 214, 190, 0.4);
    border-radius: 4px;
  }
  .bookmark__container{
    width: 95%;
    margin: 0 auto;

    padding: 15px;
  }
  .bookmark__header{
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1em;
  }
  .bookmark__title_form > h2 {
    font-weight: normal;
  }
  .bookmark__todo-input{
    width: 100%;
    display: flex;
    flex-direction: column;

    text-align: center;
    margin: 1em auto;
  }
  .bookmark__todo-input > p{
    font-weight: normal;
    font-size: 25px;

    margin: .3em auto;
  }
  .bookmark__hint > p{
    text-align: right;
    font-size: 12px;

    animation: hint ease-in-out infinite 2s alternate;
  }
  .bookmark__save-button{
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    transition: all .2s;

    border-radius: 4px;
  }
  .bookmark__save-button:hover{
    background: #fff;
  }
  .todo__title{
    margin: 0.2em 0;
  }
/* Hovers */
  .button:hover {
    background-color: rgba(255, 172, 78, 0.7);
  }

/* Keyframes */
  @keyframes hint {
    0%{
      opacity: 0.4;
    }
    100%{
      opacity: 1;
    }
  }
</style>
