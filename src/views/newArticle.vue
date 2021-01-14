<template>
<div class="new-article">
    <markdownEditor />
</div>
</template>

<script>
export default {
    name: "newArticle",
    components: {
        markdownEditor:()=>import("@/components/views/markdownEditor")
    },
    data: function () {
        return {

        }
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style>

</style>
