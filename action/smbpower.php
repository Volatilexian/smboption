<?php
$cmd = '/etc/init.d/samba ';

if($_GET[enable] == "0")
    $enable = 'stop';
else
    $enable = 'start';

$cmd .= $enable;
shell_exec($cmd);

?>