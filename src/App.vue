<template>
    <div id="app">
        <!-- 页面标题 -->
        <header id="page-title"><h1><a href="javascript:void(0)">头条新闻</a></h1></header>
        <!-- 新闻类别选项卡 -->
        <div id="news-classify">
            <h2>选择新闻类别：</h2>
            <select class='news-select' v-model="newsKey">
                <option disabled value="">请选择</option>
                <option v-for="(newsValue,newskey) in newsClassify" :value="newskey">
                    {{ newsValue }}
                </option>
            </select>
            <button class='news-classify-btn' type="button" @click="getPosts(newsKey)">确认</button>
        </div>
        <!-- 新闻标题和加载图案 -->
        <h2 class="news-title" v-text="newsTitle" v-if="!loading"></h2>
        <img class="loader" v-if="loading" src="./assets/loader-point.gif" alt="加载中">
        <!-- 新闻内容 -->
        <router-view :result="result"></router-view>
    </div>
</template>

<script>
const juheBaseUrl = '/api/toutiao/index?type=';       // 注意接口rewrite
const APIkey = '2b4ea65cb2932dd7491382960699bc17';
let buildUrl = keywords => juheBaseUrl + keywords + '&key=' + APIkey;

export default {
    name: 'app',
    data() {
      return {
        result: [],
        newsClassify: {
            'top': '头条',
            'shehui': '社会',
            'guonei': '国内',
            'guoji': '国际',
            'yule': '娱乐',
            'tiyu': '体育',
            'junshi': '军事',
            'keji': '科技',
            'caijing': '财经',
            'shishang': '时尚'
        },
        newsKey: '头条',
        newsTitle: '',
        loading: true 
      }
    },
    methods: {
      getPosts(keywords) {
        // 开始加载
        this.loading = true;
        let url = buildUrl(keywords);
        this.$axios.get(url).then(res => {
          // 加载图案消失
          this.loading = false;
          // 获取新闻数据
          this.result = res.data.result.data;
          // 获取新闻类别标题
          this.newsTitle = this.newsKey!=="top"?`Top news in ${this.newsKey}  today`:`Top news today`;                      
          // 获取新闻数目                   
          this.newsTitle += `(${res.data.result.data.length})`; 
        }).catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.getPosts(this.newsKey);
    }
}
</script>

<style>
/* 如果最后一行不排满，会存在倒数第二行很大的padding-bottom */
* {
    margin: 0;
    padding: 0;
}
body {
    min-width: 480px;
    font: 12px/1.5 Tahoma, Helvetica, Arial, "Microsoft YaHei", "Hiragino GB", "Sans-serif";
}
ul,ol{
    list-style-type:none;
}
a{
    text-decoration: none;
}
a:link{
    color:#000;
}
a:hover{
    color:#0000A0;
}
a:visited{
    text-decoration: underline;
    color:#00F;
}
a img, 
div img{
    display: block;
}
/*1.标题*/
#page-title {
    margin: 20px 0 30px 0;
    font-size: 20px;
    text-align: center; 
}
/*2.新闻类别选择、加载、新闻标题*/
#news-classify {
    width: 600px;
    margin: 0 auto 20px;
    vertical-align: top;
}
#news-classify h2 {
    display: inline-block;
    line-height: 35px;
}
.news-select {
    width: 300px;
    height: 35px;
    border: 1px solid #b62;
    cursor: pointer;
    outline: none;
}
.news-classify-btn {
    margin-left: 20px;
    width: 80px;
    height: 35px;
    font-weight: 700;
    border: 1px solid #b62;
    background: #fdeef4;
    opacity: 0.7;
    cursor: pointer;
}
.news-classify-btn:hover {
    opacity: 1;
}
.news-title {
    margin: 40px 0 10px 0;
    font: 20px/2 "Microsoft YaHei";
    text-align: center;
}
.loader {
    display: block;
    max-width: 100px;
    margin: 0 auto;
}
</style>
