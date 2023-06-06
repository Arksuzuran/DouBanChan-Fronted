<template>
    <div class="setting-block">
        <div style="margin-top: 5px;"></div>
        <div class="setting">
            <span class="setting-text"><i class="fa-solid fa-pen" style="color: #000000;"></i> 修改资料</span>
            <div class="setting-true">
                <SelfInformation></SelfInformation>
            </div>
        </div>
    </div>
</template>

<script>
import SelfInformation from '../SelfInformation.vue';
export default {
    components: {
        SelfInformation,
    },
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    },
}
</script>

<style scoped>
.setting-block {
    width: 100%;
    margin-top: 20px;
    border-radius: 5px;
    background-color: white;
    display: flex;
    flex-direction: column;
}

.setting-block>div {
    margin-top: 10px;
    margin-bottom: 10px;
}

.setting {
    width: 95%;
    margin-left: 1.9%;
    background-color: transparent;
    display: flex;
    align-items: left;
    flex-direction: column;
}

.setting-text {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
}

.setting-true {
    width: 100%;
    align-items: left;
    margin-left: -180px;
    margin-top: 10px;
}
</style>