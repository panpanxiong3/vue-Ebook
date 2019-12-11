<template>
  <div class="home">
    <div id="read"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  global.epub = Epub;
  export default {
  name: 'home',
  mounted () {
    this.book = new Epub('/luokefeile.epub');
    this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight
    }).display();
  }
  }
</script>
