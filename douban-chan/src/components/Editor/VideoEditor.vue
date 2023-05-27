<template>
    <div class="clearfix">
        <div style="text-align: left; width: 70%; display: inline-block;float: left;">
            <div style="border: 1px solid #ccc;">
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
        </div>
        <div class="right-side">
            <div class="image">
                <img
                    style="width: 100px; height: 100px"
                    :src="imageUrl"
                    ></img>
                {{ this.name }}
                {{ this.director }}
                {{ this.actor }}
                {{ this.onDate }}
            </div>
        </div>
    </div>
    
    
  </template>
  
  <script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
    components: { Editor, Toolbar },
    props: ['videoItem'],
    data() {
        return {
            imageUrl: '',
            name: '',
            director: '',
            actor: [],
            onDate: '',

            editor: null,
            html: '<p>hello</p>',
            toolbarConfig: {
                excludeKeys :[
                    "insertTable",
                    "codeBlock",
                    "lineHeight",
                    "todo",
                    "group-indent"
                ]
            },
            editorConfig: {
                placeholder: '请输入内容', 
                MENU_CONF: {
                    'uploadImage': {
                        server: 'http://127.0.0.1:8000/picture/upload/',
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
                            var url = 'http://127.0.0.1:8000' + res.picture['p_content']
                            console.log(res.picture['p_content'])
                            var alt = res.picture['p_content']
                            var href = 'http://127.0.0.1:8000' + res.picture['p_content']
                            console.log(url)
                            insertFn(url, alt, href)
                        },
                        onSuccess(file, res) {          // JS 语法
                            console.log(`${file.name} 上传成功`, res)
                        },
                    }
                }
            },
            mode: 'default', // or 'simple'
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
    },
    mounted() {
        this.imageUrl = "http://127.0.0.1:8000/images/avatar.webp",
        this.name = this.videoItem['name'],
        this.onDate = this.videoItem['onDate'],
        this.director = this.videoItem['director'],
        this.actor = this.videoItem['actor'].slice(0, 2)
        this.writer = this.videoItem['writer']
        console.log(this.imageUrl)
        console.log(this.videoItem['imageSrc'])
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
});
  </script>

<style scoped>
    .clearFix::after {
        content: "";
        display: block;
        clear: both;
    }
    .right-side {
        align-content: center;
    }
</style>