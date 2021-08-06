import { axios_get, axios_post, upload_post, axios_delete, axios_put } from './http.js'
export const getServerData = (u, p) => axios_get(u, p);
export const postServerData = (u, p, h) => axios_post(u, p, h);
export const elementIndexCss = p => axios_get(p); //static/element/index.css  替换为cdn
//获取验证码
export const getCaptcha = () => axios_get("/captcha");
//登录
export const doLogin = p => postServerData("/login/submit", p, { "Content-Type": "application/x-www-form-urlencoded" });
//注册
export const doRegister = p => postServerData("/register", p);
//注销登录
export const logOut = () => postServerData("/logout/submit");
//获取角色
export const getRoles = () => axios_get("/user/role");
//获取默认菜单
export const getDefaultMenus = () => axios_get("/menu/defaultMenu");
//获取当前用户登录后的的菜单
export const getMenus = () => axios_get("/menu/currentUserMenu");
//发送激活账户邮件
export const activeAccount = p => axios_post(`/user/reActiveUser/${p}`);
//查询角色选项(option用途)
export const getRoleList = () => axios_get(`/role/list`);
//查询用户列表
export const getUserList = p => axios_get(`/user/userList`, p);
//查询登录人个人信息
export const getCurrentUserInfo = () => axios_get(`/user/info`);
//上传头像(不会更新个人信息)
export const uploadAvatar = p => upload_post(`/user/upload/avatar`, p);
//更新个人信息
export const updateMineInfo = p => axios_post(`/user/updateUserInfo`, p);