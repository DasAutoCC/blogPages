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
$(".blogList1").click(function(){
	var blogids = $(".blogList1").children().attr("id");
	showContentBolgDetails(blogids);
});
$(".blogList2").click(function(){
	var blogids = $(".blogList2").children().attr("id");
	showContentBolgDetails(blogids);
});
$(".blogList3").click(function(){
	var blogids = $(".blogList3").children().attr("id");
	showContentBolgDetails(blogids);
});
$(".blogList4").click(function(){
	var blogids = $(".blogList4").children().attr("id");
	showContentBolgDetails(blogids);
});
$(".blogList5").click(function(){
	var blogids = $(".blogList5").children().attr("id");
	showContentBolgDetails(blogids);
});
$(".blogList6").click(function(){
	var blogids = $(".blogList6").children().attr("id");
	showContentBolgDetails(blogids);
});
$(".blogList7").click(function(){
	var blogids = $(".blogList7").children().attr("id");
	showContentBolgDetails(blogids);
});
$(".blogList8").click(function(){
	var blogids = $(".blogList8").children().attr("id");
	showContentBolgDetails(blogids);
});


$(".blogNavigationBarLeft").click(function(){
	showContentBolgList(currentPage);
});

//初始化主页面
$(document).ready(function(){
	//登录人昵称
	$("#indexDivSpan1").html(isLogin+",欢迎回来");
	$("#indexDivSpan2").html(welcome);
	showContentBolgList();
	if(isLogin !="朋友"){
		$("#loginArea").html("<div id='userHeaderDiv'><img id='userHeader' src='./img/content-background.jpg'></div><div id='userNameDiv'>"+isLogin+"</div>");
	}
	//定时进入主页事件
	setTimeout(function(){
		init();
	},10000);
});

