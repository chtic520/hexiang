<template>
  <!-- App -->
  <div id="app">

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- iOS Theme Navbar -->
        <f7-navbar theme="custom" v-if="$theme.ios" title="和享购"></f7-navbar>
        <!-- Pages -->
        <f7-pages>
          <main-page></main-page>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
import MainPage from './pages/mainPage.vue'

export default {
  data () {
    return {
    }
  },
  components: { MainPage },
  methods: {
  }
}
</script>

<style lang="less">
  html.ios-gt-8 .navbar .center{
    font-weight: 500;
  }
</style>
