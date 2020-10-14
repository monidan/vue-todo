import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const validMutations = [
  'editTodo',
  'deleteTodo',
  'toggleTodo',
  'addTodo'
];

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    bookmarks: [],
    mutationsHistory: [],
    undoMutationsHistory: [],
    currentBookmark: {},
    redoMutation: {},

    isError: false,
    newBookmark: false,
    redo: false,

    letterLimit: 35,
  },
  mutations: {
    isBookmarkShowing: function (state) {
      state.newBookmark = !state.newBookmark;
    },
    initialiseStore: function (state) {
      let localStore = JSON.parse(localStorage.getItem('store'));
      if (localStore !== undefined && localStore !== null) {
        state.bookmarks = localStore;
      } else {
        state.bookmarks = [];
      }
    },
    addBookmark: function (state, bookmark) {
        state.bookmarks.push(bookmark);
        localStorage.setItem('store', JSON.stringify(state.bookmarks));
    },
    removeBookmark: function (state, bookmarkId) {
      state.bookmarks = state.bookmarks.filter(bookmark =>
        bookmark.id !== bookmarkId
      )
      localStorage.setItem('store', JSON.stringify(state.bookmarks));
    },
    editBookmark: function (state, editedBookmark) {
      // modal confirmation
      state.bookmarks = state.bookmarks.map(bookmark => {
          if (bookmark.id === editedBookmark.id) bookmark = editedBookmark;
          return bookmark
        }
      )
      localStorage.setItem('store', JSON.stringify(state.bookmarks));
    },
    currentBookmark: function(state, bookmarkID){
      state.currentBookmark =  state.bookmarks.find(currentBookmark =>
        currentBookmark.id === Number(bookmarkID)
      );
    },

    deleteTodo: function (state, todoId) {
      let bookmark = state.currentBookmark;
      // modal window
      bookmark.todos = bookmark.todos.filter(currentTodo => currentTodo.id !== todoId);
    },
    editTodo: function (state, editedTodo) {
      let bookmark = state.currentBookmark;
      let bookmarkTodo = bookmark.todos.find(currentTodo =>
        editedTodo.id === currentTodo.id
      )
      bookmarkTodo.title = editedTodo.title;
      bookmarkTodo.done = editedTodo.done;
    },
    toggleTodo: function (state, todoId) {
      let bookmark = state.currentBookmark;
      let bookmarkTodo = bookmark.todos.find(currentTodo =>
        todoId === currentTodo.id
      )
      bookmarkTodo.done = !bookmarkTodo.done;
      localStorage.setItem('store', JSON.stringify(state.bookmarks));
    },
    addTodo: function (state, newTodo){
        state.currentBookmark.todos.push(newTodo);
    },

    toggleError: function (state) {
      state.isError = !state.isError
    },

    undoMutation: function (state) {
      state.undoMutationsHistory.forEach(mutation => {
        this.commit(`${mutation.type}`, mutation.payload)
      });
    },
    restoreBookmarks: function (state){
      state.bookmarks = JSON.parse(localStorage.getItem('store'));
    },
    resetMutationsHistory: function (state){
      state.mutationsHistory = [];
      if(!state.redo){
        state.redoMutation = state.undoMutationsHistory.pop();
        state.redo = true;
      } else {
        state.undoMutationsHistory.push(state.redoMutation);
        state.redo = false;
      }
    }
  },
  actions: {
    undoAction: function ({commit}, bookmarkId) {
      commit('resetMutationsHistory')
      commit('restoreBookmarks')
      commit('currentBookmark', bookmarkId)
      commit('undoMutation')
    }
  },
  modules: {
  },
  getters: {
    findBookmarkById: state => bookmarkId => {
      // state.bookmarks = JSON.parse(localStorage.getItem('store'));
      return state.bookmarks.find(bookmark => bookmark.id === Number(bookmarkId));
    },
    isHistoryMutationsEmpty: state => {
      return state.undoMutationsHistory.length === 0 && state.redoMutation === undefined
    }
  },
})

store.subscribe((mutation, state) =>{
  if(validMutations.includes(mutation.type) && /edit/.test(window.location.pathname)){
    state.mutationsHistory.push(mutation);
    state.undoMutationsHistory = state.mutationsHistory;
  }
})

export default store
