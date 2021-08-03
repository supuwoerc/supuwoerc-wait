<template>
  <div :class="{'panel-component':true,'shadow':needShadow,'radius':needRadius}">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:"panel",
    props:{
        needShadow:{
            type:Boolean,
            default:true,
            desc:"添加阴影"
        },
        needRadius:{
            type:Boolean,
            default:true,
            desc:"添加圆角"
        }
    },
    data:function(){
        return {

        }
    },
    created(){},
    mounted(){},
    methods:{}
}
</script>

<style lang="scss">
@import "@/style/components/views/panel.scss";
</style>