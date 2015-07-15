// Tambah Jadwal Baru

exports.save = function (req,fn){

	var get = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function (err, connection){

			if(get.id_jadwal == ''){

				var tambah = {
					nama_kegiatan:get.nama_kegiatan,
					tanggal_mulai: get.tgl_mulai,
					jam_mulai: get.jam_mulai,
					tanggal_selesai:get.tgl_selesai,
					jam_selesai:get.jam_selesai,
					status_jadwal:get.status_jadwal
				};

				connection.query("INSERT INTO jadwal_kegiatan set ? ", tambah, function(err, rows)
				{

					if(err)
						return fn(false, err);

					return fn(true, "Jadwal Kegiatan Baru Telah Di Tambahkan");
				});
			}
			else {

				var update;
				update = {
					nama_kegiatan:get.nama_kegiatan,
					tanggal_mulai: get.tgl_mulai,
					jam_mulai: get.jam_mulai,
					tanggal_selesai:get.tgl_selesai,
					jam_selesai:get.jam_selesai,
					status_jadwal:get.status_jadwal
				};

				connection.query("UPDATE jadwal_kegiatan set ? WHERE id = ?",[update,get.id_jadwal], function(err, rows)
				{
					if(err)
						return fn(false,err)

					return fn(true, "Jadwal Kegiatan Telah Di Perbarui");
				});

			}
	});
};

// Get Data Jadwal

exports.getJadwal = function(req, fn){

	req.getConnection(function(err,connection){

		var query = connection.query('SELECT * FROM jadwal_kegiatan ORDER BY id DESC',
			function(err,rows){

				if(err)
					return fn(false, err);

				return fn(true, rows,'Data Jadwal Tampil');
			});
		console.log(query.sql);
	});
};

// Hapus Jadwal

exports.del_jadwal = function(req, fn){

	var get = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function (err, connection){
		connection.query("DELETE FROM jadwal_kegiatan WHERE id = ? ", [get.id_jadwal], function(err, rows){

			if(err)
				return fn(false, err);

			return fn(true, "Jadwal Telah Di Hapus");
		});
	});
};