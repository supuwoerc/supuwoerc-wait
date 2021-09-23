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
        <el-avatar size="large" :src="avatarUrl"></el-avatar>
    </div>
    <div class="comment-list">

    </div>
</div>
</template>

<script>
export default {
    name: "comment",
    data: function () {
        return {
            sortWay: "最热"
        }
    },
    props: {
        avatarUrl:{
            type:String,
            default:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
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
