
function draw(res) {
    let ctx = document.getElementById("myCanves").getContext('2d');
    let arr_h = [];
    let arr_l = [];

    for (let i = 0; i < res.length; i++) {
        arr_h.push(res[i].tem_day);
        arr_l.push(res[i].tem_night);
    }


    let type = "line";
    let data = {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
            {
                label: "day_time",
                data: arr_h,
                borderColor: "#fdbd45",
                borderWidth: 2,
                backgroundColor: "rgba(0,0,0,0)",
                displayColors: false,
                enable: false,
                responsive: true
            },
            {
                label: "night_time",
                data: arr_l,
                borderColor: "#3ac4fa",
                borderWidth: 2,
                backgroundColor: "rgba(0,0,0,0)",
                displayColors: false,
                enable: false,
                responsive: true
            }
        ]
    };
    options = {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: { //刻度
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: { //刻度
                    min: 10,
                   
                    display: false,
                }
            }],
            legend: {
                display: false
            }
        }

    }
    let chart = new Chart(ctx, {
        type: type,
        data: data,
        options: options,
        scaleShowGridLines: false,
    })
}

