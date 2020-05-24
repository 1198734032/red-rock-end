
function show(url = "https://www.tianqiapi.com/free/day?appid=17482235&appsecret=N4mb63vd") {
    let place = document.getElementById("place");
    let du = document.getElementById("du");
    let word = document.getElementById("word");
    let head = document.getElementById("head");
    let tem_today = document.getElementById("tem_today");
    let wea_today = document.getElementById("wea_today");
    let ospan = document.getElementById("t_icon")

    //当前天气渲染
    ajax({
        url: url,
        success: function (data) {
            let user = JSON.parse(data)
            place.innerHTML = user.city;
            du.innerHTML = user.tem;
            word.innerHTML = user.wea;
            tem_today.innerHTML = `${user.tem_day}/${user.tem_night}°`
            head.style.backgroundImage = `url(../resources/${user.wea_img}.jpg)`;
            wea_today.innerHTML = user.wea;
            Icon(user.wea, ospan)
        },
        err: function (err) {
            alert(err)
        }
    })
}

show()

//未来七天天气渲染
function show_future(url = "https://www.tianqiapi.com/free/week?appid=17482235&appsecret=N4mb63vd") {
    let data_ = document.getElementsByClassName("data");
    let wea_d = document.getElementsByClassName("wea-d");
    let wea_n = document.getElementsByClassName("wea-n");
    let win = document.getElementsByClassName("win");
    let win_speed = document.getElementsByClassName("win_speed");
    let part_three = document.getElementById("part-three");
    let day_icon = document.getElementsByClassName("day-icon");
    // let night_icon=document.getElementsByClassName("night-icon");
    let tem_tomorrow = document.getElementById("tem_tomorrow");
    let wea_tomorrow = document.getElementById("wea_tomorrow");
    let m_icon = document.getElementById("m_icon");


    ajax({
        url: url,
        success: function (data) {
            let result = JSON.parse(data).data;
            part_three.style.display = "none";
            for (i = 0; i < data_.length; i++) {
                data_[i].innerHTML = result[i].date.slice(5);
                console.log(result[i].date)
                wea_d[i].innerHTML = result[i].wea;
                wea_n[i].innerHTML = wea_d[i].innerHTML;
                win[i].innerHTML = result[i].win;
                win_speed[i].innerHTML = result[i].win_speed;
                Icon(result[i].wea, day_icon[i])
            }
            draw(result)
            tem_tomorrow.innerHTML = `${result[1].tem_day}/${result[1].tem_night}`;
            wea_tomorrow.innerHTML = result[1].wea;
            Icon(result[1].wea, m_icon);
            part_three.style.display = "block";

        },
        err: function (err) {
            console.log(err)
        }
    })
}
show_future()


 //实时渲染
 function show_now(url="http://39.107.142.107:3000/mock/109/weather"){
    let ool = document.getElementById("two_ol")    
     ajax({
         url:url,
         success:function(data){
            let res=JSON.parse(data).now;
            let frg=document.createDocumentFragment();
            res=res.now;
            for(let i=0;i<res.length;i++){
                let oli=document.createElement("li");
                let p1=document.createElement("p");
                let span=document.createElement("span");
                let p2=document.createElement("p");

                p1.innerHTML=res[i].time;
                p1.className="time";
                p2.innerHTML=res[i].tem;
                p2.className="tem";
                Icon(res[i].wea,span);

                oli.appendChild(p1)
                oli.appendChild(span)
                oli.appendChild(p2)
                frg.appendChild(oli)
            }
           
            ool.appendChild(frg);
            frg=null;
         },
         err:function(err){
             console.log(err)
         }
     })
 }
 show_now()