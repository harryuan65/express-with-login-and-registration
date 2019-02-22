const express = require('express');
const router = express.Router();
var db = require('./connection');

router.get('/',(req,res)=>{
   res.render('login'); 
})
router.get('/registration',(req,res)=>{
    res.redirect('/registration');
});

router.post('/dologin',(req,res)=>{
    var olduser = {
        username:req.body.username,
        password:req.body.password,
    };
    var cmd = "select * from clientinfo where username="+"\""+olduser.username+"\"";
    cmd = cmd.replace('\'','');
    console.log(cmd);
    db.query(cmd,(err,result)=>{
       if(err)
       {   
           console.log(err);
       };
       console.log('【Result】');
       console.log(result);
       console.log('長度='+result.length.toString());
       if(result=='')
       {
            res.send('使用者不存在');
       }
       else{
           if(result[0].password!=olduser.password){
                res.send('密碼錯誤');
           }
           else{
           res.send(`歡迎回來! ${olduser.username}`);
       }
    }
    });
    console.log(olduser);
});

//Create Member 只要方法不一樣可用一樣的router
router.post('/',(req,res)=>{
    res.send(req.body);
});

module.exports = router;