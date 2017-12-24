$(function(){
	var timer;
	var _thisele;
	//操作栏功能
	$('.list_group').on('mouseenter','.operate_name',function(){

		$(this).next().show()
	}).on('mouseleave','.operate_name',function(){
		clearTimeout(timer);
		var _this = $(this)
		timer = setTimeout(function(){
			_this.next().css('display','none');
		}, 800);
	})
	$('.list_group').on('mouseover','.operate_list',function(){
		//$(this).show();
		clearTimeout(timer);
	}).on('mouseleave','.operate_list',function(){
		
		$(this).css('display','none');
		
	});
	$('#add_main_item').on('click',function(){
		layer.open({
	      type: 1,
	      title:'新建分组',
	      area: ['400px', '180px'],
	      content: '<div style="padding:20px;">分组名称: <input type="text" class="input-text radius add_main_item" /></div>',
	      btn: ['确定', '取消'], 
	      btnAlign:'c',
	      shadeClose: false, //点击遮罩关闭
	      yes: function(){
	      	if($('.add_main_item').val().length<=0){
	      		layer.msg('分组名称不能为空');
	      		return;
	      	}
		   var newItem = $('<li class="col-md-4 main_item">'+
								'<div class="list_container">'+
									'<div class="list_heard">'+
										'<span class="list_title" ><i class="Hui-iconfont">&#xe625;</i><b class="operate_title">'+$('.add_main_item').val()+'</b></span>'+
										'<div class="operate">'+
											'<span class="operate_name">操作<i class="Hui-iconfont">&#xe6d5;</i></span>'+
											'<ul class="operate_list">'+
												'<li class="operate_item add_people">'+
													'添加人员'+
												'</li>'+
												'<li class="operate_item change_name ">'+
													'修改分组名称'+
												'</li>'+
												'<li class="operate_item remove_list">'+
													'删除分组'+
												'</li>\
											</ul>\
										</div>\
									</div>\
									<div class="people_container">\
										<ul class="people_list"></ul>\
									\</div>\
								</div>\
							</li>'
						);
		   $('.list_group').append(newItem);
		    layer.closeAll();
		  },
		  btn2: function(){
		    layer.closeAll();
		  }
	    });
	})
	//添加人员
	$('.list_group').on('click','.add_people',function(index){
		var listParents = $(this).parents('.main_item');
		var peopleItemNum = $(listParents[0]).find('.people_item').length+1;
		layer.open({
	      type: 1,
	      title:'添加人员',
	      area: ['400px', '180px'],
	      content: '<div style="padding:20px;">人员名称:<input type="text" class="input-text radius add_people_item" /></div>',
	      btn: ['确定', '取消'], 
	      btnAlign:'c',
	      shadeClose: false, //点击遮罩关闭
	      yes: function(){
	      	if($('.add_people_item').val().length<=0){
	      		layer.msg('人员名称不能为空');
	      		return;
	      	}
		   var newItem = $('<li class="people_item">'+
							'<span class="item_num">'+peopleItemNum+'</span>'+
							'<p class="people_name">'+$(".add_people_item").val()+'</p>'+
							'<span class="item_ico_cancel"><i class="Hui-iconfont">&#xe6a6;</i></span>\
						</li>');
		  
		   $(listParents[0]).find('.people_list').append(newItem);
		    layer.closeAll();
		  },
		  btn2: function(){
		    layer.closeAll();
		  } 
	    });
	})
	//修改分组名称
	$('.list_group').on('click','.change_name',function(){
		
		var $Parents = $(this).parents('.main_item');
		layer.open({
	      type: 1,
	      title:'修改分组名称',
	      area: ['400px', '180px'],
	      content: '<div style="padding:20px;">分组名称:<input type="text" class="input-text radius change_name_item" /></div>',
	      btn: ['确定', '取消'], 
	      btnAlign:'c',
	      shadeClose: false, //点击遮罩关闭
	      yes: function(){
	      	if($('.change_name_item').val().length<=0){
	      		layer.msg('分组名称不能为空');
	      		return;
	      	}
		   $Parents.find('.operate_title').text($('.change_name_item').val());			   
		    layer.closeAll();
		  },
		  btn2: function(){
		    layer.closeAll();
		  }      
	    });
	})
	//删除一个分组
	$('.list_group').on('click','.remove_list',function(){
		$(this).parents('.main_item').remove();
	})
	//删除一条人员
	$('.list_group').on('click','.item_ico_cancel',function(){
		
		var $peopleList = $(this).parents('.people_list');

		$(this).parents('.people_item').remove();
		var $peopleListNew = $peopleList.find('.people_item');
		$peopleListNew.each(function(i){
			var textWord = i+1;
			$($(this).find('.item_num')[0]).text(textWord);
		})
		
	})
	//右键添加管理员
	$('.list_group').on('contextmenu','.people_item',function(e){
		e.preventDefault();
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		_thisele = $(this);
		$('#menu').css({
			left: e.pageX || e.clientX + screenX+'px',
			top: e.pageY || e.clientY + scrollY +'px',
			display:'block'
		});
		
		
	});
	//添加管理员
	$('.main_wrap').on('click','.change_admin',function(){
			
		var peopleAdmin = $('<span class="people_admin"><i class="Hui-iconfont">&#xe62d;</i></span>');
		_thisele.parents('.people_list').find('.people_admin').remove();
		_thisele.find('.people_name').after(peopleAdmin);
	})

	//取消右键
	window.onclick=function(e){
	　　　$('#menu').css('display','none');
	}

})
