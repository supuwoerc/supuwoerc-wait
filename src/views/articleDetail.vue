<template>
<div class="article-detail-page">
    <div class="main-box">
        <div class="menus">
            <div class="menu-btn">
                <i class="iconfont icon-like"></i>
            </div>
            <div class="menu-btn">
                <i class="iconfont icon-comment"></i>
            </div>
            <div class="menu-btn">
                <i class="iconfont icon-share"></i>
            </div>
        </div>
        <div class="article-container">
            <div class="domain">
                <div class="top">
                    <div class="cover" v-show="articleDetail.cover_url!=''">
                        <el-image style="width:100%;height:100%;" :src="$getServerSource(articleDetail.cover_url)">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </div>
                    <div class="desc">
                        <div class="title">{{articleDetail.title}}</div>
                        <div class="auth-info">
                            <i class="iconfont icon-smile"></i>
                            <span>zhangsasadasdsa</span>
                        </div>
                        <div class="time">
                             <i class="iconfont icon-time-circle"></i>
                             <span>{{articleDetail.create_time}}</span>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <markdown :data="articleDetail.content" />
                </div>
            </div>
        </div>
        <div class="info">
            <div class="card auth">

            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    getArticleDetail
} from "@/api/api";
export default {
    name: "articleDetail",
    data: function () {
        return {
            articleDetail: {}
        };
    },
    created() {
        this.getArticle();
    },
    mounted() {},
    methods: {
        //获取文章详情
        async getArticle() {
            let res = await getArticleDetail(this.$route.params.id);
            console.log(res);
            if (res && res.code == 200) {
                this.articleDetail = res.data;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/views/articleDetail.scss";
</style>
