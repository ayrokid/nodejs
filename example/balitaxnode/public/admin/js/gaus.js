
function del_jadwal(id){

    $.ajax({
    
        url:"/jadwal-kegiatan/del",type:"post",dataType:"json",
        data: {id_jadwal:id},
        beforeSend:function(){
        
        },
        success:function(result){
        
            if(result.status){
            
                $('#myModal').modal('hide')
                window.location.reload(true);
            }
        },
        error:function(xhr,status,err){
            
            console.log(err);
        }
    
    });        
}

function del_event(id){

    $.ajax({
    
        url:"/events/del",type:"post",dataType:"json",
        data: {id_event:id},
        beforeSend:function(){
        
        },
        success:function(result){
        
            if(result.status){
            
                $('#myModal').modal('hide')
                window.location.reload(true);
            }
        },
        error:function(xhr,status,err){
            
            console.log(err);
        }
    
    });        
}

$(function(){

    $("#datatable").dataTable();
    $('.dataTables_filter input').addClass('form-control').attr('placeholder','Search');
    $('.dataTables_length select').addClass('form-control');    
        
    //Modal Edit Jadwal
    $(".edit-jadwal").click(function(){
     
        var data = $(this).attr('data-jadwal').split(',');
       
        $("#id_jadwal").val(data[0]);
        $('#nama_kegiatan').val(data[1]);
        $('#tanggal_mulai').val(data[2]);
        $('#jam_mulai').val(data[3]);
        $('#tanggal_selesai').val(data[4]);
        $('#jam_selesai').val(data[5]);

        if(data[6] == '1'){
            $("#status_jadwal_1").prop('checked',true);
        }
        else if(data[6] == '2'){
            $("#status_jadwal_2").prop('checked',true);
        }
        else {
            $("#status_jadwal_3").prop('checked',true);
        }

        $("#modal-jadwal").modal('show');
        $('#modal-jadwal').on('hide.bs.modal', function (e) {
             $("#id,#nama_kegiatan,#tanggal_mulai,#jam_mulai").val("");
        });
        
    });

    //Modal Edit Event
    $(".edit-event").click(function(){
     
        var data = $(this).attr('data-event').split(',');
       
        $("#id_event").val(data[0]);
        $('#nama_event').val(data[1]);
        $('#tgl_mulai').val(data[2]);
        $('#jam_mulai').val(data[3]);
        $('#tgl_selesai').val(data[4]);
        $('#jam_selesai').val(data[5]);

        if(data[6] == '1'){
            $("#status_event_1").prop('checked',true);
        }
        else if(data[6] == '2'){
            $("#status_event_2").prop('checked',true);
        }
        else {
            $("#status_event_3").prop('checked',true);
        }

        $("#modal-events").modal('show');
        $('#modal-events').on('hide.bs.modal', function (e) {
             $("#id,#nama_event,#tanggal_mulai,#jam_mulai").val("");
        });
        
    });
    
   
});
