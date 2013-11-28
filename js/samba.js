/********************************************************
	*File Name		:samba.js
	*Create Date	:2013.01.23
	*Author			:John Liu
	*Des			:Samba File Share js function
*********************************************************/

//Start or stop samba server
var samba_current_share = 0;
function SMB_enableSet(obj,url)
{
	//current login user check
	var authflag = document.getElementsByName("authflag")[0].value;
	if(authflag == "no")
	{
		SYSAUTH_userCheck("smb_set");
	}
	else
	{
		//set enable's value.
		var file = document.getElementById("file").value;
		var status = document.getElementById("smb_status").value;
		var enable = "0";
		
		if(status == "0")
		{
			enable = "1";
			obj.innerHTML = "Stop SMB";
			document.getElementById("smb_status").value = "1";
			obj.style.background = "url('icons/btn03_05.png')";
		}
		else
		{
			enable = "0";
			obj.innerHTML = "Start SMB";
			document.getElementById("smb_status").value = "0";
			obj.style.background = "url('icons/btn03_07.png')";
		}
		
		$.ajax({
		type: 'GET',
		async: true,
		url: url, 
		data: "enable="+enable,
		success: function(x)
				{
					//alert(x);
				}
			});
		SYSAUTH_waitTips("tipmesg","switch",3000, 3000);
	}
}


//Open or close the partition or disc.
function SMB_deviceOpencloseset(obj,partition)
{
	var add = document.getElementsByName("add")[0];
	add.disabled = true;
	add.style.filter = "alpha(opacity=25)";
	add.style.opacity = "0.25";
	var del = document.getElementsByName("delete")[0];
	del.disabled = true;
	del.style.filter = "alpha(opacity=25);";
	del.style.opacity = "0.25";
	
	var prt = document.getElementById(partition);
	if(prt.style.display == "none")
	{
		prt.style.display = "block";
		obj.src = "icons/nolines_minus.gif";
	}
	else
	{
		prt.style.display = "none";
		obj.src = "icons/nolines_plus.gif";
	}
	
	var dirlink = document.getElementsByName("dirlink");
	for(i = 0; i < dirlink.length; i++)
	{
		dirlink[i].style.color = "#333";
		dirlink[i].style.background = "";
	}
	var part = document.getElementsByName("partition");
	for(i = 0; i < part.length; i++)
	{
		part[i].style.color = "#333";
		part[i].style.background = "";
	}
	
	
	//Disable all radios.
	SMB_radioSet(true, true);
}


//
function SMB_radioSet(gf,uf)
{
	var i = 0;
	var j = 0;
	var g = document.getElementsByName("guest");
	for(i = 0; i < g.length; i++)
	{
		g[i].disabled = gf;
	}
	
	var users = new Array();
	/*delete by liulongjun:when user list refresh,the web not refresh,so not refresh the user list form server.
	var url_device = document.getElementsByName("url_device")[0].value;
	$.ajax({
		type: 'GET',
		async: false,
		url: url_device+"/device_getAllusers",
		data: "file=1",
		success:function(x)
				{
					if(x != "")
					{
						users = x.split("+");
						if(users.length > 1)
						{
							users.length = users.length - 1;
						}
						
					}
				}
		});
	*/
	var tmp_user = document.getElementsByName("tmp_user");
	for(i = 0; i < tmp_user.length; i++)
	{
		users[i] = tmp_user[i].value;
	}

	
	var u;
	for(i = 1; i <= users.length; i++)
	{
		var tmp_user=users[i]+(i+1).toString();
		u = document.getElementsByName(tmp_user);
		for(j = 0; j < u.length; j++)
		{
			u[j].disabled = uf;
		}
	}
	u = document.getElementsByName(users[0]+"1");	
	u[1].disabled = uf;
	
}


function SMB_sharePartclk(obj,dir)
{
	SMB_radioSet(true, true);
	var i = 0;
	var pointpart = document.getElementsByName("pointpart")[0];
	
	var dirlink = document.getElementsByName("dirlink");
	for(i = 0; i < dirlink.length; i++)
	{
		dirlink[i].style.color = "#333";
		dirlink[i].style.background = "";
	}
	
	var part = document.getElementsByName("partition");
	for(i = 0; i < part.length; i++)
	{
		part[i].style.color = "#333";
		part[i].style.background = "";
	}
	obj.style.background = "gray";
	pointpart.value = dir;
	
	var add = document.getElementsByName("add")[0];
	add.disabled = false;
	add.style.filter = "alpha(opacity=100);";
	add.style.opacity = "1";
	var del = document.getElementsByName("delete")[0];
	del.disabled = true;
	del.style.filter = "alpha(opacity=25)";
	del.style.opacity = "0.25";
}




function SMB_shareDirclk(obj, sharecheck, partdir, url)
{
	document.getElementsByName("pointpart")[0].value = partdir;
	var add = document.getElementsByName("add")[0];
	add.disabled = false;
	add.style.filter = "alpha(opacity=100)";
	add.style.opacity = "1";
	var del = document.getElementsByName("delete")[0];
	del.disabled = false;
	del.style.filter = "alpha(opacity=100)";
	del.style.opacity = "1";
	
	var rlist = new Array();
	var rwlist = new Array();
	var gid;
	var i = 0;
	var j = 0;
	
	var file = document.getElementById("file").value;
	var part = document.getElementsByName("partition");
	
	for(i = 0; i < part.length; i++)
	{
		part[i].style.color = "#333";
		part[i].style.background = "";
	}
	
	var dirlink = document.getElementsByName("dirlink");
	for(i = 0; i < dirlink.length; i++)
	{
		dirlink[i].style.color = "#333";
		dirlink[i].style.background = "";
	}
	obj.style.background = "gray";
	
	document.getElementsByName("pointdir")[0].value = document.getElementById("check-"+sharecheck).value;
	
	
	var guest = document.getElementsByName("guest");
	//If current dir is shared,enable all radios.
	if(document.getElementById("check-"+sharecheck).checked == true)
	{
		sharecheck = sharecheck = document.getElementById("check-"+sharecheck).value;
		sharecheck = encodeURIComponent(sharecheck);
		del.disabled = true;
		del.style.filter = "alpha(opacity=25)";
		del.style.opacity = "0.25";
		document.getElementsByName("delete")[0].disabled = true;
		//Get anon_auth
		$.ajax({
		type: 'GET',
		async: false,
		url: url,
		data: "file="+file+"&path="+sharecheck+"&act=guest",
		success:function(x)
				{
					if(x == "0")
					{
						gid = 2;
					}
					else if(x == "1")
					{
						gid = 0;
					}
					else
					{
						gid = 1;
					}
					guest[gid].checked = true;
				}
	
		});
		
		if(gid == 2)
		{
			//Get rlist
			$.ajax({
			type: 'GET',
			async: false,
			url: url,
			data: "file="+file+"&path="+sharecheck+"&act=rlist",
			success:function(x)
					{
						if(x != "none")
						{
							rlist = x.split("+");
							if(rlist.length > 1)
							{
								rlist.length = rlist.length - 1;
							}
							
						}
					}
		
			});
			
			//Get rwlist
			$.ajax({
			type: 'GET',
			async: false,
			url: url,
			data: "file="+file+"&path="+sharecheck+"&act=rwlist",
			success:function(x)
					{
						if(x != "none")
						{
							rwlist = x.split("+");
							if(rwlist.length > 1)
							{
								rwlist.length = rwlist.length - 1;
							}
							
						}
					}
		
			});
			
		var users = new Array();
		/*delete by liulongjun:when user list refresh,the web not refresh,so not refresh the user list form server.
		var url_device = document.getElementsByName("url_device")[0].value;
		$.ajax({
			type: 'GET',
			async: false,
			url: url_device+"/device_getAllusers",
			data: "file=1",
			success:function(x)
					{
						if(x != "")
						{
							users = x.split("+");
							if(users.length > 1)
							{
								users.length = users.length - 1;
							}
							
						}
					}
			});
			*/
			var tmp_user = document.getElementsByName("tmp_user");
			for(i = 0; i < tmp_user.length; i++)
			{
				users[i] = tmp_user[i].value;
			}
			
			var acu;
			var acflag;
			for(i = 0; i < users.length; i++)
			{
				acflag = 0;
				var tmp_user=users[i]+(i+1).toString();
				acu= document.getElementsByName(tmp_user);		
				acu[2].checked = true;
				
				for(j = 0; j < rlist.length; j++)
				{
					if(users[i] == rlist[j])
					{
						acflag = 1;
						acu[0].checked = true;
						break;
					}
				}
				
				if(acflag == 1)
				{
					continue;
				}
				
				for(j = 0; j < rwlist.length; j++)
				{
					if(users[i] == rwlist[j])
					{
						acu[1].checked = true;
						break;
					}
				}
			}
			
			
			
			SMB_radioSet(false, false);
		}
		else
		{
			rlist.length = 0;
			rwlist.length = 0;
			SMB_radioSet(false, true);
			var acuser;
			var tmp_user = document.getElementsByName("tmp_user");
			
			var trans_user_name = new Array();
			for(i = 1; i < tmp_user.length; i++)
			{
				trans_user_name[i]=tmp_user[i].value+(i+1).toString();
			}
			for(i = 1; i < tmp_user.length; i++)
			{
				acuser = document.getElementsByName(trans_user_name[i]);
				for(var j = 0; j < acuser.length; j++)
				{
					acuser[j].disable = true;
					acuser[j].checked = false;
				}
			}
		}
		
		u = document.getElementsByName("admin1");
		u[1].disabled = false;
		u[1].checked = true;
		
		
	}
	else
	{
		document.getElementsByName("delete")[0].disabled = false;
		SMB_radioSet(true, true);
		var acguest = document.getElementsByName("guest");
		acguest[0].disable = true;
		acguest[0].checked = false
		acguest[1].disable = true;
		acguest[1].checked = false
		acguest[2].disable = true;
		acguest[2].checked = false
		var acuser;
		var tmp_user = document.getElementsByName("tmp_user");
		var trans_user_name = new Array();
		for(i = 1; i < tmp_user.length; i++)
		{
			trans_user_name[i]=tmp_user[i].value+(i+1).toString();	
		}
		for(i = 1; i < tmp_user.length; i++)
		{
			acuser = document.getElementsByName(trans_user_name[i]);
			for(var j = 0; j < acuser.length; j++)
			{
				acuser[j].disable = true;
				acuser[j].checked = false;
			}
		}
	}

}


//Set current dir as samba share or not.
function SMB_shareSet(obj,url)
{
	var file = document.getElementById("file").value;
	
	//alert(url);
	var i = 0;
	var part = document.getElementsByName("partition");
	for(i = 0; i < part.length; i++)
	{
		part[i].style.color = "#333";
		part[i].style.background = "";
	}
	
	var dirlink = document.getElementsByName("dirlink");
	for(i = 0; i < dirlink.length; i++)
	{
		dirlink[i].style.color = "#333";
		dirlink[i].style.background = "";
		if(dirlink[i].id == obj.value)
		{
			dirlink[i].style.background = "gray";
		}
	}
	document.getElementsByName("pointdir")[0].value = obj.value;
	
	
	
	
	
	var users = new Array();
	/*delete by liulongjun:when user list refresh,the web not refresh,so not refresh the user list form server.
	var url_device = document.getElementsByName("url_device")[0].value;
	$.ajax({
		type: 'GET',
		async: false,
		url: url_device+"/device_getAllusers",
		data: "file=1",
		success:function(x)
				{
					if(x != "")
					{
						users = x.split("+");
						if(users.length > 1)
						{
							users.length = users.length - 1;
						}
						
					}
				}
		});
		*/
	var tmp_user = document.getElementsByName("tmp_user");
	for(i = 0; i < tmp_user.length; i++)
	{
		users[i] = tmp_user[i].value;
	}
	
	if(obj.checked == true)
	{
		var share_num = document.getElementById("share_num").value;
		if(samba_current_share >= share_num)
		{
			alert("The number of shared folder has reached upper limit.");
			obj.checked = false;
			var del = document.getElementsByName("delete")[0];
			del.disabled = false;
			del.style.filter = "alpha(opacity=100)";
			del.style.opacity = "1";
			
			SMB_radioSet(true, true);
			
			var acguest = document.getElementsByName("guest");
			acguest[0].disable = true;
			acguest[0].checked = false
			acguest[1].disable = true;
			acguest[1].checked = false
			acguest[2].disable = true;
			acguest[2].checked = false
			var acuser;
			var tmp_user = document.getElementsByName("tmp_user");
			for(i = 0; i < tmp_user.length; i++)
			{
				acuser = document.getElementsByName(tmp_user[i].value);
				for(var j = 0; j < acuser.length; j++)
				{
					acuser[j].disable = true;
					acuser[j].checked = false;
				}
			}
			return;
		}
		samba_current_share++;
		
		
		var del = document.getElementsByName("delete")[0];
		del.disabled = true;
		del.style.filter = "alpha(opacity=25)";
		del.style.opacity = "0.25";
		
		SMB_radioSet(false, false);
		var guest = document.getElementsByName("guest");
		guest[2].checked = true;
		var rwlist = "";
		for(i = 0; i < users.length; i++)
		{
			var tmp_users=users[i]+(i+1).toString();
			document.getElementsByName(tmp_users)[1].checked = true;
			rwlist = rwlist + users[i] + ",";
		}
		
		
		var path = encodeURIComponent(obj.value);
		var anon_auth = "0";
		var rlist = "";
		
		
		
		//Add samba share
		$.ajax({
		type: 'GET',
		async: false,
		url: url+"/samba_addShare",
		data: "file="+file+"&path="+path+"&anon_auth="+anon_auth+"&rlist=''"+"&rwlist="+rwlist,
		success:function(x)
				{
					//alert(x);
				}
	
		});
		
	}
	else
	{
		samba_current_share--;
		var del = document.getElementsByName("delete")[0];
		del.disabled = false;
		del.style.filter = "alpha(opacity=100)";
		del.style.opacity = "1";
		
		SMB_radioSet(true, true);
		
		var acguest = document.getElementsByName("guest");
		acguest[0].disable = true;
		acguest[0].checked = false
		acguest[1].disable = true;
		acguest[1].checked = false
		acguest[2].disable = true;
		acguest[2].checked = false
		var acuser;
		var tmp_user = document.getElementsByName("tmp_user");
		for(i = 0; i < tmp_user.length; i++)
		{
			acuser = document.getElementsByName(tmp_user[i].value);
			for(var j = 0; j < acuser.length; j++)
			{
				acuser[j].disable = true;
				acuser[j].checked = false;
			}
		}
		
		
		//Delete samba share
		$.ajax({
		type: 'GET',
		async: false,
		url: url+"/samba_deleteShare",
		data: "file="+file+"&path="+encodeURIComponent(obj.value),
		success:function(x)
				{
					//alert(x);
				}
	
		});
	}
	
}


//When samba page loaded,execute this function.
function SMB_load()
{
	//Disable all radios.
	var rd = document.getElementsByTagName("input");
	for(var i = 0; i < rd.length; i++)
	{
		if(rd[i].className == "radios")
		{
			rd[i].disabled = true;
		}
	}
	
	var share_folder = document.getElementsByName("share_folder");
	for(i = 0; i < share_folder.length; i++)
	{
		if(share_folder[i].checked == true)
		{
			samba_current_share++;
		}
	}
}


//Guest radio set
function SMB_guestRadioset(url)
{
	document.getElementsByName("add")[0].disabled = true;
	document.getElementsByName("delete")[0].disabled = true;
	var i = 0;
	var j = 0;
	var acuser;
	var users = new Array();
	
	/*delete by liulongjun:when user list refresh,the web not refresh,so not refresh the user list form server.
	var url_device = document.getElementsByName("url_device")[0].value;
	$.ajax({
		type: 'GET',
		async: false,
		url: url_device+"/device_getAllusers",
		data: "file=1",
		success:function(x)
				{
					if(x != "")
					{
						users = x.split("+");
						if(users.length > 1)
						{
							users.length = users.length - 1;
						}
						
					}
				}
		});
		*/
	var tmp_user = document.getElementsByName("tmp_user");
	for(i = 0; i < tmp_user.length; i++)
	{
		users[i] = tmp_user[i].value;
	}
	
	var guest = document.getElementsByName("guest");
	var dir = encodeURIComponent(document.getElementsByName("pointdir")[0].value);
	var file = document.getElementById("file").value;
	
	if((guest[0].checked == true) || (guest[1].checked == true))
	{
		for(i = 0; i < users.length; i++)
		{
			var tmp_user=users[i]+(i+1).toString();
			acuser = document.getElementsByName(tmp_user);
			for(j = 0; j < acuser.length; j++)
			{
				acuser[j].disabled = true;
				acuser[j].checked = false;
			}
		}
		
		acuser = document.getElementsByName(users[0]+"1");
		acuser[1].disabled = false;
		acuser[1].checked = true;
		
		var anon_auth;
		if(guest[0].checked == true)
		{
			anon_auth = "1";
		}
		else
		{
			anon_auth = "2";
		}
		
		$.ajax({
		type: 'GET',
		async: false,
		url: url+"/samba_modifyShare",
		data: "file="+file+"&path="+dir+"&anon_auth="+anon_auth+"&rlist=''&rwlist='admin'",
		success:function(x)
				{
					//alert(x);
				}
	
		});
		
		
	}
	else
	{
		
		for(i = 1; i < users.length; i++)
		{
			var tmp_user=users[i]+(i+1).toString();
			acuser = document.getElementsByName(tmp_user);
			for(j = 0; j < acuser.length; j++)
			{
				acuser[j].disabled = false;
			}
			acuser[1].checked = true;
		}
		acuser = document.getElementsByName(users[0]+"1");
		acuser[1].disabled = false;
		acuser[1].checked = true;
		
		var rwlist = "";
		for(i = 0; i < users.length; i++)
		{
			document.getElementsByName(users[i]+(i+1).toString())[1].checked = true;
			rwlist = rwlist + users[i] + ",";
		}
		
		
		$.ajax({
		type: 'GET',
		async: false,
		url: url+"/samba_modifyShare",
		data: "file="+file+"&path="+dir+"&anon_auth=0&rlist=''&rwlist="+rwlist,
		success:function(x)
				{
					//alert(x);
				}
	
		});
		
	}
	
	
}


//User radio set
function SMB_userRadioset(url)
{
	document.getElementsByName("add")[0].disabled = true;
	document.getElementsByName("delete")[0].disabled = true;
	
	var file = document.getElementById("file").value;
	var i = 0;
	var anon_auth = "0";
	var rlist = "";
	var rwlist = "";
	var acuser;
	
	var users = new Array();
	/*delete by liulongjun:when user list refresh,the web not refresh,so not refresh the user list form server.
	var url_device = document.getElementsByName("url_device")[0].value;
	$.ajax({
		type: 'GET',
		async: false,
		url: url_device+"/device_getAllusers",
		data: "file=1",
		success:function(x)
				{
					if(x != "")
					{
						users = x.split("+");
						if(users.length > 1)
						{
							users.length = users.length - 1;
						}
						
					}
				}
		});
		*/
	var tmp_user = document.getElementsByName("tmp_user");
	for(i = 0; i < tmp_user.length; i++)
	{
		users[i] = tmp_user[i].value;
	}
	
	var dir = encodeURIComponent(document.getElementsByName("pointdir")[0].value);
	for(i = 0; i < users.length; i++)
	{
		var tmp_user=users[i]+(i+1).toString();
		acuser = document.getElementsByName(tmp_user);
		if(acuser[0].checked == true)
		{
			rlist = rlist + users[i] + ",";
		}
		else if(acuser[1].checked == true)
		{
			rwlist = rwlist + users[i] + ",";
		}
	}
	
	$.ajax({
		type: 'GET',
		async: false,
		url: url+"/samba_modifyShare",
		data: "file="+file+"&path="+dir+"&anon_auth="+anon_auth+"&rlist="+rlist+"&rwlist="+rwlist,
		success:function(x)
				{
					//alert(x);
				}
	
		});
	
}



//check dir name 
function SMB_addDirCheck(dirname)
{
	reg=/(^\s+)/g;
	if(reg.test(dirname)) 
	{
		alert("Directory names can't start with space!");
		return false;
	}
	dirname = dirname.replace(/(\s*$)/g, "");
	var url = document.getElementsByName("url_samba")[0].value;
	var part = document.getElementsByName("pointpart")[0].value;
	var file = document.getElementById("file").value;
	var nametype = /^[a-zA-Z0-9_-]{1,}$/;
	var tmp_dirname = dirname.replace(/\s+/g,"");
	
	if(tmp_dirname == "")
	{
		alert("Directory name can not be empty");
		return false;
	}
	else if(!tmp_dirname.match(nametype))
	{
		alert("Directory name can contain only a-z,A-Z,0-9,_,- and space!");
		return false;
	}
	else if(dirname.length > 32)
	{
		alert("The length of the directory name can not be more than 32");
		return false;
	}
	else if(isDirExist(dirname,part))
	{
		return false;
	}
	else
	{
		dirname = encodeURIComponent(dirname);
		part = encodeURIComponent(part);
		var flag = "0";
		
		setTimeout(function()
		{
			window.location.reload();
		},5000);
		$.ajax({
		type: 'GET',
		async: false,
		url: url+"/samba_addDir",
		data: "dirname="+dirname+"&part="+part+"&file="+file,
		success:function(x)
				{
					flag = x;
				},
		error: function()
				{
					window.location.reload();
				}
	
		});
		if(flag == "1")
		{
			alert("The directory exists,add failed");
			return false;
		}
		else if(flag == "2")
		{
			alert("No space left on device");
			return false;
		}
		else
		{
			alert("Added successfully");
			window.location.reload();
			return true;
		}
		
	}
}



function SMB_addDir(obj)
{
	
	//current login user check
	var authflag = document.getElementsByName("authflag")[0].value;
	if(authflag == "no")
	{
		SYSAUTH_userCheck("add_dir");
	}
	else
	{
		//alert(document.getElementsByName("pointpart")[0].value);
		var str = '<div onkeydown="SYSAUTH_enterKeydown(event);"><br /><font style="color:black;position:relative;top:20px;left:26px;height:18px;">Name:</font>';
		
		str = str + '<input type="text" maxlength="32" style="position:relative;top:20px;left:35px;height:20px;width:150px;" name="dirname"  id="add_dirname" /><br /><br /><br />';
		
		str = str + '<input type="button" onfocus="blur()" id="button_ok" name="button_ok" value="ok" style="" onclick="if(SMB_addDirCheck(document.getElementsByName(';
		str = str + "'dirname'";
		str = str + ')[document.getElementsByName(';
		str = str + "'dirname'";
		str = str + ').length-1].value)){if(document.all){document.getElementById(';
		str = str + "'cAdd'";
		str = str + ').click();}else{var evt=document.createEvent(';
		str = str + "'MouseEvents'";
		str = str + ');evt.initEvent(';
		str = str + "'click',true,true);";
		str = str + 'document.getElementById(';
		str = str + "'cAdd'";
		str = str + ').dispatchEvent(evt);}}" />';
		
		str = str + '<input type="button" onfocus="blur()" id="button_cancel" value="cancel" style=""  onclick="if(document.all){document.getElementById(';
		str = str + "'cAdd'";
		str = str + ').click();}else{var evt=document.createEvent(';
		str = str + "'MouseEvents'";
		str = str + ');evt.initEvent(';
		str = str + "'click',true,true);";
		str = str + 'document.getElementById(';
		str = str + "'cAdd'";
		str = str + ').dispatchEvent(evt);}" /></div>';
			
		$("#add_path").manhuaDialog({
			Event : "click",
			title : "Directory Add",
			type : "text",
			content : str,
			width : 250,
			height : 170,
			scrollTop : 200,
			isAuto : false,
			time : 2000,
			isClose : false,
			timeOut : 5000
		});
		setTimeout(function()
		{
			var add_dir = document.getElementById("add_dirname");
			if(add_dir)
			{
				add_dir = document.getElementsByName("dirname")[document.getElementsByName("dirname").length-1];
				add_dir.focused = true;
				add_dir.focus();
			}
		}, 500);
	}
	
}


function SMB_deleteDir()
{
	//current login user check
	var authflag = document.getElementsByName("authflag")[0].value;
	if(authflag == "no")
	{
		SYSAUTH_userCheck("delete_dir");
	}
	else
	{
		var dir = encodeURIComponent(document.getElementsByName("pointdir")[0].value);
		var url = document.getElementsByName("url_samba")[0].value;
		var file = document.getElementById("file").value;
		
		if(confirm("Are you sure you want to delete this directory?"))
		{
			SYSAUTH_waitTips("tipmesg","save",2000, 5000);
			setTimeout(function()
			{
				var tip = document.getElementById("cTips");
				if(tip)
				{
					if(document.all)
					{
						tip.click();
					}
					else
					{
						var evt = document.createEvent("MouseEvents");
						evt.initEvent("click",true, true);
						tip.dispatchEvent(evt);
					}
				}
				window.location.reload();
			},5000);
			$.ajax({
			type: 'GET',
			async: true,
			url: url+"/samba_deleteFile",
			data: "path="+dir+"&file="+file,
			success:function(x)
					{
						document.getElementById("waittips").value = 1;
						setTimeout(function()
						{
							alert(x);
							window.location.reload();
						},3000);
					},
			error: function()
				{
					var tip = document.getElementById("cTips");
					if(tip)
					{
						if(document.all)
						{
							tip.click();
						}
						else
						{
							var evt = document.createEvent("MouseEvents");
							evt.initEvent("click",true, true);
							tip.dispatchEvent(evt);
						}
					}
					window.location.reload();
				}

			});
			
		}
	}
	
	
}


function SMB_reset()
{
	window.location.reload();
}


function SMB_saveApply()
{
	//get netbiosname and check it.
	var netbiosname = document.getElementById("netbiosname").value;
	var nametype = /^[a-zA-Z0-9_]{1,}$/;
	if(netbiosname == "")
	{
		alert("NetBIOS name can not be empty");
		return false;
	}
	else if(netbiosname.indexOf(" ") >= 0)
	{
		alert("NetBIOS name can not contain spaces");
		return false;
	}
	else if(!netbiosname.match(nametype))
	{
		alert("NetBIOS name can contain only a-z,A-Z,0-9,_");
		return false;
	}
	else if(netbiosname.length >= 16)
	{
		alert("The length of the NetBIOS name can not be more than 15");
		return false;
	}
	
	
	
	//current login user check
	var authflag = document.getElementsByName("authflag")[0].value;
	if(authflag == "no")
	{
		SYSAUTH_userCheck("saveapply");
	}
	else
	{
		var url = document.getElementsByName("url_samba")[0].value;
		var file = document.getElementById("file").value;
		var netbios = document.getElementsByName("netbiosname")[0].value;
		
		
		SYSAUTH_waitTips("savetipmesg","save", 2000, 8000);
		setTimeout(function()
		{
			var tip = document.getElementById("cTips");
			if(tip)
			{
				if(document.all)
				{
					tip.click();
				}
				else
				{
					var evt = document.createEvent("MouseEvents");
					evt.initEvent("click",true, true);
					tip.dispatchEvent(evt);
				}
			}
			window.location.reload();
		},8000);
		$.ajax({
		type: 'GET',
		async: true,
		url: url+"/samba_saveApply",
		data: "file="+file+"&netbios="+netbios,
		success:function(x)
				{
					document.getElementById("waittips").value = 1;
					setTimeout(function(){window.location.reload();},2000);
				},
		error: function()
				{
					var tip = document.getElementById("cTips");
					if(tip)
					{
						if(document.all)
						{
							tip.click();
						}
						else
						{
							var evt = document.createEvent("MouseEvents");
							evt.initEvent("click",true, true);
							tip.dispatchEvent(evt);
						}
					}
					window.location.reload();
				}
		});
		
		
	}
	
}
