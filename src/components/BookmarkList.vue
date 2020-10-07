<template>
  <div class="bookmark-list">
    <ul>
        <bookmark v-for="bookmark in getBookmarks" :key="bookmark.id" :bookmark.sync='bookmark'></bookmark>
        <new-bookmark v-if="$store.state.newBookmark"></new-bookmark>
    </ul>
  </div>
</template>

<script>
  import Bookmark from "./Bookmark";
  import NewBookmark from "./AddBookmark";

  export default {
    components: {
      Bookmark,
      NewBookmark
    },
    computed: {
      getBookmarks: function () {
        return this.$store.state.bookmarks;
      }
    }
  }
</script>

<style>

</style>
