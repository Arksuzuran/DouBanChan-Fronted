<template>
    <div class="container">
            <div class="clearFix" style="display: flex">
            <div style="text-align: left; width: 70%; display: inline-block; flex: 2;margin-top: 20px; ">
                <div style="margin-bottom: 5px">
                    <span>你的评分</span>
                    <el-rate v-model="rate" :max="10"></el-rate>
                </div>
                
                <el-input v-model="title" placeholder="输入标题" class="title"></el-input>
                <div style="border: 1px solid #ccc; margin-top: 10px;">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editor"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    style="height: 300px; overflow-y: hidden;"
                    v-model="html"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="onCreated"
                    />
                </div>
                <div class="notice" v-if="editor">已输入{{this.editor.getText().length}}个字符</div>
                <el-button type="success" class="button" @click="uploadReview">发表</el-button>
            </div>
            <div class="right-side">
                <div class="image">
                    <img
                        style="width: 150px; height: 200px;"
                        :src="videoItem.m_profile_photo" @click="toVideoDetail(this.videoItem.m_id)"/>
                </div>
                <div class="detail">
                    <div style="text-align: left;" v-if="this.videoItem.m_type !== 3">
                        <div>
                            <span>电影名：</span>{{ videoItem.m_name }}
                        </div>
                        <div>
                            <span>导演：</span>{{ videoItem.m_director }}
                        </div>
                        <div>
                            <span>主演：</span>{{ videoItem.m_actor }}
                        </div>
                        <div>
                            <span>上映时间：</span>{{ videoItem.m_year }}
                        </div>
                    </div>
                    <div style="text-align: left;" v-else>
                        <div>
                            <span>书名：</span>{{ videoItem.m_name }}
                        </div>
                        <div>
                            <span>作者：</span>{{ videoItem.m_author }}
                        </div>
                        <div>
                            <span>出版社</span>{{ videoItem.m_publisher }}
                        </div>
                        <div>
                            <span>出版时间：</span>{{ videoItem.m_year }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { createEditor } from '@wangeditor/editor';
import qs from "qs"
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default Vue.extend({
    components: { Editor, Toolbar },
    computed: {
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    },
    data() {
        return {
            title: '',  //输入的标题
            rate: 0,    //评分

            videoItem: {},

            html: '',
            editor: null,
            toolbarConfig: {
                excludeKeys :[
                    "insertTable",
                    "codeBlock",
                    "lineHeight",
                    "todo",
                    "group-indent",
                ]
            },
            editorConfig: {
                placeholder: '请输入内容', 
                MENU_CONF: {
                    'uploadImage': {
                        server: 'http://10.193.202.49:8000/picture/upload/',
                        // server: 'http://127.0.0.1:8000/picture/upload/',
                        fieldName: 'p_content',
                        // 单个文件的最大体积限制，默认为 2M
                        maxFileSize: 5 * 1024 * 1024, // 5M
                        // 最多可上传几个文件，默认为 100
                        maxNumberOfFiles: 10,
                        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
                        allowedFileTypes: ['image/*'],
                        // 将 meta 拼接到 url 参数中，默认 false
                        metaWithUrl: false,
                        // 超时时间，默认为 10 秒
                        timeout: 5 * 1000, // 5 秒
                        customInsert(res, insertFn){
                            var url = res.picture['p_content']
                            console.log(res.picture['p_content'])
                            var alt = res.picture['p_content']
                            var href = res.picture['p_content']
                            console.log(url)
                            insertFn(url, alt, href)
                        },
                        onSuccess(file, res) {          // JS 语法
                            console.log(`${file.name} 上传成功`, res)
                        },
                    }
                }
            },
            
            mode: 'default', // or 'simple',
            
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },

        toReviewPage(textId) {
            this.$router.push({ name: 'videoReview', params: { m_id: this.videoItem.m_id, t_id: textId} })
        },
        uploadReview(){
            if (this.title === '')
            {
                this.$message.error('要有标题哟QAQ');
            }
            else if (this.editor.getText().length < 25){
                this.$message.error('字数至少要25字哟QAQ');
            }
            else{
                this.$axios({
                    method: "post",
                    data: qs.stringify({
                        u_id: this.userId,
                        m_id: this.$route.params.id,
                        t_rate: this.rate,
                        t_description: this.editor.getHtml(),
                        t_topic: this.title,
                    }),
                    url: "/media/comment_media/",
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                    })
                    .then((res) => {
                        if (res.data.msg === 0)
                        {
                            this.$message.success('发表成功');
                            this.toReviewPage(res.data.t_id);
                            console.log(res.data.t_id)
                            console.log(this.videoItem.m_id)
                        }
                    })
                    .catch((err) => {
                        this.$message({
                        type: "error",
                        message: "网络出错QAQ",
                        });
                    });
            }
            
        },
        getVideo() {
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                m_id: this.$route.params.id
            }),
            url: "/media/query_single/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                this.videoItem = res.data.media;
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
            },
    },
    mounted() {
        //根据this.$route.params.id从后端获得数据并更新下列数据
        this.getVideo()
        this.isReady = true
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
});
</script>

<style scoped>
    .container{
        width: 75%;
        margin: 0 auto;
        background-color: white;
    }
    .clearFix::after {
        content: "";
        display: block;
        clear: both;
    }
    .right-side {
        margin-top: 50px;
        align-content: center;
        flex: 1;
    }
    .title{
        font-size: 20px;
    }
    .notice{
        color: gray;
    }
    .button{
        float: right;
        margin-top: 20px;
    }
    .detail{
        font-size: 18px;
        width: 50%;
        margin: 0 auto;
    }
    .detail div span{
        color: gray;
    }
</style>