<template>
<div class="comment-component">
    <div class="total-message">
        <span>999条相关讨论</span>
        <el-radio-group v-model="sortWay" size="small">
            <el-radio-button label="最热"></el-radio-button>
            <el-radio-button label="最新"></el-radio-button>
        </el-radio-group>
    </div>
    <div class="new-comment">
        <div class="edit-input">
            <el-avatar size="large" :src="avatarUrl"></el-avatar>
            <el-input show-word-limit maxlength="300" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newComment">
            </el-input>
        </div>
        <div class="btn-bar">
            <el-button type="primary" size="small">发送</el-button>
        </div>
    </div>
    <div class="comment-list">
        <div class="item-comment">
            <div class="comment-info">
                <el-avatar size="large" :src="avatarUrl"></el-avatar>
                <div class="info">
                    <div></div>
                </div>
            </div>
            <div class="content">
                测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "comment",
    data: function () {
        return {
            sortWay: "最热",
            newComment: "",
        }
    },
    props: {
        avatarUrl: {
            type: String,
            default: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        }
    },
    created() {},
    mounted() {},
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/common/comment.scss";
</style>
