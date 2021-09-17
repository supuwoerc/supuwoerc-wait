<template>
<div class="article-list-page">
    <div class="list-container">
        <VirtualCollection :cellSizeAndPositionGetter="cellSizeAndPositionGetter" :scrollToBottomRange="50" v-on:scrolled-to-bottom="loadList" :collection="list" :height="height" :width="width">
            <div slot="cell" slot-scope="props" style="border:1px solid red;height:100%;">123</div>
        </VirtualCollection>
    </div>
</div>
</template>

<script>
export default {
    name: "articleList",
    components: {

    },
    data: function () {
        return {
            list: new Array(40).fill(0).map((_, index) => ({
                data: '#' + index
            })),
            width: 0,
            height: 0,
            col: 2,
        };
    },
    created() {},
    mounted() {
        this.initCollection();
    },
    watch: {

    },
    methods: {
        //加载数据的方法
        async loadList() {
            console.log("loaddata")
            this.list.push(Math.random().toFixed(2) * 100)
        },
        initCollection() {
            this.width = document.querySelector('.list-container').offsetWidth;
            this.height = document.querySelector('.list-container').offsetHeight;
            this.col = this.width >= 1200 ? 4 : this.width <= 768 ? 2 : 3;
        },
        cellSizeAndPositionGetter(item, index) {
            let gapX = 20; //水平间隔
            let gapY = 20; //垂直间隔
            let height = (index % this.col)==2?150:280; //高度
            let width = (this.width - ((this.col - 1) * gapX)) / this.col;
            let result = {
                width: width,
                height: height,
                x: (index % this.col) * (width + gapX),
                y: parseInt(index / this.col) * (height + gapY)
            };
            return result;
        }

    },
};
</script>

<style lang="scss" scoped>
@import "@/style/views/articleList.scss";
</style>
