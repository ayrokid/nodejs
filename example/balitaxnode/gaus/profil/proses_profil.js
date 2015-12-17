// Fungsi Update Profil

exports.update = function (req,hash,fn){

	var temp = JSON.parse(JSON.stringify(req.body));

	// Fungsi Hash Password
	hash(temp.password, function(err, salt_it, hash_it){
		if(err) throw err;

		req.getConnection(function (err, connection){

			var update;

			if(temp.password == ''){

				update = {
					nama_lengkap:temp.nama_lengkap,
					email:temp.email,
					username:temp.username,
					aktif:temp.aktif
				};
			}
			else {

				update = {
					nama_lengkap: temp.nama_lengkap,
					email:temp.email,
					username:temp.username,
					password_hash:hash_it,
					password_salt:salt_it,
					aktif:temp.aktif
				};
			}

			connection.query("UPDATE users set ? WHERE id = ? ",[update,temp.user_id],function(err, rows){

				if(err)
					return fn(false,err);

			});

		});	
	});
};
