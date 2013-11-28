var t;	
var _move=false;
var _x,_y;
var newz=1;
var oldz=1;
$(function() {
	$.fn.manhuaDialog = function(options) {
		var defaults = {
			Event : "click",							
			title : "title",							
			type : "text",								
			content : "content",						
			width : 500,				
			height : 400,							
			closeID : "closeId",						
			isAuto : false,								
			time : 2000,								
			isClose : false,  							
			timeOut : 2000								
			
		};
		var options = $.extend(defaults,options);
		if(options.title=="Directory Add")
			options.title="Add";
		var ie6=!-[1,]&&!window.XMLHttpRequest;
		if(ie6)
			$("body").prepend("<div class='floatBoxBg' id='fb"+options.title+"'><iframe style='position: absolute; width: 100%; height: 100%; opacity:0; filter:alpha(opacity=0); background-color:rgb(10, 10, 10); -moz-opacity:0; z-index:-1; '></iframe></div><div class='floatBox' id='"+options.title+"'><div class='title' id='t"+options.title+"'><h4></h4><span class='closeDialog' id='c"+options.title+"'></span></div><div class='content'></div></div>");	
		else
			$("body").prepend("<div class='floatBoxBg' id='fb"+options.title+"'></div><div class='floatBox' id='"+options.title+"'><div class='title' id='t"+options.title+"'><h4></h4><span class='closeDialog' id='c"+options.title+"'></span></div><div class='content'></div></div>");	
				
		var $this = $(this);							
		var $blank = $("#fb"+options.title);					
		var $title = $("#"+options.title+" .title h4");			
		var $content = $("#"+options.title+" .content");		
		var $dialog = $("#"+options.title+"");				
		var $close = $("#c"+options.title);				
		var $ttt =  $("#t"+options.title);	
		var $closeId = $("#"+options.closeID);
		var stc,st;
		if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
			$blank.css({height:$(document).height(),width:$(document).width()});
		}
		
		$close.live("click",function(){
			if ($("#hangyedialog")){
				$("#hangyedialog").hide();
			}
			$blank.hide();
			$dialog.hide();			
			if(st){
				clearTimeout(st);
			}
			if(stc){
				clearTimeout(stc);
			}
			var auth_name = document.getElementById("text_admin");
			if(auth_name)
			{
				auth_name.id = "";
				auth_name.name = "";
			}
			var auth_pass = document.getElementById("text_password");
			if(auth_pass)
			{
				auth_pass.id = "";
				auth_name.name = "";
			}
			var button_ok = document.getElementById("button_ok");
			if(button_ok)
			{
				button_ok.id = "";
				button_ok.name = "";
			}
			var button_cancel = document.getElementById("button_cancel");
			if(button_cancel)
			{
				button_cancel.id = "";
				button_cancel.name = "";
				//DealNode("floatBoxBg");
				//DealNode("floatBox");
			}
			var add_dirname = document.getElementById("add_dirname");
			if(add_dirname)
			{
				add_dirname.id = "";
				add_dirname.name = "";
			}
		});	
		$closeId.live("click",function(){
			if ($("#hangyedialog")){
				$("#hangyedialog").hide();
			}
			$blank.hide();
			$dialog.hide();			
			if(st){
				clearTimeout(st);
			}
			if(stc){
				clearTimeout(stc);
			}
		});	
		$ttt.live("mousedown",function(e){		
			 _move=true;
			newz = parseInt($dialog.css("z-index"))
			$dialog.css({"z-index":newz+oldz});
			//t =  $dialog;
			_x=e.pageX-parseInt($dialog.css("left"));
			_y=e.pageY-parseInt($dialog.css("top"));
			$dialog.fadeTo(50, 0.5);
		});
		$(document).live("mousemove",function(e){
			 if(_move){
				var x=e.pageX-_x;
				var y=e.pageY-_y;
				 $dialog.css({top:y,left:x});
			}							 
		});
		$ttt.live("mouseup",function(e){
			_move=false;
			 $dialog.fadeTo("fast", 1);
			oldz = parseInt($dialog.css("z-index"));
		});
		
		/*var object_this='';
		for(i in this ){		
			object_this=object_this+"******"+i+":"+this[i]+"\n";
		  //alert(i);           //获得属性		  
		  //alert(this[i]);  //获得属性值
		}
		alert(object_this);*/
		
		$content.css("height",parseInt(options.height)-30);

		$this.live(options.Event,function(e){
			if(options.title=="Add")
				$title.html("Directory Add");
			else if(options.title=="Tips")
				$title.html("Please Wait");
			else
				$title.html(options.title);
			switch(options.type){
				case "url":									
					$content.ajaxStart(function(){
						$(this).html("loading...");
					});
					$.get(options.content,function(html){
						$content.html(html);						
					});
					break;
				case "text":						
					$content.html(options.content);
					break;
				case "id":									
					$content.html($("#"+options.content+"").html());
					break;
				case "iframe":								
					$content.html("<iframe src=\""+options.content+"\" width=\"100%\" height=\""+(parseInt(options.height)-40)+"px"+"\" scrolling=\"auto\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>");
					break;
				default:								
					$content.html(options.content);
					break;
			}
			var layer = getLayer("floatBoxBg");
			var opacity_val=0.5/layer;
			$blank.show();
			$blank.animate({opacity:opacity_val},"normal");
			
			$dialog.css({display:"none",left:(($(document).width())/2-(parseInt(options.width)/2)-5)+"px",top:((document.documentElement.clientHeight)/2-(parseInt(options.height)/2))+"px",width:260,height:180});
			$dialog.show();
			if (options.isClose){
				stc = setTimeout(function (){			
					$close.trigger("click");
					clearTimeout(stc);
				},options.timeOut);	
			}
			
		});	

		if (options.isAuto){
			st = setTimeout(function (){			
				$this.trigger(options.Event);
				clearTimeout(st);
			},options.time);	
		}
	}
});

