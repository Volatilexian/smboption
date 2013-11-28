<?php
shell_exec("uci set samba.@global[0].netbios=$_GET[netbios]");