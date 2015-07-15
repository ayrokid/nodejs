
function fetch_user(req, done){
   
     req.getConnection(function (err, connection) {
        
        var query = connection.query("SELECT * FROM users WHERE ??  = ? ",['username',req.body.username],function(err, rows, fields){
            
            if (err){
            
            	console.log("Error %s", err);
            	done(false);    
            }	
            else{
            
	            if(rows.length  > 0)   
	              done(rows); 
	            else 
	            	done(false);           	
            }
        });
     });
}

function authenticate(req,hash, fn) {
	
 	 if(!module.parent) 
  		console.log('authenticating %s:%s', req.body.username, req.body.password);
  	
    fetch_user(req, function(jsonData) {
        
        if(!jsonData)
            return fn(false);
            
        if(jsonData[0].username==req.body.username){
        	
        	/*From database*/
        	var password_salt =  jsonData[0].password_salt;
        	var password_hash =  jsonData[0].password_hash;
        	hash(req.body.password,password_salt, function(err, hash_pass){
  	           
			    if (err) {
			    	
			    	console.log(err);
			    	return fn(false);
			    }
			    
			    if(password_hash == hash_pass){ 
			    	
			    	var arr_ret = new Array();
			    	var obj = {};
					obj['username'] = jsonData[0].username;
          obj['user_id']  = jsonData[0].id;
          obj['nama_lengkap']  = jsonData[0].nama_lengkap;
					obj['email']  = jsonData[0].email;
					arr_ret.push(obj);
			    	
			    	console.log("Password Benar");
			    	return fn(arr_ret);
			    	
			    }else{
			     
			    	console.log("Password Salah");
			        return fn(false);			  
			    }
			});
        }
        else{
        	
        	console.log("Tidak ada username di database");
        	return fn(false);
        }
    });

}


exports.check = function (req,hash, fn) {

   authenticate(req,hash, function(result){
  	    
     if(!result)
         return fn(false);
	
      req.session.regenerate(function(){
        
        req.session.username = result[0].username;
        req.session.user_id = result[0].user_id;
        req.session.nama_lengkap = result[0].nama_lengkap;
        req.session.email  = result[0].email;
        
        console.log("User { Username :%s , ID : %s, Nama Anda : %s } is Logged in",req.session.username,req.session.user_id,req.session.nama_lengkap,req.session.email);
        return fn(true);
        
      });
       
  });
  
};
