<template>
<div class="home-page">
    <div class="grid-menu">
        <div>
            <panel>
                <div class="menu-item">

                </div>
            </panel>
        </div>
        <div>
            <panel>
                <div class="menu-item">

                </div>
            </panel>
        </div>
        <div>
            <panel>
                <div class="menu-item">

                </div>
            </panel>
        </div>
        <div>
            <panel>
                <div class="menu-item">

                </div>
            </panel>
        </div>
    </div>
</div>
</template>

<script>
import panel from "@/components/views/panel";
export default {
    name: "home",
    components: {
        panel
    },
    data: function () {
        return {}
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style lang="scss">
@import "@/style/views/home.scss";
</style>
