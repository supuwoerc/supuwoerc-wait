<template>
<div class="user-info">

</div>
</template>

<script>
import {
    getServerData,
    postServerData
} from "../api/api";
export default {
    name: "userInfo",
    data: function () {
        return {

        }
    },
    created() {
        this.getUserinfo();
        //this.getUserinfo();
        //this.getUserinfo();
    },
    mounted() {},
    methods: {
        async getUserinfo() {
            let res = await getServerData("/user/info", null);
            console.log(res)
        }
    }
}
</script>

<style>

</style>
