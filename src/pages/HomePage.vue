<template>
  <div class='container'>
    <CreateBookmark @click.native.prevent="$store.state.newBookmark = true"/>
    <bookmarks></bookmarks>
  </div>
</template>

<script>
  import Bookmarks from '../components/BookmarkList';
  import CreateBookmark from "../components/CreateBookmarkButton";

  export default {
    name: 'home',
    components: {
      Bookmarks,
      CreateBookmark
    },
  }
</script>

<style>
  a{
    text-decoration: none;
    color: black;
  }
  ul{
    list-style-type: none;
    padding: 5px;
    margin: 0;
  }

  .container{
    width: 30%;
    margin: 0 auto;

    z-index: 1;
  }
</style>
