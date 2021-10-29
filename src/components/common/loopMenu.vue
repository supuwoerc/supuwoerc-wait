<template>
<loop-child-menu :childMenus="$store.getters.getNavigation"></loop-child-menu>
</template>

<script>
import Vue from "vue";
//注册局部组件
Vue.component("loopChildMenu", {
    props: {
        childMenus: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    computed: {
        navActiveIndex: function () {
            return this.$route.path;
        },
        activeTextColor: function () {
            return this.$store.getters.getThemeColor;
        },
    },
    render(createElement, context) {
        //递归组装菜单
        const loop = function (data) {
            return data.map((item) => {
                if (item && (!item.children || (item.children && item.children.length == 0))) {
                    return createElement("el-menu-item", {
                        props: {
                            index: item.path
                        },
                    }, [item.name]);
                } else if (item && item.children && item.children.length > 0) {
                    return createElement("el-submenu", {
                        props: {
                            index: item.path
                        },
                    }, [createElement('template', {
                        slot: 'title'
                    }, item.name), loop(item.children)]);
                }
            });
        };
        let root = createElement('el-menu', {
            props: {
                defaultActive: this.navActiveIndex,
                router: true,
                mode: "horizontal",
                backgroundColor: "#ffffff",
                textColor: "#333333",
                activeTextColor: this.activeTextColor
            },
            class: {
                'el-menu-demo': true
            }
        }, [loop(this.childMenus)])
        return root;
    },
});
export default {
    name: "loopMenu"
};
</script>


