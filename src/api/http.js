import axios from 'axios'
axios.defaults.baseURL = "http://192.168.1.31:8088/"
axios.defaults.timeout = 1000000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        const token = sessionStorage.getItem("supuwoerc_token")
        console.log(token)
        if (token) {
            config.headers.Authorization = 'JWT ' + token
        }
        return config;
    },
    error => {
        return Promise.error(error);
    })

axios.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),

    // 请求失败
    error => {
        if (error.response) {
            // 判断一下返回结果的status == 401？  ==401跳转登录页面。  ！=401passs
            console.log(error.response)
            if (error.response.status === 401) {
                console.log(error.response)
            } else {
                return Promise.reject(error.response);
            }
            // 请求已发出，但是不在2xx的范围
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            // store.commit('changeNetwork', false);
            return Promise.reject(error.response);
        }
    });

// 封装xiaos请求  封装axios里的get
export function axios_get(url, params) {
    return new Promise(
        (resolve, reject) => {
            axios.get(url, { params: params })
                .then(res => {
                    console.log("封装信息的的res", res)
                    resolve(res.data)
                }).catch(err => {
                    reject(err.data)
                })
        }
    )
}

export function axios_post(url, data) {
    return new Promise(
        (resolve, reject) => {
            console.log(data)
            axios.post(url, JSON.stringify(data))
                .then(res => {
                    console.log("封装信息的的res", res)
                    resolve(res.data)
                }).catch(err => {
                    reject(err.data)
                })
        }
    )
}

export function axios_put(url, data) {
    return new Promise(
        (resolve, reject) => {
            console.log(data)
            axios.put(url, JSON.stringify(data))
                .then(res => {
                    console.log("封装信息的的res", res)
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
            console.log(data)
            axios.delete(url, { params: data })
                .then(res => {
                    console.log("封装信息的的res", res)
                    resolve(res.data)
                }).catch(err => {
                    reject(err.data)
                })
        }
    )
}