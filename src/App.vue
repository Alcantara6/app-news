<template>
    <div id="app">
        <!-- 页面标题 -->
        <header id="page-title">
            <h1><a href="javascript:void(0)">头条新闻</a></h1>
        </header>
        <!-- 新闻类别选项卡 -->
        <div id="news-classify">
            <h2>选择新闻类别：</h2>
            <select class='news-select' v-model="newsKey" @change="getPosts(newsKey)">
                <option disabled value="">请选择</option>
                <option v-for="(newsValue,newskey) in newsClassify" :value="newskey">
                    {{ newsValue }}
                </option>
            </select>
        </div>
        <!-- 新闻标题和加载图案 -->
        <h2 class="news-title" v-text="newsTitle" v-if="!loading"></h2>
        <img class="loader" v-if="loading" src="./assets/loader-point.gif" alt="加载中">
        
        <!-- 新闻内容 -->
        <router-view :result="result"></router-view>
    </div>
</template>

<script>
// 注意接口在./config/index.js中proxyTable代理中rewrite：、/api对应http://v.juhe.cn
const juheBaseUrl = '/api/toutiao/index?type=';
const APIkey = '2b4ea65cb2932dd7491382960699bc17';
// 获取url的函数
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
          this.newsTitle = this.newsKey!=="头条"?`${this.newsClassify[this.newsKey]}新闻`:`今日头条`// 获取新闻数目                   
          this.newsTitle += `(${res.data.result.data.length})`; 
        })
        .catch(err => {
          console.log(err);
        })
      }
    },

    mounted() {
      // 刷新页面时进入默认的今日头条
      this.getPosts(this.newsKey);
    }
}
</script>

<style>
/*1.标题*/
#page-title {
    margin: 20px 0 30px;
    font-size: 20px;
    text-align: center;
}

/*2.新闻类别选择、加载、新闻标题*/
#news-classify {
    text-align: center;
}
#news-classify h2 {
    display: inline-block;
    line-height: 30px;
}
.news-select {
    width: 200px;
    height: 30px;
    border: 1px solid #b62;
    cursor: pointer;
    outline: none;
}

/*3. 新闻标题*/
.news-title {
    margin: 30px 30px 10px;
    font: 18px/2 "Hiragino GB";
    text-align: center;
    border-bottom: 2px dotted #e8a317;
}
.loader {
    display: block;
    max-width: 100px;
    margin: 0 auto;
}

* {
    margin: 0;
    padding: 0;
}
body {
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
    vertical-align: top;
}
</style>
