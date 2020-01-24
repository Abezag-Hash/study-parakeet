var cycle = prompt("Enter Average cycle:")
var age = prompt("Enter your age:")
var date_ = prompt("Enter the last period date(DD/MM/YYYY):")

document.addEventListener('DOMContentLoaded', function(){
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        monthTag =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        day = today.getDate(),
        days = document.getElementsByTagName('td'),
        selectedDay,
        setDate,
        daysLen = days.length;
// options should like '2014-01-01'
    function Calendar(selector, options) {
        this.options = options;
        this.draw();
    }



    Calendar.prototype.draw  = function() {
        this.getCookie('selected_day');
        this.getOptions();
        this.drawDays();
        var that = this,
            reset = document.getElementById('reset'),
            pre = document.getElementsByClassName('pre-button'),
            next = document.getElementsByClassName('next-button');

            pre[0].addEventListener('click', function(){that.preMonth(); });
            next[0].addEventListener('click', function(){that.nextMonth(); });
            reset.addEventListener('click', function(){that.reset(); });
        while(daysLen--) {
            days[daysLen].addEventListener('click', function(){that.clickDay(this); });
        }
    };

    Calendar.prototype.drawHeader = function(e) {
        var headDay = document.getElementsByClassName('head-day'),
            headMonth = document.getElementsByClassName('head-month');

            e?headDay[0].innerHTML = e : headDay[0].innerHTML = day;
            headMonth[0].innerHTML = monthTag[month] +" - " + year;
     };

    Calendar.prototype.drawDays = function() {
        var startDay = new Date(year, month, 1).getDay(),
//      下面表示这个月总共有几天
            nDays = new Date(year, month + 1, 0).getDate(),

            n = startDay;
            var n1 = n;
// 清除原来的样式和日期
        for(var k = 0; k <42; k++) {
            days[k].innerHTML = '';
            days[k].id = '';
            days[k].className = '';
        }

        for(var i  = 1; i <= nDays ; i++) {
            days[n].innerHTML = i;
            n++;
        }

        for(var j = 0; j < 42; j++) {

            if(days[j].innerHTML === ""){

                days[j].id = "disabled";

            }else if(j === day + startDay - 1){

                if((this.options && (month === setDate.getMonth()) && (year === setDate.getFullYear())) || (!this.options && (month === today.getMonth())&&(year===today.getFullYear()))){
                    this.drawHeader(day);
                    days[j].id = "today";
                }
            }
            if(selectedDay){
                if((j === selectedDay.getDate() + startDay - 1)&&(month === selectedDay.getMonth())&&(year === selectedDay.getFullYear())){

                days[j].className = "selected";
                this.drawHeader(selectedDay.getDate());

                }
            }
        }

        // var date1 = parseInt(date_ , 10);
        let reg = /\d+/g;
        let result = date_.match(reg);

        var day1= parseInt(result[0] , 10);
        var month1=parseInt(result[1] , 10);
        var year1=parseInt(result[2] , 10);

        console.log(day1);
        console.log(month1);
        console.log(year1);

        var nDays1 = new Date(year1 , month1+1 , 0).getDate();

        while(year != year1)
        {
            while(year1 < year)
            {
                if(month1 == 11)
                {
                    month1 = 0;
                    year1++;
                }
                var curday = new Date(year1 , month1+1 , 0).getDate();
                while(day1 < curday)
                {
                    day1  =+ cycle;
                }
                day1 -= curday;
                month1++;
                // console.log(month1);
                // console.log(month1);
            }
            while(year1 > year)
            {
                if(month1 == 0)
                {
                    month1 = 11;
                    year1--;
                }
                var curday = new Date(year1 , month1+1 , 0).getDate();
                while(day1 > 0 )
                {
                    day1  =- cycle;
                }
                day1 += curday;
                month1--;
            }
        }
        var curday;
        while(month1 != month)
        {
            while(month1 < month)
            {
                curday = new Date(year1 , month1+1 , 0).getDate();
                while(day1 <= curday)
                {
                    day1  =+ cycle;
                }
                month1++;
            }
            while(month1 > month)
            {
                curday = new Date(year1 , month1+1 , 0).getDate();
                while(day1 > 0 )
                {
                    day1  =- cycle;
                }
                month1--;
            }
        }
        if(day1 < 0)
          day1 += curday;
        if(day1 > curday)
          day1 -= curday;
        console.log(month1);
        console.log(day1);
        var curday = new Date(year1 , month1+1 , 0).getDate();
        if(day1 + n1 < n1+curday)
          days[day1 + n1 ].id = "today";
        if(day1 + n1 + 1 < n1+curday)
          days[day1 + n1 +1].id = "today";
        if(day1 + n1 + 2 < n1+curday)
          days[day1 + n1 + 2].id = "today";
        if(day1 + n1 + 3 < n1+curday)
          days[day1 + n1 + 3].id = "today";
        if(day1 + n1 + 4 < n1+curday)
          days[day1 + n1 + 4].id = "today";

        // for(var j = 0; j < 42; j++) {
        //   // nDays = new Date(2020, 1, 23).getDate();
        // }




    };

    Calendar.prototype.clickDay = function(o) {
        var selected = document.getElementsByClassName("selected"),
            len = selected.length;
        if(len !== 0){
            selected[0].className = "";
        }
        o.className = "selected";
        selectedDay = new Date(year, month, o.innerHTML);
        this.drawHeader(o.innerHTML);
        this.setCookie('selected_day', 1);



    };

    Calendar.prototype.preMonth = function() {
        if(month < 1){
            month = 11;
            year = year - 1;
        }else{
            month = month - 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };

    Calendar.prototype.nextMonth = function() {
        if(month >= 11){
            month = 0;
            year =  year + 1;
        }else{
            month = month + 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };

    Calendar.prototype.getOptions = function() {
        if(this.options){
            var sets = this.options.split('-');
                setDate = new Date(sets[0], sets[1]-1, sets[2]);
                day = setDate.getDate();
                year = setDate.getFullYear();
                month = setDate.getMonth();
        }
    };

     Calendar.prototype.reset = function() {
         month = today.getMonth();
         year = today.getFullYear();
         day = today.getDate();
         this.options = undefined;
         this.drawDays();
     };

    Calendar.prototype.setCookie = function(name, expiredays){
        if(expiredays) {
            var date = new Date();
            date.setTime(date.getTime() + (expiredays*24*60*60*1000));
            var expires = "; expires=" +date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name + "=" + selectedDay + expires + "; path=/";
    };

    Calendar.prototype.getCookie = function(name) {
        if(document.cookie.length){
            var arrCookie  = document.cookie.split(';'),
                nameEQ = name + "=";
            for(var i = 0, cLen = arrCookie.length; i < cLen; i++) {
                var c = arrCookie[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);

                }
                if (c.indexOf(nameEQ) === 0) {
                    selectedDay =  new Date(c.substring(nameEQ.length, c.length));
                }
            }
        }
    };
    var calendar = new Calendar();


}, false);
