import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import router from '@/router/index.js';
import store from '@/store/store';
import qs from 'qs'; //封装post请求Content-Type为application/x-www-form-urlencoded的参数
axios.defaults.baseURL = process.env.API;
axios.defaults.timeout = 1000000;
//默认的content-type(可以指定)
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        const token = localStorage.getItem("Sanye-Authorization")
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.error(error);
    });
axios.interceptors.response.use(
    // 请求成功
    res => {
        //502为token过期的状态,返回结果中有新的token,用新的token来重新发送请求,需要考虑并发的多个请求(加入重试队列)
        if (res && res.data && res.data.code === 502) {
            localStorage.setItem("Sanye-Authorization", res.data.data);
            return new Promise((resolve, reject) => {
                MessageBox.alert('收到新令牌,请刷新页面', '提示', {
                    confirmButtonText: '好的',
                    callback: action => {
                        console.log(action)
                        router.go(0);
                    }
                });
            });
        }
        //501情况,携带的token是伪造的,或者token失效被移除了,(需要重新获取菜单和登录)
        if (res && res.data && res.data.code === 501) {
            store.commit("setLoginStatus", false);
            localStorage.removeItem("Sanye-Authorization", res.data.data);
            return new Promise((resolve, reject) => {
                MessageBox.alert('令牌已注销', '提示', {
                    confirmButtonText: '去登录',
                    callback: action => {
                        router.push({
                            path: '/login'
                        });
                    }
                });
            });
        }
        //token过期
        if (res && res.data && res.data.code === 401) {
            store.commit("setLoginStatus", false);
            localStorage.removeItem("Sanye-Authorization", res.data.data);
            return new Promise((resolve, reject) => {
                Message.error(res.data.message);
            });
        }
        if (res && res.data && res.data.code != 200 && res.data.code != 555) {
            res.data.message = res.data.message || "请求异常";
            Message.error(res.data.message);
        }
        return Promise.resolve(res);
    },

    // 请求失败
    error => {
        return Promise.reject(res);
    });

// 封装xiaos请求  封装axios里的get
export function axios_get(url, params) {
    return new Promise(
        (resolve, reject) => {
            axios.get(url, { params: params })
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err.data)
                })
        }
    )
}

export function axios_post(url, data, header = {}) {
    return new Promise(
        (resolve, reject) => {
            let params = header["Content-Type"] == "application/x-www-form-urlencoded" ? qs.stringify(data) : JSON.stringify(data);
            axios.post(url, params, { headers: {...header } })
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err.data)
                })
        }
    )
}

export function axios_put(url, data, header = {}) {
    return new Promise(
        (resolve, reject) => {
            let params = header["Content-Type"] == "application/x-www-form-urlencoded" ? qs.stringify(data) : JSON.stringify(data);
            axios.put(url, params, { headers: {...header } })
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err.data)
                })
        }
    )
}

export function axios_delete(url, data) {
    return new Promise(
        (resolve, reject) => {
            axios.delete(url, { params: data })
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err.data)
                })
        }
    )
}