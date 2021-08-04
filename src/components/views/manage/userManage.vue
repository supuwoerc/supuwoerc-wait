<template>
<div class="manage-user-page">
    <div class="manage-user">
        <div class="ulist">
            <div class="search-area">
                <el-input placeholder="姓名" v-model="keyWord" class="input-with-select">
                    <el-select v-model="role" slot="prepend" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in roleOptions" :key="index" :label="item.role_desc" :value="item.role_name" />
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="doRefresh()"></el-button>
                </el-input>
            </div>
            <ul v-loading="loading" class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                <li @click="getUserDetail(item)" v-for="(item,index) in listData" :key="index" class="infinite-list-item">
                    <div class="left">
                        <el-avatar shape="square" :size="'large'" :src="squareUrl"></el-avatar>
                        <span :class="{active:currentUser.id==item.id}">{{item.nickname}}</span>
                    </div>
                    <div class="right">
                        <el-tag type="warning" v-for="(role,rindex) in item.roleList" :key="rindex">{{role.role_desc}}</el-tag>
                    </div>
                </li>
            </ul>
        </div>
        <div class="udetail" ref="udetail">
            <div v-if="currentUser.id" v-loading="loadingDetail">

            </div>
            <el-empty v-else description="点击选择人员" :image-size="200"></el-empty>
        </div>
    </div>
    <el-dialog title="账户详情" fullscreen style="width:100%;" :visible.sync="dialogFormVisible">
        <el-form>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
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
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            noMore: false,
            loading: false,
            loadingDetail: false,
            dialogFormVisible: false,
            role: '',
            keyWord: '',
            roleOptions: [],
            listData: [],
            currentUser: {},
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
    watch: {
        role: function (newVal) {
            this.doRefresh();
        },
        currentUser(newVal){
            if(newVal&&newVal.id){
                console.log("查询人员详情")
            }
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
        getUserDetail(item) {
            let isMobile = document.documentElement.clientWidth <= 768;
            this.currentUser=item;
            if(isMobile){
                this.dialogFormVisible=true;
            }
        },
        doRefresh() {
            this.pageIndex = 1;
            this.listData = [];
            this.noMore = false;
            this.load();
        },
        async load() {
            this.loading = true;
            let res = await getUserList({
                page: this.pageIndex,
                size: this.pageSize,
                role: this.role,
                keyWord: this.keyWord
            })
            this.loading = false;
            this.pageIndex++;
            if (res && res.data && res.data.records) {
                this.listData = this.listData.concat(res.data.records);
            }
            if (res && res.pages == res.current) {
                this.noMore = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/views/manage/userManage.scss";
</style>
