//在页面加载前进行一些初始化的工作


var isLogin  = "朋友"; //公共变量，存储用户登录数据
var welcome  ="海内存知己,天涯若比邻"; //欢迎词,从服务端获取,如果获取不到就默认用这个
var isHidden = false; //博客列表是否是收起状态
var currentPage = 1; //当前处于第几页
var blogPageSum =1; //博客总页数
var leftBlogList = null;


//发送ajax请求获取博客列表，然后直接渲染到dom
$.get("./json/bolg-list.json","",function(data){
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