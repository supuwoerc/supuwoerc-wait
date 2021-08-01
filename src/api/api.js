import { axios_get, axios_post, axios_delete, axios_put } from './http.js'
export const getServerData = (u, p) => axios_get(u, p);
export const postServerData = (u, p, h) => axios_post(u, p, h);
export const elementIndexCss = p => axios_get("https://cdn.jsdelivr.net/gh/supuwoerc/jsdelivr-cdn/static/element/index.css", p); //static/element/index.css  替换为cdn
//获取验证码
export const getCaptcha = () => axios_get("/captcha");
//登录
export const doLogin = p => postServerData("/login/submit", p, { "Content-Type": "application/x-www-form-urlencoded" });
//注册
export const doRegister = p => postServerData("/register", p);
//获取角色
export const getRoles = () => axios_get("/user/role");
//获取默认菜单
export const getDefaultMenus = () => axios_get("/menu/defaultMenu");
//获取当前用户登录后的的菜单
export const getMenus = () => axios_get("/menu/currentUserMenu");
//发送激活账户邮件
export const activeAccount = (p) => axios_post(`/user/reActiveUser/${p}`);