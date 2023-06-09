<template>
  <div class="card" @click="toDetailGroup">
    <div class="card-border-top">
    </div>
    <el-image class="img" :src="groupItem.groupAvatarImgUrl" style="width: 60px; height: 60px; margin: auto; margin-top: 5px; border-radius: 30px"></el-image>
    <span class="groupTitle"> {{ groupItem.groupName }}</span>
    <div class="info"> {{groupItem.groupFollowNumber}}<span class="add">人参与</span></div>
    <div class="info"> {{groupItem.groupPostNumber}}<span class="add">个帖子</span></div>
</div>
</template>

<script>
export default {
    name: 'GroupCard',
    props: ['groupItem'],
    methods:{
        toDetailGroup(){
            this.$router.push({
                name: 'group',
                query:{
                    groupId: this.groupItem.groupId
                },
            })
        }
    }
}
</script>

<style scoped>
.add{
    font-size: 14px;
    color: gray;
}
.card {
 width: 110px;
 height: 180px;
 background: white;
 border-radius: 8px;
 box-shadow: 1px 5px 10px 0px gray;
 margin: 10px;
 cursor: pointer;
 transition: all 0.3s ease-in-out;
}

.card:hover{
    transform: scale(1.05); 
}

.card .card-border-top {
 width: 60%;
 height: 3%;
 background: pink;
 margin: auto;
 border-radius: 0px 0px 15px 15px;
}

.groupTitle {
 font-weight: 600;
 color: black;
 text-align: center;
 display: block;
 padding-top: 10px;
 font-size: 16px;
}

.card .info {
 font-weight: 400;
 color: black;
 display: block;
 text-align: center;
 padding-top: 3px;
 font-size: 12px;
}

.card button {
 padding: 4px 12px;
 display: block;
 margin: auto;
 border-radius: 8px;
 border: none;
 margin-top: 15px;
 background: lightblue;
 color: white;
 font-weight: 100;
}

.card button:hover {
 background: #534bf3;
 cursor: pointer;
}
</style>