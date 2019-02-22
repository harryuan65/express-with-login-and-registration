var express = require('express');
var router = express.Router();
var db = require('./connection');
var uuid = require('uuid');
router.post('/',(req,res)=>{
    res.render('registration'); 
 });

 router.post('/register',(req,res)=>{
    var newuser = {
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    };
    var cmd = "select * from clientinfo where username="+"\""+newuser.username+"\"";
    cmd = cmd.replace('\'','');
    db.query(cmd,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        if(result != '')
        {
            res.send('此帳號已註冊!');
        }
        else{
            var id = uuid.v4();
            var cmd2 = `INSERT INTO clientinfo(\`id\`, \`username\`, \`password\`, \`email\`, \`years\`, \`notion\`, \`earns\`, \`inputs\`, \`rates\`, \`inflation\`, \`wStart\`, \`wEnd\`, \`mCost\`, \`house_year\`, \`house_cost\`, \`house_debt_year\`, \`car_year\`, \`car_cost\`, \`car_debt_year\`) VALUES (\"${id}\",\"${newuser.username}\",\"${newuser.password}\",\"${newuser.email}\",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)`;
            console.log(cmd2);
            db.query(cmd2,(err,result)=>{
                if(err)
                {
                    console.log(err);
                }
                else{
                    res.send('已註冊完成!');
                }
            })
        }
    });    
});
module.exports = router;
