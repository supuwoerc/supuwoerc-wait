<template>
<div class="article-list-page">
    <div class="list-container">
        <el-input placeholder="关键字" v-model="keyWord" class="input-with-select">
            <el-select style="width:108px;" v-model="tag" slot="prepend" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="infinite-list" v-infinite-scroll="loadData" :infinite-scroll-distance="200" :infinite-scroll-disabled="disabled">
            <div class="list-item" v-for="(item,index) in list" :key="index">
                <div class="container" :style="{'background-image':`url(${$getServerSource(item.cover_url)})`}">
                    <div class="title">{{item.title}}</div>
                    <div class="info">{{item.create_time}}</div>
                    <div class="tags">
                        <el-tag theme="dark" v-for="(cell,cindex) in item.tagsList" size="small" :key="cindex">{{cell.tag_name}}</el-tag>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    getArticleList
} from '@/api/api';
export default {
    name: "articleList",
    components: {},
    data: function () {
        return {
            list: [],
            currentPage: 1,
            pageSize: 10,
            keyWord: "",
            noMore: false,
            loading: false,
            tag: "",
        };
    },
    computed: {
        disabled() {
            return this.loading || this.noMore
        }
    },
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {

    },
    methods: {
        //加载数据的方法
        async loadData() {
            this.loading = true;
            let res = await getArticleList({
                page: this.currentPage,
                size: this.pageSize,
                keyWord: this.keyWord,
                isOverview: 1
            });
            this.loading = false;
            this.currentPage++;
            if (res && res.code == 200) {
                this.list = this.list.concat(res.data.records);
                if (res.data.current >= res.data.pages) {
                    this.noMore = true;
                    this.$message.info("没有更多了!");
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/views/articleList.scss";
</style>
