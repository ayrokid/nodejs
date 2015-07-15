// Tambah Jadwal Baru

exports.save = function (req,fn){

	var get = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function (err, connection){

			if(get.id_event == ''){

				var tambah = {
					nama_event:get.nama_event,
					tanggal_mulai: get.tgl_mulai,
					jam_mulai: get.jam_mulai,
					tanggal_selesai:get.tgl_selesai,
					jam_selesai:get.jam_selesai,
					status_event:get.status_event
				};

				connection.query("INSERT INTO events set ? ", tambah, function(err, rows)
				{

					if(err)
						return fn(false, err);

					return fn(true, "Event Baru Telah Di Tambahkan");
				});
			}
			else {

				var update;
				update = {
					nama_event:get.nama_event,
					tanggal_mulai: get.tgl_mulai,
					jam_mulai: get.jam_mulai,
					tanggal_selesai:get.tgl_selesai,
					jam_selesai:get.jam_selesai,
					status_event:get.status_event
				};

				connection.query("UPDATE events set ? WHERE id = ?",[update,get.id_event], function(err, rows)
				{
					if(err)
						return fn(false,err)

					return fn(true, "Event Telah Di Perbarui");
				});

			}
	});
};

// Get Data Events

exports.getEvents = function(req, fn){

	req.getConnection(function(err,connection){

		var query = connection.query('SELECT * FROM events ORDER BY id DESC',
			function(err,rows){

				if(err)
					return fn(false, err);

				return fn(true, rows,'Data Event Tampil');
			});
		console.log(query.sql);
	});
};

// Hapus Event

exports.del_event = function(req, fn){

	var get = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function (err, connection){
		connection.query("DELETE FROM events WHERE id = ? ", [get.id_event], function(err, rows){

			if(err)
				return fn(false, err);

			return fn(true, "Event Telah Di Hapus");
		});
	});
};