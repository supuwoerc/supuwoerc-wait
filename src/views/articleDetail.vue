<template>
<div class="article-detail-page scroller-bar ">
    <div class="main-box">
        <div class="menus">
            <el-badge :value="articleDetail.like_num||0" class="item" type="primary">
                <div class="menu-btn" @click="setLikeStatus()">
                    <i :class="{'iconfont':true,'icon-like':!articleDetail.hasLiked,'icon-like-fill':articleDetail.hasLiked}"></i>
                </div>
            </el-badge>
            <div class="menu-btn">
                <i class="iconfont icon-comment"></i>
            </div>
            <div class="menu-btn">
                <i class="iconfont icon-share"></i>
            </div>
        </div>
        <div class="article-container">
            <div class="domain">
                <div :class="{'top':true,'no-cover':articleDetail.cover_url==''}">
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
                            <span>{{articleDetail.create_username}}</span>
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
            <comment />
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
    getArticleDetail,
    likeOrUnlike
} from "@/api/api";
export default {
    name: "articleDetail",
    components: {
        comment: () => import("@/components/common/comment")
    },
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
        //点赞，取消点赞
        async setLikeStatus() {
            if (this.articleDetail && this.articleDetail.id) {
                let params = {
                    articleId: this.articleDetail.id,
                    like: this.articleDetail.hasLiked ? -1 : 1
                }
                let res = await likeOrUnlike(params);
                console.log(res);
            }else{
                this.$message.info("文章加载中...")
            }

        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/views/articleDetail.scss";
</style>
