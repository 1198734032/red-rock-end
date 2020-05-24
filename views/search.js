//搜索城市页面出现与消失
(function () {
    let choose_place = document.getElementById("choose_place");
    let search = document.getElementsByClassName("search")[0];
    let cancel = document.getElementById("cancel");
    let history = document.getElementById("history");
    let hot = document.getElementById("hot-country");

    choose_place.addEventListener("click", _ => {
        search.className += " active";
    })
    cancel.addEventListener("click", _ => {
        search.className = "search";
    })

    ajax({
        url: "/inform",
        success: function (data) {
            let result = JSON.parse(data);
            let history_S = result.history;
            let hot_S = result.hot;

            //渲染历史和热门城市
            let frg1 = document.createDocumentFragment();
            for (key in history_S) {
                if (history_S.hasOwnProperty(key)) {
                    let odiv = document.createElement("div");
                    odiv.innerHTML = key;
                    odiv.setAttribute("data-id", hot_S[key]);
                    odiv.setAttribute("data-city", key)
                    odiv.clickCity();
                    frg1.appendChild(odiv);
                }
            }
            history.appendChild(frg1)
            frg1 = null;

            let frg2 = document.createDocumentFragment();
            for (key in hot_S) {
                if (hot_S.hasOwnProperty(key)) {
                    let odiv = document.createElement("div");
                    odiv.innerHTML = key;
                    odiv.setAttribute("data-id", hot_S[key]);
                    odiv.setAttribute("data-city", key)
                    odiv.clickCity();
                    frg2.appendChild(odiv)
                }
            }
            hot.appendChild(frg2)
            frg2 = null;
        },
        error: function (err) {
            alert(err + "城市内容加载错误")
        }
    })
})();

//点击城市，获取相关内容
Object.prototype.clickCity = function (data) {
    this.addEventListener("click", function () {
        let id = this.getAttribute("data-id");
        let city = this.getAttribute("data-city");
        show("https://www.tianqiapi.com/free/day?appid=17482235&appsecret=N4mb63vd&cityid=" + id);
        show_future("https://www.tianqiapi.com/free/week?appid=17482235&appsecret=N4mb63vd&cityid=" + id);
        let search = document.getElementsByClassName("search")[0];
        search.className = "search";
        console.log(`/new?city=${city}&id=${id}`)
        ajax({
            url: `/new?city="${city}"&id=${id}`,
            success: function (data) {
                let code = JSON.parse(data).code;
                if (!code) {
                    let odiv = document.createElement("div");
                    odiv.innerHTML = city
                    odiv.setAttribute("data-id", id);
                    odiv.setAttribute("data-city", city)
                    document.getElementById("history").appendChild(odiv);
                    odiv.clickCity();
                }

            },
            err: function (data) {
                console.log(data)
            }

        })
    })
}

//搜索
function search() {
    let click_search = document.getElementById("click_search");

    click_search.addEventListener("click", function () {
        let ipt = document.getElementById("search-ipt").value;
        ajax({
            url: "/inform",
            success: function (data) {
                let res = JSON.parse(data).hot;
                for (key in res) {
                    if (ipt == key) {
                        show("https://www.tianqiapi.com/free/day?appid=17482235&appsecret=N4mb63vd&cityid=" + res[key]);
                        show_future("https://www.tianqiapi.com/free/week?appid=17482235&appsecret=N4mb63vd&cityid=" + res[key]);
                        let search = document.getElementsByClassName("search")[0];
                        search.className = "search";
                        
                        return
                    }
                }
            }
        })
    })
}
search()
