import { axios_get, axios_post, axios_delete, axios_put } from './http.js'
export const getDataWithURL = (u, p) => axios_get(u, p);
export const elementIndexCss = p => axios_get("/static/element/index.css", p);
export const markdown = p => axios_get("/static/markdown/readme.md", p);