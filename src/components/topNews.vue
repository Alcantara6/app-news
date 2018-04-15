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
    	// 计算属性中给每一项添加img_url
		processedPosts() {
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 30px;
}
/* 新闻卡片盒子 */   
.news-card {
	margin: 0 0 20px 0;
	border: 1px solid #d1d0ce;
}
@media screen and (max-width: 414px) {
    #news-container {
        justify-content: center;
    }
    .news-card {
        flex: 0 1 90%;
    }
}
@media screen and (min-width: 415px) and (max-width: 1024px) {
    .news-card {
        flex: 0 1 45%;
    }
}
@media screen and (min-width: 1025px) {
    .news-card {
        flex: 0 1 30%;
    }
}
.card-title {
    position: relative;
    padding: 5px 20px;
    background: #e7e8e1;
    box-shadow: 2px 2px 3px 0px #827839;
    color: #2b3856;
}
.card-title h3 {
    /*省略文字*/
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    height: 40px;
    text-align: center;
    font-family: "Hiragino GB";
    font-size: 13px;
}

@media screen and (max-width: 720px) {
    .card-title {
        font-size: 12px;
    }
}
.card-content {
	padding: 10px 20px 15px;
}
/* 图片不能超过原始尺寸,最大100% */
.card-content img {
	display: block;
	max-width: 100%;
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