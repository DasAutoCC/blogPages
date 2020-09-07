function showMarkdown(blogId){
	var testEditor;
	$.get(restUrl.获取博客详细内容,{"blogId":blogId},function(data){
		if(data.respCode!=200){
			return;
		}
		$("#markDownArea").html("<textarea  id='hahahdh' style='display: none;'></textarea>")
		testEditor = editormd.markdownToHTML("markDownArea",{
			  markdown        : data.data.articleContent ,//+ "\r\n" + $("#append-test").text(),
			  //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
			  htmlDecode      : "style,script,iframe",  // you can filter tags decode
			  //toc             : false,
			  tocm            : true,    // Using [TOCM]
			  //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
			  //gfm             : false,
			  //tocDropdown     : true,
			  // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
			  emoji           : true,
			  taskList        : true,
			  tex             : true,  // 默认不解析
			  flowChart       : true,  // 默认不解析
			  sequenceDiagram : true,  // 默认不解析
		});
		$("#markDownArea").attr("name",blogId)
		$("#articleHeader").text(data.data.articleHeader);
		$("#authorMsgArea").html('<span>Author:盛世繁花&nbsp;&nbsp;&nbsp;&nbsp;&nbspPOST:'+new Date(data.data.createTime).toLocaleString()+'</span>')
	})
}
//找到一个完整层级回复中所有参与的用户信息，非重复
function getAllUserDetails(comment){
	var userSet = new Set();
	//存入顶级对象信息
	var currentTopLevelUserDetails = {"userId": comment.commentId,"userHeader":comment.userHead,"userName":comment.nickName};
	userSet.add(currentTopLevelUserDetails);
	var currentReplies = comment.replies;
	if(currentReplies == null){
		return userSet
	}
	for(i=0;i<currentReplies.length;i++){
		var currentTopLevelUserDetails = {"userId": currentReplies[i].commentId,"userHeader":currentReplies[i].userHead,"userName":currentReplies[i].nickName};
		userSet.add(currentTopLevelUserDetails);
	}
	console.log(userSet);
	//将其转换为数组返回
	var userArray = Array.from(userSet);
	return userArray;
	
}

//从给出的数组中找到指定的对象，找不到就返回null
function findUserDetailsFromList(allUserDeails,needUserId){
	var result=null;
	for(i = 0 ; i<allUserDeails.length ; i++){
		if(allUserDeails[i].userId == needUserId){
			result=allUserDeails[i];
			return result;
		}
	}
	return result;
}

function findTheUser(comment,currentReplyFor){
	if(comment.commentId == currentReplyFor){
		return comment.commentUser;
	}
	if(comment.replies == null || comment.replies.length<=0){
		return null;
	}
	for(i= 0 ; i<comment.replies.length ; i++){
		if(comment.replies[i].commentUser == currentReplyFor){
			return comment.replies[i].commentUser;
		}
	}
	return null;
}


//将数据封装成html然后返回
function addCommentToDom(comment){
	var allUserDeails = getAllUserDetails(comment);
	var html = '';
	var htp = '<div class="realComment">';
	var htb = '</div>';
	var commentHtml = '';
	var repliesHtml = '';
	var userName=comment.nickName == null ? "游客"  :comment.nickName ;
	var userContent = comment.commentContent;
	commentHtml = '<div class="topLevelComment" id=' +comment.commentId+' '+ 'userName = ' +userName+'><div class="contentsTheHeaderArea"><div class="commentUserHeader allCommentInstance"><img class="commentUserHeaderInstance" src="img/头像.jpg" /> </div><div class="commentUserNameAndPostTime"><div class="commentUserNameInstance">'+userName+'<a class="theReplyButton">回复</a> '+ '</div><div class="commentPostTimeInstance">'+new Date(comment.createTime).toLocaleString()+'</div></div></div><div class="commentContentArea">'+userContent+'</div></div>'
	html = htp + commentHtml;
	if(comment.replies == null || comment.replies.length == 0){
		html = html + htb;
		return html;
	}
	for(var i = 0 ;i < comment.replies.length ;i++){
		
		var currentReplyFor = comment.replies[i].replyFor;
		var replyForWitchUser = findTheUser(comment,currentReplyFor);
		var replyForUserDetails = findUserDetailsFromList(allUserDeails,currentReplyFor);
		var currentUserName = (comment.replies[i].nickName == null ? "游客" : comment.replies[i].nickName)
		repliesHtml = repliesHtml + '<div class="reply" id=' +comment.replies[i].commentId+ ' '+ 'userName = ' +currentUserName+'><div class="contentsTheHeaderArea"><div class="commentUserHeader allCommentInstance"><img class="commentUserHeaderInstance" src="img/头像.jpg" /> </div><div class="commentUserNameAndPostTime"><div class="commentUserNameInstance">'+currentUserName+ ' 回复：'+ replyForUserDetails.userName +'<a class="theReplyButton">回复</a> '+ '</div><div class="commentPostTimeInstance">'+new Date(comment.replies[i].createTime).toLocaleString()+'</div></div></div><div class="commentContentArea">'+comment.replies[i].commentContent+'</div></div>'
		
	}
	html = html + repliesHtml + htb;
	return html;
}



// <div class="topLevelComment"><div class="contentsTheHeaderArea"><div class="commentUserHeader allCommentInstance"><img class="commentUserHeaderInstance" src="img/头像.jpg" /> </div><div class="commentUserNameAndPostTime"><div class="commentUserNameInstance">发言人名字</div><div class="commentPostTimeInstance">发送时间 2020/15/20:23:59</div></div></div><div class="commentContentArea">这里是真正的评论内容</div></div>
//将数据循环封装成html用于直接向dom中添加
function showComment(blogId){
	$("#commentInstence").html("");
	var html = '';
	$.get(restUrl.当前博客下的所有评论,{"blogId":blogId},function(result){
		if(result.respCode != 200){
			alert(result.message)
			return null;
		};
		var data = result.data;
		if(data == "当前文章暂无评论"){
			return null;
		}
		for(var i = 0 ;i<data.length ;i++){
			rep = addCommentToDom(data[i]);
			html = html + rep;
		}
		$("#commentInstence").html(html);
	})
} 