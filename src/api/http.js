import axios from 'axios';
import { Message } from 'element-ui';
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
    })

axios.interceptors.response.use(
    // 请求成功
    res => {
        if (res && res.data && res.data.code != 200) {
            res.data.message = res.data.message || "请求异常";
            Message.error(res.data.message);
        }
        return res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
    },

    // 请求失败
    error => {
        if (error.response) {
            console.log(error.response)
            if (error.response.status === 401) {
                Message.error(res.data.message);
            } else {
                return Promise.reject(error.response);
            }
        } else {
            return Promise.reject(error.response);
        }
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