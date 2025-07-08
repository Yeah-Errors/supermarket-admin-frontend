import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/stores/user.js";
import {ElMessage} from "element-plus";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePageLayout.vue'),
      children: [
        {
          path: '',
          name: 'goods',
          component:()=> import('@/components/Empty.vue'),
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthPageLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/Login.vue'),
        },{
         path: 'register',
          name: 'register',
          component: () => import('@/views/auth/Register.vue'),
        },{
          path: '',
          name: 'auto_jump',
          redirect: '/auth/login',
        }
      ],
      meta: { requiresAuth: false }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if(to.meta.requiresAuth){
    if(userStore.user.username.toString().trim() !== '' && (userStore.user.userType === 0 || userStore.user.userType === 1)){
      next();
    }else{
      next('/auth/login?redirectTo=' + to.fullPath);
      ElMessage.error({
          message: userStore.user.username.toString().trim() !== ''? "用户权限不足！":"请登陆账号"
        }
      )
      userStore.clearUserInfo();
    }
  }else {
    next();
  }
})

export default router
