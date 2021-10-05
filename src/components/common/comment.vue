<template>
<div class="comment-component">
    <div class="total-message">
        <span>999条相关讨论</span>
        <el-radio-group v-model="sortWay" size="mini">
            <el-radio-button label="最热"></el-radio-button>
            <el-radio-button label="最新"></el-radio-button>
        </el-radio-group>
    </div>
    <div class="new-comment">
        <div class="edit-input">
            <el-avatar size="large" :src="avatarUrl"></el-avatar>
            <el-input show-word-limit maxlength="300" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="newComment">
            </el-input>
        </div>
        <div class="btn-bar">
            <span>Tips：win+;可调起系统emoji面板</span>
            <el-button type="primary" size="mini">发送</el-button>
        </div>
    </div>
    <div class="comment-list">
        <div class="item-comment">
            <div class="comment-info">
                <el-avatar size="large" :src="avatarUrl"></el-avatar>
                <div class="info">
                    <div class="user-name">
                        <div>
                            <span>测试用户test1</span>
                            <el-tag size="mini">作者</el-tag>
                        </div>
                        <div class="like">
                            <i class="iconfont icon-like"></i>999
                        </div>
                    </div>
                    <div class="content">
                        测试回复测试回复测试回复测试回复测试回复测试回测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复测试回复复测试回复测试回复测试回复
                    </div>
                    <div class="comment-time">
                        <span>2020-02-02 19:00:58</span>
                        <div class="btns">
                            <span>
                                <i class="iconfont icon-team"></i>展开/折叠
                            </span>
                            <el-popover placement="left-start" width="500" trigger="click">
                                <el-input show-word-limit maxlength="300" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newComment">
                                </el-input>
                                <div class="btn-bar" style=" display: flex;
                                align-items: center;
                                justify-content: space-between;  width: 100%;
                                margin-top: 8px;">
                                    <span>Tips：win+;可调起系统emoji面板</span>
                                    <el-button type="primary" size="mini">发送</el-button>
                                </div>
                                <span slot="reference">
                                    <i class="iconfont icon-message"></i>回复
                                </span>
                            </el-popover>
                            <el-popconfirm title="删除评论及回复?">
                                <span slot="reference">
                                    <i class="iconfont icon-delete"></i>删除
                                </span>
                            </el-popconfirm>
                        </div>
                    </div>
                    <div class="children-comment-list">
                        <div class="list-item">
                            <div class="user-name">
                                <span>测试用户test2</span>
                            </div>
                            <span class="separator">:</span>
                            <span>这是一条回复</span>
                            <div class="btns">
                                <div class="like">
                                    <i class="iconfont icon-like"></i>999
                                </div>
                                <el-popover placement="bottom" width="500" trigger="click">
                                    <el-input show-word-limit maxlength="300" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newComment">
                                    </el-input>
                                    <div class="btn-bar" style=" display: flex;
                                        align-items: center;
                                        justify-content: space-between;  width: 100%;
                                        margin-top: 8px;">
                                        <span>Tips：win+;可调起系统emoji面板</span>
                                        <el-button type="primary" size="mini">发送</el-button>
                                    </div>
                                    <span slot="reference">
                                        <i class="iconfont icon-message"></i>回复
                                    </span>
                                </el-popover>
                                <el-popconfirm title="删除评论及回复?">
                                    <span slot="reference">
                                        <i class="iconfont icon-delete"></i>删除
                                    </span>
                                </el-popconfirm>
                            </div>
                        </div>
                        <div class="list-item">
                            <div class="user-name">
                                <span>测试用户test1</span>
                                <el-tag size="mini">作者</el-tag>
                            </div>
                            <span class="separator">回复</span>
                            <div class="user-name">
                                <span>@测试用户test2</span>
                            </div>
                            <span class="separator">:</span>
                            <span>回复的回复</span>
                            <div class="btns">
                                <div class="like">
                                    <i class="iconfont icon-like"></i>999
                                </div>
                                <el-popover placement="bottom" width="500" trigger="click">
                                    <el-input show-word-limit maxlength="300" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newComment">
                                    </el-input>
                                    <div class="btn-bar" style=" display: flex;
                                align-items: center;
                                justify-content: space-between;  width: 100%;
                                margin-top: 8px;">
                                        <span>Tips：win+;可调起系统emoji面板</span>
                                        <el-button type="primary" size="mini">发送</el-button>
                                    </div>
                                    <span slot="reference">
                                        <i class="iconfont icon-message"></i>回复
                                    </span>
                                </el-popover>
                                <el-popconfirm title="删除评论及回复?">
                                    <span slot="reference">
                                        <i class="iconfont icon-delete"></i>删除
                                    </span>
                                </el-popconfirm>
                            </div>
                        </div>
                    </div>
                </div>
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
