<?php include 'action/info.php'; ?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta http-equiv="Content-Script-Type" content="text/javascript" />
        <link media="screen and (max-device-width: 481px)" rel="stylesheet"  href="/luci-static/openwrtcn/cascade_iphone.css" />
        <link rel="stylesheet" media="only screen and (orientation:portrait)" href="/luci-static/openwrtcn/iphone_portrait.css" />
        <link rel="stylesheet" media="only screen and (orientation:landscape)" href="/luci-static/openwrtcn/iphone_land.css" />
        <!--[if IE]>
        <link rel="stylesheet"  href="/luci-static/openwrtcn/cascade_ie.css" />
        <![endif]-->
        <!--[if !IE]><!-->
        <link media="screen and (min-device-width: 481px)" rel="stylesheet"  href="css/cascade.css" />
        <!--<![endif]-->
        <!--[if IE 6]><link rel="stylesheet" type="text/css" media="screen" href="/luci-static/openwrtcn/ie6.css" /><![endif]-->
        <!--[if IE 7]><link rel="stylesheet" type="text/css" media="screen" href="/luci-static/openwrtcn/ie7.css" /><![endif]-->
        <!--[if IE 8]><link rel="stylesheet" type="text/css" media="screen" href="/luci-static/openwrtcn/ie8.css" /><![endif]-->
        <link rel="stylesheet" type="text/css" media="screen" href="css/dtree.css" />
        <link rel="stylesheet" type="text/css" media="screen" href="css/askey.css" />

        <link rel="stylesheet" type="text/css" media="screen" href="css/manhuaDialog.1.0.css" />

        <script type="text/javascript" src="js/jquery-1.8.0.js"></script>
        <script type="text/javascript" src="/luci-static/resources/xhr.js"></script>
        <script type="text/javascript" src="js/sysauth.js"></script>
        <script type="text/javascript" src="/luci-static/resources/device.js"></script>
        <script type="text/javascript" src="js/samba.js"></script>
        <script type="text/javascript" src="/luci-static/resources/ftp.js"></script>
        <script type="text/javascript" src="/luci-static/resources/afp.js"></script>
        <script type="text/javascript" src="/luci-static/resources/webdav.js"></script>
        <script type="text/javascript" src="/luci-static/resources/dlna.js"></script>
        <script type="text/javascript" src="/luci-static/resources/itunes.js"></script>
        <script type="text/javascript" src="/luci-static/resources/printer.js"></script>
        <script type="text/javascript" src="/luci-static/resources/download.js"></script>
        <script type="text/javascript" src="js/manhuaDialog.1.0.js"></script>
        <script type="text/javascript" src="/luci-static/resources/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="/luci-static/resources/account.js"></script>
        <script type="text/javascript" src="/luci-static/resources/project.js"></script>
        <script type="text/javascript"> 　　
                    $(':radio').click(function() {
                if (this.checked)
                    $(this).next().css('color', 'red');
            });
        </script> 
        <!--[if IE 6]>
        <style type="text/css">
        body{behavior:url("/luci-static/resources/hover.htc");}
        </style>
        <script type="text/javascript" src="/luci-static/resources/DD_belatedPNG_0.0.8a-min.js"></script>
        <script>
        DD_belatedPNG.fix('#printerbutton_test,#ie6_png,#reset,#saveapply,#logout,#device,#logout:hover,#shutdown,#printerbutton,#space_img'); 
        DD_belatedPNG.fix('.jobsbutton,.devicepng,.ejectbutton,.floatBox,.cbi-section-style,.cbi-input-user,.cbi-input-password,.cbi-input-password-account');
        </script>
        <![endif]-->
        <title>Askey - Samba</title>
        <!--[if IE]>
        
        <![endif]-->
    </head>
    <body class="lang_en">


        <p class="skiplink">
            <span id="skiplink1"><a href="#navigation">Skip to navigation</a></span>
            <span id="skiplink2"><a href="#content">Skip to content</a></span>
        </p>
        <!--
        <div id="menubar">
        <div style="width:839px;height:0px;padding:0;margin:0;"></div> 
        <h2 class="navigation"><a id="navigation" name="navigation">Navigation</a></h2>
        
        <ul id="modemenu">
        <li><a class="active" href="/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/admin/">Administration</a></li>
        </ul>
        -->
        <!--
        <div id="savemenu">
            <a href="#">Changes: 0</a>
            </div>
        -->

        <noscript>
            <div class="errorbox">
                <strong>Java Script required!</strong><br />
                You must enable Java Script in your browser or LuCI will not work properly.
            </div>
        </noscript>
        <table id="maincontainer" cellspacing="0">
            <tr id="maintr" >
                <td  id="container" valign="top" style=" WORD-BREAK:BREAK-ALL;">
                    <div style="height:0;width:600px;"></div>
                    <div class="maincontent">
                        <font style="font-weight:bold;color:#222222;" >Samba Server</font>
                        <hr color="#000000" />
                        <br />
                        <style>
                            .a_leght
                            {
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                width: 140px;
                                display: block;
                            }
                        </style>

                        <a  class="tipmesg" id="smb_set" href="#none" style="background:url('icons/btn03_05.png');
                            font-size:14px;text-align:center;line-height:28px;height:28px;width:87px;display:block;text-decoration:none;font-weight:bold;color:#333;
                            " onclick="SMB_enableSet(this, 'action/smbpower.php');">
                            Stop SMB</a>
                        <input type="hidden" id="file" value="kxg78xrku0_2_tmp" />
                        <input type="hidden" id="smb_status" value="1" />
                        <input type="hidden" id="waittips" value="0" />
                        <input type="hidden" id="share_num" value="30" />

                        <br />
                        <br />
                        NetBIOS Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text"  id="netbiosname" size="30" style="width:20%" name="netbiosname" value="<?PHP echo getNetbiosName() ?>" />

                        <br />
                        <br />



                        <fieldset class="cbi-section">
                            <legend>Share Setting</legend>


                            <input type="hidden" name="authflag" value="yes" />
                            <input type="hidden" name="url_device" value="/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/device" />
                            <input type="hidden" name="url_samba" value="/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba" />

                            <input type="hidden" name="pointdir" value="" />
                            <input type="hidden" name="pointpart" value="" />
                            <input type="button"   id="add_path" disabled="disabled" name="add" value="" onclick="SMB_addDir(this);" />
                            <input  type="button"  id="delete_path" class="tipmesg" disabled="disabled" name="delete" value="" onclick="SMB_deleteDir(this);" />

                            <?php $disks = getDisk(); ?>
                            <table>
                                <tr><td style="vertical-align:top">
                                        <div class="dtree">
                                            <ul style="list-style-type:none;"><?php //disks?>

                                                <?php 
                                                foreach($disks as $disk=> $partitions)
                                                {//disk
                                                ?>
                                                
                                                <li><img id="device_tree_<?php echo $disk; ?>" src='icons/nolines_plus.gif' onclick="SMB_deviceOpencloseset(this, '<?php echo $disk; ?>')" /><img src='icons/base.gif' /><a href='#none' title="<?php echo $disk; ?>" class="node" onclick="SMB_deviceOpencloseset(document.getElementById('device_tree_<?php echo $disk; ?>'), '<?php echo $disk; ?>');
                SMB_radioSet(true, true);" ><span class="a_leght"><?php echo $disk; ?></span></a>
                                                    <div id="<?php echo $disk; ?>" style="display:none;">                                                        
                                                        
                                                        <ul style="list-style-type:none;margin-left: 1.5em;"><?php //partitions?>
                                                            
                                                            <?php
                                                            foreach($partitions as $partition)
                                                            {//partition
                                                            ?>
                                                            <li><img id="partition_tree_<?php echo $partition[0]; ?>" src='icons/plusbottom.gif' onclick="SMB_deviceOpencloseset(this, '<?php echo $partition[0]; ?>')" /><img src='icons/cd.gif' />
                                                                <a href='#none' title="<?php echo $partition[0]; ?>" name="partition" class="node" onclick="SMB_deviceOpencloseset(document.getElementById('partition_tree_<?php echo $partition[0]; ?>'), '<?php echo $partition[0]; ?>');
                        SMB_sharePartclk(this, '<?php echo $partition[1]; ?>')" ><span class="a_leght"><?php echo $partition[0]; ?></span></a>
                                                                <div id="<?php echo $partition[0]; ?>" style="display:none;">
                                                                    
                                                                    
                                                                    <ul style="list-style-type:none;margin-left: 1.5em;"><?php //dirs?>
                                                                        <table style="table-layout:fixed;">

                                                                            <?php
                                                                            foreach($partition[2] as $dir)
                                                                            {//dir
                                                                            ?>                                        
                                                                            <tr>
                                                                                <td style="width:150px;_width:200px;min-width:100px;">
                                                                                    <img name="<?php echo $disk; ?>-<?php echo $partition[0]; ?>" src='icons/join.gif' />
                                                                                    <img style="display:inline" src='icons/folder.gif' />

                                                                                    <a  href="#none" title="amule" name="dirlink" id="<?php echo $partition[1].'/'.$dir.'0';?>" value="<?php echo $partition[1].'/'.$dir;?>" class="node"  onclick='SMB_shareDirclk(this, "<?php echo $partition[1].'/'.$dir.'0';?>", "<?php echo $partition[1];?>", "/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba/samba_getAccess");' ><span class="a_leght"><?php echo $dir;?></span></a>
                                                                                </td>

                                                                                <td>

                                                                                    <input type="checkbox" name="share_folder" id="check-<?php echo $partition[1].'/'.$dir.'0';?>" value="<?php echo $partition[1].'/'.$dir;?>"  style="position:relative;left:130px;display:inline;" onclick="SMB_shareSet(this, '/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba');" />

                                                                                </td>
                                                                            </tr>
                                                                            <?php
                                                                            }//dir
                                                                            ?>                                                                           


                                                                            <script>
                                                                                var endir = document.getElementsByName("ASMT    2105-HomeCloud");
                                                                                if (endir.length != 0)
                                                                                {
                                                                                    endir[endir.length - 1].src = "icons/joinbottom.gif";
                                                                                }
                                                                            </script>
                                                                        </table>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <?php
                                                            }//partition
                                                            ?>
                                                            
                                                        </ul><?php //partitions?>
                                                    </div>
                                                </li>
                                                <?php
                                                }//disk
                                                ?>

                                            </ul><?php //disks?>
                                        </div>
                                    </td>

                                    <td style="vertical-align:top">
                                        <table id="actable" cellspacing="0"  style="">
                                            <tr>
                                                <th>user</th>
                                                <th>r</th>
                                                <th>r/w</th>
                                                <th>no</th>
                                            </tr><tr></tr>

                                            <tr>
                                                <td>Everyone</td>
                                                <td><input type="radio" class="radios" name="guest" onclick='SMB_guestRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");' /></td>
                                                <td><input type="radio" class="radios" name="guest" onclick='SMB_guestRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");' /></td>
                                                <td><input type="radio" class="radios" name="guest" onclick='SMB_guestRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");' /></td>
                                            </tr>

<!--tr><td width="80px"><img src="/luci-static/resources/img/horon.gif" /></td></tr-->
                                            <tr></tr><tr><td colspan="4" ><div id="spilt"></div></td></tr><tr></tr>

                                            <tr>
                                                <td>admin</td><input type="hidden" name="tmp_user" value="admin" />
                                                <td><input type="radio" class="radios" name="admin1" onclick='SMB_userRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");' /></td>
                                                <td><input type="radio" class="radios" name="admin1" onclick='SMB_userRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");'/></td>
                                                <td><input type="radio" class="radios" name="admin1" onclick='SMB_userRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");' /></td>
                                            </tr>

                                            <tr>
                                                <td>chen</td><input type="hidden" name="tmp_user" value="chen" />
                                                <td><input type="radio" class="radios" name="chen2" onclick='SMB_userRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");' /></td>
                                                <td><input type="radio" class="radios" name="chen2" onclick='SMB_userRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");'/></td>
                                                <td><input type="radio" class="radios" name="chen2" onclick='SMB_userRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");' /></td>
                                            </tr>

                                            <tr>
                                                <td>wuhan</td><input type="hidden" name="tmp_user" value="wuhan" />
                                                <td><input type="radio" class="radios" name="wuhan3" onclick='SMB_userRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");' /></td>
                                                <td><input type="radio" class="radios" name="wuhan3" onclick='SMB_userRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");'/></td>
                                                <td><input type="radio" class="radios" name="wuhan3" onclick='SMB_userRadioset("/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/samba");' /></td>
                                            </tr>



                                        </table>
                                    </td>


                                </tr>
                            </table>

                            <script defer="true">
                                window.onunload = function()
                                {
                                    var url = document.getElementsByName("url_samba")[0].value;
                                    var file = document.getElementById("file").value;
                                    $.ajax({
                                        type: 'GET',
                                        async: false,
                                        url: url + "/samba_deleteTempFile",
                                        data: "file=" + file,
                                        success: function(x)
                                        {
                                            //alert(x);
                                        }
                                    });
                                }

                                SMB_load();
                            </script>














                        </fieldset>
                        <table id="button">
                            <tr id="button_tr">
                                <td id="button_space"></td>
                                <td id="button_td">
                                    <input type="hidden"  id="samba_reset" value="/cgi-bin/luci/;stok=2983b8b1f3e58abe371e6050ff7aaa4b/admin/askey/samba" />
                                    <a href="#" id="reset"  name="reset" onclick="this.href = document.getElementById('samba_reset').value;" ></a>
                                </td>
                                <td>
                                    <a href="#"  class="savetipmesg" name="saveapply" id="saveapply"  onclick="SMB_saveApply();" ></a>
                                </td>
                            </tr>
                        </table>
                        <div class="clear"></div>

                    </div>
                </td>
            </tr>
        </table>
    </body>
</html>

