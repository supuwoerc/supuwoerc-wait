import { axios_get, axios_post, axios_delete, axios_put } from './http.js'
export const markdown = p => axios_get("/static/markdown/readme.md", p);