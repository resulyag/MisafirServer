var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.post('/Mobile/AddNotifyListener', (req,res)=>{
  console.log("Mobile/AddNotifyListener req.body: " + JSON.stringify(req.body))

  try {
    var data = fs.readFileSync('token.txt', 'utf-8');

    console.log("önceki token: " + data);
  } catch(err){
    console.log("token bulunamadı: err: "+ err)
  }
  
  var token = req.body.token

  if (typeof token == 'undefined' || !token.trim()){

    var resJson = {
      "status":false,
      "message":"Token Boş Olamaz",
      "data":null
    }
    
    res.json(resJson)
  } else {

    //TODO: Alınan tokenı bi dosyaya kaydet

    fs.writeFile('token.txt', token, (err)=>{
      if(err) 
        console.log("kayıt başarısız: hata: " + err)
      else
        console.log("kayıt başarılı")

        var resJson = {
          "status":true,
          "message":"",
          "data":null
        }
        
        res.json(resJson)
    })
  }
});

module.exports = router;
