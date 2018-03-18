//获取元素
var getElem = function(selector){
	return document.querySelector(selector);
}

var getElemAll = function(selector){
	return document.querySelectorAll(selector);
}

//获取元素样式
var getCls = function(element){
	return element.getAttribute('class');
}
//设置元素样式
var setCls = function(element,cls){
	return element.setAttribute('class',cls);
}
//为元素添加样式
var addCls = function(element,cls){
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) === -1) {
		setCls( element,baseCls+ ' ' +cls );
	}
}
//为元素删除样式
var delCls = function(element,cls){
	var baseCls = getCls(element);
	if ( baseCls.indexOf(cls) !== -1 ) {
		setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
	}
}

//第一步 初始化样式 init

var screenAnimationElements = {
	'.screen_1' : [
		'.screen_1_heading',
		'.screen_1_phone',
		'.screen_1_img',
	],
	'.screen_2' : [
		'.screen_2_heading',
		'.screen_2_phone',
		'.screen_2_subHeading',
		'.screen_2_point_i_1',
		'.screen_2_point_i_2',
		'.screen_2_point_i_3',
	],
	'.screen_3' : [
		'.screen_3_heading',
		'.screen_3_phone',
		'.screen_3_subHeading',
		'.screen_3_features',
	],
	'.screen_4' : [
		'.screen_4_heading',
		'.screen_4_subHeading',
		'.screen_4_type_item_i_1',
		'.screen_4_type_item_i_2',
		'.screen_4_type_item_i_3',
		'.screen_4_type_item_i_4',
	],
	'.screen_5' : [
		'.screen_5_heading',
		'.screen_5_subHeading',
		'.screen_5_bg',
	]
};
//动画初始状态
var setScreenAnimateInit = function(screenCls){
	var screen = document.querySelector(screenCls);		//获取当前屏的元素
	var animateElements = screenAnimationElements[screenCls]; 
	for (var i = 0; i < animateElements.length; i++) {
		var element = document.querySelector(animateElements[i]);
		var baseCls = element.getAttribute('class');
		element.setAttribute('class',baseCls + ' ' +animateElements[i].substr(1)+'_animate_init' )
	}
}
//设置播放屏内的元素动画
var playScreenAnimateDone = function(screenCls){
	var screen = document.querySelector(screenCls);		//获取当前屏的元素
	var animateElements = screenAnimationElements[screenCls]; 
	for (var i = 0; i < animateElements.length; i++) {
		var element = document.querySelector(animateElements[i]);
		var baseCls = element.getAttribute('class');
		element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
	}
}

window.onload = function(){
	for(k in screenAnimationElements){
		if (k === '.screen_1') {
			continue;
		}
		setScreenAnimateInit(k);
	}

setTimeout(function(){playScreenAnimateDone('.screen_1')}, 500);


}

//第二步 滚动到哪里，就播放哪里

var navItems = getElemAll('.header_nav_item_i');
var outLineItems = getElemAll('.outline_item');

var switchNavItemSactive = function(idx){
	for(var i = 0;i<navItems.length;i++){
		delCls(navItems[i],'header_nav_item_active');
	}
	addCls(navItems[idx],'header_nav_item_active');

	for(var i = 0;i<outLineItems.length;i++){
		delCls(outLineItems[i],'outline_item_active');
	}
	addCls(outLineItems[idx],'outline_item_active');
}






window.onscroll = function(){
	var top = document.documentElement.scrollTop;
	console.log(top);
	if(top>50){
		addCls(getElem('.header'),'header_status_back');
		addCls(getElem('.outline'),'outline_status_in');
	}else{
		switchNavItemSactive(0);
		delCls(getElem('.header'),'header_status_back');
		delCls(getElem('.outline'),'outline_status_in')
	}

	/*if(top>1){
		switchNavItemSactive(0);
		playScreenAnimateDone('.screen_1');
	}*/
	if(top<600*1){
		navTip.style.left = 0+'px';
	}
	if(top>600*1){
		switchNavItemSactive(1);
		playScreenAnimateDone('.screen_2');
		navTip.style.left = 1*70+'px';
	}
	if(top>700*2){
		switchNavItemSactive(2);
		playScreenAnimateDone('.screen_3');
		navTip.style.left =2*70+'px';
	}
	if(top>700*3){
		switchNavItemSactive(3);
		playScreenAnimateDone('.screen_4');
		navTip.style.left =3*70+'px';
	}
	if(top>700*4){
		switchNavItemSactive(4);
		playScreenAnimateDone('.screen_5');
		navTip.style.left =4*70+'px';
	}
}


/* 双向定位 */


var setNavJump = function(i,lib){
	var item = lib[i];
	item.onclick = function(){
		document.documentElement.scrollTop = i*800;
	}
}
for(var i = 0;i<navItems.length; i++){
	setNavJump(i,navItems);
}
for(var i = 0;i<outLineItems.length; i++){
	setNavJump(i,outLineItems);
}

/* 滑动门 */
var navTip = getElem('.header_nav_tip');
var setTip = function(idx,lib){
	lib[idx].onmouseover = function(){
		
		navTip.style.left = idx*70+'px';
		if (navTip.style.left>280) {
			navTip.style.left=280+'px';
		}
	}
	var acviveIdx = 0;
	lib[idx].onmouseout = function(){
		for(var i=0;i<lib.length;i++){
			if(getCls(lib[i]).indexOf('header_nav_item_active')>-1){
				acviveIdx = i;
				break;
			}
		}
		navTip.style.left = acviveIdx*70+'px';
	}
}

for (var i = 0;i<navItems.length;i++){
	setTip(i,navItems);
}
























