import { axios_get, axios_post, upload_post, axios_delete, axios_put } from './http.js'
export const getServerData = (u, p) => axios_get(u, p);
export const postServerData = (u, p, h) => axios_post(u, p, h);
export const elementIndexCss = p => axios_get(p); //static/element/index.css  替换为cdn
//获取验证码
export const getCaptcha = () => axios_get("/captcha");
//登录
export const doLogin = p => postServerData("/login/submit", p, { "Content-Type": "application/x-www-form-urlencoded" });
//注册
export const doRegister = p => axios_put("/register", p);
//注销登录
export const logOut = () => axios_post("/logout/submit");
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
//查询标签
export const getTags = () => axios_get(`/tags/list`);
//保存全部标签
export const saveTags = p => axios_post(`/tags/save`, p);
//删除一个标签
export const deleteTag = p => axios_delete(`/tags/delete`, p);
//上传文章封面(不会更新文章信息)
export const uploadCoverImg = p => upload_post(`/article/upload/cover`, p);
//删除文章封面(不会更新文章信息)
export const deleteCoverImg = p => axios_delete(`/article/delete/cover`, p);
//保存文章(新增或者修改)
export const saveArticle = p => axios_put("/article/save", p);
//查询文章列表
export const getArticleList = p => axios_get(`/article/list`, p);
//查询文章详情
export const getArticleDetail = p => axios_get(`/article/detail/${p}`);
//文章点赞，取消点赞
export const likeOrUnlike = p => axios_post(`/article/likeOrUnlike`, p);