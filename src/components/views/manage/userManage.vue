<template>
<div class="manage-user">
    <div class="search-area">
        <el-input placeholder="姓名" v-model="keyWord" class="input-with-select">
            <el-select v-model="role" slot="prepend" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(item,index) in roleOptions" :key="index" :label="item.role_desc" :value="item.role_name" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="doRefresh()"></el-button>
        </el-input>
    </div>
    <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <li v-for="(item,index) in listData" :key="index" class="infinite-list-item">{{ item.nickname }}</li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
</div>
</template>

<script>
import {
    getRoleList,
    getUserList
} from "../../../api/api"
export default {
    name: "userMange",
    data: function () {
        return {
            noMore: false,
            loading: false,
            role: '',
            keyWord: '',
            roleOptions: [],
            listData: [],
            pageIndex: 1,
            pageSize: 10
        }
    },
    computed: {
        disabled() {
            return this.loading || this.noMore;
        }
    },
    created() {
        this.getRoleOptions();
    },
    watch:{
        role:function(newVal){
            console.log(newVal)
            this.doRefresh();
        }
    },
    mounted() {},
    methods: {
        async getRoleOptions() {
            let res = await getRoleList();
            if (res.data && res.data.length) {
                this.roleOptions = res.data;
            }
        },
        doRefresh(){
            this.pageIndex=1;
            this.listData=[];
            this.noMore=false;
            this.load();
        },
        async load() {
            this.loading = true;
            let res = await getUserList({
                page: this.pageIndex,
                size: this.pageSize,
                role: this.role,
                keyWord:this.keyWord
            })
            this.loading = false;
            this.pageIndex++;
            if (res && res.data&&res.data.records) {
                this.listData = this.listData.concat(res.data.records);
            }
            if(res&&res.pages==res.current){
                this.noMore=true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/views/manage/userManage.scss";
</style>
