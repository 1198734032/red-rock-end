let fs = require('fs')
let express = require('express')
let app = express()

app.engine('html', require('express-art-template'));
app.use('/resources/', express.static('./resources/'))
app.use('/views/', express.static('./views/'))
app.use('/icon_2/', express.static('./icon_2/'))
app.use('/icon_3/', express.static('./icon_3/'))
app.use('/node_modules/',express.static('./node_modules/'))


app.get('/', function (req, res) {
    res.render('index.html')
})

//渲染历史记录和热门内容  查询能否搜到
app.get("/inform", function (req, res) {
    fs.readFile('./views/cityList.json', (err, data) => {
        if (err) {
            return res.status(500).send();
        }
        let result = JSON.parse(data);
        return res.status(200).send(result);
    })
})

//修改历史纪录
app.get("/new", function (req, res) {
    let newCity=req.query.city;
    let newId=req.query.id;
   
    
    fs.readFile('./views/cityList.json', (err, data) => {
        if (err) {
            return res.status(500).send();
        }

        //判断历史记录是否有搜索过
        let code=0;
        let result = JSON.parse(data);
        let his=result.history;
        

        for(key in result){
            if(key==newCity){
                code=1;
                return res.status(200).send(JSON.parse('{"code":0}'))
            }
        }

        if(!code){
            // newCity=newCity.slice(1,newCity.length-1);
            his[newCity.slice(1,newCity.length-1)]=newId;
            console.log(newCity)
            
            fs.writeFile('./views/cityList.json', JSON.stringify(result), function (err, data) {
                if (err) {
                    return res.status(500).send(JSON.parse('{"code":1}'))
                }
                return res.status(200).send(JSON.parse('{"code":0}'))
            })
        }

    })
})

app.listen(3000, _ => {
    console.log("running...")
})