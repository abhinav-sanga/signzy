$(document).bind("contextmenu",function(e){
  e.preventDefault();
  console.log(e.pageX + "," + e.pageY);
  $("#cntnr").css("left",e.pageX);
  $("#cntnr").css("top",e.pageY);
 // $("#cntnr").hide(100);        
  $("#cntnr").fadeIn(200,startFocusOut());      
});

function startFocusOut(){
  $(document).on("click",function(){
  $("#cntnr").hide();        
  $(document).off("click");
  });
}

$("#items > li").click(function(){
	var id = this.id;
	var foldname = '';
	var filename = '';
	if(id=='newfo'){
		var nameof = prompt("Folder name: ","New folder");
		if (nameof == null || nameof == "") {
    		console.log("Name is compulsory");
  		} else {
    		foldname = ''+nameof;
  		}	
	}
	else if(id=='newfi'){
		var nameof = prompt("File name: ","New file");
		if (nameof == null || nameof == "") {
    		console.log("Name is compulsory");
  		} else {
    		filename = ''+nameof;
  		}	
	}


	var data = {id: id, name: nameof};

	fetch('http://localhost:8080/',{
		method:'post',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	}).then((res) => {
		if(id=='newfo' && nameof!=null){
			$('.contentDiv').append('<a href="#">'+
        	'<figure>'+
            	'<img src="https://cdn1.iconfinder.com/data/icons/fs-icons-ubuntu-by-franksouza-light/512/folder.png"'+'id='+nameof+'/>'+
            	'<figcaption>'+nameof+'</figcaption>'+
        	'</figure>'+
    	'</a>')
		}else if(id=='newfi' && nameof!=null){
			$('.contentDiv').append('<a href="#">'+
        	'<figure>'+

            	'<img src="https://www.freeiconspng.com/uploads/original-file---svg-file-nominally-822--754-pixels-file-size--33.png"'+'id='+nameof+' />'+
            	'<figcaption>'+nameof+'</figcaption>'+
        	'</figure>'+
    	'</a>')
		}
	});
});

function getfiles(){
	$(document).ready(function(){
	
	var result = JSON.parse($("#filetype").text());
	for(var i=0;i<result.length;i++){
		if(result[i].type != 'folder'){
			$('.contentDiv').append('<a href="#"'+'id='+result[i].name+'>'+
        	'<figure>'+
            	'<img src="https://www.freeiconspng.com/uploads/original-file---svg-file-nominally-822--754-pixels-file-size--33.png"'+'id='+result[i].name+' />'+
            	'<figcaption>'+result[i].name+'</figcaption>'+
        	'</figure>'+
    	'</a>')
		}
		else{
			$('.contentDiv').append('<a href="#"'+'id='+result[i].name+'>'+
        	'<figure>'+
            	'<img src="https://cdn1.iconfinder.com/data/icons/fs-icons-ubuntu-by-franksouza-light/512/folder.png"'+'id='+result[i].name+'/>'+
            	'<figcaption>'+result[i].name+'</figcaption>'+
        	'</figure>'+
    	'</a>')
		}
	}
});	
}


$(document).on('mousedown', 'img', function (e) {
    //check that the right mouse button was used
    if (e.which === 3) {
        //log the [id] attribute of the element that was right-clicked on
        var fileid = $(this).attr('id');
    	console.log(fileid);
        len = fileid.length;
        if(fileid[len-1]=='/'){
        	var fileidnew = fileid.slice(0,len-1);
        }else {
        	fileidnew = fileid;
        }

        $("#del").click(function(){
        	var delid = '#'+fileid;
        	console.log(delid);
        	var boddyy = {fileid: fileidnew};
        	
        		fetch('http://localhost:8080/del',{
				method:'post',
				body: JSON.stringify(boddyy),
				headers: new Headers({
					'Content-Type': 'application/json'
					})
				}).then(console.log(delid));        	
		});
        
    }
});

getfiles();

// $(delid).remove()