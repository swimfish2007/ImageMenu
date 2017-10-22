// JavaScript Document
addDOMLoadEvent(function(){
	imageMenu();
});
function imageMenu(){
	clean(getid("slider"));
	var mark = true;
	getid("slider").onmouseover = function(ev){
        var target = delegate(ev);
		!hasClass(this,"show")?mark=true:null;
        if(lowerCase(target,"img") && !hasClass(target.parentNode,"cur") && mark){
			slideLeft(target.parentNode,90);
			slideRight(target.parentNode,320);
			mark=false;
        }
    }
}
function slideLeft(f,n,cssName){
	var cls = cssName || 'cur',m = f.parentNode.firstChild,ele;
    for(;m;m = m.nextSibling){
		if(hasClass(m,cls)){
            ele = m;
            break;
    	}
	}
	addClass(f.parentNode,"show");
    var h = ele.offsetWidth;
    var timer = window.setInterval(function(){
		h <= n?(window.clearInterval(timer),removeClass(ele,cls)):setStyle(ele,"width",(h-=10)+'px');
    },10);
}
function slideRight(ele,n,cssName){
	var cls = cssName || 'cur',h = ele.offsetWidth;
    var timer = window.setInterval(function(){
       h>= n?(window.clearInterval(timer),addClass(ele,cls),removeClass(ele.parentNode,"show")):setStyle(ele,"width",(h+=10)+'px');
    },10);
}
function setStyle(ele,prop,value){
	ele.style[prop] = value;
}
function hasClass(ele,cls){//判断className
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(ele,className){//添加className
	!this.hasClass(ele,className)?ele.className += " "+className:'';
}
function removeClass(ele,cls){//删除className
    hasClass(ele,cls)?ele.className = ele.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'),' '):'';
}
function clean(ele){//清空空白节点(new)
    var n = ele.firstChild, next;
    while(n){
        next = n.nextSibling;
        if (n.nodeType === 3 && !/\S/.test(n.nodeValue)) {
            ele.removeChild(n);
        }
        n = next;
    }
}
function delegate(e){//事件捕捉
	var e = e || window.event;
	return e.target || e.srcElement;
}
function setOpacity(ele,n){//控制图层透明度
	ele.filters?ele.style.filter="alpha(opacity="+(n*100)+")":ele.style.opacity = n;
}
function lowerCase(e,tag){//判断事件捕获标签
	return e.nodeName.toLowerCase() == tag;
}
function getid(id){
	return document.getElementById(id);
}
function addDOMLoadEvent(func) {
    if (!window.__load_events) {
       var init = function () {
           // quit if this function has already been called
           if (arguments.callee.done) return;
           // flag this function so we don't do the same thing twice
           arguments.callee.done = true;
           // kill the timer
           if (window.__load_timer) {
               clearInterval(window.__load_timer);
               window.__load_timer = null;
           }
           // execute each function in the stack in the order they were added
           for (var i=0;i < window.__load_events.length;i++) {
              window.__load_events[i]();
           }
           window.__load_events = null;
       };
       // for Mozilla/Opera9
       if (document.addEventListener) {
           document.addEventListener("DOMContentLoaded", init, false);
       }
      
       // for Internet Explorer
       /*@cc_on @*/
       /*@if (@_win32)
           document.write("<scr"+"ipt id=__ie_onload defer src=//0><\/scr"+"ipt>");
           var script = document.getElementById("__ie_onload");
           script.onreadystatechange = function() {
               if (this.readyState == "complete") {
                   init(); // call the onload handler
               }
           };
       /*@end @*/
      
       // for Safari
       if (/WebKit/i.test(navigator.userAgent)) { // sniff
           window.__load_timer = setInterval(function() {
               if (/loaded|complete/.test(document.readyState)) {
                   init(); // call the onload handler
               }
           }, 10);
       }
       // for other browsers
       window.onload = init;
       // create event function stack
       window.__load_events = [];
    }
    // add function to event stack
    window.__load_events.push(func);
}