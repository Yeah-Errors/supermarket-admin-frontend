import { ref } from "vue"
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user'
,() => {
        const user = ref(
            {
                username: '',
                id: 0,
                userType: '',
            }
        );
        function clearUserInfo() {
            user.value.userType = ''
            user.value.id = 0
            user.value.username =''
        }
        return {
            user, clearUserInfo
        }
    },{
        persist: {
            enabled: true,
            storage: sessionStorage
        }
    }
)