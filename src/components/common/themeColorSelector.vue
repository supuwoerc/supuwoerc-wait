<template>
<el-color-picker v-model="theme" />
</template>

<script>
const version = require("element-ui/package.json").version;
const ORIGINAL_THEME = "#409EFF"; // 
export default {
    name: "themeColorSelecotr",
    props: {
        color: String,
    },
    data() {
        return {
            chalk: "",
            theme: "",
        };
    },
    computed: {
        defaultTheme() {
            return this.color;
        },
    },
    watch: {
        defaultTheme: {
            handler: function (val, oldValue) {
                this.theme = val;
            },
            immediate: true,
        },
        /**
         * 开启深度监听，防止第一次监听不到
         */
        theme: {
           handler:async function (val, oldValue) {
                const oldVal = this.chalk ? this.theme : ORIGINAL_THEME;
                if (typeof val !== "string") return;
                const themeCluster = this.getThemeCluster(val.replace("#", ""));
                const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
                if (!this.chalk) {
                    await this.getCSSString();
                }
                this.getHandler(themeCluster);
                const styles = [].slice
                    .call(document.querySelectorAll("style"))
                    .filter((style) => {
                        const text = style.innerText;
                        return (
                            new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
                        );
                    });
                styles.forEach((style) => {
                    const {
                        innerText
                    } = style;
                    if (typeof innerText !== "string") return;
                    style.innerText = this.updateStyle(
                        innerText,
                        originalCluster,
                        themeCluster
                    );
                });
                this.$store.commit("setThemeColor", val);
                this.$emit("color-update", val);
            },
            immediate: true,
        }
    },
    methods: {
        // 修改element-ui主题样式表颜色
        updateStyle(style, oldCluster, newCluster) {
            let newStyle = style;
            oldCluster.forEach((color, index) => {
                newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
            });
            return newStyle;
        },
        // 生成新的样式表
        getHandler(themeCluster) {
            const originalCluster = this.getThemeCluster(
                ORIGINAL_THEME.replace("#", "")
            );
            const newStyle = this.updateStyle(
                this.chalk,
                originalCluster,
                themeCluster
            );
            let styleTag = document.getElementById("chalk-style");
            if (!styleTag) {
                styleTag = document.createElement("style");
                styleTag.setAttribute("id", "chalk-style");
                document.head.appendChild(styleTag);
            }
            styleTag.innerText = newStyle;
        },
        // 获取element-ui主题样式
        getCSSString() {
            const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this.chalk = xhr.responseText.replace(/@font-face{[^}]+}/, "");
                        resolve();
                    }
                };
                xhr.open("GET", url);
                xhr.send();
            });
        },
        getThemeCluster(theme) {
            const tintColor = (color, tint) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);
                if (tint === 0) {
                    return [red, green, blue].join(",");
                } else {
                    red += Math.round(tint * (255 - red));
                    green += Math.round(tint * (255 - green));
                    blue += Math.round(tint * (255 - blue));
                    red = red.toString(16);
                    green = green.toString(16);
                    blue = blue.toString(16);
                    return `#${red}${green}${blue}`;
                }
            };
            const shadeColor = (color, shade) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);
                red = Math.round((1 - shade) * red);
                green = Math.round((1 - shade) * green);
                blue = Math.round((1 - shade) * blue);
                red = red.toString(16);
                green = green.toString(16);
                blue = blue.toString(16);
                return `#${red}${green}${blue}`;
            };
            const clusters = [theme];
            for (let i = 0; i <= 9; i++) {
                clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
            }
            clusters.push(shadeColor(theme, 0.1));
            return clusters;
        },
    },
};
</script>
