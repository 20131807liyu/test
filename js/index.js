function toArray(list){
	if(typeof list!='object'||typeof list.length!='number'){
		throw new Error('参数不是类数组');
	}
	if(Object.prototype.toString.call(list)==='[object Array]'){
		return list;
	}
	try{
		return Array.prototype.slice.call(list,0);
	}catch(ex){
		var result=[];
		for(var i=0,len=list.length;i<len;i++){
			result.push(list[i]);
		}
		return result;
	}
}
// 解决ie下面不支持document.getElementsByClassName
function getElementsByClassName(name,context){
	if(context.getElementsByClassName)
		return context.getElementsByClassName(name);
	context=context || document;
	var childs=context.getElementsByTagName('*');
	var result=[];
	var r=new RegExp('\\b'+name+'\\b');
	for(var i=0;i<childs.length;i++){		
		if(r.test(childs[i].className)){
			result.push(childs[i]);
		}
	}
	return result;
}
// 时间，网元，指标，过滤选项卡
function Tab(){
	var nav=document.getElementById('nav');
	var lis=nav.getElementsByTagName('li');
	var spans=nav.getElementsByTagName('span');
	// var content=document.getElementsByClassName("content");
	var content=getElementsByClassName("content",document);
	var len=lis.length;
	for(var i=0;i<len;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			for(var j=0;j<len;j++){
				lis[j].className="";
				spans[j].style.backgroundImage = "url(images/t1.png)";
				content[j].className="content";
			}
			this.className="cur";
			content[this.index].className="content show";
			if(this.index== 0) {
				return;
			}
			spans[this.index-1].style.backgroundImage="url(images/t2.png)";
		}
	}
}
function list(){
	// 时间
	var day=document.getElementById('day');
	var time=document.getElementById("time");
	var timing=document.getElementsByName('timing');
	var types=day.getElementsByTagName('ul')[0].getElementsByTagName('li');
	var sort=day.getElementsByTagName('ul')[1].getElementsByTagName('li');
	var num = day.getElementsByTagName("form")[0].getElementsByTagName("input")[0];
	var btn = day.getElementsByTagName("form")[0].getElementsByTagName("button")[0];
	var calendar=document.getElementById('calendar');
	// 这个标题为什么获取不到
	var calendarTitle=document.getElementById('calendarTitle');
	var dates=calendar.getElementsByTagName('td');
	var tip=day.getElementsByTagName('p')[0].getElementsByTagName('span')[0];
	var afterTip=day.getElementsByTagName('p')[0].getElementsByTagName('span')[1];
	var timeSpan=time.getElementsByTagName('dd')[0].getElementsByTagName('span')[0];
	var timeSpan1=time.getElementsByTagName('dd')[1].getElementsByTagName('span')[0];
	var timeSpan2=time.getElementsByTagName('dd')[2].getElementsByTagName('span')[0];
	// 时间
	for(var i=0,len=types.length;i<len;i++){
		(function(i){
			types[i].onclick=function(){
				for(var j=0,len=types.length;j<len;j++){
					types[j].className="";
				}
				this.className="show";
				btn.innerHTML=timeSpan.innerHTML=this.innerHTML;
			}
		})(i)	
	}
	for(var i=0,len=sort.length;i<len;i++){
		(function(i){
			sort[i].onclick=function(){
				for(var j=0,len=sort.length;j<len;j++){
					sort[j].className="";
				}
				this.className="show";
				afterTip.innerHTML=this.innerHTML+num.value+btn.innerHTML;
			}
		})(i);
	}
	var currDay = null;
	for(var i=0,len=dates.length;i<len;i++){
		(function(i){
			// 获取当前默认日期的月份
			if(dates[i].className == "currentDay") {
				currDay = dates[i].getAttribute("data").substr(4, 2);
				console.log(currDay);
			}
			dates[i].onclick=function(){
				// this.className="currentDay";
				for(var j=0,len=dates.length;j<len;j++){
					if(dates[j].getAttribute("data").substr(4, 2) != currDay) {
						dates[j].className="otherMonth";
					}else {
						dates[j].className="currentMonth";
					}	
				}
				this.className="currentDay";
				timeSpan1.innerHTML = this.getAttribute("data").substr(0, 4) + "/" + this.getAttribute("data").substr(4, 2) + "/" + this.getAttribute("data").substr(6, 2);
				tip.innerHTML=timeSpan1.innerHTML;
			}
		})(i);
	}
	for(var i=0,len=timing.length;i<len;i++){
		timing[i].onclick=function(){
			timeSpan2.innerHTML=this.value;
		}
	}
	// 网元
	var net=document.getElementById('net');
	var dds=net.getElementsByTagName('dd')[2];
	var ddsDiv=dds.getElementsByTagName('div')[0];
	var ddspan=dds.getElementsByTagName('span')[0];
	var way=document.getElementsByName('way');
	var waySpan=net.getElementsByTagName('dd')[0].getElementsByTagName('span')[0];
	var choose=document.getElementById('choose');
	var lis=choose.getElementsByTagName('li');
	var inputs=choose.getElementsByTagName('input');
	for(var i=0,len=inputs.length;i<len;i++){
		inputs[i].onclick=function(){
			if(this.checked){
				var newp=document.createElement('p');
				newp.innerHTML=this.parentNode.innerText+"<span>X</span>";
				ddsDiv.appendChild(newp);
				// ddsDiv.parentNode.parentNode.style.height="60px";
				ddsDiv.className="fix";
				// ddspan.className="wrap";
			}
			var close=document.getElementById('close');
			var iclose=close.getElementsByTagName('span');
			for(var i=0,len=iclose.length;i<len;i++){
				iclose[i].onclick=function(){
					ddsDiv.removeChild(this.parentNode);
				}
			}
		}
	}
	
	for(var i=0,len=way.length;i<len;i++){
		way[i].onclick=function(){
			waySpan.innerHTML=this.value;
		}
	}
	// 指标
	var area=document.getElementsByName('area');
	var areaSpan1=net.getElementsByTagName('dd')[1].getElementsByTagName('span')[0];
	for(var i=0,len=area.length;i<len;i++){
		area[i].onclick=function(){
			areaSpan1.innerHTML=this.value;
		}
	}
}
// 全选(true)和清除选择(false)
function choose(did,aid,flag){
	var inputs=document.getElementById(did).getElementsByTagName('input');
	var all=document.getElementById(aid);
	all.onclick=function(){
		for(var i=0,len=inputs.length;i<len;i++){
			if(flag){
				inputs[i].checked=this.checked?true:false;
			}else{
				inputs[i].checked=false;
			}
		}
	}
}
// -------------网元区域js代码------------------------
// 树形导航区域
function nav(){
	var area=document.getElementById('area');
	var dl=area.getElementsByTagName('dl')[0];
	var img=area.getElementsByTagName('img')[0];
	var dds=area.getElementsByTagName('dd');
	var len=dds.length;
	img.onclick=function(){
		if(dl.offsetHeight>21){
			for(var i=0;i<len;i++){
				dds[i].style.display="none";
			}
			this.src="images/add.png";
		}else{
			for(var i=0;i<len;i++){
				dds[i].style.display="block";
			}
			this.src="images/sub.png";
		}
		
	}
}
// 全选上面，左右移动
function move(){
	var current=0;
	var view=document.getElementById('view');
	var spans=view.getElementsByTagName('span');
	var oul=view.getElementsByTagName('ul')[0];
	var lis=oul.getElementsByTagName('li');
	spans[0].onclick=function(){
		if(current-1<0){
			alert("这已经是最前面了");
		}
		current=current-1<0?current:current-1;
		oul.style.left=-(lis[0].offsetWidth)*current+"px";
	}
	spans[1].onclick=function(){
		current=current+1>lis.length/2?current:current+1;
		oul.style.left=-(lis[0].offsetWidth)*current+"px";
		if(current+1>lis.length/2){
			alert("这是最后面了");
		}
	}
}
// -------------过滤区域js--------------------------------
// 表格的增删改查
function change(){
	var table=document.getElementById('table');
	var trs=table.tBodies[0].getElementsByTagName("tr");
	var add=document.getElementById('add');
	var up=document.getElementById('up');
	var sub=document.getElementById('sub');
	var reset=document.getElementById('reset');
	// 添加
	add.onclick=function(){
		var otr=document.createElement('tr');
		otr.innerHTML="<tr>"
		+"<td><input type='radio' name='choose'></td>"
		+"<td>填你想填的</td>"
		+"<td><a href='javascript:void(0);'><img src='images/cross.png'></a></td>"
		+"</tr>";
		table.tBodies[0].appendChild(otr);
		for(var i=0,len=table.tBodies[0].rows.length;i<len;i++){
			table.tBodies[0].rows[i].cells[2].onclick=function(){
				if(confirm("真的要删除?")){
					table.tBodies[0].removeChild(this.parentNode);
				}
			}
		}
	};
	// 下移
	sub.onclick=function(){
		var checks=table.tBodies[0].getElementsByTagName("input");
		var arr=[];
		for(var i=0;i<checks.length;i++){
			if(checks[i].getAttribute('type')=="radio"){
				arr.push(checks[i]);		
			}
		}
		for(var j=0,len=arr.length;j<len;j++){
			if(arr[j].checked){
				moveDown(arr[j]);
			}else{
				arr[j].parentNode.parentNode.style.color="#444";
				arr[j].parentNode.parentNode.style.backgroundColor="#fff";
			}
		}
	};
	// 上移
	up.onclick=function(){
		var checks=table.tBodies[0].getElementsByTagName("input");
		var arr=[];
		for(var i=0;i<checks.length;i++){
			if(checks[i].getAttribute('type')=="radio"){
				arr.push(checks[i]);		
			}
		}
		for(var j=0,len=arr.length;j<len;j++){
			if(arr[j].checked){
				moveUp(arr[j]);
			}else{
				arr[j].parentNode.parentNode.style.color="#444";
				arr[j].parentNode.parentNode.style.backgroundColor="#fff";
			}
		}
	}	
}
function moveUp(_a){
                  var tr_one=_a.parentNode.parentNode;
                  // 找到他们都在的父节点，上移下移都在这个父节点里面进行
                  var parent=tr_one.parentNode;
                   var tr_two=tr_one.previousSibling;
                  while(tr_two.nodeType!=1){
              		tr_two=tr_two.previousSibling;
              		if(tr_two==null){
              			alert('已经到顶了!');
              		}
                  	}
                  // 下面还需要加上一个条件，这个tr里面的子节点不能是th
                  if(tr_two!=null){
                  		parent.insertBefore(tr_one,tr_two);
                  		tr_one.style.backgroundColor="#6fbde4";
	        		tr_one.style.color="#fff";
                  }
}
function moveDown(_a){
                var tr_one=_a.parentNode.parentNode;
                var parent=tr_one.parentNode;
                var tr_two=tr_one.nextSibling;
                while(tr_two.nodeType!=1){
                	tr_two=tr_two.nextSibling;
                	if(tr_two==null){
                		alert('已经到底了!');
                	}
                }
                if(tr_two!=null){
            	parent.insertBefore(tr_two,tr_one);
                     tr_one.style.backgroundColor="#6fbde4";
                     tr_one.style.color="#fff";
                }
}
window.onload=function(){
	Tab();
	choose("choose","all",true);
	choose("view","clear",false);
	choose("target","tAll",true);
	choose("tView","tClear",false);
	move();
	nav();
	change();
	list();
}