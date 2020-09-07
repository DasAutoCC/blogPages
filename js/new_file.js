'<div class="topLevelComment" id=' +id+ '  name = ' +name+'><div class="contentsTheHeaderArea"><div class="commentUserHeader allCommentInstance"><img class="commentUserHeaderInstance" src="img/头像.jpg" /> </div><div class="commentUserNameAndPostTime"><div class="commentUserNameInstance">'+发言人名字+'</div><div class="commentPostTimeInstance">'+发送时间+'</div></div></div><div class="commentContentArea">'+真正的评论+'</div></div>'

'<div class="topLevelComment" id=' +id+ '  name = ' +name+'><div class="contentsTheHeaderArea"><div class="commentUserHeader allCommentInstance"><img class="commentUserHeaderInstance" src="img/头像.jpg" /> </div><div class="commentUserNameAndPostTime"><div class="commentUserNameInstance">'+发言人名字+'</div><div class="commentPostTimeInstance">'+发送时间+'</div></div></div><div class="commentContentArea">'+真正的评论+'</div></div>'









'<div class="topLevelComment" id=' +comment.replies[i].commentId+ 'userName = ' +currentUserName+'><div class="contentsTheHeaderArea"><div class="commentUserHeader allCommentInstance"><img class="commentUserHeaderInstance" src="img/头像.jpg" /> </div><div class="commentUserNameAndPostTime"><div class="commentUserNameInstance">'+currentUserName+ ' 回复：'+ replyForUserDetails.userName +'</div><div class="commentPostTimeInstance">'+comment.replies[i].createTime+'</div></div></div><div class="commentContentArea">'+comment.replies[i].commentContent+'</div></div>'