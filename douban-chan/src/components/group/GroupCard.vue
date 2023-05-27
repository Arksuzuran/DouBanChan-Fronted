<!-- 小组卡片 -->
<!-- 使用位置：GroupList.vue -->
<!-- params:
        @group: 小组信息对象
-->
<template>
    <div class="groupcard-container">
        <div class="groupcard-infos">
            <!-- 对于管理员用户 显示特殊上标 -->
            <div class="groupcard-admin" v-if="userIsAdmin">管理</div>
            <img class="groupcard-img" :src="group.groupAvatarImgUrl" />
            <div class="groupcard-info">
                <div class="groupcard-name">
                    {{ groupName }}
                </div>
                <div class="groupcard-intro">
                    {{ groupIntroduction }}
                </div>
                <div class="groupcard-stats">
                    <p class="groupcard-flex flex-col">
                        帖子
                        <span class="groupcard-state-value">
                            {{ group.groupPostNumber }}
                        </span>
                    </p>
                    <p class="groupcard-flex">
                        成员
                        <span class="groupcard-state-value">
                            {{ group.groupFollowNumber }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div>
            <!-- 对于未加入小组的用户 -->
            <button class="groupcard-request" type="button" @click="handleEnterGroupPage" v-if="!userInGroup">
                进入小组主页
            </button>
            <button class="groupcard-request" type="button" @click="handleJoinGroup" v-if="!userInGroup">
                申请加入小组
            </button>
            <!-- 对于已加入小组的用户 -->
            <button class="groupcard-request groupcard-request-full" type="button" @click="handleEnterGroupPage" v-if="userInGroup">
                进入小组主页
            </button>
        </div>

    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'GroupCard',
    props: ['group'],
    data() {
        return {
        }
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),

        groupIntroduction() {
            return this.cutStrByLength(this.group.groupIntro, 18)
        },
        groupName() {
            return this.cutStrByLength(this.group.groupName, 11)
        },
        // 判断用户是否加入了小组
        userInGroup(){
            for(let member of this.group.memberList){
                if(member.userId === this.userId){
                    return true
                }
            }
            return false
        },
        // 判断用户是否是管理员
        userIsAdmin(){
            for(let member of this.group.memberList){
                if(member.userId === this.userId){
                    if(member.isAdmin === true){
                        return true
                    }
                    return false
                }
            }
            return false
        },
    },
    methods: {
        cutStrByLength(str, length) {
            if (str.length > length) {
                return str.slice(0, length - 3) + "...";
            } else {
                return str;
            }
        },
        handleEnterGroupPage() {
            this.$router.push({
                name: 'group'
            })
        },
        handleJoinGroup() {
            this.$router.push({
                name: 'group'
            })
        },
        
        
    },
}
</script>

<style scoped>
.groupcard-container {
    /* max-width: 320px; */
    border-radius: 1rem;
    background-color: rgb(255, 245, 245);
    padding: 16px;

    margin: 35px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(247, 61, 61, 0.2);
}

.groupcard-infos {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    grid-gap: 20px;
    gap: 20px;
    position: relative;
    /* margin: 10px; */
}
.groupcard-admin{
    position: absolute;
    top: 0;
    left: 0;
    height: 1.1rem;
    width: 2.1rem;
    border-radius: 0.5rem;
    background-color: rgb(248, 130, 130);
    font-size: 12px;
    color: white;
}
.groupcard-img {
    height: 7rem;
    width: 7rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(241, 232, 232, 0.8);
    background-color: rgb(255, 243, 243);
    box-shadow: 0px 2px 4px 0px rgba(247, 61, 61, 0.2);
    background: linear-gradient(to bottom right, rgb(255, 63, 63), rgb(255, 248, 248));
}


/* 图片和文本的容器 */
.groupcard-info {
    max-height: 180px;
    flex: 1;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: flex-start;
}

/* 小组名称 */
.groupcard-name {
    font-size: 26px;
    /* line-height: 16px; */
    font-weight: 600;
    color: rgb(19, 19, 19);
}

.groupcard-intro {
    margin: 10px 0;
    font-size: 14px;
    line-height: 16px;
    color: rgba(32, 31, 31, 0.9);
}

.groupcard-stats {
    width: 75%;
    border-radius: 8px;
    background-color: rgba(255, 228, 228, 0.9);
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 15px;
    line-height: 20px;
    color: rgba(0, 0, 0, 1);
}

.groupcard-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 4px;
}

.groupcard-state-value {
    font-weight: 700;
    color: rgb(255, 123, 123);
}

.groupcard-request {
    margin: 20px 10px 0 10px;
    width: 40%;
    outline: none;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    transition: all .3s ease;
    background-color: rgba(244, 236, 236, 0.9);
    ;

    cursor: pointer;
}

.groupcard-request-full {
    width: 80%;
}

.groupcard-request:hover {
    background-color: rgb(255, 79, 79);
    color: #fff;
}
</style>