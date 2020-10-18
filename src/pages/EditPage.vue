<template>
  <div class="container">
      <div class="bookmark">
        <div class="bookmark__header">
          <h2 v-if="!isBookmarkTitleChanging"
              @dblclick="isBookmarkTitleChanging = true">
            {{bookmarkTitle}}
          </h2>
          <input type="text" v-else
                 @keyup.enter="changeBookmarkTitle"
                 placeholder="Input your new title">
          <div class="bookmark__main-buttons">
            <Button type="undo" class="todo__button undo"
                    @click.native="undoHandler"/>
            <Button type="save" class="todo__button save"
                    @click.native="saveBookmarkHandler"/>
            <Button type="trash"
                    class="todo__button delete"
                    @click.native="deleteBookmark"
                    title="Delete"/>
            <Button type="times" class="todo__button times"
                    @click.native="closeBookmarkHandler"/>
          </div>
        </div>
        <div class="bookmark__inner">
          <div class="bookmark__todos">
            <Todo v-for="todo in bookmark.todos"
                  :todo.sync="todo"
                  :key="todo.id"
                  :is-disabled="false"
                  @todo-deleting="deleteTodoHandler"
                  @todo-editing="editTodoHandler"
                  @todo-checkbox-toggle="toggleTodoCheckboxHandler"/>
            <div class="bookmark__todo-adding" v-if="isTodoAdding">
              <input type="checkbox" disabled>
              <input type="text"
                     v-model="newTodo.title"
                     @keyup.enter="addTodoHandler"
                     placeholder="Input your title here...">
              <button v-show="newTodo.title !== undefined  && newTodo.title.length !== 0"
                 class="todo__save-button"
                 @click="addTodoHandler">
                Save
              </button>
            </div>
          </div>
          <div class="bookmark__add-button">
            <button class="todo__add-button"
                    title="Add todo"
                    @click="showAddingTodoForm">
              <font-awesome-icon icon="plus-square"/>
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Button from "../components/Button";
import Todo from "../components/ToDo";

import {mapMutations} from 'vuex';

export default {
        name: "edit",
        components: {
          Button,
          Todo
        },
        data() {
          return{
            bookmarkId: this.$route.params.bookmarkId,
            isTodoTitleChanging: false,
            isBookmarkTitleChanging: false,
            isTodoAdding: false,
            newTodo: {}
          }
        },
        methods: {
          ...mapMutations([
            'currentBookmark',
            'toggleTodo',
            'addTodo',
            'editTodo',
            'deleteTodo',
            'removeBookmark',
            'editBookmark',
            'restoreBookmarks'
          ]),
          changeBookmarkTitle(e) {
            this.isBookmarkTitleChanging = false;
            this.bookmark.title =  e.target.value;
          },
          saveBookmarkHandler() {
            this.editBookmark(this.bookmark);
            this.$router.replace('/')
          },
          deleteBookmark: function () {
            // modal window
            this.removeBookmark(this.bookmark.id)
            this.$router.replace('/')
          },
          closeBookmarkHandler() {
            // modal window
            this.restoreBookmarks();
            this.$router.replace('/')
          },
          deleteTodoHandler({id}) {
            this.currentBookmark(this.bookmark.id)
            this.deleteTodo(id)
          },
          editTodoHandler({title, id, done}) {
            this.currentBookmark(this.bookmark.id)
            this.editTodo({title, id, done})
          },
          addTodoHandler(){
            if (this.newTodo.title.length !== 0) {
              this.newTodo.id = this.nextTodoId;
              this.currentBookmark(this.bookmark.id);
              this.addTodo(this.newTodo)

              this.newTodo = {}
              this.isTodoAdding = false;
            } else {
            //  modal window about an empty title!
            }
          },
          showAddingTodoForm() {
            this.isTodoAdding = true;
          },
          toggleTodoCheckboxHandler({id}) {
            this.currentBookmark(this.bookmark.id)
            this.toggleTodo(id)
          },
          undoHandler() {
            if(!this.$store.getters.isHistoryMutationsEmpty){
              this.$store.dispatch('undoAction', this.bookmark.id);
            } else {
            //  modal
              console.error('undoHandler error!');
            }
          },
        },
      computed: {
        bookmarkTitle() {
          return this.bookmark.title.length < this.$store.state.letterLimit ? this.bookmark.title :
            this.bookmark.title.slice(0, this.$store.state.letterLimit) + '...';
        },
        bookmark() {
          return this.$store.getters.findBookmarkById(this.$route.params.bookmarkId);
        },
        nextTodoId() {
          let freeId = '';
          let lastId = 0;
          this.bookmark.todos.forEach(todo => {
            let todoIdNumber = Number(todo.id.split('-')[1]);
            todoIdNumber >= lastId ? lastId = todoIdNumber : lastId;
          })
          return freeId + "todo-" + String(lastId + 1);
        }
      }
    }
</script>

<style scoped>
  li{
    width: 90%;
    list-style-type: none;
  }

  /*INDIVIDUAL CLASSES*/
  .container{
    width: 30%;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    align-items: center;

    z-index: 1;
  }
  .bookmark{
    width: 100%;
    background-color: rgba(85, 214, 190, 1);
    border-radius: 5px;

    box-shadow: inset 0 8px 6px -6px white,
                inset 0 -3px grey;
  }
  .bookmark__header{
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }
  .bookmark__header > h2 {
    font-weight: normal;
    line-height: normal;
    font-size: 26px;
  }
  .bookmark__main-buttons{
    display: flex;
    align-self: center;
    color: white;
  }
  .bookmark__todos{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bookmark__todo-adding {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 1.5em 2em;
    margin-top: 1em;
    background-color: rgba(255,255,255, 0.3);
  }
  .bookmark__todo-adding input[type='text'] {
    margin: 0 0.4em;
  }
  .todo__save-button{
    color: beige;1

    box-sizing: border-box;
    font-size: 0.9rem;
    padding: 0.05em 1em;

    background-color: forestgreen;

    border: 1px solid transparent;
    border-radius: 4px;

    cursor: pointer;

    box-shadow: 0 2px 5px 1px grey;

    transition: all .2s;
  }
  .todo__button{
    padding: 10px;
    cursor: pointer;
    font-size: 18px;

    color: rgb(48, 58, 43);
    transition: all .2s;

    border-radius: 100px;
  }
  /deep/  .todo__button > button{
    display: block!important;
  }
  .bookmark__add-button{
    width: 100%;
    margin: 5% 0;
  }
  .todo__add-button{
    width: 90%;
    appearance: none;
    display: block;
    padding: 0.4em 0;
    font-size: 25px;
    margin: 0 auto;
    border: 1px solid transparent;
    background-color: transparent;
    cursor: pointer;
    color: white;
    border-radius: 5px;

    transition: all .2s;
  }

/*  Hovers  */
  .todo__button:hover{
    color: white;
    box-shadow: inset 0 0 4px grey;
  }
  .todo__add-button:hover{
    box-shadow: inset 0 -5px 5px -5px rgb(21, 122, 110),
                inset 0 5px 5px -5px white;
    background-color: rgba(84, 122, 165, 0.5);
  }

  .todo__save-button:hover{
    opacity: 0.8;
    box-shadow: none;
  }
</style>
