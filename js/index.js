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
//绑定动态添加的.allCommentInstance元素的click事件，点击某条评论后获取到那条评论的id存入div的id中，用来让发送数据的函数获取到
$("#commentInstence").on("click",".theReplyButton",function(){
	var thisElm = $(this).parent().parent().parent().parent();
	var commentIdForUpdate =thisElm.attr("id");
	var commentNameForPlaceHolder =thisElm.attr("userName");
	$("#write").attr("replyFor",commentIdForUpdate);
	$("#write").attr("placeholder","回复  --->"+commentNameForPlaceHolder);
	$("#underCommentMsg").text("当前正在回复:"+commentNameForPlaceHolder+",点击此处文字可清除回复")
})
//向服务器发送一条新评论
$("#upcomment").click(function(){
	addComment();
})
//回复按钮显示与消失
$("#commentInstence").on("mouseenter",".contentsTheHeaderArea",function(){
	var curATarget = $(this).children(".commentUserNameAndPostTime").children(".commentUserNameInstance").children(".theReplyButton").css("display","inline");
})
$("#commentInstence").on("mouseleave",".contentsTheHeaderArea",function(){
	var curATarget = $(this).children(".commentUserNameAndPostTime").children(".commentUserNameInstance").children(".theReplyButton").css("display","none");
})



//博客列表点击事件，点击div时，获取当前div内a标签id值传进"showContentBolgDetails(blogids)"方法内
$(".contentList").click(function(){
	var blogids = $(this).children().attr("id");
	location.hash = "#details?articleId="+blogids;
	// showContentBolgDetails(blogids);
})


//博客详情页返回博客列表事件
$(".blogNavigationBarLeft").click(function(){
	location.hash = "#list?pageNum="+currentPage;
	// showContentBolgList(currentPage);
});

//点击上一页下一页事件
$(".pagebutton1").click(function(){
	togglePage("prefer");
});
$(".pagebutton2").click(function(){
	togglePage("next");
});

$("#write").focus(function(){
	$("#write").css("height","80px")
	$("#contentsTheWrite").addClass("contentsTheWriteLater");
})
$("#write").focusout(function(){
	$("#write").css("height","35px")
	$("#contentsTheWrite").removeClass("contentsTheWriteLater");
})






//初始化主页面
$(document).ready(function(){
	//渲染登陆信息和欢迎信息
	addLoginMsgToDom();
	addWelcomeMsgToDom();
	//初始化当前页码为1，将初始化页码传进去，直接显示第一页的博客列表
	// showContentBolgList(currentPage,false);
	location.hash="#list?pageNum=1";
	changePage();
	//定时进入主页事件
	setTimeout(function(){
		init();
	},10000);
});
