
(function(){
		var dateObj=(function(){
			var _date=new Date();
			return{
				getDate:function(){return _date;},setDate:function(date){_date=date;}
			};
		})();
		renderHtml();
		showCalendarData();
		bindEvent();
		function renderHtml(){
			var calendar=document.getElementById("calendar");
			var titleBox=document.createElement("div");
			var bodyBox=document.createElement("div");
			titleBox.className="calendar-title-box";
			titleBox.innerHTML="<span class='prev-month' id='prevMonth'></span>"+"<span class='calendar-title' id='calendarTitle'></span>"+"<span class='next-month' id='nextMonth' ></span>";
			calendar.appendChild(titleBox);
			bodyBox.className='calendar-body-box';
			var _headHtml="<tr>"+
				"<th>日</th>"+
				"<th>一</th>"+
				"<th>二</th>"+
				"<th>三</th>"+
				"<th>四</th>"+
				"<th>五</th>"+
				"<th>六</th>"+
				"</tr>";
			var _bodyHtml="";
			for(var i=0;i<6;i++){
				_bodyHtml+="<tr>"+
				"<td></td>"+
				"<td></td>"+
				"<td></td>"+
				"<td></td>"+
				"<td></td>"+
				"<td></td>"+
				"<td></td>"+
				"</tr>";
			}
			bodyBox.innerHTML="<table class='calendar-table' id='calendarTable'>"+_headHtml+_bodyHtml+"</table>";
			calendar.appendChild(bodyBox);
		}
		 function showCalendarData() {
			    var _year = dateObj.getDate().getFullYear();
			    var _month = dateObj.getDate().getMonth() + 1;
			    var _dateStr = getDateStr(dateObj.getDate());
			 
			    // 设置顶部标题栏中的 年、月信息
			    var calendarTitle = document.getElementById("calendarTitle");
			    var titleStr = _dateStr.substr(0, 4) + "年" + _dateStr.substr(4,2) + "月"+_dateStr.substr(6,2)+"日";
			    calendarTitle.innerText = titleStr;
			 
			    // 设置表格中的日期数据
			    var _table = document.getElementById("calendarTable");
			    var _tds = _table.getElementsByTagName("td");
			    var _firstDay = new Date(_year, _month - 1, 1);  // 当前月第一天
			    for(var i = 0; i < _tds.length; i++) {
			      var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
			      var _thisDayStr = getDateStr(_thisDay);
			      _tds[i].innerText = _thisDay.getDate();
			      //_tds[i].data = _thisDayStr;
			      _tds[i].setAttribute('data', _thisDayStr);
			      if(_thisDayStr == getDateStr(new Date())) {    // 当前天
			        _tds[i].className = 'currentDay';
			      }else if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
			        _tds[i].className = 'currentMonth';  // 当前月
			      }else {    // 其他月
			        _tds[i].className = 'otherMonth';
			      }
			    }
		}
		function bindEvent(){
			var prevMonth = document.getElementById("prevMonth");
		    	var nextMonth = document.getElementById("nextMonth");
		    	addEvent(prevMonth, 'click', toPrevMonth);
		    	addEvent(nextMonth, 'click', toNextMonth);
		}
		function addEvent(dom,etype,func){
			if(dom.addEventListener){//DOM2
				dom.addEventListener(etype,function(e){
					func(e);
				});
			}else if(dom.attachEvent){//IE5
				dom.attachEvent('on'+etype,function(e){
					func(e);
				});
			}else{//DOM1
				dom['on'+etype]=function(e){
					func(e);
				}
			}
		}
		function toPrevMonth(){
			var date=dateObj.getDate();
			dateObj.setDate(new Date(date.getFullYear(),date.getMonth()-1,1));
			showCalendarData();
		}
		function toNextMonth(){
			var date=dateObj.getDate();
			dateObj.setDate(new Date(date.getFullYear(),date.getMonth()+1,1));
			showCalendarData();
		}
		function getDateStr(date){
			var _year=date.getFullYear();
			var _month=date.getMonth()+1;
			var _d=date.getDate();
			_month=(_month>9)?(""+_month):("0"+_month);
			_d=(_d>9)?(""+_d):("0"+_d);
			return _year+_month+_d;
		}
})();