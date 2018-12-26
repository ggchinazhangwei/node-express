var express = require('express');
var router = express.Router();

// 链接数据库
var mysql  = require('mysql');  
var connection = mysql.createConnection({     
  host: 'localhost',       
  user: 'root',              
  password : 'wei21hao',       
  port: '3306',                   
  database: 'node' 
}); 
connection.connect();



/* GET users listing. */
router.post('/', function(req, res, next) {
    let { username, password } = req.body.params;
    let operationUsername = "SELECT username FROM user WHERE username='" + username + "'";
    //查询用户表，看用户名是否被注册过
    connection.query(operationUsername,function (err, result) {   
        //如果用户名不存在
        if(!result.length){
            res.send({
                success: false,
                message: '用户不存在请注册'
            })
        }else{
            //查密码是否正确
            let operationPassword = "SELECT password FROM user WHERE password='" + password + "'";
            connection.query(operationPassword,function (passworderr, passwordresult) {
                if(!passwordresult.length){
                    res.send({
                        success: false,
                        message: '密码不正确'
                    })
                }else{
                    res.send({
                        success: true,
                        message: '登陆成功',
                        token: 'sdfv'
                    })
                }   
            })   
        }
    });
});

module.exports = router;
