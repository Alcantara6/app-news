<template>
	<section id="news-container">
		<div class="news-card" v-for="result in processedPosts">
            <header class="card-title">
                <h3 v-text="result.title"></h3>
            </header>
            <article class="card-content">
                <a :href="result.url" target="_blank">
                    <img :src="result.img_url" alt="result.title">
                </a>
                <div class="annext">
                	<span class="author" v-text="result.author_name"></span>
                	<span class="time" v-text="result.date"></span>
                </div>
            </article>
		</div>
	</section>
</template>

<script>
export default {
	name: 'news',
	props: ['result'],
    computed: {
		processedPosts() {
		// 给每一项添加img_url
		let posts = this.result;
		return posts.map(post => {
			       let url = post.thumbnail_pic_s;
			       post.img_url = url?url:'http://placehold.it/300x200?text=N/A';
			       return post;
		       });
		}
	}
}
</script>

<style scoped>
/*新闻列表内容*/
#news-container {
	margin: 0 auto;
	overflow: hidden;
	text-align: center;
}
/* 新闻卡片盒子 */   
.news-card {
	display: inline-block;
	vertical-align: top;
	width: 380px;
	/*min-height: 220px;  /*最小高度*/
	margin: 0 20px 30px;
	padding-bottom: 9999px;  
	margin-bottom: -9999px;
	border: 1px solid #d1d0ce;
}
.card-title {
    position: relative;
    padding: 10px;
	height: 50px;
    text-align: center;
    font-size: 14px;
    font-family: "Hiragino GB";
    background: #e7e8e1;
    box-shadow: 2px 2px 3px 0px #827839;
}
.card-title:before {
    content: "";
    position: absolute;
    height: 10px;    /* 比.card-content的padding-bottom小   */ 
    width: 382px;    /* .父元素.news-card的width（border-box） */
    left: -1px;      /* 遮盖左右边框 */
    top: -12px;      /* 遮挡块height(border-box)和.card-title的border-top-width */
    background: #fff;
    border-top: 1px solid #d1d0ce;
}
.news-card:nth-child(-n+3) .card-title:before{    /* 第一行不加遮挡   */ 
	display: none;
}
.card-content {
	padding: 10px 20px 30px 20px;
}
.card-content img {
	height: 150px;
	width: auto;
	margin: 0 auto;
}
.annext {
	padding: 10px 0 30px;
}
.author {
    float: left;
}
.time {
	float: right;
}	
</style>