import axios from 'axios'
import {ElMessage} from "element-plus";
import router from '@/router/index.js';

// 创建axios实例
const service = axios.create({
    baseURL: "/",
    timeout: 5000, // 请求超时时间
    withCredentials: true // 允许携带cookie
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        // 对请求错误做些什么
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        // 如果自定义状态码不是200，则判断为错误
        if (res.code && res.code !== 200) {
            ElMessage({
                message: res.msg || 'Error',
                type: 'error',
                duration: 3 * 1000
            })
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error);
        if(error.response?.data?.data?.uri) {
            console.log("权限问题，要求重定向");
            router.push({
                path: error.response.data.data.uri,
                query: {
                    redirectTo: router.currentRoute.value.path
                }
            })
        }
        if(error.response?.data?.msg){
            ElMessage({
                message: error.response.data.msg,
                type: 'error',
                duration: 3 * 1000
            })
        }
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