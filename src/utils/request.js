import axios from 'axios'
import {ElMessage} from "element-plus";
import router from '@/router/index.js';

// 创建axios实例
const service = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000, // 请求超时时间
    withCredentials: true // 允许携带cookie
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if(res.code){
            switch (res.code) {
                case 200:
                    ElMessage({
                        message: res.msg || 'Success',
                        type: 'success'
                    })
                    return res;
                case 401:
                    ElMessage({
                        message: res.msg || '用户权限不足',
                        type: 'error',
                    })
                    return res;
                case 402:
                    ElMessage({
                        message: res.msg || '数据不合法',
                        type: 'error',
                    })
                    return res;
                case 403:
                    ElMessage({
                        message: res.msg || '请登陆',
                        type: 'error',
                    });
                    router.push({
                        path: '/auth/login',
                        query: {
                            redirectTo: router.currentRoute.value.path
                        }
                    })
                    break;
                default :
                    ElMessage({
                        message: res.msg || '未知错误',
                        type: 'error',
                    });
                    return res;
            }
        }
    },
    error => {
        return Promise.reject(error);
    }
)

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        })
            .then(response => {
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        service.post(url, data)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        service.put(url, data)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        service.delete(url, { data })
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
    })
}

export default service