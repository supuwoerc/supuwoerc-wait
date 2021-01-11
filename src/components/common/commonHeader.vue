<template>
<div class="common-header-container">
    <div class="left">
        <div>
            <img src="../../assets/images/app.png">
        </div>
    </div>
    <div class="right">
        <div class="navbar">
            <el-menu :default-active="navActiveIndex" :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#ffffff" text-color="#333333" :active-text-color="$store.getters.getThemeColor">
                <template v-for="(item,index) in navigation">
                    <el-menu-item v-if="item&&item.children&&item.children.length==0" :index="item.router">{{item.name}}</el-menu-item>
                    <el-submenu :index="item.router" v-else>
                        <template slot="title">{{item.name}}</template>
                        <el-menu-item :index="cell.router" :key="cindex" v-for="(cell,cindex) in item.children">{{cell.name}}</el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
        <theme-color-selector :color="this.$store.getters.getThemeColor" @color-update="colorChange" />
    </div>
</div>
</template>

<script>
import themeColorSelector from "./themeColorSelector";
export default {
    name: "commonHeader",
    components: {
        themeColorSelector,
    },
    data: function () {
        return {
            navigation: [{
                name: "首页",
                router: "/",
                children: []
            }, {
                name: "我的工作台",
                router: "",
                children: [{
                    name: "选项1",
                    router: "",
                    children: []
                }, {
                    name: "选项2",
                    router: "",
                    children: []
                }, {
                    name: "选项3",
                    router: "",
                    children: []
                }]
            }, {
                name: "节点",
                router: "/manager1",
                children: []
            }]
        };
    },
    computed:{
        navActiveIndex:function(){
            return this.$route.path; //nav默认激活
        }
    },
    methods: {
        /**
         * 主题色变化事件
         */
        colorChange(color) {
            this.color = color;
            this.$notify({
                title: "成功",
                message: `已为您设置主题色为${color}`,
                type: "success",
                offset: 60
            });
        },
        /**
         * 导航点击事件
         */
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
};
</script>

<style lang="scss">
@import "@/style/components/common/commonHeader.scss";
</style>
