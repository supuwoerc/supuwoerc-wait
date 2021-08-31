<template>
<div class="tag-list">
    <draggable :componentData="componentData" :list="list" class="list-group" draggable=".item" :animation="100">
        <div class="list-group-item item" v-for="(element,index) in list" :key="index">
            <div>
                <i class="icon-unorderedlist iconfont" style="color:#606266;font-size:28px;margin-right:8px;"></i>
                <el-input :ref="'input_i'+index" maxlength="10" style="width:120px !important;" v-model="element.tag_name" size="small" autocomplete="off"></el-input>
            </div>
            <div>
                <i class="icon-delete iconfont" @click="deleteItem(element,index)"></i>
            </div>
        </div>
        <div slot="header" class="btn-group" role="group" aria-label="Basic example" key="header">
            <span>添加/保存</span>
            <div>
                <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="add()"></el-button>
                <el-button type="primary" size="mini" icon="el-icon-check" circle @click="save()"></el-button>
            </div>
        </div>
    </draggable>
</div>
</template>

<script>
import draggable from "vuedraggable";
import {
    getTags,
    saveTags,
    deleteTag
} from "../../../api/api";
export default {
    name: "tag",
    components: {
        draggable,
    },
    data: function () {
        return {
            list: [],
            dragging: false,
            componentData: {
                props: {
                    type: "transition",
                    name: "flip-list",
                },
            },
        };
    },
    created() {
        this.getTags();
    },
    mounted() {},
    methods: {
        add() {
            if (this.list.length >= 15) {
                this.$message.error("标签数不能大于15!");
                return;
            }
            this.list.unshift({
                id: null,
                tag_name: ""
            });
            this.$nextTick(() => {
                this.$refs['input_i0'][0].focus();
            })
        },
        async save() {
            let canSave = true;
            this.list.forEach((item, index) => {
                if (!item.tag_name || item.tag_name.trim() == "") {
                    this.$refs[`input_i${index}`][0].focus();
                    canSave = false;
                }
            })
            if (!canSave || this.list.length < 1) {
                this.$message.error("请输入标签内容");
            } else {
                let res = await saveTags(this.list);
                if (res && res.code == 200) {
                    this.$message.success(res.message);
                    this.getTags();
                }
            }
        },
        async getTags() {
            let res = await getTags();
            if (res && res.code == 200) {
                this.$set(this, 'list', res.data);
            }
        },
        async deleteTag(item) {
            let res = await deleteTag(item);
            if (res && res.code == 200) {
                this.$message.success(res.message);
                this.getTags();
            }
        },
        deleteItem(item, index) {
            if (item.id) {
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteTag(item);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            } else {
                this.list.splice(index, 1);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/components/views/tag/tag.scss";
</style>
