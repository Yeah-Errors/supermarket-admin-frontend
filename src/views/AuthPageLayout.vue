<script setup>
import {useRoute} from 'vue-router'
const route = useRoute();
</script>

<template>
<div class="container">
  <div class="auth-page-core">
    <div class="auth-page-header">
      <h1>杳玖商城后台管理系统</h1>
    </div>
    <div class="auth-page-body">
      <router-view/>
    </div>
  </div>
</div>
</template>

<style scoped>
.container {
  position: absolute;
  background: url("https://api.dujin.org/bing/1920.php") no-repeat center center fixed;
  width: 100%;
  height: 100vh;
  text-align: center;
}
.auth-page-core {
  position: relative;
  padding:10px 0 ;
  width: 20%;
  min-width: 280px;
  height: 48%;
  min-height: 320px;
  margin: auto;
  top: 20vh;
  background: rgba(255, 255, 255, 0.8);
  border: white 1px solid;
  border-radius: 15px;
  box-shadow: rgb(155,155,155) 0 3px 10px 0;
  transition: box-shadow 1s;
}

.auth-page-header{
  height: 15%;
  text-align: center;
  margin: 15px auto;
  font-weight: normal;
}
.auth-page-body{
  height: 65%;
}
.auth-page-header h1{
  font-weight: normal;
  font-size: 26px;
}

</style>