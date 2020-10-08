<template>
  <div :class="[{bookmark__active: isOpen}, 'bookmark-' + bookmark.id]"
       @click="currentBookmark"
       class="bookmark">
    <li>
      <div class="bookmark__heading">
        <h2 class="bookmark__title">
          {{bookmarkTitle}}
        </h2>
        <div class="bookmark__buttons">
          <router-link :to="{name: 'edit', params: {bookmarkId: bookmark.id}}">
            <Button type="edit"
                    class="bookmark__edit-button"
                    title="Edit"/>
          </router-link>
          <Button type='eye'
                  class="bookmark__open-button"
                  @click.native="isOpen = !isOpen"
                  title="Open"/>
          <Button type="trash"
                  class="bookmark__delete-button"
                  @click.native="deleteBookmark"
                  title="Delete"/>
        </div>
      </div>
      <todo-list :todos="bookmark.todos"
                 :is-open.sync="isOpen"></todo-list>
    </li>
  </div>
</template>

<script>
  import TodoList from './ToDoList';
  import Button from "./Button";

  export default {
    props: ['bookmark'],
    data() {
      return {
        isOpen: false,
      }
    },
    components: {
      TodoList,
      Button,
    },
    methods: {
      currentBookmark: function (e) {
        let bookmarkClass = e.currentTarget.getAttribute('class');
        let bookmarkId;
        for(let i = 0; i < bookmarkClass.length; i++){
          if(typeof Number(bookmarkClass[i]) === "number" && !isNaN(Number(bookmarkClass[i]))){
            bookmarkId = bookmarkClass[i];
          }
        }
        this.$store.commit('currentBookmark', bookmarkId);
      },
      deleteBookmark: function () {
        this.$store.commit('removeBookmark', this.$props.bookmark.id)
      },
    },
    computed: {
      bookmarkTitle() {
        return this.$props.bookmark.title.length < this.$store.state.letterLimit ? this.$props.bookmark.title :
          this.$props.bookmark.title.slice(0, this.$store.state.letterLimit) + '...';
      }
    }
  }
</script>

<style scoped>
  .bookmark__heading{
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 15px;
  }
  .bookmark__heading > h2 {
    font-size: 26px;
    font-weight: normal;
    line-height: normal;
    display: inline-block;
  }
  .bookmark{
    background-color: rgba(85, 214, 190, 0.4);
    margin: 10px 0;
    border-radius: 4px;

    transition: all .2s;
  }
  .bookmark__active{
    background-color: rgba(85, 214, 190, 1)
  }

  .bookmark__buttons{
    display: flex;
  }
  .bookmark__open-button, .bookmark__delete-button, .bookmark__edit-button{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 5px;

    transition: all .2s;
  }
  .bookmark__open-button:hover, .bookmark__delete-button:hover, .bookmark__edit-button:hover{
    background-color: white;
  }
  .bookmark-edit__buttons{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .bookmark-edit__buttons > * {
    margin-right: 5px;
    cursor: pointer;
  }

/*  Hovers  */

  .bookmark:hover{
    background-color: rgba(85, 214, 190, 1)
  }
</style>

