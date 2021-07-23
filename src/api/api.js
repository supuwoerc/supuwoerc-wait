import { axios_get, axios_post, axios_delete, axios_put } from './http.js'
export const getServerData = (u, p) => axios_get(u, p);
export const postServerData = (u, p, h) => axios_post(u, p, h);
export const elementIndexCss = p => axios_get("https://cdn.jsdelivr.net/gh/supuwoerc/jsdelivr-cdn/static/element/index.css", p); //static/element/index.css  替换为cdn