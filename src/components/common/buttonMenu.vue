<template>
    <div class="float_button">
        <div
            @click="onBtnClicked"
            ref="floatButton"
            class="float_info"
            :style="{'width': itemWidth + 'px', 'height': itemHeight + 'px', 'left': left + 'px', 'top': top + 'px','background':$store.getters.getThemeColor}"
        >
            <i class="iconfont icon-dropbox"/>
        </div>
        <treeMenu ref="treeMenu"/>
    </div>
</template>
<script>
import treeMenu from "./treeMenu";
export default {
    name:"buttonMenu",
    components:{treeMenu},
    data() {
        return {
            clientWidth: 0,
            clientHeight: 0,
            timer: null,
            currentTop: 0,
            left: 0,
            top: 0,
        }
    },
    props: {
        itemWidth: {            // 悬浮按钮宽度
            type: Number,
            default: 50
        },
        itemHeight: {           // 悬浮按钮高度
            type: Number,
            default: 50
        },
        gapWidth: {             // 距离左右两边距离     
            type: Number,
            default: 0
        },
        coefficientHeight: {    // 从上到下距离比例
            type: Number,
            default: 0.55
        }
    },
    created() {
        this.clientWidth = document.documentElement.clientWidth
        this.clientHeight = document.documentElement.clientHeight
        this.left = this.clientWidth - this.itemWidth - this.gapWidth
        this.top = this.clientHeight * this.coefficientHeight
    },
    methods: {
        onBtnClicked(){
            this.$refs.treeMenu.showTreeMenu();
            this.$emit("onFloatBtnClicked")
        },
        handleScrollStart() {
            this.timer && clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.handleScrollEnd()
            }, 300)
            this.currentTop = document.documentElement.scrollTop || document.body.scrollTop
            if(this.left > this.clientWidth / 2) {
                this.left = this.clientWidth - this.itemWidth / 2
            } else {
                this.left = -this.itemWidth / 2
            }
        },
        handleScrollEnd(){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if(scrollTop === this.currentTop) {
                if(this.left > this.clientWidth/2) {
                    this.left = this.clientWidth - this.itemWidth - this.gapWidth
                } else {
                    this.left = this.gapWidth
                }
                clearTimeout(this.timer)
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            const floatButton = this.$refs.floatButton
            floatButton.addEventListener("touchstart", () => {
                floatButton.style.transition = 'none'
            })
            
            // 在拖拽的过程中，组件应该跟随手指的移动而移动。
            floatButton.addEventListener("touchmove", (e) => {
                if (e.targetTouches.length === 1) {         // 一根手指
                    let touch = e.targetTouches[0]
                    this.left = touch.clientX - 20
                    this.top = touch.clientY - 25
                }
            })
            
			// 拖拽结束以后，重新调整组件的位置并重新设置过度动画。
            floatButton.addEventListener("touchend", () => {
                floatButton.style.transition = 'all 0.3s'
                if(this.left > document.documentElement.clientWidth / 2) {
                    this.left = document.documentElement.clientWidth - 50
                }else{
                    this.left = 0
                }
            })
        })
    },
    beforeDestroy(){
        // 添加监听页面滚动
        window.removeEventListener('scroll', this.handleScrollStart)
    },
    destroyed() {}
}
</script>
<style lang="scss">
@import "@/style/components/common/buttonMenu.scss";
</style>
