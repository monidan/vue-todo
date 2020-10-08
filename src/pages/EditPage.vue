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
                    @click.native=""/>
            <Button type="save" class="todo__button save"
                    @click.native="saveBookmarkHandler"/>
            <Button type="trash"
                    class="todo__button delete"
                    @click.native="deleteBookmark"
                    title="Delete"/>
            <Button type="times" class="todo__button times"
                    @click.native=""/>
          </div>
        </div>
        <div class="bookmark__inner">
          <div class="bookmark__todos">
            <Todo v-for="todo in bookmark.todos"
                  :todo.sync="todo"
                  :key="todo.id"
                  @todo-deleting="deleteTodo"
                  @todo-editing="editTodo"
                  @todo-checkbox-toggle="toggleTodoCheckbox"/>
          </div>
          <div class="bookmark__add-button">
            <button class="todo__add-button" title="Add todo">
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
  import HomePage from "./HomePage";

    export default {
        name: "edit",
        components: {
          Button,
          Todo
        },
        data() {
          return{
            currentTodoId: '',
            bookmarkId: this.$route.params.bookmarkId,
            todoTitle: '',
            isTodoTitleChanging: false,
            isBookmarkTitleChanging: false,
            bookmark: this.$store.getters.findBookmarkById(this.$route.params.bookmarkId),
          }
        },
        methods: {
          changeBookmarkTitle(e) {
            this.isBookmarkTitleChanging = false;
            this.bookmark.title =  e.target.value;
          },
          saveBookmarkHandler() {
            this.$store.commit('editBookmark', this.bookmark);
          },
          deleteBookmark: function () {
            // modal window
            this.$store.commit('removeBookmark', this.bookmark.id)
            this.$router.go(-1)
          },
          closeBookmarkHandler() {
            //  modal window
            this.$router.go(-1);
          },
          deleteTodo({id}) {
            this.$store.commit('currentBookmark', this.bookmark.id)
            this.$store.commit('deleteTodo', id)
          },
          editTodo({title, id, done}) {
            let editedTodo = {
              title: title,
              id: id,
              done: done
            }
            this.$store.commit('currentBookmark', this.bookmark.id)
            this.$store.commit('editTodo', editedTodo);
          },
          addTodo(){
            let newTodo = {};

            //validation

            this.$store.commit('currentBookmark', this.bookmark.id);
            this.$store.commit('addTodo', newTodo);
          },
          toggleTodoCheckbox({id}) {
            this.$store.commit('currentBookmark', this.bookmark.id);
            this.$store.commit('toggleTodo', id);
          },
        },
      computed: {
        bookmarkSnapshot() {
          return JSON.parse(JSON.stringify(this.bookmark));
        },
        bookmarkTitle() {
          return this.bookmark.title.length < this.$store.state.letterLimit ? this.bookmark.title :
            this.bookmark.title.slice(0, this.$store.state.letterLimit) + '...';
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

  .todo__button{
    padding: 10px;
    cursor: pointer;
    font-size: 18px;

    color: rgb(48, 58, 43);
    transition: all .2s;

    border-radius: 100px;
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
</style>
