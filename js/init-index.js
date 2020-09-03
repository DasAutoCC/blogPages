//在页面加载前进行一些初始化的工作


var isLogin  = "朋友"; //公共变量，存储用户登录数据
var welcome  ="海内存知己,天涯若比邻"; //欢迎词,从服务端获取,如果获取不到就默认用这个
var isHidden = false; //博客列表是否是收起状态
var currentPage = 1; //当前处于第几页
var blogPageSum =1; //博客总页数
var leftBlogList = null;
var restUrl = {
	"获取全部博客简易列表":"/blog-list-all",
	"获取用户登陆状态信息":"/isLogin",
	"添加文章发送数据接口":"/blog/addArticle",
	"获取博客列表"		 :"/blog-list",
	"获取博客详细内容"    :"/blog-details",
	"当前博客下的所有评论":"/selComment",
	"添加评论"           :"/insComment",
	"图片上传接口"       :"/upload-image",
	"设置置顶文章接口"   :"/setTopArticleId",
	"获取当前时间的欢迎语":"/welcone"
}
//下面的在导入项目中测试的时候注释掉
var restUrl = {
	"获取全部博客简易列表":"/blog-list-all",
	"获取用户登陆状态信息":"./json/isLogin.json",
	"添加文章发送数据接口":"/blog/addArticle",
	"获取博客列表"		 :"./json/blog-list.json",
	"获取博客详细内容"    :"./json/blog-details.json",
	"当前博客下的所有评论":"./json/selComment.json",
	"添加评论"           :"/insComment",
	"图片上传接口"       :"/upload-image",
	"设置置顶文章接口"   :"/setTopArticleId",
	"获取当前时间的欢迎语":"./json/welcone.json"
}



//发送ajax请求获取博客列表，然后直接渲染到dom
$.get("./blog-list-all","",function(data){
	data = data.data;
	var html;
	for(var i = 0 ; i<data.length ; i++) {
		html = data[i]+"<br />"+html;
	}
	if(data.length>=8){
		blogPageSum = Math.ceil(data.length/8);
	}
	leftBlogList = html;
	$(".innerContentLeft").html(leftBlogList);
});
