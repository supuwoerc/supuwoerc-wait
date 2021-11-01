<template>
<div class="menu-item">
    <div class="title">
        <span>我的文字</span>
        <div>
            <router-link to="newArticle">
                <i class="iconfont icon-plus-circle" title="新增"></i>
            </router-link>
            <router-link to="articleList">
                <i class="iconfont icon-unorderedlist"  title="更多"></i>
            </router-link>
        </div>
    </div>
    <div class="info article-card">
        <el-empty v-if="list.length==0" description="未发布过文章" :image-size="80" style="padding:10px;">
        </el-empty>
        <div v-else class="article-list">
            <div class="list-item" v-for="(item,index) in list" :key="index">
                <span class="item-title transiton-lineG" @click="openDetail(item)">{{item.title}}</span>
                <span class="update-time">{{dateFormat(item.update_time,"YYYY-MM-DD")}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    getArticleList
} from "@/api/api";
import moment from "moment";
export default {
    name: 'articleCard',
    components: {},
    data() {
        return {
            list: []
        };
    },
    computed: {},
    watch: {},
    created() {
        this.getLast5Article();
    },
    mounted() {},
    methods: {
        //获取最新发布的五篇文章
        async getLast5Article() {
            let res = await getArticleList({
                page: 1,
                size: 5,
                isOverview:1
            });
            if (res && res.code == 200) {
                this.list = res.data.records;
            }
        },
        //时间格式化
        dateFormat(date,pat){
            return moment(date).format(pat);
        },
        //打开文章详情
        openDetail(item){
            console.log(item)
        },
    },

    destroyed() {},
}
</script>

<style lang="scss" scoped>
@import "@/style/components/views/userInfo/articleCard.scss";
</style>
