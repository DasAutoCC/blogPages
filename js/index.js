//头部动画js代码
$(window).scroll(function(){
	var top = $(window).scrollTop();
	if(top>=100){
		$(".test").addClass("low");
		$("#innerTest").addClass("innerTestLower");
		$("#text").addClass("textLower");
		$("#HeaderText").addClass("HeaderTextLower");
		$("#loginArea").addClass("loginAreaLower");
	}
	if(top<=100){
		$(".test").removeClass("low");
		$("#innerTest").removeClass("innerTestLower");
		$("#text").removeClass("textLower");
		$("#HeaderText").removeClass("HeaderTextLower");
		$("#loginArea").removeClass("loginAreaLower");
	}
});


//点击进入主页事件
$("#intoButtonIntence").click(function(){
	init();
});
//展开和隐藏列表事件
$("#gasga").click(function(){
	hiddenBolgList();
});
//博客列表
$(".contentList").click(function(){
	showContentBolgDetails();
});
$(".blogNavigationBarLeft").click(function(){
	showContentBolgList();
});


//初始化主页面
$(document).ready(function(){
	//登录人昵称
	$("#indexDivSpan1").html(isLogin+",欢迎回来");
	$("#indexDivSpan2").html(welcome);
	if(isLogin !="朋友"){
		$("#loginArea").html("<div id='userHeaderDiv'><img id='userHeader' src='./img/content-background.jpg'></div><div id='userNameDiv'>"+isLogin+"</div>");
	}
	//定时进入主页事件
	setTimeout(function(){
		init();
	},10000);
});


