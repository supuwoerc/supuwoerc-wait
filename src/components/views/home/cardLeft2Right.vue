<template>
<div :class="getClass" @click="cardClickHandler()">
    <div class="image-box animate__animated animate__zoomIn">
        <img :src="info.cover" alt="" srcset="" />
    </div>
    <div class="desc-box">
        <div class="menu-title line-ell animate__animated animate__slideInDown">
            {{info.name}}
        </div>
        <div class="line3-ell menu-desc animate__animated animate__slideInDown">
            {{info.content}}
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "cardLeft2Right",
    props: {
        info: {
            type: Object,
            default: () => {
                return {
                    cover: require('@/assets/mimic/a1.png'),
                    name: "name",
                    content: "content",
                    class: "back-young"
                }
            }
        }
    },
    computed: {
        getClass: function () {
            let defaultClass = {
                'menu-item': true,
                'transiton-lineG': true,
            }
            let result = {
                ...defaultClass,
                [this.info.class]: true
            };
            return result;
        }
    },
    data: function () {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        cardClickHandler() {
            this.$emit("cardClick",this.info);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/common/lineG.scss";

.menu-item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20px;
    cursor: pointer;

    .image-box {
        width: 120px;
        height: 120px;
        flex-shrink: 0;
        flex-grow: 0;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .desc-box {
        font-size: 22px;
        flex: 1;
        overflow: hidden;
        height: 60%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        box-sizing: border-box;
        padding-left: 30px;
        font-weight: bold;
        transition: all 0.2s linear;

        div {
            color: #fff;
            word-wrap: break-word;
            word-break: break-all;
            width: 100%;
            &.menu-desc {
                font-size: 16px;
            }
        }
    }

    &:hover {
        .desc-box {
            font-size: 24px;
        }
    }
}
</style>
