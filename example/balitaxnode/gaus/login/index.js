
var express = require('express');
var app = module.exports = express();
var process = require('./process_login');


app.set('views',__dirname);
app.set('view engine','ejs');

var hash = require('../../pass').hash;

app.get('/',function(req,res){
    
    if(req.session.username)
        res.redirect('/home');
        
    res.render('login.ejs',{error_login:''});
   
});

app.get('/login',function(req,res){
    
    if(req.session.username)
        res.redirect('/home');
        
    res.render('login.ejs',{error_login:(req.session.login_error) ? req.session.login_error : ''});
   
});



app.post('/login/auth',function(req,res){
   
   process.check(req,hash,function(status,msg){
        
        console.log("Status : %s , message : %s ",status ,msg);
        if(status){
            
            if(req.session.login_error)
                delete req.session.login_error;
            res.redirect('/home');
        }
        else{
            
            res.redirect('/login');
            req.session.login_error = 'Username atau Password Anda Salah!'; 
        }
   });
   
});

/*Logout proses*/

app.get('/logout', function(req,res){
    
    req.session.destroy(function(){
    
        res.redirect('/login');
    });
});
