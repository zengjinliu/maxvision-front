<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>

  export default {
    created() {
      //解决刷新state丢失数据问题
      window.addEventListener('beforeunload',()=>{
        localStorage.setItem('messageStore',JSON.stringify(this.$store.state))
      })
      localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
    }
  }
</script>

<style scoped>
#app {
 font-family: 'Avenir', Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
}
html,body,#app{
 height: 100%;
}
 body{
    margin: auto;
    padding: 0;
    height: 100%;
  }
  body .el-table th.gutter{
    display: table-cell!important;
  }

</style>
