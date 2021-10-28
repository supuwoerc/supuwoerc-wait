<template>
<el-menu :default-active="navActiveIndex" :router="true" class="el-menu-demo" mode="horizontal" background-color="#ffffff" text-color="#333333" :active-text-color="$store.getters.getThemeColor">
    <template v-for="(item, index) in menusData">
        <el-menu-item v-if="item && item.children && item.children.length == 0" :key="index" :index="item.path">
            {{ item.name }}
        </el-menu-item>
        <el-submenu :index="item.path" v-else :key="index">
            <template slot="title">{{ item.name }}</template>
            <el-menu-item :index="cell.path" :key="cindex" v-for="(cell, cindex) in item.children">
                {{ cell.name }}
            </el-menu-item>
        </el-submenu>
    </template>
</el-menu>
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
    render(createElement, context) {
        //递归组装菜单
        const loop = function (data) {
           return data.map((item) => {
                return createElement("el-submenu", {
                    index: item.path
                });
            });
        };
        childMenus.map((item) => {});
        return "";
    },
});
export default {
    name: "loopMenu",
    props: {
        menusData: {
            type: Array,
            default: () => [{
                    id: 1,
                    name: "首页",
                    path: "/",
                    icon: "",
                    sort: 0,
                    pid: 0,
                    children: [],
                },
                {
                    id: 2,
                    name: "前端",
                    path: "/article/frontend",
                    icon: "",
                    sort: 1,
                    pid: 0,
                    children: [{
                        id: 888,
                        name: "前端1",
                        path: "/",
                        icon: "",
                        sort: 0,
                        pid: 0,
                        children: [{
                            id: 8888,
                            name: "前端111",
                            path: "/",
                            icon: "",
                            sort: 0,
                            pid: 0,
                            children: [],
                        }, ],
                    }, ],
                },
                {
                    id: 3,
                    name: "后端",
                    path: "/article/rearend",
                    icon: "",
                    sort: 2,
                    pid: 0,
                    children: [],
                },
                {
                    id: 4,
                    name: "个人中心",
                    path: "/userInfo",
                    icon: "",
                    sort: 3,
                    pid: 0,
                    children: [],
                },
                {
                    id: 5,
                    name: "管理中心",
                    path: "/manage",
                    icon: "",
                    sort: 4,
                    pid: 0,
                    children: [],
                },
            ],
        },
    },
    computed: {
        navActiveIndex: function () {
            return this.$route.path; //nav默认激活
        },
    },
    data: function () {
        return {};
    },
    created() {},
    methods: {},
};
</script>

<style>
</style>
