<template>
<div class="new-article">
    <div class="btn-bar">
        <div class="left">
            <el-select v-model="tags" style="width:156px;" multiple collapse-tags placeholder="关联标签">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <i class="iconfont icon-wrench-fill" @click="dialogFormVisible=true" title="新增"></i>
        </div>
        <div class="right">
            <el-button type="info" icon="el-icon-s-promotion" circle></el-button>
            <el-button type="primary" icon="el-icon-check" circle></el-button>
        </div>
    </div>
    <div class="editor">
        <markdownEditor />
    </div>
    <el-dialog title="标签" :visible.sync="dialogFormVisible">
        <tag/>
    </el-dialog>

</div>
</template>

<script>
export default {
    name: "newArticle",
    components: {
        markdownEditor: () => import("@/components/views/markdownEditor"),
        tag: () => import("@/components/views/tag/tag"),
    },
    data: function () {
        return {
            dialogFormVisible:true,
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            tags: [],
            uploadAction: "/blog/uploadFile/upload",
            fileList: [{
                name: "123",
                url: "123",
            }]
        };
    },
    created() {},
    mounted() {},
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/views/newArticel.scss";
</style>
