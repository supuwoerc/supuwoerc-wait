import { config } from "../config/index";
export const getServerSource = (url) => {
    if (url == "" || url == null) {
        return "";
    }
    return config.serverUrl + url;
}