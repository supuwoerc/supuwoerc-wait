<template>
<div class="manager-page">
    <panel>
        <div class="content">
            <el-tabs lazy tab-position="top" style="height: 100%;">
                <el-tab-pane label="用户管理">
                    <user-mange/>
                </el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="菜单管理">菜单管理</el-tab-pane>
                <el-tab-pane label="权限管理">权限管理</el-tab-pane>
            </el-tabs>
        </div>
    </panel>
</div>
</template>

<script>
export default {
    name: "manage",
    components: {
        panel: () => import("@/components/views/panel"),
        userMange: () => import("@/components/views/manage/userManage"),
    },
    data: function () {
        return {}
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
@import "@/style/views/manage.scss";
</style>
