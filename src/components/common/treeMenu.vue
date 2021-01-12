<template>
<el-drawer direction="ltr" size="60%" title="全部分类" :visible.sync="drawer" :with-header="true" :show-close="true">
    <div class="tree-menu-box">
        <el-tree :data="$store.getters.getNavigation" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</el-drawer>
</template>

<script>
export default {
    name: "treeMenu",
    data: function () {
        return {
            drawer: false,
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    created() {},
    mounted() {},
    methods: {
        handleNodeClick(data) {
            if(data&&data[this.defaultProps.children].length==0){
                this.$router.push({
                    path:`${data.router}`
                })
                this.drawer = false;
            }
        },
        showTreeMenu() {
            this.drawer = true;
        }
    }
}
</script>

<style lang="scss">
/*去除drawer的边框*/
:focus {
    outline: 0;
}
@import "@/style/components/common/treeMenu.scss";
</style>
