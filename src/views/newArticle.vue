<template>
<div class="new-article">
    <div class="btn-bar">
        <div class="left">
            <el-select v-model="tags" style="width:156px;" multiple collapse-tags placeholder="关联标签">
                <el-option v-for="item in options" :key="item.id" :label="item.tag_name" :value="item.id">
                </el-option>
            </el-select>
            <i class="iconfont icon-wrench-fill" @click="dialogFormVisible=true" title="新增"></i>
        </div>
        <div class="right">
            <el-button type="primary" icon="el-icon-s-promotion" title="上传" circle></el-button>
            <el-button type="primary" icon="el-icon-document-remove" title="信息" @click="dialogInfoVisible=true" circle></el-button>
        </div>
    </div>
    <div class="editor">
        <markdownEditor />
    </div>
    <el-dialog title="标签" :visible.sync="dialogFormVisible">
        <tag />
    </el-dialog>
    <el-dialog title="文章信息" :visible.sync="dialogInfoVisible">
        <el-form :model="form" label-position="right">
            <el-form-item label="文章标题" label-width="80px">
                <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="封面图片" label-width="80px">
                <el-upload :class="{'avatar-uploader':true,'hide':hideUploader}" list-type="picture-card" :limit="1" :on-remove="handleRemove" action="" :http-request="postCover" :before-upload="beforeCoverUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogInfoVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogInfoVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    getTags,
    uploadCoverImg
} from "../api/api";
export default {
    name: "newArticle",
    components: {
        markdownEditor: () => import("@/components/views/markdownEditor"),
        tag: () => import("@/components/views/tag/tag"),
    },
    data: function () {
        return {
            dialogFormVisible: false,
            dialogInfoVisible: false,
            options: [],
            tags: [],
            form: {
                title: "",
                cover_url: "",
                cover_id: ""
            },
            fileList: [{
                name: "123",
                url: "123",
            }]
        };
    },
    watch: {
        dialogFormVisible: function (newVal) {
            if (!newVal) {
                this.$message.warning("刷新标签中...");
                this.getTags();
            }
        },
    },
    computed: {
        hideUploader: function () {
            return this.form.cover_url != '';
        }
    },
    created() {
        this.getTags();
    },
    mounted() {},
    methods: {
        async getTags() {
            let res = await getTags();
            if (res && res.code == 200) {
                this.$set(this, 'options', res.data);
                this.$message.success("标签加载完成");
            }
        },
        beforeCoverUpload(file) {
            const imgs = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
            const isJPG = imgs.includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error("上传头像图片格式错误!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小过大!");
            }
            return isJPG && isLt2M;
        },
        async postCover(param) {
            let p = new FormData();
            p.append("file", param.file);
            let res = await uploadCoverImg(p);
            if (res && res.code == 200) {
                this.form.cover_url = res.data.url;
                this.form.cover_id = res.data.id;
            }
        },
        handleRemove(file, fileList) {
            this.form.cover_url = "";
            this.form.cover_id = "";
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/views/newArticel.scss";
</style>
