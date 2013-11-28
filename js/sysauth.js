/********************************************************
	*File Name		:sysauth.js
	*Create Date	:2013.02.21
	*Author			:John Liu
	*Des			:System authentication js function
*********************************************************/


//Login the system,check the user data.
function SYSAUTH_submitCheck()
{
	var name = document.getElementsByName("username")[0].value;
	var nametype = /^[a-zA-Z0-9_]{1,}$/;
	if(name == "")
	{
		document.getElementById("errbox").style.display = "inline";
		document.getElementById("errbox").style.color = "red";
		document.getElementById("errbox").innerHTML = "The name can't be none";
		return false;
	}
	else if(name.indexOf(" ") >= 0)
	{
		document.getElementById("errbox").style.display = "inline";
		document.getElementById("errbox").style.color = "red";
		document.getElementById("errbox").innerHTML = "The account name can't include any spaces";
		return false;
	}
	else if(!name.match(nametype))
	{
		document.getElementById("errbox").style.display = "inline";
		document.getElementById("errbox").style.color = "red";
		document.getElementById("errbox").innerHTML = "The account name only include a-z,A-Z,0-9";
		return false;
	}
	else
	{
		return true;
	}
}











function SYSAUTH_authentication(name,passwd,dest)
{
	var url = document.getElementsByName("url_device")[0].value;
	var flag = document.getElementsByName("authflag")[0];

	
	//alert(flag.value);
	$.ajax({
	type: 'GET',
	async: false,
	url: url+"/device_checkUser",
	data:"name="+name+"&passwd="+passwd,
	success:function(x)
			{
				//alert(x);
				if(x == "ok")
				{
					flag.value = "yes";
					alert("Authentication success!");
					if(dest == "saveapply")
					{
						document.getElementById("saveapply").id = "save";
						if(document.all)
						{
							document.getElementById("save").click();
						}
						else
						{
							var evt = document.createEvent("MouseEvents");
							evt.initEvent("click",true, true);
							document.getElementById("save").dispatchEvent(evt);
						}
					}
					else if(dest == "add_dir")
					{
						document.getElementById(dest).id = "add_path";
					}
					else if(dest == "delete_dir")
					{
						document.getElementById(dest).id = "delete_path";
					}
					else if(dest == "printer_add")
					{
						document.getElementById(dest).id = "prt_add";
					}
					else if(dest == "printerbutton")
					{
						document.getElementById(dest).id = "printerbutton_test";
					}
					else if(dest == "shutdown")
					{
						document.getElementById(dest).id = "shut_down";
					}
					else
					{
						document.getElementById(dest).id = "";
					}
				}
				else
				{
					flag.value = "no";
					alert("Authentication failed!");
				}
			}
	});
	
}






function SYSAUTH_userCheck(dest)
{
	var dest_bt = dest;
	var str = '<div onkeydown="SYSAUTH_enterKeydown(event);"><font style="font-size:15px;color:black;position:relative;top:10px;left:40px;height:18px;">Need authentication.</font><br /><br />';
	str = str + '<table><tr><td id="label_admin">Admin</td>';
	str = str + '<td><input type="text" name="auth_admin" id="text_admin" /></td></tr>';
	str = str + '<tr><td id="label_password">Password</td>';
	str = str + '<td><input type="password" name="auth_passwd" id="text_password" /></td></tr>';
	
	str = str + '<tr><td><input type="button" name="button_ok" id="button_ok" value="ok" ';
	str = str + 'onclick="SYSAUTH_authentication(document.getElementsByName(';
	str = str + "'auth_admin'";
	str = str + ')[document.getElementsByName(';
	str = str + "'auth_admin'";
	str = str + ').length-1].value, document.getElementsByName(';
	str = str + "'auth_passwd'";
	str = str + ')[document.getElementsByName(';
	str = str + "'auth_passwd'";
	str = str + ').length-1]';
	str = str + '.value,';
	str = str + "'"+dest_bt+"'";
	str = str + ');if(document.all){document.getElementById(';
	str = str + "'cAuthentication'";
	str = str + ').click();}else{var evt=document.createEvent(';
	str = str + "'MouseEvents'";
	str = str + ');evt.initEvent(';
	str = str + "'click',true,true);";
	str = str + 'document.getElementById(';
	str = str + "'cAuthentication'";
	str = str + ').dispatchEvent(evt);}" />';
	str = str + '</td>';
		
	str = str + '<td><input type="button"  id="button_cancel" value="cancel" onclick="if(document.all){document.getElementById(';
	str = str + "'cAuthentication'";
	str = str + ').click();DeleteNode('
	str = str + "'fbAuthentication'"
	str = str + ');}else{var evt=document.createEvent(';
	str = str + "'MouseEvents'";
	str = str + ');evt.initEvent(';
	str = str + "'click',true,true);";
	str = str + 'document.getElementById(';
	str = str + "'cAuthentication'";
	str = str + ').dispatchEvent(evt);DeleteNode('
	str = str + "'fbAuthentication'"
	str = str + ');}" />';
	str = str + '</td></tr></table></div>';
	
	$("#"+dest).manhuaDialog({
		Event : "click",
		title : "Authentication",
		type : "text",
		content : str,
		width : 250,
		height : 300,
		scrollTop : 200,
		isAuto : false,
		time : 2000,
		isClose : false,
		timeOut : 5000
	});
	
	setTimeout(function()
		{
			var auth = document.getElementById("text_admin");
			if(auth)
			{
				auth = document.getElementsByName("auth_admin")[document.getElementsByName("auth_admin").length-1];
				auth.focused = true;
				auth.focus();
			}
		}, 500);

}



function SYSAUTH_waitTips(dest, operate, tt, t)
{
	var str = '<font id="load_state" name="load_state" style="color:black;position:relative;top:40px;left:26px;height:18px;font-size:14px;">The service is processing...<br /></font><br />';
	str = str + "<div  id='bar_frame' style='background:white;border:1px solid black;width:200px;position:relative;top:40px;left:26px;height:18px;'>";
	str = str + "<div id='load_bar' name='load_bar' style='background:#8A90A7;width:0px;position:relative;height:18px;font-weight:bold;color:#FF7F00 ;'><font id='load_state_p' name='load_state_p' style='position:relative;left:80px;z-index: 1000;'>0%</font></div></div>";
	$("."+dest).manhuaDialog({
		Event : "click",
		title : "Tips",
		type : "text",
		content : str,
		width : 250,
		height : 300,
		scrollTop : 200,
		isAuto : false,
		time : 2000,
		isClose : false,
		timeOut : t
	});
	
	var tfs;
	twidth = 1;
	document.getElementById("cTips").style.display = "none";
	
	tfs = setInterval(function()
	{
		var load_bar = document.getElementsByName('load_bar');
		var len = load_bar.length;
		if(dest == "tipmesg")
		{
			len = len - 1;
		}
		else
		{
			len = 0;
		}
		load_bar = load_bar[len];
		
		var load_state = document.getElementsByName('load_state');
		var len = load_state.length;
		if(dest == "tipmesg")
		{
			len = len - 1;
		}
		else
		{
			len = 0;
		}
		var load_state = load_state[len];
		
		var load_state_p = document.getElementsByName("load_state_p");
		var len = load_state_p.length;
		if(dest == "tipmesg")
		{
			len = len - 1;
		}
		else
		{
			len = 0;
		}
		load_state_p = load_state_p[len];
		
		
		var width = parseInt(load_bar.style.width) + twidth;
		if(width > 190)
		{
			width = 190;
			load_bar.style.width = "190px";
			load_state.innerHTML = "The service is processing...<br />";
			load_state_p.innerHTML = 95 +"%"+"<br />";
			if(operate == "save")
			{
				if(document.getElementById("waittips").value == "1")
				{
					load_bar.style.width = "200px";
					load_state.innerHTML = "The service is processing...<br />";;
					load_state_p.innerHTML = 100 +"%"+"<br />";
					clearInterval(tfs);
				}
			}
			else
			{
				load_bar.style.width = "200px";
				load_state.innerHTML = "The service is processing...<br />";;
				load_state_p.innerHTML = 100 +"%"+"<br />";
				clearInterval(tfs);
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
				},800);
			}
		}
		else
		{
			load_state.innerHTML = "The service is processing...<br />";;
			load_state_p.innerHTML = parseInt(width/2) +"%"+"<br />";
			width = width.toString() + 'px';
			load_bar.style.width = width;
			if(document.getElementById("waittips").value == "1")
			{
				load_bar.style.width = "200px";
				load_state.innerHTML = "The service is processing...<br />";;
				load_state_p.innerHTML = 100 +"%"+"<br />";
				clearInterval(tfs);
				document.getElementById("waittips").value = "0";
			}
		}
		
	}, tt/200);
}



function SYSAUTH_enterKeydown(event)
{
	var e = event?event:(window.event?window.event:null);
	var k = e.keyCode || e.which || e.charCode;
	
	if(k == 13)
	{
		var button_ok = document.getElementById("button_ok");
		if(button_ok)
		{
			button_ok = document.getElementsByName("button_ok")[document.getElementsByName("button_ok").length-1];
			if(document.all)
			{
				button_ok.click();
			}
			else
			{
				var evt = document.createEvent("MouseEvents");
				evt.initEvent("click",true, true);
				button_ok.dispatchEvent(evt);
			}
		}
	}
}


function packageUploadwaittips()
{
	var packages = document.getElementById("upload").value;
	var suffix = packages.split(".");
	
	if(suffix[suffix.length-1] != "gz" && suffix[suffix.length-1] != "tgz")
	{
		document.getElementsByName("pkgsubmit")[0].id = "pkgsubmit";
		return false;
	}
	document.getElementsByName("pkgsubmit")[0].id = "pkg_submit";
	
	
	str = '<font style="color:black;position:relative;top:40px;left:20px;height:18px;">Processing...<br />Please wait a moment!</font><br /><br />';
	$("#pkg_submit").manhuaDialog({
		Event : "click",
		title : "Tips",
		type : "text",
		content : str,
		width : 250,
		height : 300,
		scrollTop : 200,
		isAuto : false,
		time : 2000,
		isClose : false,
		timeOut : 2000
	});
}

function getLayer(nodeclass) 
{ 
	var redClassElements = getElementsByClassName(nodeclass); 
	return redClassElements.length;
}
function getElementsByClassName(n) 
{ 
	var classElements = [],allElements = document.getElementsByTagName('*'); 
	for (var i=0; i< allElements.length; i++ ) 
	{ 
		if (allElements[i].className == n ) 
		{ 
		classElements[classElements.length] = allElements[i]; 
		} 
	} 
	return classElements; 
}

function isDirExist(addDirName,path)
{
	var dirpathname,tmpdirpath,tmpaddDirName;
	var dirpath,i;
	var recentdiskpath = path.split("/");

	var share_folder = document.getElementsByName("share_folder");
	if(share_folder.length == 0|| share_folder == null || share_folder == false)
		share_folder = document.getElementsByName("dirchoose");

	for(i = 0; i < share_folder.length; i++)
	{
		dirpathname = share_folder[i].value;
		dirpath = dirpathname.split("/");

		tmpdirpath = dirpath[3].toLowerCase();
		tmpaddDirName = addDirName.toLowerCase();
		if((dirpath[2]==recentdiskpath[2])&&(tmpdirpath == tmpaddDirName))
		{
			alert("The direction name "+dirpath[3]+" is already taken. Please choose a different name.");
			return true;
		}
	}
	return false;
}
