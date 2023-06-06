<template>
    <div class="film-module-block2 clearfix">
        <el-container>
            <el-header>
                <div>
                    <i class="fa-sharp fa-solid fa-comment hot-logo" style="color: #f0710a;"></i>
                    <div style="float: left; display: inline-block;">
                        <span
                            style="float: left;margin-top: 20px;margin-left: 5px;font-size: 30px; font-weight: bold;color: #000000;">热门评论</span>
                    </div>
                </div>
            </el-header> 
            <el-main>
                <div class="card-container">
                    <div class="hot-comment" v-for="(item, index) in items" :key="index">
                        <HotComment :item="item"></HotComment>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import HotComment from "@/components/Video/HotComment.vue"
export default {
    props: ["items"],
    components: {HotComment},
}
</script>

<style scoped>
.button-for-more {
    margin-top: 5px;
    float: right;
}

.film-module-block2 {
    width: 100%;
    margin: 0 auto;
    background-color: white;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    background-color: transparent;
    gap: 0 20px;
}


.hot-logo {
    float: left;
    font-size: 50px;
    margin-top: 15px;
}
.clearfix::after {
    display: block;
    height: 0;
    content: "";
    clear: both;
    visibility: hidden;
}
</style>