<script setup>
import {ref} from "vue";
import UserIcon from "@/components/icon/UserIcon.vue";
import KeyIcon from "@/components/icon/KeyIcon.vue";
import {post} from "@/utils/request.js";
import {useUserStore} from "@/stores/user.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const loginForm = ref(null)

const form_user = ref({
  username: '',
  password: '',
})

const form_rule = ref({
    username: [
      {
        required: true,
        message:'用户名不能为空',
        trigger: 'blur'
      },
      {
        validator: (rule, value, callback) => {
          if(value.trim().length <= 0){
            callback(new Error('用户名不能为空'))
          }else {
            callback()
          }
        }
      }
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        validator: (rule, value, callback) => {
          if(value.trim().length < 0){
            callback(new Error('密码不能为空'))
          }else {
            callback()
          }
        }
      }
    ]
})
function login(loginForm) {
  if(!loginForm){
    ElMessage({
      message:"登陆失败，请输入账号信息",
      type: "error"
    })
    return
  }
  loginForm.validate(async (valid) => {
    if(valid) {
      post("/user/login",{
        username:form_user.value.username.trim(),
        password:form_user.value.password.trim(),
      }).then((res) => {
        if (res.code === 200) {
          userStore.user = res.data;
          const urlParams = new URLSearchParams(window.location.search);
          const url = urlParams.get('redirectTo');
          if (url) {
            router.push({
              path: url
            });
          }else{
            router.push({
              path: '/'
            });
          }
        }else if (userStore.user.username.toString().trim() !== ''){
          userStore.clearUserInfo();
        }
      })
    }else{
      ElMessage({
        message:"登陆失败，请输入账号信息",
        type: "error"
      })
    }
  })

}

</script>

<template>
<div class="login">
  <el-form class="login-form"
      ref="loginForm"
      :model="form_user"
      :rules="form_rule"

  >
    <el-form-item  prop="username">
      <el-input placeholder="用户名" v-model="form_user.username" :prefix-icon="UserIcon"/>
    </el-form-item>
    <el-form-item prop="password">
      <el-input class="input" placeholder="密码" type="password" v-model="form_user.password" show-password :prefix-icon="KeyIcon"/>
    </el-form-item>

  </el-form>

  <div class="footer">
    <el-button round class="btn" type="primary" size="large" @click="login(loginForm)">登陆</el-button>
    <div style="display: flex; justify-content: space-between;">
      <router-link to="register">还没有账号?去注册</router-link>
      <el-link  disabled>忘记密码</el-link>
    </div>
  </div>
</div>

</template>

<style scoped>
.login{
  height: 100%;
  width: 70%;
  margin: 0 auto;
}
.login-form{
  height: 80%;
}
.footer{
  margin: 0 auto;
}
.footer .btn{
  width:100%;
  margin-bottom: 12px;
}
</style>