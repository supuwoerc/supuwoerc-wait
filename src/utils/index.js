import { config } from "../config/index";
export const getServerSource = (url) => {
    if (url == "" || url == null) {
        return "";
    }
    if(process.env.NODE_ENV==='production'){
        return url;
    }
    return config.serverUrl + url;
}